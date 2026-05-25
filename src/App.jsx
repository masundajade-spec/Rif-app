import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const theme = {
  light: {
    bg: "#F4F6FB", card: "#FFFFFF", cardBorder: "#E2E8F4",
    sidebar: "#0A1628", text: "#0A1628", textMuted: "#6B7A99",
    gold: "#C9A84C", goldLight: "#F5E6B8", blue: "#0D2B6B",
    blueAccent: "#1A4DB3", badge: "#E8F0FF", badgeText: "#1A4DB3",
    success: "#1A7A4A", successBg: "#E6F7EE", inputBg: "#FFFFFF",
    inputBorder: "#C5CFDF",
  },
  dark: {
    bg: "#08101E", card: "#111C2E", cardBorder: "#1E2D47",
    sidebar: "#060D19", text: "#E8EDF7", textMuted: "#7A8BA8",
    gold: "#C9A84C", goldLight: "#2A2210", blue: "#1A4DB3",
    blueAccent: "#3468D1", badge: "#0D1F3C", badgeText: "#6B9EFF",
    success: "#2ECC71", successBg: "#0D2820", inputBg: "#111C2E",
    inputBorder: "#1E2D47",
  },
};

const subjects = [
  { name: "Mathematics", progress: 68, color: "#1A4DB3", chapters: 12, done: 8 },
  { name: "Physics", progress: 45, color: "#C9A84C", chapters: 10, done: 4 },
  { name: "Chemistry", progress: 82, color: "#1A7A4A", chapters: 9, done: 7 },
  { name: "English Language", progress: 30, color: "#8B3FC8", chapters: 8, done: 2 },
];

const books = [
  { title: "O-Level Mathematics Complete", author: "ZimEdPress", price: "$4.99/mo", tag: "ZIMSEC", color: "#0D2B6B" },
  { title: "Cambridge Physics Mastery", author: "CambridgeEd", price: "$5.99/mo", tag: "Cambridge", color: "#1A7A4A" },
  { title: "Chemistry Made Simple", author: "AfriLearn", price: "$3.99/mo", tag: "ZIMSEC", color: "#8B3FC8" },
  { title: "A-Level Economics Guide", author: "ZimEdPress", price: "$4.99/mo", tag: "Cambridge", color: "#C9A84C" },
];

