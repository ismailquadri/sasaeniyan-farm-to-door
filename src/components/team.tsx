import cofounder from "@/assets/cofounder.png.asset.json";
import quadri from "@/assets/quadri.jpg.asset.json";
import rasheedat from "@/assets/rasheedat.jpg.asset.json";

const team = [
  { name: "Adekunle Ajisafe", role: "CEO, Founder", img: cofounder.url },
  { name: "Quadri Ismail", role: "Tech Cofounder", img: quadri.url },
  { name: "Rasheedat Mosobalaje", role: "Finance & Administration", img: rasheedat.url },
];

export function Team() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m) => (
        <figure
          key={m.name}
          className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-xs transition duration-300 hover:-translate-y-1"
        >
          {m.img ? (
            <img
              src={m.img}
              alt={m.name}
              loading="lazy"
              className="aspect-[16/15] w-full object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[16/15] w-full items-center justify-center bg-accent">
              <span className="font-display text-7xl text-accent-foreground">
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
            </div>
          )}
          <figcaption className="flex flex-1 flex-col justify-between p-6">
            <div>
              <p className="font-display text-2xl font-bold">{m.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
