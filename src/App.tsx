/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
import { content } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { CoverageMap } from './components/CoverageMap';
import { FAQSection } from './components/FAQSection';
import { LeadForm } from './components/LeadForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ru');
  const [selectedAssetForForm, setSelectedAssetForForm] = useState<string>('');
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState<boolean>(false);

  const t = content[currentLang];

  const scrollToLeadForm = () => {
    const el = document.getElementById('order-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceToOrder = (serviceId: string, serviceTitle: string) => {
    setSelectedAssetForForm(serviceTitle);
    scrollToLeadForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Bar Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        companyName={t.companyName}
        navLabels={t.nav}
        onRequestClick={scrollToLeadForm}
      />

      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero
          kicker={t.hero.kicker}
          headline={t.hero.headline}
          subtitle={t.hero.subtitle}
          primaryCta={t.hero.primaryCta}
          secondaryCta={t.hero.secondaryCta}
          featureBadges={t.hero.featureBadges}
          stats={t.hero.stats}
          onOrderClick={scrollToLeadForm}
          onConsultClick={scrollToLeadForm}
        />

        {/* 2. Brief Company Introduction */}
        <section className="py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                    {t.intro.kicker}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {t.intro.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {t.intro.description1}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {t.intro.description2}
                  </p>
                  
                  {/* Clearly marked registry placeholder */}
                  <div className="pt-3">
                    <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.intro.badgePlaceholder}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Valuation Services (All 8 Disciplines) */}
        <ServicesSection
          kicker={t.servicesSection.kicker}
          title={t.servicesSection.title}
          subtitle={t.servicesSection.subtitle}
          viewDetailsLabel={t.servicesSection.viewDetails}
          closeDetailsLabel={t.servicesSection.closeDetails}
          orderServiceLabel={t.servicesSection.orderThisService}
          modalHeaders={{
            whatIsValued: t.servicesSection.modalWhatIsValued,
            whoNeeds: t.servicesSection.modalWhoNeeds,
            purposes: t.servicesSection.modalPurposes,
            documents: t.servicesSection.modalDocuments,
            process: t.servicesSection.modalProcess,
            legalDisclaimer: t.servicesSection.modalLegalDisclaimer,
          }}
          services={t.services}
          onSelectServiceToOrder={handleSelectServiceToOrder}
        />

        {/* 4. Step-by-Step Valuation Process */}
        <ProcessSection
          kicker={t.processSection.kicker}
          title={t.processSection.title}
          subtitle={t.processSection.subtitle}
          timelineDisclaimer={t.processSection.timelineDisclaimer}
          steps={t.processSection.steps}
          onRequestClick={scrollToLeadForm}
        />

        {/* 5. About the Company, Values, Team & Certificates */}
        <AboutSection
          kicker={t.aboutSection.kicker}
          title={t.aboutSection.title}
          missionTitle={t.aboutSection.missionTitle}
          missionDesc={t.aboutSection.missionDesc}
          valuesTitle={t.aboutSection.valuesTitle}
          values={t.aboutSection.values}
          teamTitle={t.aboutSection.teamTitle}
          teamSubtitle={t.aboutSection.teamSubtitle}
          certTitle={t.aboutSection.certTitle}
          certSubtitle={t.aboutSection.certSubtitle}
          certDisclaimer={t.aboutSection.certDisclaimer}
          team={t.team}
          certificates={t.certificates}
        />

        {/* 6. Service Area: Bishkek & All Regions of Kyrgyzstan */}
        <section id="regions" className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
                {t.regionsSection.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {t.regionsSection.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.regionsSection.subtitle}
              </p>
            </div>

            <CoverageMap
              regions={t.regions}
              capitalTitle={t.regionsSection.capitalTitle}
              regionalTitle={t.regionsSection.regionalTitle}
              disclaimer={t.regionsSection.disclaimer}
            />
          </div>
        </section>

        {/* 7. Frequently Asked Questions */}
        <FAQSection
          kicker={t.faqSection.kicker}
          title={t.faqSection.title}
          subtitle={t.faqSection.subtitle}
          categories={t.faqSection.categories}
          faqs={t.faqs}
          onRequestClick={scrollToLeadForm}
        />

        {/* 8. Lead Generation Section (Form) */}
        <section id="order-form-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
                {t.leadSection.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {t.leadSection.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.leadSection.subtitle}
              </p>
            </div>

            <LeadForm
              currentLang={currentLang}
              selectedAssetType={selectedAssetForForm}
              onOpenPrivacyPolicy={() => setPrivacyPolicyOpen(true)}
              formTexts={t.leadSection.form}
              successModalTexts={t.leadSection.successModal}
            />
          </div>
        </section>

        {/* 9. Contact Details & Office Location */}
        <ContactSection
          kicker={t.contactSection.kicker}
          title={t.contactSection.title}
          subtitle={t.contactSection.subtitle}
          addressLabel={t.contactSection.addressLabel}
          addressValue={t.contactSection.addressValue}
          phoneLabel={t.contactSection.phoneLabel}
          phoneValue={t.contactSection.phoneValue}
          emailLabel={t.contactSection.emailLabel}
          emailValue={t.contactSection.emailValue}
          hoursLabel={t.contactSection.hoursLabel}
          hoursValue={t.contactSection.hoursValue}
          whatsappBtnText={t.contactSection.whatsappBtn}
          mapNotice={t.contactSection.mapNotice}
          mapPlaceholderCity={t.contactSection.mapPlaceholderCity}
        />

      </main>

      {/* Footer */}
      <Footer
        companyName={t.companyName}
        footerTexts={t.footer}
        onOpenPrivacyPolicy={() => setPrivacyPolicyOpen(true)}
        onSelectService={(serviceId) => {
          const service = t.services.find((s) => s.id === serviceId);
          if (service) {
            handleSelectServiceToOrder(service.id, service.title);
          }
        }}
      />

      {/* Floating WhatsApp Quick Consultation Button */}
      <WhatsAppFloat label={t.contactSection.whatsappBtn} />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyPolicyOpen}
        onClose={() => setPrivacyPolicyOpen(false)}
        title={t.privacyModal.title}
        closeBtnText={t.privacyModal.close}
        intro={t.privacyModal.intro}
        terms={t.privacyModal.terms}
      />

    </div>
  );
}
