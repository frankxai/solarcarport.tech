"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Hammer,
  ImagePlus,
  Info,
  MapPin,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
  Sun,
  UploadCloud,
} from "lucide-react";
import {
  buildItems,
  documentItems,
  gateItems,
  initialProject,
  projectArea,
  requestForQuote,
  supplyItems,
  visualBrief,
  type BuildId,
  type DocumentId,
  type EvidenceStatus,
  type GateEvidence,
  type GateId,
  type ProjectKind,
  type PurchaseStatus,
  type StudioProject,
  type SupplyId,
} from "@/lib/studio-project";

type StageId = "site" | "visual" | "docs" | "buy" | "build" | "result";
type PhotoKind = "site" | "result";

const stages: {
  id: StageId;
  title: string;
  subtitle: string;
  icon: typeof MapPin;
}[] = [
  { id: "site", title: "Standort", subtitle: "Ort & Maße", icon: MapPin },
  {
    id: "visual",
    title: "Visualisieren",
    subtitle: "Foto & Konzept",
    icon: Sparkles,
  },
  {
    id: "docs",
    title: "Dokumente",
    subtitle: "Freigaben & CAD",
    icon: FileText,
  },
  {
    id: "buy",
    title: "Beschaffen",
    subtitle: "Angebote & Teile",
    icon: PackageCheck,
  },
  { id: "build", title: "Bauen", subtitle: "Meilensteine", icon: Hammer },
  {
    id: "result",
    title: "Ergebnis",
    subtitle: "Übergabe & Betrieb",
    icon: CheckCircle2,
  },
];

const purchaseLabels: Record<PurchaseStatus, string> = {
  open: "Offen",
  quoted: "Angebot liegt vor",
  ordered: "Bestellt",
  delivered: "Geliefert",
};
const gateLabels: Record<EvidenceStatus, string> = {
  blocked: "Blockiert",
  open: "Offen",
  provisional: "Vorläufig",
  verified: "Verifiziert",
  "not applicable": "Nicht anwendbar",
};
const storageKey = "solarcarport-project-studio-v1";
const photoDbName = "solarcarport-project-studio-photos";

function openPhotoDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("Browser-Speicher nicht verfügbar"));
      return;
    }
    const request = window.indexedDB.open(photoDbName, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("photos");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function storePhoto(kind: PhotoKind, file: File) {
  const db = await openPhotoDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("photos", "readwrite");
      transaction.objectStore("photos").put(file, kind);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

async function readPhoto(kind: PhotoKind): Promise<Blob | null> {
  const db = await openPhotoDb();
  try {
    return await new Promise<Blob | null>((resolve, reject) => {
      const request = db
        .transaction("photos", "readonly")
        .objectStore("photos")
        .get(kind);
      request.onsuccess = () =>
        resolve((request.result as Blob | undefined) ?? null);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

function downloadFile(filename: string, contents: string, mime: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: mime }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function safeFilename(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9äöüß-]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 56) || "solarprojekt"
  );
}

export function ProjectStudio() {
  const [project, setProject] = useState<StudioProject>(initialProject);
  const [stage, setStage] = useState<StageId>("site");
  const [hydrated, setHydrated] = useState(false);
  const [sitePhotoUrl, setSitePhotoUrl] = useState<string | null>(null);
  const [resultPhotoUrl, setResultPhotoUrl] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const planRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<StudioProject>;
        setProject({
          ...initialProject,
          ...saved,
          documents: { ...initialProject.documents, ...saved.documents },
          gates: Object.fromEntries(
            gateItems.map((item) => [
              item.id,
              { ...initialProject.gates[item.id], ...saved.gates?.[item.id] },
            ]),
          ) as StudioProject["gates"],
          supplies: { ...initialProject.supplies, ...saved.supplies },
          build: { ...initialProject.build, ...saved.build },
          buildNotes: { ...initialProject.buildNotes, ...saved.buildNotes },
        });
      }
    } catch {
      setNotice("Gespeicherte Projektdaten konnten nicht gelesen werden.");
    }
    setHydrated(true);
    let active = true;
    void Promise.all([readPhoto("site"), readPhoto("result")])
      .then(([sitePhoto, resultPhoto]) => {
        if (!active) return;
        if (sitePhoto) setSitePhotoUrl(URL.createObjectURL(sitePhoto));
        if (resultPhoto) setResultPhotoUrl(URL.createObjectURL(resultPhoto));
      })
      .catch(() => {
        /* private browsing can disable IndexedDB */
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(project));
    } catch {
      setNotice(
        "Lokaler Speicher ist voll. Bitte das Projekt als JSON sichern.",
      );
    }
  }, [hydrated, project]);

  useEffect(
    () => () => {
      if (sitePhotoUrl) URL.revokeObjectURL(sitePhotoUrl);
    },
    [sitePhotoUrl],
  );
  useEffect(
    () => () => {
      if (resultPhotoUrl) URL.revokeObjectURL(resultPhotoUrl);
    },
    [resultPhotoUrl],
  );

  function updateField<K extends keyof StudioProject>(
    key: K,
    value: StudioProject[K],
  ) {
    setProject((current) => ({
      ...current,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  }

  function updateDimension(
    key: "carportWidthM" | "carportDepthM" | "terraceWidthM" | "terraceDepthM",
    value: string,
  ) {
    const numeric = Number(value);
    updateField(
      key,
      Number.isFinite(numeric) ? Math.max(0, Math.min(50, numeric)) : 0,
    );
  }

  function toggleDocument(id: DocumentId) {
    setProject((current) => ({
      ...current,
      documents: { ...current.documents, [id]: !current.documents[id] },
      updatedAt: new Date().toISOString(),
    }));
  }

  function updateGate(id: GateId, patch: Partial<GateEvidence>) {
    const next = { ...project.gates[id], ...patch };
    if (
      next.status === "verified" &&
      (!next.evidence.trim() || !next.owner.trim())
    ) {
      setNotice(
        "Für „verifiziert“ sind ein konkreter Nachweis und die verantwortliche prüfende Stelle nötig.",
      );
      return;
    }
    if (next.status === "not applicable" && !next.evidence.trim()) {
      setNotice(
        "Für „nicht anwendbar“ bitte eine Begründung als Nachweis eintragen.",
      );
      return;
    }
    setProject((current) => ({
      ...current,
      gates: { ...current.gates, [id]: next },
      updatedAt: new Date().toISOString(),
    }));
  }

  function toggleBuild(id: BuildId) {
    setProject((current) => ({
      ...current,
      build: { ...current.build, [id]: !current.build[id] },
      updatedAt: new Date().toISOString(),
    }));
  }

  function setPurchaseStatus(id: SupplyId, value: PurchaseStatus) {
    setProject((current) => ({
      ...current,
      supplies: { ...current.supplies, [id]: value },
      updatedAt: new Date().toISOString(),
    }));
  }

  function setBuildNote(id: BuildId, value: string) {
    setProject((current) => ({
      ...current,
      buildNotes: { ...current.buildNotes, [id]: value },
      updatedAt: new Date().toISOString(),
    }));
  }

  async function handlePhoto(kind: PhotoKind, file?: File) {
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setNotice("Bitte JPG, PNG oder WebP bis 10 MB wählen.");
      return;
    }
    const url = URL.createObjectURL(file);
    if (kind === "site") {
      setSitePhotoUrl(url);
      updateField("sitePhotoName", file.name);
    } else {
      setResultPhotoUrl(url);
      updateField("resultPhotoName", file.name);
    }
    try {
      await storePhoto(kind, file);
      setNotice("Foto lokal in diesem Browser gespeichert.");
    } catch {
      setNotice(
        "Foto nur für diese Sitzung sichtbar. Browser-Speicher nicht verfügbar.",
      );
    }
  }

  async function copyText(contents: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(contents);
      setNotice(successMessage);
    } catch {
      setNotice(
        "Kopieren nicht verfügbar. Den Text unten markieren oder herunterladen.",
      );
    }
  }

  function exportProject() {
    downloadFile(
      `${safeFilename(project.title)}-projektstand.json`,
      JSON.stringify(
        {
          schema: "solarcarport-project-studio/v1",
          exportedAt: new Date().toISOString(),
          note: "Fotos sind nicht in dieser JSON-Datei enthalten. Originalbilder separat sichern.",
          project,
        },
        null,
        2,
      ),
      "application/json",
    );
    setNotice(
      "Projektstand als JSON gespeichert. Fotos bitte separat sichern.",
    );
  }

  function exportSketch() {
    if (!planRef.current) return;
    const svg = new XMLSerializer().serializeToString(planRef.current);
    downloadFile(
      `${safeFilename(project.title)}-konzeptskizze.svg`,
      svg,
      "image/svg+xml",
    );
    setNotice(
      "Schematische Skizze gespeichert — keine CAD- oder Ausführungszeichnung.",
    );
  }

  const area = projectArea(project);
  const docsDone = documentItems.filter(
    (item) => project.documents[item.id],
  ).length;
  const gatesVerified = gateItems.filter(
    (item) => project.gates[item.id].status === "verified",
  ).length;
  const purchaseGateReady = (
    [
      "planning",
      "site",
      "structure",
      "overhead",
      "electrical",
      "fire",
    ] as GateId[]
  ).every((id) => project.gates[id].status === "verified");
  const buildDone = buildItems.filter((item) => project.build[item.id]).length;
  const quoted = supplyItems.filter(
    (item) => project.supplies[item.id] !== "open",
  ).length;
  const brief = visualBrief(project, Boolean(sitePhotoUrl));
  const stageIndex = stages.findIndex((item) => item.id === stage);
  const nextStage = stages[stageIndex + 1];
  const projectType =
    project.kind === "both"
      ? "Doppelcarport + PV-Terrasse"
      : project.kind === "carport"
        ? "Doppelcarport"
        : "PV-Terrasse";
  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollToWorkspace = () =>
    document
      .getElementById("studio-workspace")
      ?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });

  return (
    <main className="studio">
      <div className="studio-topbar studio-container">
        <a
          className="studio-brand"
          href="/"
          aria-label="Zur SolarCarport.tech Startseite"
        >
          <Sun size={21} aria-hidden="true" />{" "}
          <span>
            solarcarport<span className="studio-brand-accent">.tech</span>
          </span>
        </a>
        <span className="studio-topbar-label">
          Projektstudio <span aria-hidden="true">/</span> PLZ{" "}
          {project.postcode || "offen"}
        </span>
        <a className="studio-back" href="/">
          <ArrowLeft size={16} aria-hidden="true" /> Zur Website
        </a>
      </div>

      <section className="studio-hero" aria-labelledby="studio-title">
        <div className="studio-hero-image" aria-hidden="true" />
        <div className="studio-hero-shade" aria-hidden="true" />
        <div className="studio-container studio-hero-content">
          <div className="studio-eyebrow">
            <span className="studio-eyebrow-dot" /> Ein Projekt. Von der Idee
            bis zum Betrieb.
          </div>
          <h1 id="studio-title">
            Ihr Solarprojekt,
            <br />
            <em>endlich als Ganzes.</em>
          </h1>
          <p>
            Carport und Terrasse im echten Grundstückskontext denken. Ansichten
            entwickeln, Unterlagen klären, Angebote vergleichen und jeden
            Bauschritt festhalten.
          </p>
          <div className="studio-hero-actions">
            <button
              type="button"
              className="studio-button studio-button-primary"
              onClick={() => {
                setStage("site");
                scrollToWorkspace();
              }}
            >
              Projekt bearbeiten <ArrowRight size={17} aria-hidden="true" />
            </button>
            <span>Private Vorplanung · keine Ausführungsplanung</span>
          </div>
        </div>
        <span className="studio-image-credit">
          KI-generiertes Beispielkonzept · kein Foto Ihres Grundstücks
        </span>
      </section>

      <div id="studio-workspace" className="studio-container studio-workspace">
        <div className="studio-intro-row">
          <div>
            <span className="studio-kicker">Ihr Projektpfad</span>
            <h2>Vom Standort zum Ergebnis</h2>
          </div>
          <div className="studio-local">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Entwurf und Fotos bleiben lokal in diesem Browser.</span>
          </div>
        </div>

        <nav className="studio-stages" aria-label="Projektphasen">
          {stages.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={`studio-stage ${stage === item.id ? "is-active" : ""}`}
                aria-current={stage === item.id ? "step" : undefined}
                onClick={() => setStage(item.id)}
              >
                <span className="studio-stage-icon">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>
                    {String(index + 1).padStart(2, "0")} · {item.title}
                  </strong>
                  <small>{item.subtitle}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="studio-grid">
          <section className="studio-panel" aria-labelledby="stage-title">
            {stage === "site" && (
              <>
                <PanelHeading
                  number="01"
                  label="Standort aufnehmen"
                  title="Erst verstehen. Dann entwerfen."
                  description="Die Werte sind ein bearbeitbares Seesen-Beispiel. Ersetzen Sie sie durch gemessene Daten Ihres Grundstücks."
                />
                <div
                  className="studio-choice-grid"
                  role="group"
                  aria-label="Projektumfang"
                >
                  {(
                    [
                      ["carport", "Doppelcarport", "Zwei Stellplätze"],
                      ["terrace", "PV-Terrasse", "Der Außenraum"],
                      ["both", "Beides zusammen", "Ein verbundenes Projekt"],
                    ] as const
                  ).map(([id, title, subtitle]) => (
                    <button
                      type="button"
                      key={id}
                      aria-pressed={project.kind === id}
                      className={`studio-choice ${project.kind === id ? "is-selected" : ""}`}
                      onClick={() => updateField("kind", id as ProjectKind)}
                    >
                      <span>{title}</span>
                      <small>{subtitle}</small>
                    </button>
                  ))}
                </div>
                <div className="studio-form-grid">
                  <label className="studio-field studio-field-wide">
                    Projektname
                    <input
                      value={project.title}
                      maxLength={80}
                      onChange={(event) =>
                        updateField("title", event.target.value)
                      }
                    />
                  </label>
                  <label className="studio-field">
                    Postleitzahl
                    <input
                      value={project.postcode}
                      inputMode="numeric"
                      maxLength={5}
                      onChange={(event) =>
                        updateField(
                          "postcode",
                          event.target.value.replace(/\D/g, ""),
                        )
                      }
                    />
                  </label>
                  <label className="studio-field">
                    Ausrichtung
                    <select
                      value={project.orientation}
                      onChange={(event) =>
                        updateField("orientation", event.target.value)
                      }
                    >
                      <option>Noch offen</option>
                      <option>Nord</option>
                      <option>Nordost</option>
                      <option>Ost</option>
                      <option>Südost</option>
                      <option>Süd</option>
                      <option>Südwest</option>
                      <option>West</option>
                      <option>Nordwest</option>
                    </select>
                  </label>
                  {project.kind !== "terrace" && (
                    <>
                      <label className="studio-field">
                        Carport Breite (m)
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={project.carportWidthM}
                          onChange={(event) =>
                            updateDimension("carportWidthM", event.target.value)
                          }
                        />
                      </label>
                      <label className="studio-field">
                        Carport Tiefe (m)
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={project.carportDepthM}
                          onChange={(event) =>
                            updateDimension("carportDepthM", event.target.value)
                          }
                        />
                      </label>
                    </>
                  )}
                  {project.kind !== "carport" && (
                    <>
                      <label className="studio-field">
                        Terrasse Breite (m)
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={project.terraceWidthM}
                          onChange={(event) =>
                            updateDimension("terraceWidthM", event.target.value)
                          }
                        />
                      </label>
                      <label className="studio-field">
                        Terrasse Tiefe (m)
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={project.terraceDepthM}
                          onChange={(event) =>
                            updateDimension("terraceDepthM", event.target.value)
                          }
                        />
                      </label>
                    </>
                  )}
                  <label className="studio-field studio-field-wide">
                    Materialrichtung
                    <input
                      value={project.material}
                      maxLength={100}
                      onChange={(event) =>
                        updateField("material", event.target.value)
                      }
                    />
                  </label>
                  <label className="studio-field studio-field-wide">
                    Was soll der Ort für Sie leisten?
                    <textarea
                      rows={3}
                      value={project.goals}
                      maxLength={600}
                      onChange={(event) =>
                        updateField("goals", event.target.value)
                      }
                      placeholder="Schatten, Laden, trockener Zugang, Aufenthaltsqualität …"
                    />
                  </label>
                  <label className="studio-field studio-field-wide">
                    Standortnotizen
                    <textarea
                      rows={3}
                      value={project.siteNotes}
                      maxLength={800}
                      onChange={(event) =>
                        updateField("siteNotes", event.target.value)
                      }
                      placeholder="Grenzen, Gefälle, Leitungen, Hausanschluss, Bäume, Verschattung …"
                    />
                  </label>
                </div>
                <div className="studio-callout">
                  <Info size={18} aria-hidden="true" />
                  <p>
                    <strong>{area.total.toFixed(1)} m² Grundrissfläche</strong>{" "}
                    aus Ihren Maßen. Das ist keine Modulfläche, Statik oder
                    Ertragsprognose. Vor Planung und Bestellung vor Ort
                    vermessen.
                  </p>
                </div>
              </>
            )}

            {stage === "visual" && (
              <>
                <PanelHeading
                  number="02"
                  label="Visualisieren"
                  title="Sehen, was entstehen könnte."
                  description="Ihr Standortfoto und ein illustratives Konzept werden bewusst getrennt gezeigt. Ein echtes Vorher/Nachher-Bild braucht Ihr Foto und eine geprüfte Entwurfsgeometrie."
                />
                <div className="studio-visual-grid">
                  <div className="studio-visual-card">
                    <div className="studio-visual-frame">
                      {sitePhotoUrl ? (
                        <img
                          src={sitePhotoUrl}
                          alt="Hochgeladenes Foto Ihres Projektstandorts"
                        />
                      ) : (
                        <div className="studio-photo-empty">
                          <Camera size={32} aria-hidden="true" />
                          <strong>Ihr Standort</strong>
                          <span>
                            Ein breites Foto von Einfahrt, Haus und Terrasse
                            hochladen.
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="studio-visual-caption">
                      <strong>01 · Bestandsfoto</strong>
                      <span>
                        {sitePhotoUrl
                          ? project.sitePhotoName
                          : "Noch kein Foto in diesem Browser"}
                      </span>
                    </div>
                  </div>
                  <div className="studio-visual-card">
                    <div className="studio-visual-frame">
                      <Image
                        src="/images/studio/seesen-carport-terrace-concept.png"
                        alt="KI-generiertes Beispiel eines Hauses mit Solar-Doppelcarport und PV-Terrasse"
                        width={1536}
                        height={1024}
                        sizes="(max-width: 800px) 100vw, 50vw"
                      />
                    </div>
                    <div className="studio-visual-caption">
                      <strong>02 · Beispielkonzept</strong>
                      <span>
                        KI-generiert · nicht auf Ihr Grundstück angepasst
                      </span>
                    </div>
                  </div>
                </div>
                <label className="studio-upload">
                  <UploadCloud size={19} aria-hidden="true" />
                  <span>
                    {sitePhotoUrl
                      ? "Standortfoto ersetzen"
                      : "Standortfoto hinzufügen"}
                  </span>
                  <small>
                    JPG, PNG oder WebP · bis 10 MB · lokal gespeichert
                  </small>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                      void handlePhoto("site", event.target.files?.[0])
                    }
                  />
                </label>
                {sitePhotoUrl && (
                  <a
                    className="studio-text-link"
                    href={sitePhotoUrl}
                    download={project.sitePhotoName || "standortfoto"}
                  >
                    Standortfoto separat sichern{" "}
                    <Download size={15} aria-hidden="true" />
                  </a>
                )}
                <div className="studio-subsection">
                  <span className="studio-kicker">Konzeptskizze</span>
                  <h3>Flächenbeziehung auf einen Blick</h3>
                  <p>
                    Ein schematischer Grundriss für die Abstimmung – bewusst
                    keine CAD-, Fundament- oder Montagezeichnung.
                  </p>
                </div>
                <div className="studio-plan-wrap">
                  <PlanSketch project={project} refValue={planRef} />
                </div>
                <button
                  type="button"
                  className="studio-button studio-button-secondary"
                  onClick={exportSketch}
                >
                  <Download size={16} aria-hidden="true" /> SVG-Skizze sichern
                </button>
                <div className="studio-subsection">
                  <span className="studio-kicker">
                    Bildgenerierungs-Workflow
                  </span>
                  <h3>Ein Briefing, drei Ansichten, klare Prüfung.</h3>
                  <p>
                    Das Briefing zusammen mit dem Standortfoto in ChatGPT oder
                    hier im Gespräch verwenden. Die Bild-KI verändert keine
                    Statik und ersetzt keine Bauzeichnung.
                  </p>
                </div>
                <div className="studio-callout">
                  <Info size={18} aria-hidden="true" />
                  <p>
                    <strong>Datenschutz beim Bildgenerieren:</strong> Das Foto
                    verlässt diese Website nicht. Wenn Sie es später in ChatGPT
                    oder einem anderen Bilddienst hochladen, gelten dessen
                    Datenverarbeitung und Ihre bewusste Freigabe.
                  </p>
                </div>
                <ol className="studio-sequence">
                  <li>Foto, Maße und Ziele zusammenführen</li>
                  <li>
                    Gesamtansicht, Einfahrt und Terrassenperspektive erzeugen
                  </li>
                  <li>
                    Haus, Grenzen, Stützen und Dachgeometrie gegen die Realität
                    prüfen
                  </li>
                  <li>
                    Erst nach Fachplanung als freigegebenen Entwurf behandeln
                  </li>
                </ol>
                <textarea
                  className="studio-brief"
                  readOnly
                  rows={9}
                  value={brief}
                  aria-label="Bildgenerierungs-Briefing"
                />
                <div className="studio-action-row">
                  <button
                    type="button"
                    className="studio-button studio-button-secondary"
                    onClick={() =>
                      void copyText(brief, "Bildbriefing kopiert.")
                    }
                  >
                    <Copy size={16} aria-hidden="true" /> Briefing kopieren
                  </button>
                  <button
                    type="button"
                    className="studio-button studio-button-quiet"
                    onClick={() =>
                      downloadFile(
                        `${safeFilename(project.title)}-bildbriefing.txt`,
                        brief,
                        "text/plain",
                      )
                    }
                  >
                    <Download size={16} aria-hidden="true" /> Als Text sichern
                  </button>
                </div>
              </>
            )}

            {stage === "docs" && (
              <>
                <PanelHeading
                  number="03"
                  label="Dokumente & CAD-Handoff"
                  title="Alles an einem Ort. Nichts voreilig freigeben."
                  description="Die Liste zeigt, was gesammelt oder fachlich geklärt werden muss. Ein Häkchen bedeutet: Unterlage liegt vor – nicht: behördlich oder technisch genehmigt."
                />
                <div className="studio-meter">
                  <span>
                    {docsDone} von {documentItems.length} Unterlagen markiert
                  </span>
                  <span>
                    {Math.round((docsDone / documentItems.length) * 100)} %
                  </span>
                  <div>
                    <i
                      style={{
                        width: `${(docsDone / documentItems.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="studio-list">
                  {documentItems.map((item) => (
                    <div className="studio-list-item" key={item.id}>
                      <button
                        type="button"
                        className={`studio-check ${project.documents[item.id] ? "is-checked" : ""}`}
                        onClick={() => toggleDocument(item.id)}
                        aria-label={`${item.title} ${project.documents[item.id] ? "als offen markieren" : "als vorhanden markieren"}`}
                        aria-pressed={project.documents[item.id]}
                      >
                        {project.documents[item.id] && (
                          <Check size={16} aria-hidden="true" />
                        )}
                      </button>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                        {item.source && (
                          <a
                            href={item.source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Offizielle Quelle öffnen{" "}
                            <ExternalLink size={13} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="studio-subsection">
                  <span className="studio-kicker">Entscheidungs-Gates</span>
                  <h3>
                    {gatesVerified} von {gateItems.length} als verifiziert
                    markiert
                  </h3>
                  <p>
                    Ein Gate kann nur mit konkretem Nachweis und benannter
                    prüfender Stelle als verifiziert markiert werden. Diese
                    Eingabe prüft den Nachweis nicht selbst; die fachliche
                    Freigabe bleibt extern. Alle anderen Zustände bleiben
                    sichtbar.
                  </p>
                </div>
                <div className="studio-gate-list">
                  {gateItems.map((item) => (
                    <details className="studio-gate" key={item.id}>
                      <summary>
                        <span>{item.title}</span>
                        <strong data-state={project.gates[item.id].status}>
                          {gateLabels[project.gates[item.id].status]}
                        </strong>
                      </summary>
                      <p>{item.detail}</p>
                      <div className="studio-gate-fields">
                        <label>
                          Status
                          <select
                            value={project.gates[item.id].status}
                            onChange={(event) =>
                              updateGate(item.id, {
                                status: event.target.value as EvidenceStatus,
                              })
                            }
                          >
                            {(Object.keys(gateLabels) as EvidenceStatus[]).map(
                              (status) => (
                                <option key={status} value={status}>
                                  {gateLabels[status]}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <label>
                          Nachweis oder Begründung
                          <input
                            value={project.gates[item.id].evidence}
                            maxLength={240}
                            onChange={(event) =>
                              updateGate(item.id, {
                                evidence: event.target.value,
                                status:
                                  project.gates[item.id].status === "verified"
                                    ? "provisional"
                                    : project.gates[item.id].status,
                              })
                            }
                            placeholder="Dateiname, URL, Aktenzeichen oder offene Frage"
                          />
                        </label>
                        <label>
                          Verantwortliche Stelle
                          <input
                            value={project.gates[item.id].owner}
                            maxLength={120}
                            onChange={(event) =>
                              updateGate(item.id, {
                                owner: event.target.value,
                                status:
                                  project.gates[item.id].status === "verified"
                                    ? "provisional"
                                    : project.gates[item.id].status,
                              })
                            }
                            placeholder="z. B. Bauaufsicht, Tragwerksplaner, Elektrofachbetrieb"
                          />
                        </label>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="studio-callout">
                  <ShieldCheck size={18} aria-hidden="true" />
                  <p>
                    <strong>Seesen / Niedersachsen:</strong> Ob Ihr konkretes
                    Vorhaben verfahrensfrei ist, hängt unter anderem von
                    Grundstück, Abständen und Ausführung ab. Die Bauaufsicht
                    Goslar und qualifizierte Tragwerks- und Elektroplanung sind
                    die Freigabestellen – nicht dieses Studio.
                  </p>
                </div>
                <div className="studio-action-row">
                  <button
                    type="button"
                    className="studio-button studio-button-secondary"
                    onClick={exportProject}
                  >
                    <Download size={16} aria-hidden="true" /> Projektstand als
                    JSON
                  </button>
                  <button
                    type="button"
                    className="studio-button studio-button-quiet"
                    onClick={() => window.print()}
                  >
                    <FileText size={16} aria-hidden="true" /> Ansicht als PDF
                    drucken
                  </button>
                </div>
              </>
            )}

            {stage === "buy" && (
              <>
                <PanelHeading
                  number="04"
                  label="Beschaffung"
                  title="Erst vergleichen. Dann kaufen."
                  description="Hier verfolgen Sie die Angebots- und Lieferlage. Es gibt keine automatisch freigegebene Stückliste, Preise oder Lagerzusagen."
                />
                <div className="studio-meter">
                  <span>
                    {quoted} von {supplyItems.length} Gruppen mit Angebot oder
                    weiter
                  </span>
                  <span>
                    {Math.round((quoted / supplyItems.length) * 100)} %
                  </span>
                  <div>
                    <i
                      style={{
                        width: `${(quoted / supplyItems.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="studio-list">
                  {supplyItems.map((item) => (
                    <div className="studio-purchase" key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                      <label className="studio-status-label">
                        Status für {item.title}
                        <select
                          className="studio-status"
                          value={project.supplies[item.id]}
                          onChange={(event) =>
                            setPurchaseStatus(
                              item.id,
                              event.target.value as PurchaseStatus,
                            )
                          }
                        >
                          {(
                            Object.keys(purchaseLabels) as PurchaseStatus[]
                          ).map((status) => (
                            <option key={status} value={status}>
                              {purchaseLabels[status]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="studio-callout">
                  <Info size={18} aria-hidden="true" />
                  <p>
                    <strong>
                      {purchaseGateReady
                        ? "Nachweise im Register erfasst — fachlich gegenprüfen."
                        : "Nicht bestellbereit: Pflicht-Gates noch offen."}
                    </strong>{" "}
                    Vor Bestellung müssen Maße, baurechtliche Einordnung,
                    Statik, Überkopf-Eignung, Brandschutz und Elektroplanung zum
                    konkreten Standort passen. Liefer- und Steuerangaben nur aus
                    datierten Angeboten übernehmen. Der Statusregler
                    dokumentiert auch bereits getätigte Käufe; er ist keine
                    Bestellfreigabe.
                  </p>
                </div>
                <div className="studio-subsection">
                  <span className="studio-kicker">Anbieter-Briefing</span>
                  <h3>Gleiche Anfrage. Vergleichbare Angebote.</h3>
                  <p>
                    Dieses Briefing kann an mehrere geeignete Anbieter gehen.
                    Maße sind Vorplanung, keine Freigabe.
                  </p>
                </div>
                <textarea
                  className="studio-brief"
                  readOnly
                  rows={10}
                  value={requestForQuote(project)}
                  aria-label="Angebotsanfrage"
                />
                <div className="studio-action-row">
                  <button
                    type="button"
                    className="studio-button studio-button-secondary"
                    onClick={() =>
                      void copyText(
                        requestForQuote(project),
                        "Anfrage kopiert.",
                      )
                    }
                  >
                    <Copy size={16} aria-hidden="true" /> Anfrage kopieren
                  </button>
                  <button
                    type="button"
                    className="studio-button studio-button-quiet"
                    onClick={() =>
                      downloadFile(
                        `${safeFilename(project.title)}-anfrage.txt`,
                        requestForQuote(project),
                        "text/plain",
                      )
                    }
                  >
                    <Download size={16} aria-hidden="true" /> Als Text sichern
                  </button>
                </div>
              </>
            )}

            {stage === "build" && (
              <>
                <PanelHeading
                  number="05"
                  label="Bau begleiten"
                  title="Jede Etappe sichtbar machen."
                  description="Meilensteine dokumentieren den Ablauf. Sie ersetzen weder Fachbauleitung noch Prüfungen, Abnahmen oder sichere Montageverfahren."
                />
                <div className="studio-meter">
                  <span>
                    {buildDone} von {buildItems.length} Meilensteinen markiert
                  </span>
                  <span>
                    {Math.round((buildDone / buildItems.length) * 100)} %
                  </span>
                  <div>
                    <i
                      style={{
                        width: `${(buildDone / buildItems.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="studio-timeline">
                  {buildItems.map((item, index) => (
                    <div
                      className={`studio-timeline-item ${project.build[item.id] ? "is-done" : ""}`}
                      key={item.id}
                    >
                      <button
                        type="button"
                        onClick={() => toggleBuild(item.id)}
                        aria-label={`${item.title} ${project.build[item.id] ? "als offen markieren" : "als erledigt markieren"}`}
                        aria-pressed={project.build[item.id]}
                      >
                        {project.build[item.id] ? (
                          <Check size={17} aria-hidden="true" />
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </button>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                        <details className="studio-evidence">
                          <summary>
                            Notiz oder Nachweis festhalten
                            {project.buildNotes[item.id] ? " · vorhanden" : ""}
                          </summary>
                          <label>
                            Notiz zu {item.title}
                            <textarea
                              rows={2}
                              maxLength={500}
                              value={project.buildNotes[item.id]}
                              onChange={(event) =>
                                setBuildNote(item.id, event.target.value)
                              }
                              placeholder="Datum, verantwortlicher Fachbetrieb, Protokoll- oder Fotodateiname …"
                            />
                          </label>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="studio-callout">
                  <ShieldCheck size={18} aria-hidden="true" />
                  <p>
                    <strong>Sicherheitsgrenze:</strong> Netzanschluss,
                    Inbetriebnahme und die elektrische Anlage gehören in die
                    Hände eines dafür qualifizierten Fachbetriebs. Tragwerk und
                    Gründung brauchen eine standortbezogene Freigabe.
                  </p>
                </div>
              </>
            )}

            {stage === "result" && (
              <>
                <PanelHeading
                  number="06"
                  label="Ergebnis & Betrieb"
                  title="Das Gebaute wird zur Referenz."
                  description="Halten Sie fest, was tatsächlich installiert wurde. So bleiben Entwurf, Abnahme, Wartung und reale Leistung nachvollziehbar getrennt."
                />
                <div className="studio-result-image">
                  {resultPhotoUrl ? (
                    <img
                      src={resultPhotoUrl}
                      alt="Hochgeladenes Foto des fertig gebauten Solarprojekts"
                    />
                  ) : (
                    <div>
                      <ImagePlus size={36} aria-hidden="true" />
                      <strong>Das fertige Projekt gehört hierher.</strong>
                      <span>Ein Foto nach Montage und Abnahme hinzufügen.</span>
                    </div>
                  )}
                </div>
                <label className="studio-upload">
                  <ImagePlus size={19} aria-hidden="true" />
                  <span>
                    {resultPhotoUrl
                      ? "Ergebnisfoto ersetzen"
                      : "Ergebnisfoto hinzufügen"}
                  </span>
                  <small>
                    JPG, PNG oder WebP · bis 10 MB · lokal gespeichert
                  </small>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                      void handlePhoto("result", event.target.files?.[0])
                    }
                  />
                </label>
                {resultPhotoUrl && (
                  <a
                    className="studio-text-link"
                    href={resultPhotoUrl}
                    download={project.resultPhotoName || "ergebnisfoto"}
                  >
                    Ergebnisfoto separat sichern{" "}
                    <Download size={15} aria-hidden="true" />
                  </a>
                )}
                <div className="studio-form-grid studio-result-fields">
                  <label className="studio-field">
                    Tatsächlich installierte Leistung (kWp)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={project.actualKwp}
                      onChange={(event) =>
                        updateField("actualKwp", event.target.value)
                      }
                      placeholder="Aus Abnahmeprotokoll"
                    />
                  </label>
                  <label className="studio-field">
                    Gemessener Jahresertrag (kWh)
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={project.actualAnnualKwh}
                      onChange={(event) =>
                        updateField("actualAnnualKwh", event.target.value)
                      }
                      placeholder="Nach 12 Monaten"
                    />
                  </label>
                  <label className="studio-field studio-field-wide">
                    Übergabe, Wartung & Beobachtungen
                    <textarea
                      rows={4}
                      value={project.resultNotes}
                      maxLength={1200}
                      onChange={(event) =>
                        updateField("resultNotes", event.target.value)
                      }
                      placeholder="Abnahme, Seriennummern, Garantien, Wartungsplan, Monitoring …"
                    />
                  </label>
                </div>
                <div className="studio-callout">
                  <Info size={18} aria-hidden="true" />
                  <p>
                    <strong>Ergebnisstatus:</strong>{" "}
                    {buildDone === buildItems.length
                      ? "Alle Meilensteine markiert."
                      : `${buildItems.length - buildDone} Baumeilensteine noch offen.`}{" "}
                    Ein gemessener Jahresertrag ist erst nach einem
                    vollständigen Betriebsjahr aussagekräftig. Keine
                    Live-Messung ist mit dieser Version verbunden.
                  </p>
                </div>
                <button
                  type="button"
                  className="studio-button studio-button-secondary"
                  onClick={exportProject}
                >
                  <Download size={16} aria-hidden="true" /> Projektstand sichern
                </button>
              </>
            )}

            <div className="studio-panel-footer">
              <span>
                Entwurf · lokal gespeichert
                {project.updatedAt
                  ? ` · aktualisiert ${new Date(project.updatedAt).toLocaleDateString("de-DE")}`
                  : ""}
              </span>
              {nextStage && (
                <button
                  type="button"
                  className="studio-next"
                  onClick={() => {
                    setStage(nextStage.id);
                    scrollToWorkspace();
                  }}
                >
                  Weiter: {nextStage.title}{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              )}
            </div>
          </section>

          <aside className="studio-sidebar" aria-label="Projektüberblick">
            <div className="studio-summary-card">
              <div className="studio-summary-top">
                <span>Aktuelles Projekt</span>
                <ClipboardList size={19} aria-hidden="true" />
              </div>
              <h3>{project.title || "Unbenanntes Projekt"}</h3>
              <p>
                {projectType} · PLZ {project.postcode || "offen"}
              </p>
              <div className="studio-summary-rule" />
              <div className="studio-summary-stat">
                <span>Grundrissfläche</span>
                <strong>{area.total.toFixed(1)} m²</strong>
              </div>
              <div className="studio-summary-stat">
                <span>Unterlagen</span>
                <strong>
                  {docsDone}/{documentItems.length}
                </strong>
              </div>
              <div className="studio-summary-stat">
                <span>Gates markiert</span>
                <strong>
                  {gatesVerified}/{gateItems.length}
                </strong>
              </div>
              <div className="studio-summary-stat">
                <span>Baumeilensteine</span>
                <strong>
                  {buildDone}/{buildItems.length}
                </strong>
              </div>
              <button
                type="button"
                className="studio-summary-export"
                onClick={exportProject}
              >
                <Download size={16} aria-hidden="true" /> Projektstand
                exportieren
              </button>
            </div>
            <div className="studio-sidebar-note">
              <Ruler size={21} aria-hidden="true" />
              <h4>Der Entwurf ist nicht die Freigabe.</h4>
              <p>
                KI-Bilder, Flächenskizze und Checklisten helfen bei
                Entscheidungen. Statik, Bau- und Elektroplanung müssen für genau
                diesen Standort geprüft werden.
              </p>
              <strong className="studio-concept-warning">
                CONCEPT ONLY — NOT FOR CONSTRUCTION
              </strong>
            </div>
            <div className="studio-sidebar-photo">
              <Image
                src="/media/6x2-aufdach-terrasse-anton1.webp"
                alt="Bestehendes Referenzfoto einer PV-Terrassenüberdachung"
                width={640}
                height={400}
                sizes="(max-width: 900px) 100vw, 300px"
              />
              <div>
                <span>Gebautes Referenzprojekt</span>
                <p>Von der Vision zur tatsächlichen Ausführung.</p>
              </div>
            </div>
          </aside>
        </div>
        <div className="studio-privacy">
          <ShieldCheck size={17} aria-hidden="true" />
          <span>
            Keine Anmeldung, kein Server-Upload: Texte im lokalen
            Browser-Speicher, Fotos bei Browser-Unterstützung in IndexedDB. Ein
            Gerätewechsel oder Löschen der Browserdaten entfernt sie. JSON und
            Bilder deshalb separat sichern.
          </span>
        </div>
        {notice && (
          <div className="studio-toast" role="status">
            <CheckCircle2 size={16} aria-hidden="true" />
            {notice}
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Meldung schließen"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function PanelHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="studio-panel-heading">
      <span className="studio-panel-number">{number}</span>
      <div>
        <span className="studio-kicker">{label}</span>
        <h2 id="stage-title">{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}

function PlanSketch({
  project,
  refValue,
}: {
  project: StudioProject;
  refValue: RefObject<SVGSVGElement | null>;
}) {
  const carport = project.kind !== "terrace";
  const terrace = project.kind !== "carport";
  return (
    <svg
      ref={refValue}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 320"
      role="img"
      aria-label="Schematische Draufsicht von Haus, Carport und Terrasse, nicht maßstabsgetreu"
    >
      <rect width="760" height="320" rx="16" fill="#101e29" />
      <path
        d="M30 260H730"
        stroke="#526473"
        strokeWidth="4"
        strokeDasharray="12 10"
      />
      <text x="32" y="286" fill="#9db0bc" fontSize="15">
        Zufahrt / Garten
      </text>
      <rect
        x="288"
        y="44"
        width="184"
        height="202"
        rx="6"
        fill="#263a46"
        stroke="#90a5ae"
        strokeWidth="2"
      />
      <text x="351" y="148" fill="#ecf3f0" fontSize="18">
        Haus
      </text>
      {carport && (
        <>
          <rect
            x="47"
            y="82"
            width="223"
            height="153"
            rx="5"
            fill="#234e5b"
            stroke="#75c9d3"
            strokeWidth="3"
          />
          <path
            d="M55 114H262M55 147H262M55 180H262M55 213H262"
            stroke="#65a6ae"
            opacity=".6"
          />
          <text x="88" y="159" fill="#f6f1da" fontSize="16">
            Solarcarport
          </text>
          <text x="89" y="181" fill="#cde5e3" fontSize="13">
            {project.carportWidthM} × {project.carportDepthM} m
          </text>
        </>
      )}
      {terrace && (
        <>
          <rect
            x="489"
            y="82"
            width="220"
            height="153"
            rx="5"
            fill="#675b43"
            stroke="#e7c58a"
            strokeWidth="3"
          />
          <path
            d="M498 111H700M498 143H700M498 175H700M498 207H700"
            stroke="#d8bc8d"
            opacity=".55"
          />
          <text x="553" y="159" fill="#fff0cd" fontSize="16">
            PV-Terrasse
          </text>
          <text x="557" y="181" fill="#f5dfb6" fontSize="13">
            {project.terraceWidthM} × {project.terraceDepthM} m
          </text>
        </>
      )}
      <path
        d="M724 70V34m0 0-8 12m8-12 8 12"
        stroke="#d6e9ec"
        strokeWidth="2"
        fill="none"
      />
      <text x="718" y="27" fill="#d6e9ec" fontSize="14">
        N
      </text>
      <text x="31" y="34" fill="#a4b6bf" fontSize="13">
        KONZEPTSKIZZE · NICHT MASSSTABSGETREU · KEINE CAD-FREIGABE
      </text>
    </svg>
  );
}
