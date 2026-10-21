import React, { useState, useEffect } from 'react';
import { ValuationFormValues, SubmittedRequestResponse, Language } from '../types';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  Database,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface LeadFormProps {
  currentLang: Language;
  selectedAssetType?: string;
  onOpenPrivacyPolicy: () => void;
  formTexts: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    assetTypeLabel: string;
    assetTypeSelect: string;
    locationLabel: string;
    locationPlaceholder: string;
    purposeLabel: string;
    purposeSelect: string;
    contactMethodLabel: string;
    contactMethodOptions: {
      phone: string;
      whatsapp: string;
      telegram: string;
      email: string;
    };
    commentsLabel: string;
    commentsPlaceholder: string;
    consentText: string;
    consentPolicyLink: string;
    submitBtn: string;
    submittingBtn: string;
    directContactNotice: string;
  };
  successModalTexts: {
    title: string;
    subtitle: string;
    requestIdLabel: string;
    statusNotice: string;
    closeBtn: string;
  };
}

export const LeadForm: React.FC<LeadFormProps> = ({
  currentLang,
  selectedAssetType,
  onOpenPrivacyPolicy,
  formTexts,
  successModalTexts,
}) => {
  const [values, setValues] = useState<ValuationFormValues>({
    fullName: '',
    phone: '',
    email: '',
    assetType: '',
    propertyLocation: '',
    purpose: '',
    contactMethod: 'phone',
    comments: '',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmittedRequestResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Backend integration status for dev transparency
  const [backendStatus, setBackendStatus] = useState<any>(null);
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);

  useEffect(() => {
    if (selectedAssetType) {
      setValues((prev) => ({ ...prev, assetType: selectedAssetType }));
    }
  }, [selectedAssetType]);

  // Check backend status on mount
  useEffect(() => {
    fetch('/api/config-status')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data))
      .catch((err) => console.log('Backend status check note:', err));
  }, []);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!values.fullName.trim()) {
      errs.fullName = 'Пожалуйста, укажите контактное лицо (ФИО / организацию).';
    } else if (values.fullName.trim().length < 2) {
      errs.fullName = 'Имя слишком короткое.';
    }

    if (!values.phone.trim()) {
      errs.phone = 'Пожалуйста, укажите номер телефона для связи.';
    } else if (!/^[\d\s+()-]{7,20}$/.test(values.phone.trim())) {
      errs.phone = 'Укажите действительный номер (например, +996 555 12-34-56).';
    }

    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Некорректный формат адреса электронной почты.';
    }

    if (!values.assetType) {
      errs.assetType = 'Пожалуйста, выберите тип объекта оценки.';
    }

    if (!values.propertyLocation.trim()) {
      errs.propertyLocation = 'Укажите город, район или область нахождения объекта.';
    }

    if (!values.purpose) {
      errs.purpose = 'Пожалуйста, укажите цель проведения оценки.';
    }

    if (!values.consent) {
      errs.consent = 'Необходимо согласие на обработку персональных данных.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/valuation-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          preferredLanguage: currentLang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка сервера при регистрации заявки.');
      }

      setSubmissionSuccess(data);
      // Reset form
      setValues({
        fullName: '',
        phone: '',
        email: '',
        assetType: '',
        propertyLocation: '',
        purpose: '',
        contactMethod: 'phone',
        comments: '',
        consent: true,
      });
      setErrors({});

      // refresh count
      fetch('/api/config-status')
        .then((res) => res.json())
        .then((d) => setBackendStatus(d))
        .catch(() => {});
    } catch (err: any) {
      console.error('Submission failed:', err);
      setServerError(
        err.message || 'Не удалось отправить заявку на сервер. Пожалуйста, проверьте подключение или свяжитесь по телефону.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const assetCategories = [
    { value: 'residential', label: 'Жилая недвижимость (квартира, дом, таунхаус)' },
    { value: 'commercial', label: 'Коммерческая недвижимость (офис, магазин, склад)' },
    { value: 'land', label: 'Земельный участок (ИЖС, коммерческий, сельхоз)' },
    { value: 'vehicles', label: 'Транспортное средство (легковой, грузовой, спецтехника)' },
    { value: 'business', label: 'Бизнес, предприятие, доля в ОсОО / акции' },
    { value: 'machinery', label: 'Оборудование, станки, производственные линии' },
    { value: 'court', label: 'Оценка для суда / имущественного спора' },
    { value: 'inheritance', label: 'Оценка для нотариуса / оформления наследства' },
    { value: 'other', label: 'Другой вид актива / комплексное имущество' },
  ];

  const valuationPurposes = [
    { value: 'bank_collateral', label: 'Залог для получения кредита / ипотеки в банке' },
    { value: 'sale_purchase', label: 'Купля-продажа или аренда' },
    { value: 'inheritance', label: 'Вступление в наследство (для нотариуса)' },
    { value: 'court_dispute', label: 'Судебное разбирательство / раздел имущества' },
    { value: 'accounting_msfo', label: 'Бухгалтерский учет / переоценка по МСФО' },
    { value: 'customs_tax', label: 'Налоговые цели / таможенная стоимость' },
    { value: 'managerial', label: 'Для управленческих решений / привлечение инвестора' },
    { value: 'other', label: 'Иная цель' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl">
      
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs sm:text-sm text-rose-800">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Ошибка отправки</span>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.nameLabel}
            </label>
            <input
              type="text"
              value={values.fullName}
              onChange={(e) => setValues({ ...values, fullName: e.target.value })}
              placeholder={formTexts.namePlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.phoneLabel}
            </label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              placeholder={formTexts.phonePlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email and Property Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.emailLabel}
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              placeholder={formTexts.emailPlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.locationLabel}
            </label>
            <input
              type="text"
              value={values.propertyLocation}
              onChange={(e) => setValues({ ...values, propertyLocation: e.target.value })}
              placeholder={formTexts.locationPlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                errors.propertyLocation ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.propertyLocation && (
              <p className="text-xs text-rose-600 mt-1">{errors.propertyLocation}</p>
            )}
          </div>
        </div>

        {/* Row 3: Asset Type & Valuation Purpose Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.assetTypeLabel}
            </label>
            <div className="relative">
              <select
                value={values.assetType}
                onChange={(e) => setValues({ ...values, assetType: e.target.value })}
                className={`w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.assetType ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="">{formTexts.assetTypeSelect}</option>
                {assetCategories.map((c) => (
                  <option key={c.value} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            {errors.assetType && (
              <p className="text-xs text-rose-600 mt-1">{errors.assetType}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
              {formTexts.purposeLabel}
            </label>
            <div className="relative">
              <select
                value={values.purpose}
                onChange={(e) => setValues({ ...values, purpose: e.target.value })}
                className={`w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.purpose ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="">{formTexts.purposeSelect}</option>
                {valuationPurposes.map((p) => (
                  <option key={p.value} value={p.label}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            {errors.purpose && (
              <p className="text-xs text-rose-600 mt-1">{errors.purpose}</p>
            )}
          </div>
        </div>

        {/* Row 4: Preferred Contact Method */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
            {formTexts.contactMethodLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'phone', label: formTexts.contactMethodOptions.phone },
              { id: 'whatsapp', label: formTexts.contactMethodOptions.whatsapp },
              { id: 'telegram', label: formTexts.contactMethodOptions.telegram },
              { id: 'email', label: formTexts.contactMethodOptions.email },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                  values.contactMethod === method.id
                    ? 'bg-amber-50 border-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method.id}
                  checked={values.contactMethod === method.id}
                  onChange={() => setValues({ ...values, contactMethod: method.id as any })}
                  className="text-amber-500 focus:ring-amber-400"
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 5: Additional Comments */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
            {formTexts.commentsLabel}
          </label>
          <textarea
            rows={3}
            value={values.comments}
            onChange={(e) => setValues({ ...values, comments: e.target.value })}
            placeholder={formTexts.commentsPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors resize-y"
          />
        </div>

        {/* Row 6: Consent Checkbox */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setValues({ ...values, consent: e.target.checked })}
              className="mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
            <span className="text-xs text-slate-600 leading-normal">
              {formTexts.consentText}{' '}
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2"
              >
                {formTexts.consentPolicyLink}
              </button>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-rose-600 mt-0.5">{errors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-lg font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-60 transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{formTexts.submittingBtn}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{formTexts.submitBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Contact Notice */}
        <p className="text-center text-xs text-slate-500 pt-2">
          {formTexts.directContactNotice}
        </p>

        {/* Developer / System Integration Status Accordion */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowIntegrationDetails(!showIntegrationDetails)}
            className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1.5 mx-auto focus:outline-none"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Информация о серверной интеграции (Backend & CRM)</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showIntegrationDetails ? 'rotate-180' : ''}`} />
          </button>

          {showIntegrationDetails && (
            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 animate-in fade-in duration-100">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Статус сервера:</span>
                <span className="text-emerald-700 font-mono">АКТИВЕН (/api/valuation-requests)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-500 block">Хранилище заявок:</span>
                  <span className="font-medium text-slate-800">
                    {backendStatus?.storage || 'Локальный журнал data/requests.json'}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Всего принято: {backendStatus?.totalRequestsCount ?? 0} заявок
                  </div>
                </div>

                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-500 block">Telegram / CRM диспетчер:</span>
                  <span className={backendStatus?.integrations?.telegram ? 'text-emerald-700 font-medium' : 'text-slate-700'}>
                    {backendStatus?.integrations?.telegram ? 'Подключен Telegram Bot' : 'Готов к подключению'}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Настройка через TELEGRAM_BOT_TOKEN в .env
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Все отправляемые заявки немедленно сохраняются на сервере. При наличии настроенного бота в Кыргызстане уведомление приходит оценщику за доли секунды.
              </p>
            </div>
          )}
        </div>

      </form>

      {/* Success Confirmation Dialog */}
      {submissionSuccess && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                {successModalTexts.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {successModalTexts.subtitle}
              </p>
            </div>

            {/* Registration Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">{successModalTexts.requestIdLabel}</span>
                <span className="font-mono font-bold text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {submissionSuccess.requestId}
                </span>
              </div>
              {submissionSuccess.summary && (
                <div className="space-y-1 text-slate-600 pt-1">
                  <div><strong>Объект:</strong> {submissionSuccess.summary.assetType}</div>
                  <div><strong>Локация:</strong> {submissionSuccess.summary.propertyLocation}</div>
                  <div><strong>Цель:</strong> {submissionSuccess.summary.purpose}</div>
                  <div><strong>Способ связи:</strong> {submissionSuccess.summary.contactMethod}</div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              {successModalTexts.statusNotice}
            </p>

            <button
              type="button"
              onClick={() => setSubmissionSuccess(null)}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              {successModalTexts.closeBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
