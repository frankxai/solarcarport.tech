export type ProjectKind = "carport" | "terrace" | "both";
export type PurchaseStatus = "open" | "quoted" | "ordered" | "delivered";
export type EvidenceStatus =
  | "blocked"
  | "open"
  | "provisional"
  | "verified"
  | "not applicable";

export const gateItems = [
  {
    id: "brief",
    title: "Brief & Eigentum",
    detail:
      "Eigentümer, Nutzung, Budget, Termin und Erfolgskriterien festgelegt.",
  },
  {
    id: "planning",
    title: "Baurecht & Grenzen",
    detail:
      "Bauaufsicht, Bebauungsplan, Abstände, Baulasten und Nachbarn geklärt.",
  },
  {
    id: "site",
    title: "Vermessung & Baugrund",
    detail: "Grenzen, Höhen, Leitungen, Boden und Wasserführung geklärt.",
  },
  {
    id: "parking",
    title: "Parken & Wege",
    detail:
      "Stellplätze, Zufahrt, Durchfahrtshöhe, Aufprall- und Fußgängerschutz geprüft.",
  },
  {
    id: "structure",
    title: "Tragwerk & Fundamente",
    detail:
      "Standortbezogene Lasten, Gründung und Montagezustände fachlich geprüft.",
  },
  {
    id: "overhead",
    title: "PV-Dach über Menschen",
    detail:
      "Exakte Module, Überkopf-Eignung, Befestigung und Wasser-/Brandschutz geprüft.",
  },
  {
    id: "electrical",
    title: "PV, Elektro & Netz",
    detail: "Ertrag, Schatten, Schutzkonzept, Fachbetrieb und Netzweg geklärt.",
  },
  {
    id: "ev",
    title: "EV & Speicher",
    detail:
      "Ladebedarf, Netzkapazität und Speicheroption geprüft oder begründet ausgeschlossen.",
  },
  {
    id: "fire",
    title: "Brandschutz & Betrieb",
    detail:
      "Zugang, Trennung, Kennzeichnung, Wartung und Notfallverantwortung geklärt.",
  },
  {
    id: "commercial",
    title: "Beschaffung & Übergabe",
    detail:
      "Freigegebene Stückliste, Schnittstellen, Garantien, Abnahme und Betrieb geklärt.",
  },
] as const;

export const documentItems = [
  {
    id: "survey",
    title: "Bestandsaufnahme & Maße",
    detail:
      "Fotos, Lage, Zufahrt, Höhen, Grenzen und Verschattung vor Ort aufnehmen.",
    source: null,
  },
  {
    id: "authority",
    title: "Baurechtliche Einordnung",
    detail:
      "Vor Bestellung mit der Bauaufsicht Goslar klären; Verfahrensfreiheit ersetzt keine anderen Anforderungen.",
    source:
      "https://www.landkreis-goslar.de/Wir-f%C3%BCr-Sie/Verwaltung/Interaktive-Verwaltung/Bauen-und-Umwelt/Bauen/",
  },
  {
    id: "structure",
    title: "Standortbezogene Statik",
    detail:
      "Tragwerk, Gründung, Schnee- und Windlast durch qualifizierte Fachplanung nachweisen lassen.",
    source: null,
  },
  {
    id: "overhead",
    title: "PV-Überkopf-Eignung",
    detail:
      "Zulassung oder zulässige Bauart für das exakte Modul und Montagesystem über Personen prüfen.",
    source:
      "https://www.dibt.de/de/bauprodukte/informationsportal-bauprodukte-und-bauarten/produktgruppen/bauprodukte-detail/bauprodukt/ueberkopfverglasungen",
  },
  {
    id: "roof",
    title: "Dach- & Entwässerungsdetail",
    detail:
      "Gefälle, Dichtheit, Ablauf, Wandanschluss und gegebenenfalls Überkopfverglasung prüfen.",
    source: null,
  },
  {
    id: "electrical",
    title: "Elektroplanung & Netzanschluss",
    detail:
      "Einlinienschema, Wechselrichter, Schutzkonzept und Anmeldung mit Elektrofachbetrieb abstimmen.",
    source:
      "https://www.vde.com/de/fnn/themen/tar/tar-niederspannung/erzeugungsanlagen-am-niederspannungsnetz-vde-ar-n-4105",
  },
  {
    id: "fire",
    title: "Brandschutz, Zugang & Sicherheit",
    detail:
      "Feuerwehrzugang, Trennstellen, Beschilderung, Wartungszugang und Notfallplan klären.",
    source: null,
  },
  {
    id: "components",
    title: "Herstellerunterlagen & Freigaben",
    detail:
      "Datenblätter, Montageanleitungen und Eignung der konkreten Module und Befestigungen sammeln.",
    source: null,
  },
  {
    id: "commissioning",
    title: "Abnahme & Registrierung",
    detail:
      "Messprotokoll, Inbetriebnahme und Marktstammdatenregister dokumentieren.",
    source:
      "https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/Solaranlagen/start.html",
  },
] as const;

