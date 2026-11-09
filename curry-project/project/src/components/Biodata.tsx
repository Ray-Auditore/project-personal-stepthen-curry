import { bio } from '../data';
import { useScrollReveal } from '../hooks';

export function Biodata() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="biodata" className="relative bg-ink-950 py-20 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-flame-500 tabular-nums">01</span>
          <span className="h-px flex-1 bg-ink-800" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Biodata</span>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-12 gap-6 lg:gap-12">
          {/* Left: name + bio card */}
          <div className="col-span-12 lg:col-span-5">
            <h2
              className={`font-display text-5xl leading-[0.9] text-ink-50 transition-all duration-700 sm:text-6xl lg:text-7xl ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              THE
              <br />
              <span className="text-flame-500">MAN</span>
              <br />
              BEHIND
              <br />
              THE SHOT.
            </h2>

            <div
              className={`mt-10 overflow-hidden rounded-sm border border-ink-800 bg-ink-900/50 transition-all duration-700 delay-150 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="border-b border-ink-800 px-6 py-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">Nama Lengkap</div>
                <div className="mt-1 font-serif-editorial text-xl text-ink-50" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {bio.fullName}
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {bio.nicknames.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-flame-500/30 bg-flame-500/5 px-3 py-1 text-xs text-flame-300"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: data grid */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <BioRow label="Tanggal Lahir" value={bio.birthDate} delay={0} visible={visible} />
              <BioRow label="Tempat Lahir" value={bio.birthPlace} delay={50} visible={visible} />
              <BioRow label="Kewarganegaraan" value={bio.nationality} delay={100} visible={visible} />
              <BioRow label="Tinggi Badan" value={bio.height} delay={150} visible={visible} />
              <BioRow label="Berat Badan" value={bio.weight} delay={200} visible={visible} />
              <BioRow label="Posisi" value={bio.position} delay={250} visible={visible} />
              <BioRow label="Nomor Punggung" value={`#${bio.number}`} delay={300} visible={visible} />
              <BioRow label="Kuliah" value={bio.college} delay={350} visible={visible} />
            </div>

            <div
              className={`mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink-800 bg-ink-800 transition-all duration-700 delay-500 sm:grid-cols-4 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {bio.highlights.map((h) => (
                <div key={h.label} className="bg-ink-900 p-5 text-center">
                  <div className="font-display text-4xl text-flame-500 sm:text-5xl">{h.value}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-ink-400">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 flex flex-col gap-px overflow-hidden rounded-sm border border-ink-800 bg-ink-800 transition-all duration-700 delay-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <MetaLine label="NBA Debut" value={bio.nbaDebut} />
              <MetaLine label="Draft" value={bio.draft} />
              <MetaLine label="Instagram" value={bio.instagram} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BioRow({
  label,
  value,
  delay,
  visible,
}: {
  label: string;
  value: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={`group border-b border-l border-ink-800 p-5 transition-all duration-700 hover:bg-ink-900/50 first:border-l-0 sm:border-l ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">{label}</div>
      <div className="mt-1.5 text-sm font-medium text-ink-100 text-pretty">{value}</div>
    </div>
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-ink-900 px-5 py-3.5">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">{label}</span>
      <span className="text-sm text-ink-100">{value}</span>
    </div>
  );
}
