import { useState, useEffect, useCallback, useRef } from "react";

// ─── Notification Store ───────────────────────────────────────────────────────
let _listeners = [];
let _id = 0;

export const notify = ({ message, emoji = "🌿", duration = 5000 }) => {
  const id = ++_id;
  _listeners.forEach((fn) => fn({ id, message, emoji, duration }));
  return id;
};

export const reminders = {
  journal: () => notify({ message: "Have you journaled yet?",          emoji: "📓", duration: 6000 }),
  hydrate: () => notify({ message: "Stay hydrated!! Drink some water.", emoji: "💧", duration: 5000 }),
  habit:   () => notify({ message: "Have you finished that habit?",    emoji: "✅", duration: 6000 }),
  breathe: () => notify({ message: "Take a deep breath. You've got this.", emoji: "🌸", duration: 5000 }),
  move:    () => notify({ message: "Time to stretch or take a walk!",  emoji: "🚶", duration: 5000 }),
};

// ─── Single Card ──────────────────────────────────────────────────────────────
function NotifCard({ id, message, emoji, duration, onRemove }) {
  const [phase, setPhase]       = useState("enter");
  const [progress, setProgress] = useState(100);
  const rafRef = useRef(null);

  const dismiss = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPhase("exit");
    setTimeout(() => onRemove(id), 450);
  }, [id, onRemove]);

  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 20);
    const start = Date.now();
    const tick = () => {
      const pct = Math.max(0, 100 - ((Date.now() - start) / duration) * 100);
      setProgress(pct);
      if (pct > 0) rafRef.current = requestAnimationFrame(tick);
      else dismiss();
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, [duration, dismiss]);

  const translateY = phase === "enter" ? "20px" : phase === "exit" ? "-14px" : "0px";
  const opacity    = phase === "enter" || phase === "exit" ? 0 : 1;
  const scale      = phase === "enter" ? "0.93" : phase === "exit" ? "0.96" : "1";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
      `}</style>
      <div style={{
        transform: `translateY(${translateY}) scale(${scale})`,
        opacity,
        transition: phase === "exit"
          ? "all 0.4s cubic-bezier(0.55,0,1,0.45)"
          : "all 0.48s cubic-bezier(0.34,1.4,0.64,1)",
        position: "relative",
        width: 320,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 20,
        border: "1px solid rgba(180,210,190,0.55)",
        boxShadow: "0 4px 24px rgba(100,150,120,0.15)",
        padding: "14px 16px 18px",
        overflow: "hidden",
        fontFamily: "'Nunito', sans-serif",
      }}>
        {/* top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, #a8d5ba, #c8e6c9, #a8d5ba)",
          borderRadius: "20px 20px 0 0",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* emoji badge */}
          <div style={{
            width: 42, height: 42, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg, #e8f5ec, #d4edda)",
            border: "1px solid rgba(168,213,186,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>
            {emoji}
          </div>

          {/* message */}
          <p style={{
            margin: 0, fontSize: 14, fontWeight: 600,
            color: "#2d4a38", lineHeight: 1.45, flex: 1,
            fontFamily: "'Nunito', sans-serif",
          }}>
            {message}
          </p>

          {/* close */}
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#9ab8a4", padding: 4, borderRadius: 8,
              display: "flex", alignItems: "center", flexShrink: 0, alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4a7c5e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9ab8a4")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* progress bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, height: 3,
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6dbf8e, #a8d5ba)",
          borderRadius: "0 3px 3px 0",
          transition: "width 0.1s linear", opacity: 0.7,
        }} />
      </div>
    </>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function NotificationProvider() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const handler = (n) => setNotifs((prev) => [...prev, n].slice(-4));
    _listeners.push(handler);
    return () => { _listeners = _listeners.filter((l) => l !== handler); };
  }, []);

  const remove = useCallback(
    (id) => setNotifs((prev) => prev.filter((n) => n.id !== id)),
    []
  );

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 24, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 10,
      pointerEvents: "none",
    }}>
      {notifs.map((n) => (
        <div key={n.id} style={{ pointerEvents: "all" }}>
          <NotifCard {...n} onRemove={remove} />
        </div>
      ))}
    </div>
  );
}

// ─── Scheduled Reminders ──────────────────────────────────────────────────────
export function ScheduledReminders() {
  useEffect(() => {
    const hydrateInterval = setInterval(reminders.hydrate, 45 * 60 * 1000);
    const clockInterval   = setInterval(() => {
      const h = new Date().getHours();
      const m = new Date().getMinutes();
      if (h === 9  && m === 0) reminders.journal();
      if (h === 20 && m === 0) reminders.habit();
    }, 60 * 1000);

    return () => {
      clearInterval(hydrateInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return null;
}