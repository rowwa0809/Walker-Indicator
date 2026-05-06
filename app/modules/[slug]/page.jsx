import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLockup from "@/components/BrandLockup";
import { Icon, ICON_KEYS, ICON_LABELS } from "@/components/Icons";
import TVWidget from "@/components/TVWidget";
import { MODULES, MODULE_BY_SLUG } from "@/lib/modules";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const mod = MODULE_BY_SLUG[params.slug];
  if (!mod) return { title: "Module not found · Walker Indicator" };
  const label = ICON_LABELS[mod.slug] ?? mod.slug;
  return {
    title: `${label} · Walker Indicator`,
    description: mod.summary
  };
}

function WidgetCard({ widget }) {
  return (
    <div className={`widget-card${widget.wide ? " widget-wide" : ""}`} style={widget.wide ? { gridColumn: "1 / -1" } : undefined}>
      <header>
        <strong>{widget.title}</strong>
        {widget.subtitle ? <small>{widget.subtitle}</small> : null}
      </header>
      <div className={`widget-host${widget.tall ? " tall" : ""}`}>
        <TVWidget type={widget.type} config={widget.config ?? {}} />
      </div>
    </div>
  );
}

export default function ModulePage({ params }) {
  const mod = MODULE_BY_SLUG[params.slug];
  if (!mod) notFound();

  const label = ICON_LABELS[mod.slug] ?? mod.slug;
  const cols = mod.cols ?? 2;
  const others = ICON_KEYS.filter((k) => k !== mod.slug).slice(0, 12);

  return (
    <main>
      <section className="module-shell">
        <nav className="top-nav" aria-label="Primary navigation">
          <BrandLockup />
          <Link href="/" className="nav-pill nav-back">
            ← All modules
          </Link>
        </nav>

        <header className="module-hero">
          <div className="module-icon">
            <Icon icon={mod.slug} />
          </div>
          <div>
            <p className="eyebrow">{mod.eyebrow}</p>
            <h1>{mod.title}</h1>
            <p>{mod.summary}</p>
          </div>
        </header>

        <div className={`widget-grid cols-${cols}`}>
          {mod.widgets.map((w, i) => (
            <WidgetCard key={`${mod.slug}-w-${i}`} widget={w} />
          ))}
        </div>

        <section className="section-shell" style={{ padding: "60px 0 0" }}>
          <div className="section-heading">
            <p className="eyebrow">Other modules</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)" }}>Keep moving across the macro radar.</h2>
          </div>
          <div className="module-grid">
            {others.map((key) => (
              <Link key={key} href={`/modules/${key}`} className="icon-card">
                <Icon icon={key} />
                <strong>{ICON_LABELS[key]}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-shell compliance-strip" style={{ marginTop: "56px" }}>
          <strong>Informational intelligence, not financial advice.</strong>
          <span>
            Charts and data feeds are provided by TradingView and may be delayed. Walker Indicator does not place
            trades, route orders, or recommend buy/sell actions.
          </span>
        </section>
      </section>
    </main>
  );
}
