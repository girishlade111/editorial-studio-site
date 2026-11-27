import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { InvestmentEstimator } from "@/components/shared/InvestmentEstimator";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { SITE_CONFIG, createBreadcrumbSchema } from "@/lib/seo-config";
import { useToast } from "@/hooks/use-toast";
const projectTypes = ["UI/UX Design", "Frontend Web Development", "Full-Stack Application", "Developer Tool / Utility", "Other"];
const budgetRanges = ["Under $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "$100,000+", "Not sure yet"];
const referralSources = ["Referral", "Social Media", "Search Engine", "Press / Publication", "Other"];

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  company: z.string().trim().max(150, "Company must be under 150 characters").optional(),
  projectType: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().trim().min(1, "Project details are required").max(2000, "Message must be under 2000 characters"),
  referral: z.string().max(100).optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const firstInvalid = useRef<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    referral: ""
  });

  useEffect(() => {
    if (!firstInvalid.current) return;
    const field = formRef.current?.elements.namedItem(firstInvalid.current);
    if (field instanceof HTMLElement) field.focus();
    firstInvalid.current = null;
  }, [fieldErrors]);

  const errorAttributes = (name: string) => ({
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });

  const renderError = (name: string) => {
    const message = fieldErrors[name]?.[0];
    return message ? <p id={`${name}-error`} className="mt-2 text-sm text-destructive">{message}</p> : null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => previous[name] ? { ...previous, [name]: undefined } : previous);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const field = result.error.issues[0]?.path[0];
      firstInvalid.current = typeof field === "string" ? field : null;
      setFieldErrors(result.error.flatten().fieldErrors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. I'll be in touch within 24-48 hours."
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
        referral: ""
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again or email admin@ladestack.in.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_CONFIG.siteUrl}/contact#webpage`,
        "url": `${SITE_CONFIG.siteUrl}/contact`,
        "name": `Contact & Inquiries | ${SITE_CONFIG.name}`,
        "description": "Contact Girish Balaso Lade for UI/UX design, full-stack engineering, and project consultation.",
        "mainEntity": {
          "@type": "Person",
          "name": SITE_CONFIG.name,
          "email": SITE_CONFIG.email,
          "url": SITE_CONFIG.siteUrl,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN",
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": SITE_CONFIG.email,
            "contactType": "general inquiries",
            "availableLanguage": ["English", "Marathi", "Hindi"],
          },
        },
      },
      createBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
    ],
  };

  return (
    <Layout>
      <SEO
        title="Contact & Investment Estimate | Girish Lade"
        description="Reach out to Girish Balaso Lade in Pune, India for UI/UX design, frontend engineering, and full-stack software development. Calculate project investment or send an inquiry."
        canonical="/contact"
        schema={contactPageSchema}
      />
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="eyebrow mb-6">Get an Estimate</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-ink mb-8">Let's build
your project.</h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl text-ink-light">
                Use the estimator below to get a personalized investment range, 
                then fill out the form to start the conversation.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Investment Estimator */}
      <InvestmentEstimator />

      {/* Contact Form */}
      <section id="contact-form" className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="eyebrow block mb-3">
                      Name <span className="text-ink-muted">*</span>
                    </label>
                    <input type="text" id="name" name="name" required maxLength={100} value={formData.name} onChange={handleChange} className="input-editorial" placeholder="Your name" {...errorAttributes("name")} />
                    {renderError("name")}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="eyebrow block mb-3">
                      Email <span className="text-ink-muted">*</span>
                    </label>
                    <input type="email" id="email" name="email" required maxLength={255} value={formData.email} onChange={handleChange} className="input-editorial" placeholder="your@email.com" {...errorAttributes("email")} />
                    {renderError("email")}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="eyebrow block mb-3">
                      Company / Organization
                    </label>
                    <input type="text" id="company" name="company" maxLength={150} value={formData.company} onChange={handleChange} className="input-editorial" placeholder="Your company" {...errorAttributes("company")} />
                    {renderError("company")}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="eyebrow block mb-3">
                      Project Type
                    </label>
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="input-editorial bg-transparent cursor-pointer" {...errorAttributes("projectType")}>
                      <option value="">Select a project type</option>
                      {projectTypes.map(type => <option key={type} value={type}>
                          {type}
                        </option>)}
                    </select>
                    {renderError("projectType")}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="eyebrow block mb-3">
                      Budget Range
                    </label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="input-editorial bg-transparent cursor-pointer" {...errorAttributes("budget")}>
                      <option value="">Select a budget range</option>
                      {budgetRanges.map(range => <option key={range} value={range}>
                          {range}
                        </option>)}
                    </select>
                    {renderError("budget")}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="eyebrow block mb-3">
                      Project Details <span className="text-ink-muted">*</span>
                    </label>
                    <textarea id="message" name="message" required maxLength={2000} rows={6} value={formData.message} onChange={handleChange} className="input-editorial resize-none" placeholder="Tell me about your project, goals, and timeline..." {...errorAttributes("message")} />
                    {renderError("message")}
                  </div>

                  {/* Referral */}
                  <div>
                    <label htmlFor="referral" className="eyebrow block mb-3">
                      How did you hear about me?
                    </label>
                    <select id="referral" name="referral" value={formData.referral} onChange={handleChange} className="input-editorial bg-transparent cursor-pointer" {...errorAttributes("referral")}>
                      <option value="">Select an option</option>
                      {referralSources.map(source => <option key={source} value={source}>
                          {source}
                        </option>)}
                    </select>
                    {renderError("referral")}
                  </div>

                  {/* Submit */}
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={200}>
                <div className="lg:sticky lg:top-32 space-y-10">
                  <div>
                    <p className="eyebrow mb-3">Email</p>
                    <a href="mailto:admin@ladestack.in" className="text-ink hover:opacity-70 transition-opacity duration-300">
                      admin@ladestack.in
                    </a>
                  </div>

                  <div>
                    <p className="eyebrow mb-3">Location</p>
                    <p className="text-ink">Pune, Maharashtra, India</p>
                  </div>

                  <div>
                    <p className="eyebrow mb-3">Social</p>
                    <div className="space-y-2">
                      <a href="https://github.com/girishlade111" target="_blank" rel="noopener noreferrer" className="block text-ink hover:opacity-70 transition-opacity duration-300">
                        GitHub
                      </a>
                      <a href="https://linkedin.com/in/girish-lade/" target="_blank" rel="noopener noreferrer" className="block text-ink hover:opacity-70 transition-opacity duration-300">
                        LinkedIn
                      </a>
                      <a href="https://instagram.com/girish_lade_/" target="_blank" rel="noopener noreferrer" className="block text-ink hover:opacity-70 transition-opacity duration-300">
                        Instagram
                      </a>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-divider">
                    <p className="text-sm text-ink-muted">
                      I typically respond within 24-48 hours. For urgent inquiries, 
                      please email directly.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="eyebrow mb-4">Prefer email?</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light">
                You can also reach me directly at{" "}
                <a href="mailto:admin@ladestack.in" className="text-ink underline underline-offset-4 hover:opacity-70 transition-opacity duration-300">
                  admin@ladestack.in
                </a>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
