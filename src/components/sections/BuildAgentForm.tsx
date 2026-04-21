import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type RegisterFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  selectedService: string;
  companyName: string;
  projectGoal: string;
};

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

const INITIAL_FORM: RegisterFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  selectedService: '',
  companyName: '',
  projectGoal: '',
};

const SERVICE_OPTIONS = [
  'AI Agents',
  'Microsoft Automation',
  'CRM / Business OS',
  'Website / App',
  'Consulting',
];

export default function BuildAgentForm() {
  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage('Please correct the highlighted fields and try again.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const { error } = await supabase.from('user_registrations').insert({
        full_name: formData.fullName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        service_type: formData.selectedService,
        company_name: formData.companyName,
        project_goal: formData.projectGoal,
      });

      if (error) {
        throw new Error(error.message || 'Unable to submit the form right now.');
      }

      setStatusMessage('Your details are submitted. Our team will contact you shortly.');
      setFormData(INITIAL_FORM);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleFieldChange(field: keyof RegisterFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
    if (errorMessage) setErrorMessage(null);
  }

  const inputBase = (fieldError?: string) =>
    `contact-input ${fieldError ? 'contact-input--error' : ''}`;

  return (
    <section
      id="build-agent-form"
      className="scroll-mt-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-[#eef2f7]" />
        <div className="absolute -top-40 -left-24 h-[500px] w-[500px] rounded-full bg-[#2563eb]/[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-[#1d4ed8]/[0.05] blur-[100px]" />
      </div>

      {/* Dark mode background */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute -top-40 -left-24 h-[500px] w-[500px] rounded-full bg-[#2563eb]/[0.08] blur-[100px]" />
        <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-[#1d4ed8]/[0.06] blur-[100px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-16 md:py-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="contact-shell"
        >
          {/* ───── Left Column: Headline ───── */}
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="contact-headline"
            >
              Discuss Your
              <span className="block font-normal text-[#475467] dark:text-gray-400">
                AI &amp; Business Solution Needs
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="contact-desc"
            >
              Tell us what you want to build. We help you design AI, automation,
              CRM, and business systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="contact-info"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#2563eb] dark:text-blue-400" />
                <span>info@ambot365.in</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-[#2563eb] dark:text-blue-400" />
                <span>+91 9113602689</span>
              </div>
            </motion.div>
          </div>

          {/* ───── Right Column: Form Card ───── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-card"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                type="text"
                placeholder="Full Name"
                className={inputBase(formErrors.fullName)}
              />
              {formErrors.fullName && <p className="contact-field-error">{formErrors.fullName}</p>}

              <input
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                type="email"
                placeholder="Work Email"
                className={inputBase(formErrors.email)}
              />
              {formErrors.email && <p className="contact-field-error">{formErrors.email}</p>}

              <input
                value={formData.mobileNumber}
                onChange={(e) => {
                  const nextValue = e.target.value.replace(/[^\d+\s-]/g, '');
                  handleFieldChange('mobileNumber', nextValue);
                }}
                type="tel"
                placeholder="Phone Number"
                className={inputBase(formErrors.mobileNumber)}
              />
              {formErrors.mobileNumber && <p className="contact-field-error">{formErrors.mobileNumber}</p>}

              <select
                value={formData.selectedService}
                onChange={(e) => handleFieldChange('selectedService', e.target.value)}
                className={inputBase(formErrors.selectedService)}
              >
                <option value="">I'm Interested In</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {formErrors.selectedService && <p className="contact-field-error">{formErrors.selectedService}</p>}

              <input
                value={formData.companyName}
                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                type="text"
                placeholder="Company Name"
                className={inputBase()}
              />

              <textarea
                value={formData.projectGoal}
                onChange={(e) => handleFieldChange('projectGoal', e.target.value)}
                placeholder="Brief Project Description"
                rows={4}
                className={`${inputBase(formErrors.projectGoal)} resize-none`}
              />
              {formErrors.projectGoal && <p className="contact-field-error">{formErrors.projectGoal}</p>}

              {statusMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300">
                  {statusMessage}
                </div>
              )}
              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-btn group"
              >
                {isSubmitting ? 'Submitting…' : 'Get Free Consultation'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-[#667085] dark:text-gray-500 mt-1">
                <Shield className="h-3.5 w-3.5" />
                100% confidential
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Validation ─── */
function validateForm(data: RegisterFormData): FormErrors {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\+?[1-9]\d{7,14}$/;

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.mobileNumber.trim()) {
    errors.mobileNumber = 'Phone number is required.';
  } else if (!mobileRegex.test(data.mobileNumber.trim().replace(/[\s-]/g, ''))) {
    errors.mobileNumber = 'Enter a valid phone number (e.g. +919876543210).';
  }

  if (!data.selectedService.trim()) {
    errors.selectedService = 'Please select a service.';
  }

  if (!data.projectGoal.trim()) {
    errors.projectGoal = 'Project description is required.';
  }

  return errors;
}
