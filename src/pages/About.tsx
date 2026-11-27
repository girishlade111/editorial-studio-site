import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { SITE_CONFIG, createBreadcrumbSchema } from "@/lib/seo-config";

import portraitMain from "@/assets/portrait-main.jpg";
import workspace from "@/assets/workspace.jpg";

const values = [
  {
    number: "01",
    title: "Utility before hype",
    description: "A product should solve a real problem and make its value obvious through use, focusing on function over trend.",
  },
  {
    number: "02",
    title: "Privacy by architecture",
    description: "Prefer local execution, data minimization, and transparent handling of files so user data remains strictly on-device.",
  },
  {
    number: "03",
    title: "Accessible by default",
    description: "Make important workflows approachable for developers, students, and creators without artificial paywalls or barriers.",
  },
];

const recognition = [
  { name: "LadeStack Platform", type: "Developer Ecosystem & Hub", year: "2024" },
  { name: "GB Coder", type: "Browser-Native IDE & Sandbox", year: "2024" },
  { name: "LS PDF & MD2PDF", type: "Privacy-First Document Suite", year: "2024" },
  { name: "Open Source Utilities", type: "GitHub Tooling & Web Apps", year: "2024" },
];

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_CONFIG.siteUrl}/about#webpage`,
        "url": `${SITE_CONFIG.siteUrl}/about`,
        "name": `About ${SITE_CONFIG.name} | Background & Philosophy`,
        "description": "Learn about Girish Balaso Lade, full-stack developer and UI/UX designer. Background, software philosophy, credentials, and LadeStack ecosystem.",
        "breadcrumb": {
          "@id": `${SITE_CONFIG.siteUrl}/about#breadcrumb`,
        },
        "mainEntity": {
          "@type": "Person",
          "name": SITE_CONFIG.name,
          "jobTitle": "Full-Stack Developer & UI/UX Designer",
          "url": SITE_CONFIG.siteUrl,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN",
          },
        },
      },
      createBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]),
    ],
  };

  return (
    <Layout>
      <SEO
        title="About Girish Lade | Background & Engineering Philosophy"
        description="Learn about Girish Balaso Lade, a full-stack engineer and UI/UX designer in Pune, India building LadeStack, privacy-first software, and modern web applications."
        canonical="/about"
        ogType="profile"
        schema={aboutSchema}
      />
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="eyebrow mb-6">About</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-ink">
                  Engineer by training. Product builder by choice.
                </h1>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={200}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={portraitMain}
                    alt="Girish Lade"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xl md:text-2xl text-ink leading-relaxed mb-8 first-letter:text-8xl md:first-letter:text-9xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-0 first-letter:leading-[0.75]">
                I'm Girish Balaso Lade, an independent developer and product designer based in Pune, India. 
                My background began with Mechanical Engineering, while my professional focus led me into web engineering, 
                interaction design, and building browser-native utilities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-8">
                I founded LadeStack as an independent ecosystem built around a straightforward belief: everyday software 
                should be useful before it is complicated. A developer should be able to open an IDE without burdensome setup; 
                a student should turn notes into a clean PDF; and anyone handling personal documents should not be forced to 
                upload them to remote servers.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-ink-light mb-8">
                My engineering training shaped how I approach digital products: identify real constraints, understand the underlying 
                system, simplify the user flow, and iterate until the tool is dependable. I value responsive layouts, clean typography, 
                and accessible controls as much as robust client-side execution.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-ink-light">
                Outside of software development, you'll find me exploring technical architecture, systems design, and studying 
                emerging technologies that help builders create more freely.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <h2 className="eyebrow mb-16 md:mb-20">Approach</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.number} delay={index * 100}>
                <div>
                  <span className="text-sm text-ink-muted tracking-wide">{value.number}</span>
                  <h3 className="font-serif text-2xl text-ink mt-4 mb-4">{value.title}</h3>
                  <p className="text-ink-light">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="eyebrow mb-4">Milestones</p>
                <h2 className="text-ink">Key Highlights</h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="divide-y divide-divider">
                {recognition.map((item, index) => (
                  <ScrollReveal key={item.name} delay={index * 50}>
                    <div className="py-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-ink">{item.name}</h3>
                        <p className="text-sm text-ink-muted">{item.type}</p>
                      </div>
                      <span className="text-sm text-ink-muted">{item.year}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={workspace}
                    alt="Workspace and development tools"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ScrollReveal delay={100}>
                <h2 className="eyebrow mb-4">Beyond Work</h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-ink-light">
                  Design and engineering are connected disciplines. Outside of coding and 
                  software architecture, I explore physical design, system thinking, and 
                  the quiet details that make digital tools intuitive and lasting. I believe 
                  the best software comes from understanding how people actually work.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-darker">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-ink mb-6">
                Let's build something useful.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-10 max-w-xl mx-auto">
                Have an interesting project, collaboration idea, or technical question? I'm always open to connecting.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
