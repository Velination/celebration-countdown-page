import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isChristmas: boolean;
};

const getTimeLeft = (): TimeLeft => {
  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 25);
  const difference = Math.max(0, christmas.getTime() - now.getTime());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    isChristmas: difference === 0,
  };
};

const countdownUnits = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const snowflakes = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: (index * 37 + 7) % 100,
  size: 3 + ((index * 7) % 7),
  duration: 11 + ((index * 5) % 13),
  delay: -((index * 3) % 19),
  drift: -24 + ((index * 13) % 49),
  opacity: 0.25 + ((index * 11) % 55) / 100,
}));

function PineBranch({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={`pine-branch pine-branch--${side}`}
      viewBox="0 0 420 300"
      fill="none"
    >
      <path d="M-20 58C97 62 215 125 391 269" stroke="#62401f" strokeWidth="11" />
      {[
        [52, 71, 21, 14],
        [90, 83, 39, 4],
        [125, 99, 55, 23],
        [158, 116, 87, 19],
        [196, 140, 116, 43],
        [229, 164, 147, 58],
        [265, 190, 178, 83],
        [300, 215, 211, 106],
      ].map(([x1, y1, x2, y2], index) => (
        <g key={index}>
          <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke="#153e2a" strokeWidth="8" />
          <path
            d={`M${x1 + 8} ${y1 + 7}L${x2 + 33} ${y2 + 69}`}
            stroke="#0b2e21"
            strokeWidth="8"
          />
          <path
            d={`M${x1 - 2} ${y1 + 1}L${x2 + 2} ${y2 - 7}`}
            stroke="#3f6b42"
            strokeWidth="3"
          />
        </g>
      ))}
      <circle cx="111" cy="91" r="12" fill="#a81728" />
      <circle cx="137" cy="108" r="9" fill="#d5a34f" />
      <circle cx="250" cy="173" r="11" fill="#b81e30" />
    </svg>
  );
}

function GiftStack() {
  return (
    <div className="gift-stack" aria-hidden="true">
      <div className="gift gift--small">
        <span />
      </div>
      <div className="gift gift--large">
        <span />
      </div>
    </div>
  );
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="christmas-display">
      <div className="ambient-glow ambient-glow--one" />
      <div className="ambient-glow ambient-glow--two" />

      <div className="snow" aria-hidden="true">
        {snowflakes.map((flake) => (
          <i
            key={flake.id}
            style={
              {
                "--left": `${flake.left}%`,
                "--size": `${flake.size}px`,
                "--duration": `${flake.duration}s`,
                "--delay": `${flake.delay}s`,
                "--drift": `${flake.drift}px`,
                "--opacity": flake.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <PineBranch side="left" />
      <PineBranch side="right" />

      <header className="campaign-header">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: "50px",
    }}
  >
    <img
      src="/logo.png"
      alt="Celebrations"
      style={{
        width: "280px",
        height: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
</header>

      <section className="countdown-content" aria-live="polite">
        <div className="eyebrow">
          <span />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 2 1.7 6.3L20 6.6l-4.6 4.5 6.2 1.7-6.2 1.7 4.6 4.6-6.3-1.8L12 24l-1.7-6.7L4 19.1l4.6-4.6-6.2-1.7 6.2-1.7L4 6.6l6.3 1.7L12 2Z" />
          </svg>
          <p>Celebrating the most wonderful time of the year</p>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 2 1.7 6.3L20 6.6l-4.6 4.5 6.2 1.7-6.2 1.7 4.6 4.6-6.3-1.8L12 24l-1.7-6.7L4 19.1l4.6-4.6-6.2-1.7 6.2-1.7L4 6.6l6.3 1.7L12 2Z" />
          </svg>
          <span />
        </div>

        {timeLeft.isChristmas ? (
          <div className="christmas-arrived">
            <span className="christmas-arrived__star">✦</span>
            <h1>Merry Christmas!</h1>
            <p>May your day be filled with wonder and joy.</p>
          </div>
        ) : (
          <>
            <h1>Countdown to Christmas</h1>
            <div className="title-flourish" aria-hidden="true">
              <span />
              <i>◆</i>
              <span />
            </div>
            <div className="countdown-grid">
              {countdownUnits.map((unit) => (
                <div className="countdown-card" key={unit.key}>
                  <div className="card-corner card-corner--tl" />
                  <div className="card-corner card-corner--tr" />
                  <strong>{String(timeLeft[unit.key]).padStart(2, "0")}</strong>
                  <div className="card-divider">
                    <span />
                    <i />
                    <span />
                  </div>
                  <p>{unit.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <GiftStack />
      <div className="hanging-ornaments" aria-hidden="true">
        <i className="ornament ornament--one" />
        <i className="ornament ornament--two" />
      </div>

      <footer>
        <span />
        <p>The magic of Christmas is almost here!</p>
        <span />
      </footer>
    </main>
  );
}

export default App;
