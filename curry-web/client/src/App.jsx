import { useEffect, useState } from "react";

function Logo({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="Logo Rayyan">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc72c" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="#0b1220" stroke="url(#lg)" strokeWidth="6" />
      <path
        d="M60 6v108M6 60h108M20 24c28 20 28 52 0 72M100 24c-28 20-28 52 0 72"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="3"
        opacity=".55"
      />
      <text x="60" y="78" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="56" fill="#fff">
        R
      </text>
    </svg>
  );
}

function Loader({ hide }) {
  return (
    <div className={"loader" + (hide ? " loader--hide" : "")} role="status" aria-live="polite">
      <div className="loader__logo">
        <Logo size={120} />
      </div>
      <p className="loader__text">Memuat profil Stephen Curry…</p>
      <div className="loader__bar"><span /></div>
    </div>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function ShoeArt({ warna }) {
  return (
    <svg viewBox="0 0 200 90" className="shoe-art" aria-hidden="true">
      <path d="M10 62c0-10 6-14 14-16l34-8 18-22 20 6 12 12 38 8c14 3 24 10 24 22v6H10z" fill={warna[0]} />
      <path d="M10 62h184v10a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" fill={warna[1]} />
      <path d="M78 24l14 10M92 30l12 10M106 36l10 8" stroke={warna[1]} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  ["biodata", "Biodata"],
  ["karier", "Awal Karier"],
  ["tim", "Tim"],
  ["rekan", "Rekan"],
  ["sepatu", "Sepatu"],
];

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 2200));
    const req = fetch("/api/curry")
      .then((r) => {
        if (!r.ok) throw new Error("gagal");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
    Promise.all([minDelay, req]).then(() => setLoading(false));
  }, []);

  return (
    <>
      <Loader hide={!loading} />
      {error && !loading && (
        <div className="container error">
          Server belum jalan. Jalankan <code>npm run dev</code> di folder project.
        </div>
      )}
      {data && (
        <>
          <header className="nav">
            <div className="container nav__in">
              <a href="#top" className="brand">
                <Logo size={34} /> <span>Curry<b>30</b></span>
              </a>
              <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
                <span /><span /><span />
              </button>
              <nav className={"nav__links" + (open ? " open" : "")}>
                {NAV.map(([id, label]) => (
                  <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <main id="top">
            <section className="hero">
              <div className="container hero__in">
                <div>
                  <p className="kicker">Golden State Warriors · #{data.biodata.nomor}</p>
                  <h1>
                    Stephen <span>Curry</span>
                  </h1>
                  <p className="lead">{data.biodata.tentang}</p>
                  <a className="btn" href="#biodata">Lihat profil</a>
                </div>
                <div className="hero__num" aria-hidden="true">{data.biodata.nomor}</div>
              </div>
              <div className="container stats">
                {data.stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                    <small>{s.note}</small>
                  </div>
                ))}
              </div>
            </section>

            <Section id="biodata" kicker="Siapa dia" title="Biodata">
              <dl className="bio">
                {[
                  ["Nama lengkap", data.biodata.nama],
                  ["Julukan", data.biodata.julukan],
                  ["Lahir", data.biodata.lahir],
                  ["Tinggi", data.biodata.tinggi],
                  ["Posisi", data.biodata.posisi],
                  ["Sekolah", data.biodata.sekolah],
                  ["Keluarga", data.biodata.keluarga],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section id="karier" kicker="Perjalanan" title="Awal Karier">
              <ol className="timeline">
                {data.awalKarir.map((t) => (
                  <li key={t.tahun + t.judul}>
                    <span className="year">{t.tahun}</span>
                    <h3>{t.judul}</h3>
                    <p>{t.isi}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="tim" kicker="Seragam yang dipakai" title="Bermain di Tim Mana?">
              <div className="grid grid--4">
                {data.tim.map((t) => (
                  <article className="card team" key={t.nama} style={{ "--a": t.warna[0], "--b": t.warna[1] }}>
                    <div className="team__badge" />
                    <h3>{t.nama}</h3>
                    <span className="pill">{t.periode}</span>
                    <p>{t.peran}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section id="rekan" kicker="Di sisinya" title="Rekan Terbaik">
              <div className="grid grid--3">
                {data.rekan.map((r) => (
                  <article className="card" key={r.nama}>
                    <div className="avatar">{r.nama.split(" ").map((w) => w[0]).join("")}</div>
                    <h3>{r.nama}</h3>
                    <span className="pill">{r.peran}</span>
                    <p>{r.cerita}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section id="sepatu" kicker="Sneakerhead" title="Sepatu & Kolaborasi Brand">
              <p className="lead small">{data.sepatu.ringkasan}</p>

              <h3 className="sub">Perjalanan brand</h3>
              <div className="grid grid--4">
                {data.sepatu.timeline.map((b) => (
                  <article className="card" key={b.brand}>
                    <span className="pill">{b.tahun}</span>
                    <h3>{b.brand}</h3>
                    <p>{b.detail}</p>
                  </article>
                ))}
              </div>

              <h3 className="sub">Seri sepatu signature</h3>
              <div className="grid grid--3">
                {data.sepatu.seri.map((s) => (
                  <article className="card shoe" key={s.nama}>
                    <ShoeArt warna={s.warna} />
                    <h3>{s.nama}</h3>
                    <span className="pill">{s.tahun}</span>
                    <p>{s.catatan}</p>
                  </article>
                ))}
              </div>

              <h3 className="sub">Kolaborasi dengan brand</h3>
              <div className="grid grid--4">
                {data.sepatu.kolaborasi.map((k) => (
                  <article className="card collab" key={k.brand}>
                    <h3>{k.brand}</h3>
                    <span className="pill">{k.tahun}</span>
                    <p>{k.detail}</p>
                  </article>
                ))}
              </div>
            </Section>
          </main>

          <footer className="footer">
            <div className="container">
              <Logo size={44} />
              <p>
                Dibuat oleh <strong>Rayyan</strong>
              </p>
              <small>{data.sumber} Situs penggemar tidak resmi, tidak berafiliasi dengan NBA atau Stephen Curry.</small>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