const navItems = [
  { id: "Dashboard", icon: "⊞", label: "Dashboard" },
  { id: "Syllabus", icon: "✓", label: "Syllabus" },
  { id: "Library", icon: "▤", label: "Library" },
  { id: "Chat", icon: "💬", label: "Chat" },
  { id: "Teacher", icon: "◎", label: "Teacher" },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [screen, setScreen] = useState("Landing");
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const t = isDark ? theme.dark : theme.light;

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setScreen("Dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setScreen("Dashboard");
      } else {
        setUser(null);
        setScreen("Landing");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setScreen("Landing");
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Georgia', serif", color: t.text, transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .gold-btn { background: linear-gradient(135deg, #C9A84C, #E8CC80); color: #0A1628; border: none; cursor: pointer; font-weight: 700; font-family: 'Source Sans 3', sans-serif; letter-spacing: 0.04em; transition: opacity 0.2s, transform 0.15s; }
        .gold-btn:hover { opacity: 0.92; transform: scale(1.02); }
        .outline-btn { background: transparent; cursor: pointer; font-family: 'Source Sans 3', sans-serif; transition: background 0.2s; }
        .nav-item { cursor: pointer; transition: all 0.2s; }
        .progress-fill { height: 100%; border-radius: 99px; transition: width 1s ease; }
        .tab-btn { cursor: pointer; transition: all 0.2s; border: none; font-family: 'Source Sans 3', sans-serif; }
        input { outline: none; transition: border 0.2s; }
        input:focus { border-color: #C9A84C !important; }
      `}</style>

      {screen === "Landing" && <LandingScreen t={t} isDark={isDark} setIsDark={setIsDark} setScreen={setScreen} />}
      {screen === "Login" && <AuthScreen t={t} mode="login" setScreen={setScreen} />}
      {screen === "Signup" && <AuthScreen t={t} mode="signup" setScreen={setScreen} step={step} setStep={setStep} selected={selected} setSelected={setSelected} />}
      {["Dashboard", "Syllabus", "Library", "Chat", "Teacher"].includes(screen) && (
        <AppShell t={t} isDark={isDark} setIsDark={setIsDark} screen={screen} setScreen={setScreen} user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
}

function LandingScreen({ t, isDark, setIsDark, setScreen }) {
  return (
    <div style={{ minHeight: "100vh", background: isDark ? "#08101E" : "#0A1628", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, right: -120, width: 480, height: 480, borderRadius: "50%", border: "1.5px solid #C9A84C33", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", border: "1.5px solid #C9A84C55", pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "#0A1628" }}>R1</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#F4F6FB" }}>Run It For One</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setIsDark(!isDark)} style={{ background: "#FFFFFF15", border: "1px solid #FFFFFF22", borderRadius: 8, padding: "6px 12px", color: "#F4F6FB", cursor: "pointer", fontSize: 14 }}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button className="outline-btn" onClick={() => setScreen("Login")} style={{ border: "1px solid #C9A84C66", borderRadius: 8, padding: "8px 18px", color: "#C9A84C", fontSize: 14 }}>Log In</button>
          <button className="gold-btn" style={{ borderRadius: 8, padding: "8px 18px", fontSize: 14 }} onClick={() => setScreen("Signup")}>Get Started</button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "80px auto 0", padding: "0 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#C9A84C22", border: "1px solid #C9A84C55", borderRadius: 99, padding: "6px 18px", fontSize: 13, color: "#C9A84C", marginBottom: 28, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Cambridge & ZIMSEC · Zimbabwe's Edtech Platform
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px, 7vw, 72px)", lineHeight: 1.08, color: "#F4F6FB", marginBottom: 24 }}>
          Your Syllabus.<br /><span style={{ color: "#C9A84C" }}>Your Pace.</span><br />Your Future.
        </h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.7, color: "#A0AECB", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
          Track every topic, access curated books, and get coached through your Cambridge & ZIMSEC subjects. Built for Zimbabwean students who are serious about results.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="gold-btn" style={{ borderRadius: 10, padding: "14px 32px", fontSize: 16 }} onClick={() => setScreen("Signup")}>Start Free Today →</button>
          <button className="outline-btn" style={{ border: "1px solid #FFFFFF22", borderRadius: 10, padding: "14px 32px", fontSize: 16, color: "#A0AECB" }}>See How It Works</button>
        </div>
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 64, borderTop: "1px solid #FFFFFF0F", paddingTop: 40, flexWrap: "wrap" }}>
          {[["Cambridge & ZIMSEC", "Dual Curriculum"], ["EcoCash + Card", "Local Payments"], ["Anti-Cheat Tech", "Supervised Tests"], ["Teachers + Students", "Both Supported"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center", padding: "0 32px", borderRight: "1px solid #FFFFFF0F" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#C9A84C" }}>{val}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B7A99", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthScreen({ t, mode, setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [curriculum, setCurriculum] = useState("zimsec");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role, curriculum }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        // Create profile
        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName,
            role,
            curriculum,
         }, { onConflict: "id" });
        }
        setSuccess("Account created! Check your email to confirm, then log in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: `1.5px solid ${t.inputBorder}`, background: t.inputBg,
    color: t.text, fontSize: 15, fontFamily: "'Source Sans 3', sans-serif",
  };

  const labelStyle = {
    fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
    color: t.textMuted, marginBottom: 6, display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: t.card, borderRadius: 20, padding: "40px 36px", border: `1px solid ${t.cardBorder}`, maxWidth: 460, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16, color: "#0A1628" }}>R1</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: t.text }}>Run It For One</span>
        </div>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: t.text, marginBottom: 6 }}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28, fontSize: 14 }}>
          {mode === "login" ? "Log in to continue your studies" : "Join thousands of Zimbabwean students"}
        </p>

        {error && (
          <div style={{ background: "#FF000015", border: "1px solid #FF000044", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#CC0000" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: t.successBg, border: `1px solid ${t.success}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.success }}>
            {success}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mode === "signup" && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} placeholder="e.g. Tendai Moyo" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email Address</label>
            <input style={inputStyle} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label style={labelStyle}>I am a...</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["student", "🎓", "Student"], ["teacher", "📋", "Teacher"], ["parent", "👁️", "Parent"]].map(([val, icon, label]) => (
                    <div key={val} onClick={() => setRole(val)} style={{ border: `2px solid ${role === val ? "#C9A84C" : t.cardBorder}`, borderRadius: 10, padding: "10px 8px", cursor: "pointer", background: role === val ? t.goldLight : t.card, textAlign: "center" }}>
                      <div style={{ fontSize: 20 }}>{icon}</div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.text, marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Curriculum</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["zimsec", "🇿🇼", "ZIMSEC"], ["cambridge", "🎖️", "Cambridge"], ["both", "⚡", "Both"]].map(([val, icon, label]) => (
                    <div key={val} onClick={() => setCurriculum(val)} style={{ border: `2px solid ${curriculum === val ? "#C9A84C" : t.cardBorder}`, borderRadius: 10, padding: "10px 8px", cursor: "pointer", background: curriculum === val ? t.goldLight : t.card, textAlign: "center" }}>
                      <div style={{ fontSize: 20 }}>{icon}</div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.text, marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button className="gold-btn" onClick={handleAuth} disabled={loading} style={{ borderRadius: 10, padding: "14px", fontSize: 15, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.textMuted }}>
          {mode === "login" ? (
            <>Don't have an account? <span onClick={() => setScreen("Signup")} style={{ color: "#C9A84C", cursor: "pointer", fontWeight: 600 }}>Sign up free</span></>
          ) : (
            <>Already have an account? <span onClick={() => setScreen("Login")} style={{ color: "#C9A84C", cursor: "pointer", fontWeight: 600 }}>Log in</span></>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span onClick={() => setScreen("Landing")} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, cursor: "pointer" }}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}

function AppShell({ t, isDark, setIsDark, screen, setScreen, user, handleLogout }) {
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";
  const name = user?.user_metadata?.full_name || user?.email || "Student";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: 220, background: t.sidebar, display: "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 20px 28px", borderBottom: "1px solid #FFFFFF0A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16, color: "#0A1628" }}>R1</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: "#F4F6FB" }}>Run It For One</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map(item => {
            const isActive = screen === item.id;
            return (
              <div key={item.id} className="nav-item" onClick={() => setScreen(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, marginBottom: 4, background: isActive ? "#C9A84C18" : "transparent", borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: isActive ? "#C9A84C" : "transparent" }}>
                <span style={{ fontSize: 18, opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? "#C9A84C" : "#8899BB" }}>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div style={{ padding: "16px 16px 0", borderTop: "1px solid #FFFFFF0A" }}>
          <button onClick={() => setIsDark(!isDark)} style={{ width: "100%", background: "#FFFFFF0A", border: "1px solid #FFFFFF11", borderRadius: 8, padding: "8px 12px", color: "#8899BB", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, marginBottom: 12 }}>
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1A4DB3, #C9A84C)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif" }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#D0DBF0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#6B7A99" }}>Student</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: "100%", background: "#FF000015", border: "1px solid #FF000033", borderRadius: 8, padding: "8px 12px", color: "#FF6666", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
            Log Out
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: t.bg }}>
        {screen === "Dashboard" && <DashboardView t={t} user={user} />}
        {screen === "Syllabus" && <SyllabusView t={t} />}
        {screen === "Library" && <LibraryView t={t} />}
        {screen === "Chat" && <ChatView t={t} user={user} />}
        {screen === "Teacher" && <TeacherView t={t} />}
      </div>
    </div>
  );
}

