import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Shield,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type RegisterFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  selectedService: string;
  projectGoal: string;
};

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

const INITIAL_FORM: RegisterFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  selectedService: '',
  projectGoal: '',
};

const SERVICE_OPTIONS = [
  'AI Agents',
  'Microsoft Automation',
  'CRM / Business OS',
  'Website / App',
  'Consulting',
];

const FORM_HIGHLIGHTS = [
  'Solution direction within 24 hours',
  'No obligation discovery call',
  'Built around Microsoft 365 workflows',
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 contact-section-bg" />
      </div>

      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div className="absolute inset-0 contact-section-bg contact-section-bg--dark" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-16 md:py-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="contact-shell"
        >
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="contact-eyebrow"
            >
              <Sparkles className="h-4 w-4" />
              Register your automation idea
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="contact-headline"
            >
              Discuss Your
              <span className="block">
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
              Share the business process you want to improve. Ambot365 will map
              the right path across AI agents, automation, CRM, apps, and Microsoft
              365 systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="contact-proof-list"
            >
              {FORM_HIGHLIGHTS.map((item) => (
                <div key={item} className="contact-proof-item">
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="contact-info"
            >
              <div className="contact-info-item">
                <Mail className="h-4 w-4" />
                <span>info@ambot365.in</span>
              </div>
              <div className="contact-info-item">
                <Phone className="h-4 w-4" />
                <span>+91 9113602689</span>
              </div>
              <div className="contact-info-item">
                <Clock3 className="h-4 w-4" />
                <span>Mon - Sat, 9 AM - 7 PM</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-card"
          >
            <div className="contact-card-header">
              <div>
                <p className="contact-form-kicker">Free consultation</p>
                <h2>Tell us where work slows down.</h2>
              </div>
              <div className="contact-card-icon">
                <MessageSquareText className="h-5 w-5" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>Full name</span>
                  <input
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    type="text"
                    placeholder="Your name"
                    className={inputBase(formErrors.fullName)}
                    autoComplete="name"
                  />
                  {formErrors.fullName && <p className="contact-field-error">{formErrors.fullName}</p>}
                </label>

                <label className="contact-field">
                  <span>Work email</span>
                  <input
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    type="email"
                    placeholder="you@company.com"
                    className={inputBase(formErrors.email)}
                    autoComplete="email"
                  />
                  {formErrors.email && <p className="contact-field-error">{formErrors.email}</p>}
                </label>

                <label className="contact-field">
                  <span>Phone number</span>
                  <input
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      const nextValue = e.target.value.replace(/[^\d+\s-]/g, '');
                      handleFieldChange('mobileNumber', nextValue);
                    }}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className={inputBase(formErrors.mobileNumber)}
                    autoComplete="tel"
                  />
                  {formErrors.mobileNumber && <p className="contact-field-error">{formErrors.mobileNumber}</p>}
                </label>

              </div>

              <fieldset className="contact-service-field">
                <legend>Area of interest</legend>
                <div className="contact-service-grid">
                  {SERVICE_OPTIONS.map((service) => {
                    const isSelected = formData.selectedService === service;
                    return (
                      <label
                        key={service}
                        className={`contact-service-chip ${isSelected ? 'contact-service-chip--selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="selectedService"
                          value={service}
                          checked={isSelected}
                          onChange={(e) => handleFieldChange('selectedService', e.target.value)}
                        />
                        <span>{service}</span>
                      </label>
                    );
                  })}
                </div>
                {formErrors.selectedService && <p className="contact-field-error">{formErrors.selectedService}</p>}
              </fieldset>

              <label className="contact-field">
                <span>Project goal</span>
                <textarea
                  value={formData.projectGoal}
                  onChange={(e) => handleFieldChange('projectGoal', e.target.value)}
                  placeholder="Example: automate invoice approvals, build a sales CRM, or create an AI support agent."
                  rows={4}
                  className={`${inputBase(formErrors.projectGoal)} resize-none`}
                />
                {formErrors.projectGoal && <p className="contact-field-error">{formErrors.projectGoal}</p>}
              </label>

              {statusMessage && (
                <div className="contact-alert contact-alert--success">
                  {statusMessage}
                </div>
              )}
              {errorMessage && (
                <div className="contact-alert contact-alert--error">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-btn group"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="contact-privacy-note">
                <Shield className="h-3.5 w-3.5" />
                100% confidential. Your details stay with Ambot365.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