export const supplyItems = [
  {
    id: "frame",
    title: "Tragwerk & Fundamente",
    detail: "Angebot erst nach Statik und Gründungsplanung freigeben.",
  },
  {
    id: "modules",
    title: "PV-Module & Dachsystem",
    detail:
      "Maße, Lasten, Brandschutz, Lichtdurchlass und Montagefreigabe vergleichen.",
  },
  {
    id: "drainage",
    title: "Entwässerung & Anschlüsse",
    detail: "Rinne, Fallrohr, Wandanschluss und Wasserführung spezifizieren.",
  },
  {
    id: "electrics",
    title: "Wechselrichter & Schutztechnik",
    detail:
      "Auslegung und konkrete Stückliste vom Elektrofachbetrieb bestätigen lassen.",
  },
  {
    id: "optional",
    title: "Optionen: Wallbox, Speicher, Licht",
    detail:
      "Nur aufnehmen, wenn Lastprofil und Elektroplanung sie rechtfertigen.",
  },
] as const;

export const buildItems = [
  {
    id: "site",
    title: "Standort freigeben",
    detail: "Vermessung, Grenzabstände, Leitungen und Baufeld prüfen.",
  },
  {
    id: "approval",
    title: "Planung freigeben",
    detail: "Baurecht, Statik, Fundamente und Elektroplanung liegen vor.",
  },
  {
    id: "delivery",
    title: "Lieferung prüfen",
    detail: "Stückliste, Schäden, Seriennummern und Unterlagen abgleichen.",
  },
  {
    id: "structure",
    title: "Fundamente & Tragwerk",
    detail: "Ausführung und Zwischenabnahme fotografisch dokumentieren.",
  },
  {
    id: "roof",
    title: "Dach & Wasserführung",
    detail: "Montage, Gefälle, Dichtheit und Ablauf prüfen.",
  },
  {
    id: "electrics",
    title: "Elektro & Inbetriebnahme",
    detail: "Nur durch Fachbetrieb; Prüf- und Übergabeprotokolle sichern.",
  },
  {
    id: "handover",
    title: "Übergabe & Betrieb",
    detail: "Garantien, Wartung, Registrierung und Monitoring übergeben.",
  },
] as const;

export type DocumentId = (typeof documentItems)[number]["id"];
export type SupplyId = (typeof supplyItems)[number]["id"];
export type BuildId = (typeof buildItems)[number]["id"];
export type GateId = (typeof gateItems)[number]["id"];

export interface GateEvidence {
  status: EvidenceStatus;
  evidence: string;
  owner: string;
}

export interface StudioProject {
  title: string;
  postcode: string;
  kind: ProjectKind;
  carportWidthM: number;
  carportDepthM: number;
  terraceWidthM: number;
  terraceDepthM: number;
  orientation: string;
  material: string;
  siteNotes: string;
  goals: string;
  sitePhotoName: string;
  resultPhotoName: string;
  documents: Record<DocumentId, boolean>;
  gates: Record<GateId, GateEvidence>;
  supplies: Record<SupplyId, PurchaseStatus>;
  build: Record<BuildId, boolean>;
  buildNotes: Record<BuildId, string>;
  actualKwp: string;
  actualAnnualKwh: string;
  resultNotes: string;
  updatedAt: string;
}