function DashboardView({ t, user }) {
  const name = user?.user_metadata?.full_name?.split(" ")[0] || "Student";

  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, fontSize: 14, marginBottom: 6 }}>Good morning 👋</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 30, color: t.text }}>{name}'s Dashboard</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Overall Progress", value: "56%", sub: "Across 4 subjects", color: "#1A4DB3" },
          { label: "Topics Completed", value: "21/39", sub: "Keep pushing!", color: "#C9A84C" },
          { label: "Study Streak", value: "12 days", sub: "Personal best 🔥", color: "#1A7A4A" },
        ].map(stat => (
          <div key={stat.label} className="hover-lift" style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "22px 20px", borderTop: `3px solid ${stat.color}` }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: t.text }}>{stat.value}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: stat.color, marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: "24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text }}>Subject Progress</h2>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", cursor: "pointer" }}>View All →</span>
        </div>
        {subjects.map(sub => (
          <div key={sub.name} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: t.text }}>{sub.name}</span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>{sub.done}/{sub.chapters} topics</span>
            </div>
            <div style={{ background: t.bg, borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div className="progress-fill" style={{ width: `${sub.progress}%`, background: sub.color }} />
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: sub.color, marginTop: 4 }}>{sub.progress}% complete</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: t.text, marginBottom: 16 }}>Up Next</h3>
          {[
            { subj: "Mathematics", topic: "Quadratic Equations", time: "Today" },
            { subj: "Physics", topic: "Newton's Laws", time: "Tomorrow" },
            { subj: "Chemistry", topic: "Organic Chemistry", time: "Thu" },
          ].map(item => (
            <div key={item.topic} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${t.cardBorder}` }}>
              <div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: t.text }}>{item.topic}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{item.subj}</div>
              </div>
              <span style={{ background: t.badge, color: t.badgeText, borderRadius: 6, padding: "3px 10px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>{item.time}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Ready to test yourself?</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F4F6FB", lineHeight: 1.3 }}>Mathematics<br />Practice Test</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#A0AECB", marginTop: 8 }}>20 questions · 45 minutes · Supervised</p>
          </div>
          <button className="gold-btn" style={{ borderRadius: 10, padding: "12px", fontSize: 14, marginTop: 20 }}>Start Test →</button>
        </div>
      </div>
    </div>
  );
}

function SyllabusView({ t }) {
  const [active, setActive] = useState("Mathematics");
  const subj = subjects.find(s => s.name === active);

  const topics = [
    { name: "Number & Algebra Foundations", status: "done" },
    { name: "Linear Equations & Graphs", status: "done" },
    { name: "Quadratic Expressions", status: "done" },
    { name: "Simultaneous Equations", status: "done" },
    { name: "Quadratic Equations", status: "active" },
    { name: "Indices & Logarithms", status: "upcoming" },
    { name: "Sequences & Series", status: "upcoming" },
    { name: "Functions & Mappings", status: "upcoming" },
    { name: "Matrices & Transformations", status: "upcoming" },
    { name: "Statistics & Probability", status: "upcoming" },
    { name: "Trigonometry", status: "skipped" },
    { name: "Vectors", status: "upcoming" },
  ];

  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>Syllabus Tracker</h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28 }}>Track every topic across your subjects</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {subjects.map(s => (
          <button key={s.name} className="tab-btn" onClick={() => setActive(s.name)} style={{ padding: "8px 18px", borderRadius: 99, background: active === s.name ? s.color : t.card, border: `1px solid ${active === s.name ? s.color : t.cardBorder}`, color: active === s.name ? "#fff" : t.textMuted, fontSize: 14, fontWeight: 600 }}>{s.name}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${t.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text }}>{active}</h3>
            <span style={{ background: t.badge, color: t.badgeText, borderRadius: 6, padding: "3px 12px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>{subj?.done}/{subj?.chapters} done</span>
          </div>
          {topics.map((topic, i) => (
            <div key={topic.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: i < topics.length - 1 ? `1px solid ${t.cardBorder}` : "none", background: topic.status === "active" ? `${subj?.color}11` : "transparent" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: topic.status === "done" ? "#1A7A4A" : topic.status === "active" ? subj?.color : topic.status === "skipped" ? "#8B3FC8" : t.cardBorder, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>
                {topic.status === "done" ? "✓" : topic.status === "active" ? "▶" : topic.status === "skipped" ? "~" : ""}
              </div>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: topic.status === "done" ? t.textMuted : t.text, fontWeight: topic.status === "active" ? 600 : 400, textDecoration: topic.status === "skipped" ? "line-through" : "none" }}>{topic.name}</span>
              {topic.status === "active" && <span style={{ marginLeft: "auto", background: `${subj?.color}22`, color: subj?.color, borderRadius: 6, padding: "2px 10px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>In Progress</span>}
              {topic.status === "skipped" && <span style={{ marginLeft: "auto", background: "#8B3FC822", color: "#8B3FC8", borderRadius: 6, padding: "2px 10px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12 }}>Not Tested</span>}
            </div>
          ))}
        </div>

        <div>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: t.text, marginBottom: 16 }}>Progress</h4>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: subj?.color }}>{subj?.progress}%</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>Completed</div>
            </div>
            <div style={{ background: t.bg, borderRadius: 99, height: 10, overflow: "hidden" }}>
              <div className="progress-fill" style={{ width: `${subj?.progress}%`, background: subj?.color }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
              {[["Done", "8", "#1A7A4A"], ["Remaining", "3", "#1A4DB3"], ["Skipped", "1", "#8B3FC8"], ["Active", "1", "#C9A84C"]].map(([label, val, color]) => (
                <div key={label} style={{ background: t.bg, borderRadius: 8, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color }}>{val}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="gold-btn" style={{ width: "100%", borderRadius: 10, padding: "12px", fontSize: 14 }}>Continue Learning →</button>
        </div>
      </div>
    </div>
  );
}

function LibraryView({ t }) {
  const [tab, setTab] = useState("All");
  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>Book Library</h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28 }}>Curated resources for Cambridge & ZIMSEC</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        {["All", "ZIMSEC", "Cambridge", "My Books"].map(tb => (
          <button key={tb} className="tab-btn" onClick={() => setTab(tb)} style={{ padding: "7px 18px", borderRadius: 99, background: tab === tb ? "#C9A84C" : t.card, border: `1px solid ${tab === tb ? "#C9A84C" : t.cardBorder}`, color: tab === tb ? "#0A1628" : t.textMuted, fontSize: 14, fontWeight: tab === tb ? 700 : 400 }}>{tb}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
        {books.map(book => (
          <div key={book.title} className="hover-lift" style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, overflow: "hidden", display: "flex" }}>
            <div style={{ width: 80, background: `linear-gradient(160deg, ${book.color}, ${book.color}88)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 28 }}>📖</span>
            </div>
            <div style={{ padding: "16px 18px", flex: 1 }}>
              <span style={{ background: t.badge, color: t.badgeText, borderRadius: 4, padding: "2px 8px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600 }}>{book.tag}</span>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: t.text, marginTop: 6, marginBottom: 4, lineHeight: 1.3 }}>{book.title}</h4>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginBottom: 10 }}>{book.author}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#C9A84C" }}>{book.price}</span>
                <button className="gold-btn" style={{ borderRadius: 7, padding: "5px 14px", fontSize: 12 }}>Subscribe</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", borderRadius: 16, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", marginBottom: 6 }}>📚 ALL ACCESS PLAN</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F4F6FB" }}>Unlock Every Book</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", marginTop: 6 }}>Full library access · EcoCash or Card · Cancel anytime</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#C9A84C" }}>$9.99<span style={{ fontSize: 14, color: "#A0AECB" }}>/mo</span></div>
          <button className="gold-btn" style={{ borderRadius: 10, padding: "10px 22px", fontSize: 14, marginTop: 10 }}>Get All Access</button>
        </div>
      </div>
    </div>
  );
}

