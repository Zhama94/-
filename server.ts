import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValuationRequest {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  assetType: string;
  propertyLocation: string;
  purpose: string;
  contactMethod: string;
  comments?: string;
  consent: boolean;
  preferredLanguage?: string;
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted';
}

const memoryStore: ValuationRequest[] = [];

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'requests.json');
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(dataFilePath)) {
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryStore.push(...parsed);
    }
  }
} catch (e) {
  console.warn('Note: Local data directory initialization skipped or read error:', e);
}

function persistStore() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to local storage file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Kyrgyzstan Asset Valuation Portal Backend',
      timestamp: new Date().toISOString(),
    });
  });

  // Config status for UI/Admin transparent visibility
  app.get('/api/config-status', (req, res) => {
    const hasTelegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
    const hasWebhook = Boolean(process.env.WEBHOOK_URL);
    const hasSmtp = Boolean(process.env.SMTP_HOST);

    res.json({
      success: true,
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      integrations: {
        telegram: hasTelegram,
        webhook: hasWebhook,
        smtp: hasSmtp,
      },
      storage: 'persistent_json_store',
      totalRequestsCount: memoryStore.length,
      instructions: !hasTelegram && !hasWebhook ? 
        'Backend is currently operating in persistent local store mode. To forward requests directly to Telegram or CRM, configure TELEGRAM_BOT_TOKEN or WEBHOOK_URL in environment.' :
        'External notifications are active.'
    });
  });

  // Fetch recent requests (for administrative review / dev verification)
  app.get('/api/valuation-requests', (req, res) => {
    res.json({
      success: true,
      count: memoryStore.length,
      requests: memoryStore.slice(-50).reverse(),
    });
  });

  // Valuation request submission endpoint
  app.post('/api/valuation-requests', async (req, res) => {
    try {
      const {
        fullName,
        phone,
        email,
        assetType,
        propertyLocation,
        purpose,
        contactMethod,
        comments,
        consent,
        preferredLanguage,
      } = req.body;

      // Validation
      const errors: Record<string, string> = {};
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        errors.fullName = 'Укажите контактное лицо (ФИО / наименование организации).';
      }
      if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
        errors.phone = 'Укажите корректный номер телефона для связи.';
      }
      if (!assetType || typeof assetType !== 'string') {
        errors.assetType = 'Выберите тип оцениваемого имущества или актива.';
      }
      if (!propertyLocation || typeof propertyLocation !== 'string' || propertyLocation.trim().length < 2) {
        errors.propertyLocation = 'Укажите местонахождение объекта (город / район / область).';
      }
      if (!purpose || typeof purpose !== 'string') {
        errors.purpose = 'Укажите цель проведения оценки.';
      }
      if (!consent) {
        errors.consent = 'Требуется согласие на обработку персональных данных.';
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Пожалуйста, проверьте заполнение обязательных полей.',
          errors,
        });
      }

      // Generate unique reference ID
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const year = new Date().getFullYear();
      const requestId = `KG-VAL-${year}-${randomCode}`;

      const newRequest: ValuationRequest = {
        id: requestId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email ? String(email).trim() : undefined,
        assetType: String(assetType).trim(),
        propertyLocation: String(propertyLocation).trim(),
        purpose: String(purpose).trim(),
        contactMethod: contactMethod || 'phone',
        comments: comments ? String(comments).trim() : undefined,
        consent: Boolean(consent),
        preferredLanguage: preferredLanguage || 'ru',
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      memoryStore.push(newRequest);
      persistStore();

      console.log(`[VALUATION REQUEST] Registered ${requestId} for ${newRequest.fullName} (${newRequest.phone})`);

      // Optional Telegram webhook dispatcher
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        try {
          const text = `🔔 *Новая заявка на оценку*: \`${requestId}\`\n` +
            `👤 *Клиент*: ${newRequest.fullName}\n` +
            `📞 *Телефон*: ${newRequest.phone}\n` +
            `📧 *Email*: ${newRequest.email || 'Не указан'}\n` +
            `🏢 *Тип объекта*: ${newRequest.assetType}\n` +
            `📍 *Локация*: ${newRequest.propertyLocation}\n` +
            `🎯 *Цель*: ${newRequest.purpose}\n` +
            `💬 *Способ связи*: ${newRequest.contactMethod}\n` +
            `📝 *Комментарий*: ${newRequest.comments || '—'}`;

          fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text,
              parse_mode: 'Markdown',
            }),
          }).catch(err => console.error('Telegram dispatch error:', err));
        } catch (e) {
          console.error('Error dispatching telegram notification:', e);
        }
      }

      // Optional Webhook dispatcher (CRM, Make, Zapier, etc.)
      if (process.env.WEBHOOK_URL) {
        try {
          fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequest),
          }).catch(err => console.error('Webhook dispatch error:', err));
        } catch (e) {
          console.error('Error dispatching webhook:', e);
        }
      }

      return res.status(201).json({
        success: true,
        requestId: newRequest.id,
        createdAt: newRequest.createdAt,
        message: 'Заявка на оценку успешно зарегистрирована.',
        summary: {
          id: newRequest.id,
          fullName: newRequest.fullName,
          assetType: newRequest.assetType,
          propertyLocation: newRequest.propertyLocation,
          purpose: newRequest.purpose,
          contactMethod: newRequest.contactMethod,
        },
      });
    } catch (err: any) {
      console.error('Error processing valuation request:', err);
      return res.status(500).json({
        success: false,
        message: 'Произошла непредвиденная ошибка на сервере при обработке заявки. Пожалуйста, свяжитесь с нами напрямую по телефону.',
      });
    }
  });

  // Serve static files in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Corporate Valuation Portal] Backend & Frontend server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
