import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SEO } from "@/components/shared/SEO";
import { SITE_CONFIG, createBreadcrumbSchema } from "@/lib/seo-config";
import { projects } from "@/data/projects";

import northlightHero from "@/assets/projects/northlight-hero.jpg";
import meridianHero from "@/assets/projects/meridian-hero.jpg";
import emberHero from "@/assets/projects/ember-hero.jpg";
import stillwaterHero from "@/assets/projects/stillwater-hero.jpg";
import bharatLandHero from "@/assets/projects/bharat-land-hero.jpg";
import swiftResumeHero from "@/assets/projects/swift-resume-hero.jpg";
import lsImageCompressorHero from "@/assets/projects/ls-image-compressor-hero.jpg";
import gamehubHero from "@/assets/projects/gamehub-hero.jpg";

const projectImages: Record<string, string[]> = {
  "ladestack": [northlightHero, meridianHero, emberHero],
  "gb-coder": [meridianHero, stillwaterHero, northlightHero],
  "ls-pdf": [emberHero, northlightHero, stillwaterHero],
  "md2pdf": [stillwaterHero, emberHero, meridianHero],
  "bharat-land-converter": [bharatLandHero, stillwaterHero, emberHero],
  "swift-resume": [swiftResumeHero, northlightHero, stillwaterHero],
  "ls-image-compressor": [lsImageCompressorHero, meridianHero, northlightHero],
  "gamehub": [gamehubHero, northlightHero, emberHero],
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];
  
  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const [heroImage = northlightHero, ...galleryImages] = [...new Set(projectImages[project.slug] ?? [])];

  const projectSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_CONFIG.siteUrl}/work/${project.slug}#application`,
        "name": project.title,
        "description": project.overview,
        "applicationCategory": project.category,
        "operatingSystem": "Any modern web browser",
        "author": {
          "@type": "Person",
          "name": SITE_CONFIG.name,
          "url": SITE_CONFIG.siteUrl,
        },
        "publisher": {
          "@type": "Organization",
          "name": "LadeStack",
          "url": SITE_CONFIG.siteUrl,
        },
        "datePublished": `${project.year}-01-01`,
      },
      createBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: project.title, url: `/work/${project.slug}` },
      ]),
    ],
  };

  return (
    <Layout>
      <SEO
        title={`${project.title} - ${project.category} Case Study`}
        description={`${project.title}: ${project.overview} Engineered with ${project.services.join(", ")}.`}
        canonical={`/work/${project.slug}`}
        ogType="article"
        keywords={[
          project.title,
          project.category,
          project.industry,
          ...project.services,
          "Case Study",
          "Girish Lade",
        ]}
        schema={projectSchema}
      />
      {/* Hero Image */}
      <section className="pt-24 md:pt-32">
        <div className="w-full">
          <ScrollReveal>
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={heroImage}
                alt={`${project.title} - ${project.category} hero showcase`}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Info */}
      <section className="section-padding">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="eyebrow mb-4">Overview</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="font-serif text-4xl md:text-5xl text-ink mb-8">
                  {project.title}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-xl text-ink-light leading-relaxed mb-8">
                  {project.overview}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow mb-2">The Challenge</p>
                    <p className="text-ink-light">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">The Solution</p>
                    <p className="text-ink-light">{project.solution}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={200}>
                <div className="lg:sticky lg:top-32 space-y-8">
                  <div>
                    <p className="eyebrow mb-2">Client</p>
                    <p className="text-ink">{project.client}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Industry</p>
                    <p className="text-ink">{project.industry}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Services</p>
                    <ul className="space-y-1">
                      {project.services.map((service) => (
                        <li key={service} className="text-ink">{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Year</p>
                    <p className="text-ink">{project.year}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <section className="pb-16 md:pb-24" aria-label="Project gallery">
          <div className="container-editorial px-6 md:px-12 lg:px-20">
            <div className={galleryImages.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" : undefined}>
              {galleryImages.map((image, index) => (
                <ScrollReveal key={image} delay={index * 100}>
                  <div className={galleryImages.length > 1 ? "aspect-[4/5] overflow-hidden" : "aspect-[16/10] overflow-hidden"}>
                    <img
                      src={image}
                      alt={`${project.title} - Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project */}
      <section className="border-t border-divider">
        <Link 
          to={`/work/${nextProject.slug}`}
          className="group block"
        >
          <div className="container-editorial px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow mb-4">Next Project</p>
                <h2 className="font-serif text-3xl md:text-4xl text-ink group-hover:opacity-70 transition-opacity duration-300">
                  {nextProject.title}
                </h2>
              </div>
              <ArrowRight 
                size={32} 
                strokeWidth={1} 
                className="text-ink transition-transform duration-300 group-hover:translate-x-2" 
              />
            </div>
          </div>
        </Link>
      </section>

      {/* Back Link */}
      <section className="bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20 py-8">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to all projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}
