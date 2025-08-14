// src/pages/Index.tsx
import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import {
  Sun,
  Moon,
  Shield,
  DollarSign,
  Gift,
  CheckCircle,
  Clock,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/** =============== ONE-FILE THEME (persistent) =============== **/
type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});
const useTheme = () => useContext(ThemeCtx);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getInitial = (): Theme => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("crypdna-theme")
        : null;
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };
  const [theme, setTheme] = useState<Theme>(getInitial);

  // Inject minimal CSS variables once
  useEffect(() => {
    const id = "crypdna-theme-vars";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = `
        :root {
          --bg: #ffffff;
          --surface: #f6f8fb;
          --card: #ffffff;
          --text: #0b0f14;
          --subtle: rgba(11,15,20,0.72);
          --border: rgba(11,15,20,0.16);
          --grad1: #7c3aed; /* purple */
          --grad2: #06b6d4; /* cyan */
          --success: #16a34a;
          --emerald: #059669;
          --amber: #d97706;
          --sky: #0284c7;
          --danger: #dc2626;
        }
        [data-theme="dark"] {
          --bg: #0b0f14;
          --surface: #0f141a;
          --card: #111821;
          --text: #f5f7fb;
          --subtle: rgba(245,247,251,0.78);
          --border: rgba(255,255,255,0.14);
        }
        html, body, #root { height:100%; }
        body { margin:0; background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
        .wrap { max-width: 1100px; margin: 0 auto; padding: 16px; }
        .cryp-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.18); }
        .card-pad { padding: 20px 22px; }
        .title { font-size: 20px; font-weight: 900; margin: 0; color: var(--text); }
        .desc { font-size: 16px; line-height: 1.45; color: var(--subtle); font-weight: 600; }
        .pill { display:inline-flex; align-items:center; gap:8px; padding: 6px 12px; border-radius:999px; font-weight:900; font-size:14px; color:#fff; box-shadow:0 1px 2px rgba(0,0,0,0.25); }
        .grid3 { display:grid; gap:16px; grid-template-columns: 1fr; }
        @media (min-width: 640px){ .grid3{ grid-template-columns: 1fr 1fr 1fr; } }
        .iconbox{ width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; margin-bottom:12px; }
        .g1{ background: linear-gradient(135deg, #8b5cf6, #2563eb); }
        .g2{ background: linear-gradient(135deg, #22c55e, #059669); }
        .g3{ background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .header{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .toggle{ display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:10px; border:1px solid var(--border); background:var(--surface); color:var(--text); font-weight:800; cursor:pointer; }
        .ribbon{ margin-top:8px; font-size:12px; font-weight:800; color:var(--subtle); letter-spacing:.2px; }
        .cta-bar{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:16px; margin-top:16px; }
        .btn{ padding:10px 16px; border-radius:10px; border:1px solid var(--border); background:var(--surface); color:var(--text); font-weight:900; cursor:pointer; }
        .btn-primary{ background: linear-gradient(90deg, var(--grad1), var(--grad2)); color:#fff; border:none; }
        .row{ display:flex; align-items:flex-start; justify-content:space-between; padding:10px 0; }
        .row label{ font-weight:900; font-size:16px; color:var(--text); }
        .row span{ font-weight:900; font-size:16px; color:var(--text); text-align:right; }
        .divider{ border-top:1px solid var(--border); margin-top:14px; padding-top:12px; text-align:center; font-weight:900; }
        .hoverable{ transition: transform .18s ease, box-shadow .18s ease; }
        .hoverable:hover{ transform: translateY(-1px) scale(1.01); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }
        .focusable:focus-visible{ outline:2px solid var(--grad2); outline-offset:2px; border-radius:10px; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Apply theme + persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    localStorage.setItem("crypdna-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) }),
    [theme]
  );
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

/** =============== D&B CARD (high-contrast) =============== **/
type DnbStatus = "active" | "approved" | "pending" | "syncing" | "error";
const STATUS: Record<
  DnbStatus,
  { label: string; bg: string; Icon: React.ElementType }
> = {
  active: { label: "Active", bg: "var(--success)", Icon: CheckCircle },
  approved: { label: "Approved", bg: "var(--emerald)", Icon: CheckCircle },
  pending: { label: "Pending Integration", bg: "var(--amber)", Icon: Clock },
  syncing: { label: "Awaiting Sync", bg: "var(--sky)", Icon: RefreshCcw },
  error: { label: "Action Required", bg: "var(--danger)", Icon: AlertCircle },
};

function StatusBadge({ status }: { status: DnbStatus }) {
  const { label, bg, Icon } = STATUS[status];
  return (
    <span className="pill" style={{ background: bg }}>
      <Icon size={16} />
      {label}
    </span>
  );
}

function DnbCard({ status }: { status: DnbStatus }) {
  const nextReport = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();
  return (
    <section className="cryp-card card-pad hoverable" aria-labelledby="dnb-h">
      <div className="header" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={20} color="var(--text)" />
          <h3 id="dnb-h" className="title">
            Dun &amp; Bradstreet
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="row">
        <label>Tradeline Reporting</label>
        <span style={{ color: "var(--subtle)", fontWeight: 800 }}>Enabled</span>
      </div>
      <div className="row">
        <label>Integration</label>
        <span>{status === "pending" ? "Pending" : "Connected"}</span>
      </div>
      <div className="row">
        <label>Reporting</label>
        <span>{status === "syncing" ? "Awaiting Sync" : "Monthly"}</span>
      </div>

      <div className="divider">Next report: {nextReport}</div>
    </section>
  );
}

/** =============== PAGE =============== **/
export default function Index() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme(); // will be provided below
  // TODO: replace with your real paid flag from auth/billing
  const isPaid = false as boolean;

  return (
    <ThemeProvider>
      <div className="wrap" role="main">
        {/* Header */}
        <div className="cryp-card card-pad" style={{ marginBottom: 16 }}>
          <div className="header">
            <div style={{ fontWeight: 900, fontSize: 18 }}>CrypDNA Vault</div>
            <button className="toggle focusable" onClick={toggle}>
              {document.documentElement.getAttribute("data-theme") === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
              {document.documentElement.getAttribute("data-theme") === "dark"
                ? "Light"
                : "Dark"}
            </button>
          </div>
          <div className="ribbon">
            AES‑256 at rest · HTTPS in transit · RBAC protected
          </div>
        </div>

        {/* Three luxury cards */}
        <div className="grid3">
          <section className="cryp-card card-pad hoverable">
            <div className="iconbox g1">
              <Shield size={20} />
            </div>
            <h3 className="title">Secure Vault</h3>
            <p className="desc" style={{ marginTop: 8 }}>
              AES‑256 at rest. HTTPS in transit. RBAC‑locked. Your identity and
              assets stay untouchable.
            </p>
          </section>

          <section className="cryp-card card-pad hoverable">
            <div className="iconbox g2">
              <DollarSign size={20} />
            </div>
            <h3 className="title">Credit Building</h3>
            <p className="desc" style={{ marginTop: 8 }}>
              Real tradelines. Automatic reporting. Smart reminders. Grow credit
              without guesswork.
            </p>
          </section>

          <section className="cryp-card card-pad hoverable">
            <div className="iconbox g3">
              <Gift size={20} />
            </div>
            <h3 className="title">Exclusive Benefits</h3>
            <p className="desc" style={{ marginTop: 8 }}>
              Priority access, private drops, concierge support, and
              members‑only perks built for whales.
            </p>
          </section>
        </div>

        {/* Dun & Bradstreet */}
        <div style={{ marginTop: 16 }}>
          <DnbCard status={"active"} />
        </div>

        {/* CTA Bar */}
        <div className="cryp-card cta-bar hoverable" role="region" aria-label="Vault access">
          <div style={{ fontWeight: 900, fontSize: 16 }}>Vault Access</div>
          {isPaid ? (
            <button
              className="btn focusable"
              onClick={() => navigate("/vault-dashboard")}
            >
              Enter Vault
            </button>
          ) : (
            <button
              className="btn btn-primary focusable"
              onClick={() => navigate("/join")}
            >
              Join The Vault — $50
            </button>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