export const initialProject: StudioProject = {
  title: "Mein Solarprojekt in Seesen",
  postcode: "38723",
  kind: "both",
  carportWidthM: 6,
  carportDepthM: 5.5,
  terraceWidthM: 5,
  terraceDepthM: 3,
  orientation: "Noch offen",
  material: "Anthrazitfarbenes Aluminium",
  siteNotes: "",
  goals:
    "Zwei Stellplätze, wettergeschützte Terrasse und sinnvoll integrierte Photovoltaik.",
  sitePhotoName: "",
  resultPhotoName: "",
  documents: {
    survey: false,
    authority: false,
    structure: false,
    overhead: false,
    roof: false,
    electrical: false,
    fire: false,
    components: false,
    commissioning: false,
  },
  gates: {
    brief: { status: "open", evidence: "", owner: "" },
    planning: { status: "open", evidence: "", owner: "" },
    site: { status: "open", evidence: "", owner: "" },
    parking: { status: "open", evidence: "", owner: "" },
    structure: { status: "open", evidence: "", owner: "" },
    overhead: { status: "open", evidence: "", owner: "" },
    electrical: { status: "open", evidence: "", owner: "" },
    ev: { status: "open", evidence: "", owner: "" },
    fire: { status: "open", evidence: "", owner: "" },
    commercial: { status: "open", evidence: "", owner: "" },
  },
  supplies: {
    frame: "open",
    modules: "open",
    drainage: "open",
    electrics: "open",
    optional: "open",
  },
  build: {
    site: false,
    approval: false,
    delivery: false,
    structure: false,
    roof: false,
    electrics: false,
    handover: false,
  },
  buildNotes: {
    site: "",
    approval: "",
    delivery: "",
    structure: "",
    roof: "",
    electrics: "",
    handover: "",
  },
  actualKwp: "",
  actualAnnualKwh: "",
  resultNotes: "",
  updatedAt: "",
};

export function projectArea(project: StudioProject) {
  const carport =
    project.kind === "terrace"
      ? 0
      : project.carportWidthM * project.carportDepthM;
  const terrace =
    project.kind === "carport"
      ? 0
      : project.terraceWidthM * project.terraceDepthM;
  return { carport, terrace, total: carport + terrace };
}

export function visualBrief(project: StudioProject, hasPhoto: boolean) {
  const subjects = [
    project.kind !== "terrace"
      ? `two-car solar carport, about ${project.carportWidthM} × ${project.carportDepthM} m`
      : "",
    project.kind !== "carport"
      ? `full solar-covered terrace, about ${project.terraceWidthM} × ${project.terraceDepthM} m`
      : "",
  ]
    .filter(Boolean)
    .join(" and ");

  return [
    "Create a photorealistic architectural concept for a residential project in Germany.",
    hasPhoto
      ? "Image 1 is the actual site photo. Edit that photo, preserve the house, boundaries, driveway, garden, camera viewpoint and existing context."
      : "No site photo is supplied. Create a clearly illustrative reference scene, not a claim about the real property.",
    `Show the entire ${subjects} in one wide, eye-level view, including ground contact, roof, posts, drainage and the connection to the existing house.`,
    `Location: postcode ${project.postcode || "not supplied"}. Orientation: ${project.orientation}. Material direction: ${project.material}.`,
    `Owner goals: ${project.goals || "not supplied"}. Site constraints: ${project.siteNotes || "not supplied"}.`,
    "Use buildable proportions and natural northern German daylight. No people, text, logos, watermark, invented property features, floating structures or misleading technical annotations.",
    "Make a second view from the driveway and a third view from the terrace after the first concept is approved. Label every output AI concept, not construction documentation.",
  ].join("\n");
}

export function requestForQuote(project: StudioProject) {
  const area = projectArea(project);
  return [
    `Anfrage: ${project.title}`,
    `Standort: PLZ ${project.postcode || "offen"} · Vorhaben: ${project.kind === "both" ? "Doppelcarport + PV-Terrasse" : project.kind === "carport" ? "Doppelcarport" : "PV-Terrasse"}`,
    area.carport
      ? `Carport: ${project.carportWidthM} × ${project.carportDepthM} m (${area.carport.toFixed(1)} m² Grundriss)`
      : "",
    area.terrace
      ? `Terrasse: ${project.terraceWidthM} × ${project.terraceDepthM} m (${area.terrace.toFixed(1)} m² Grundriss)`
      : "",
    `Ausrichtung: ${project.orientation}; Materialwunsch: ${project.material}`,
    `Ziele: ${project.goals}`,
    `Standorthinweise: ${project.siteNotes || "noch aufzunehmen"}`,
    "Bitte getrennt ausweisen: Tragwerk/Fundamente, PV-Dach/Module, Entwässerung, Elektroplanung/Anschluss, Montage, Lieferzeit, Garantien und erforderliche Nachweise.",
    "Bitte keine endgültige Dimensionierung oder Bestellung ohne Standortvermessung, Statik, baurechtliche Klärung und Elektroplanung.",
  ]
    .filter(Boolean)
    .join("\n");
}