function TeacherView({ t }) {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>Teacher Dashboard</h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28 }}>Manage syllabus, students & lessons</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active Students", value: "34", icon: "👥", color: "#1A4DB3" },
          { label: "Topics Covered", value: "18/24", icon: "✅", color: "#1A7A4A" },
          { label: "Tests This Term", value: "7", icon: "📝", color: "#C9A84C" },
        ].map(stat => (
          <div key={stat.label} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "20px", borderTop: `3px solid ${stat.color}` }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: t.text }}>{stat.value}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 16 }}>Syllabus Control</h3>
          {[
            { topic: "Quadratic Equations", action: "Keep", color: "#1A7A4A" },
            { topic: "Trigonometry", action: "Skip for Exam", color: "#8B3FC8" },
            { topic: "Matrices", action: "Keep", color: "#1A7A4A" },
            { topic: "Vectors", action: "Mark Optional", color: "#C9A84C" },
          ].map(item => (
            <div key={item.topic} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${t.cardBorder}` }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text }}>{item.topic}</span>
              <span style={{ background: `${item.color}22`, color: item.color, borderRadius: 6, padding: "3px 12px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>{item.action}</span>
            </div>
          ))}
          <button className="gold-btn" style={{ width: "100%", borderRadius: 10, padding: "11px", fontSize: 14, marginTop: 16 }}>Edit Syllabus Plan</button>
        </div>

        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 16 }}>Student Overview</h3>
          {[
            { name: "Tendai S.", progress: 68, status: "On Track" },
            { name: "Rudo M.", progress: 45, status: "Needs Help" },
            { name: "Farai N.", progress: 82, status: "Ahead" },
            { name: "Chido K.", progress: 30, status: "Behind" },
          ].map(student => (
            <div key={student.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: t.text }}>{student.name}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: student.status === "Ahead" ? "#1A7A4A" : student.status === "On Track" ? "#1A4DB3" : student.status === "Needs Help" ? "#C9A84C" : "#CC3333" }}>{student.status}</span>
              </div>
              <div style={{ background: t.bg, borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div className="progress-fill" style={{ width: `${student.progress}%`, background: student.status === "Ahead" ? "#1A7A4A" : student.status === "On Track" ? "#1A4DB3" : student.status === "Needs Help" ? "#C9A84C" : "#CC3333" }} />
              </div>
            </div>
          ))}
          <button className="gold-btn" style={{ width: "100%", borderRadius: 10, padding: "11px", fontSize: 14, marginTop: 8 }}>View All Students</button>
        </div>
      </div>
    </div>
  );
}
function ChatView({ t, user }) {
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const rooms = [
    { id: 1, name: "Mathematics", level: "O-Level", curriculum: "ZIMSEC", color: "#1A4DB3" },
    { id: 2, name: "Physics", level: "O-Level", curriculum: "ZIMSEC", color: "#2196F3" },
    { id: 3, name: "Chemistry", level: "O-Level", curriculum: "ZIMSEC", color: "#9C27B0" },
    { id: 4, name: "Biology", level: "O-Level", curriculum: "ZIMSEC", color: "#4CAF50" },
    { id: 5, name: "English Language", level: "O-Level", curriculum: "ZIMSEC", color: "#8B3FC8" },
    { id: 6, name: "Economics", level: "A-Level", curriculum: "ZIMSEC", color: "#F44336" },
    { id: 7, name: "History", level: "O-Level", curriculum: "ZIMSEC", color: "#795548" },
    { id: 8, name: "Geography", level: "O-Level", curriculum: "ZIMSEC", color: "#00BCD4" },
    { id: 9, name: "Computer Science", level: "O-Level", curriculum: "ZIMSEC", color: "#3F51B5" },
    { id: 10, name: "Mathematics", level: "O-Level", curriculum: "Cambridge", color: "#1565C0" },
    { id: 11, name: "General Discussion", level: "All", curriculum: "All", color: "#C9A84C" },
  ];

  const userName = user?.user_metadata?.full_name || user?.email || "Student";

  async function loadMessages(room) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", room.id)
      .order("created_at", { ascending: true })
      .limit(50);
    if (data) setMessages(data);
  }

  async function sendMessage() {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      room_id: activeRoom.id,
      user_id: user.id,
      user_name: userName,
      content: newMessage.trim(),
    });
    setNewMessage("");
    setSending(false);
    await loadMessages(activeRoom);
  }
  
 return (
    <div style={{ display: "flex", height: "100vh", }}>
      <div style={{
        width: 240,
        background: t.card,
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: t.cardBorder,
        overflowY: "auto",
      }}>
        <div style={{
          padding: "20px 16px",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: t.cardBorder,
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, fontWeight: 700 }}>
            💬 Study Chat
          </div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 4 }}>
            Discuss with classmates
          </div>
        </div>
      <div style={{ padding: "8px 8px 0" }}>
  <input
    placeholder="Search subjects..."
    onChange={e => setSearch(e.target.value)}
    style={{
      width: "100%", padding: "8px 12px", borderRadius: 8,
      borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder,
      background: t.bg, color: t.text,
      fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
      outline: "none", marginBottom: 8,
    }}
  />
</div>
<div style={{ padding: 8 }}>
  {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => (
            <div key={room.id} onClick={() => { setActiveRoom(room); loadMessages(room); }} style={{
              padding: "12px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
              background: activeRoom?.id === room.id ? room.color + "22" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: room.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: t.text }}>{room.name}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{room.curriculum} · {room.level}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeRoom ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: t.bg }}>
          <div style={{
            padding: "16px 24px",
            background: t.card,
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: t.cardBorder,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: activeRoom.color }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, fontWeight: 700 }}>{activeRoom.name}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{activeRoom.curriculum} · {activeRoom.level}</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", marginTop: 60, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.textMuted }}>
                No messages yet — start the discussion! 🎓
              </div>
            )}
            {messages.map(msg => {
              const isMe = msg.user_id === user?.id;
              return (
                <div key={msg.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 10, alignItems: "flex-end", marginBottom: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: isMe ? "linear-gradient(135deg, #C9A84C, #E8CC80)" : "linear-gradient(135deg, #1A4DB3, #3468D1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {msg.user_name?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ maxWidth: "65%" }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted, marginBottom: 3, textAlign: isMe ? "right" : "left" }}>
                      {isMe ? "You" : msg.user_name}
                    </div>
                    <div style={{ background: isMe ? "linear-gradient(135deg, #C9A84C, #E8CC80)" : t.card, borderRadius: 12, padding: "10px 14px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: isMe ? "#0A1628" : t.text }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            padding: "16px 24px",
            background: t.card,
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: t.cardBorder,
            display: "flex",
            gap: 12,
          }}>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message and press Enter..."
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 12,
                borderWidth: 1.5, borderStyle: "solid", borderColor: t.cardBorder,
                background: t.bg, color: t.text,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8CC80)",
                borderWidth: 0, borderRadius: 12,
                padding: "12px 20px", color: "#0A1628",
                fontWeight: 700, cursor: "pointer", fontSize: 14,
                opacity: sending || !newMessage.trim() ? 0.5 : 1,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {sending ? "..." : "Send →"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: t.bg }}>
          <div style={{ fontSize: 56 }}>💬</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, fontWeight: 700 }}>Select a Chat Room</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Choose a subject from the left</div>
        </div>
      )}
    </div>
  );
}