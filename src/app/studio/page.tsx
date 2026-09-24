import type { Metadata } from "next";
import { ProjectStudio } from "@/components/studio/ProjectStudio";
import "@/components/studio/studio.css";

export const metadata: Metadata = {
  title: "Projektstudio | SolarCarport.tech",
  description:
    "Solarcarport und PV-Terrasse visualisieren, Unterlagen ordnen, Angebote vergleichen und den Bau dokumentieren. Konzeptplanung, keine Ausführungsplanung.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <ProjectStudio />;
}
