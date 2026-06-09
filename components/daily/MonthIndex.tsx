import Link from "next/link";
import type { MonthGroup } from "@/lib/daily";

/** The 12-month calendar grid on the hub — a crawlable link to every day. */
export function MonthIndex({ months, todaySlug }: { months: MonthGroup[]; todaySlug?: string }) {
  return (
    <div className="month-index">
      {months.map((mo) => (
        <section className="month-card" key={mo.month} id={mo.slug}>
          <h3 className="month-name">{mo.name}</h3>
          <div className="month-days">
            {mo.days.map((d) => (
              <Link
                key={d.slug}
                className={"month-day" + (d.slug === todaySlug ? " is-today" : "")}
                href={`/daily/${d.slug}`}
                title={`${mo.name} ${d.day} — ${d.theme}`}
                aria-current={d.slug === todaySlug ? "date" : undefined}
              >
                {d.day}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
