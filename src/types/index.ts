export type Language = 'ru' | 'kg' | 'en';

export interface ServiceDetail {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  targetObject: string;
  whoNeeds: string[];
  purposes: string[];
  requiredDocuments: string[];
  processSteps: string[];
  legalNote?: string;
}

export interface TeamMemberPlaceholder {
  id: string;
  role: string;
  namePlaceholder: string;
  qualificationPlaceholder: string;
  specialization: string;
}

export interface CertificatePlaceholder {
  id: string;
  title: string;
  registryPlaceholder: string;
  issuingBodyPlaceholder: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'documents' | 'timing' | 'legal';
}

export interface RegionInfo {
  id: string;
  name: string;
  center: string;
  status: 'regular' | 'scheduled';
  note: string;
}

export interface ValuationFormValues {
  fullName: string;
  phone: string;
  email: string;
  assetType: string;
  propertyLocation: string;
  purpose: string;
  contactMethod: 'phone' | 'whatsapp' | 'telegram' | 'email';
  comments: string;
  consent: boolean;
}

export interface SubmittedRequestResponse {
  success: boolean;
  requestId: string;
  createdAt: string;
  message: string;
  summary?: {
    id: string;
    fullName: string;
    assetType: string;
    propertyLocation: string;
    purpose: string;
    contactMethod: string;
  };
}
