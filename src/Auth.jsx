import { useState } from "react";
import { supabase } from "./supabase";

export default function Auth({ onLogin, t }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account!");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      onLogin(data.user);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 440,
        width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #C9A84C, #E8CC80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, color: "#0A1628",
          }}>R1</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: t.text }}>Run It For One</span>
        </div>

        <h2 style={{
          fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 6,
        }}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 28 }}>
          {mode === "login" ? "Log in to continue your studies" : "Start tracking your syllabus today"}
        </p>

        {/* Tabs */}
        <div style={{
          display: "flex", background: t.bg, borderRadius: 10,
          padding: 4, marginBottom: 24,
        }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); setMessage(""); }}
              style={{
                flex: 1, padding: "9px", borderRadius: 8, border: "none",
                background: mode === m ? "#C9A84C" : "transparent",
                color: mode === m ? "#0A1628" : t.textMuted,
                fontWeight: mode === m ? 700 : 400,
                cursor: "pointer", fontSize: 14,
                transition: "all 0.2s",
              }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: t.textMuted, display: "block", marginBottom: 6 }}>Full Name</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Tendai Moyo"
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10,
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg, color: t.text, fontSize: 15,
                outline: "none",
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: t.textMuted, display: "block", marginBottom: 6 }}>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 10,
              border: `1px solid ${t.inputBorder}`,
              background: t.inputBg, color: t.text, fontSize: 15,
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: t.textMuted, display: "block", marginBottom: 6 }}>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="minimum 6 characters"
            type="password"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 10,
              border: `1px solid ${t.inputBorder}`,
              background: t.inputBg, color: t.text, fontSize: 15,
              outline: "none",
            }}
          />
        </div>

        {error && (
          <div style={{
            background: "#FF000015", border: "1px solid #FF000033",
            borderRadius: 8, padding: "10px 14px",
            color: "#CC0000", fontSize: 13, marginBottom: 16,
          }}>{error}</div>
        )}

        {message && (
          <div style={{
            background: "#00AA0015", border: "1px solid #00AA0033",
            borderRadius: 8, padding: "10px 14px",
            color: "#007700", fontSize: 13, marginBottom: 16,
          }}>{message}</div>
        )}

        <button
          onClick={mode === "login" ? handleLogin : handleSignup}
          disabled={loading}
          style={{
            width: "100%", padding: "13px",
            background: "linear-gradient(135deg, #C9A84C, #E8CC80)",
            border: "none", borderRadius: 10,
            color: "#0A1628", fontWeight: 700, fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}>
          {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
        </button>
      </div>
    </div>
  );
}