import Image from 'next/image';
import { ArrowRight, Camera, MapPin } from 'lucide-react';

const projects = [
  {
    src: '/media/5x3-carport-rostak-22.webp',
    alt: 'Realisiertes Doppel-Solarcarport mit bifazialem PV-Dach',
    type: 'Doppelcarport',
    detail: 'Bifaziales PV-Dach · Aluminium',
  },
  {
    src: '/media/6x2-aufdach-terrasse-anton1.webp',
    alt: 'Realisierte PV-Terrassenüberdachung an einem Wohnhaus',
    type: 'PV-Terrasse',
    detail: 'Hausanschluss · transparente Dachwirkung',
  },
  {
    src: '/media/dji-0111.webp',
    alt: 'Realisierter Solarzaun entlang eines Grundstücks',
    type: 'Solarzaun',
    detail: 'Grundstücksgrenze · modulare Felder',
  },
] as const;

export function ProjectProof() {
  return (
    <section id="projects" className="border-b border-white/10 bg-[#071019] py-16 sm:py-24 font-['Poppins']" aria-labelledby="projects-title">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="max-w-xl">
            <div className="eyebrow"><Camera className="h-4 w-4 text-amber-400" aria-hidden="true" /> Realisierte Systeme</div>
            <h2 id="projects-title" className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-5xl font-['Playfair_Display']">
              Gebauter Bestand statt <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Zukunftsversprechen.</span>
            </h2>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-7 text-slate-300 font-light">
              Diese Aufnahmen stammen aus dem bestehenden SolarCarport.tech Medienbestand. Sie zeigen realisierte Systemrichtungen der RIAL Energy GmbH in Deutschland.
            </p>
            <a href="#configurator" className="touch-target mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors">
              <span>Eigenen Standort prüfen</span> <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <ProjectCard project={projects[0]} featured />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Projektorte und Kundendaten werden aus Datenschutzgründen nicht veröffentlicht. Bilder sind keine Leistungs- oder Verfügbarkeitszusage.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }: { project: (typeof projects)[number]; featured?: boolean }) {
  return (
    <figure className={`group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0d1824] ${featured ? 'min-h-[430px] lg:min-h-[620px]' : 'min-h-[300px]'}`}>
      <Image
        src={project.src}
        alt={project.alt}
        fill
        sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw'}
        className="-z-20 object-cover object-center transition duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071019]/95 via-[#071019]/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <span className="technical-label text-amber-300">Bestehendes Projektfoto</span>
        <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">{project.type}</h3>
        <p className="mt-1 text-sm text-slate-300">{project.detail}</p>
      </figcaption>
    </figure>
  );
}
