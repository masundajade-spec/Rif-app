import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

export default function TestView({ t, user }) {
  const [stage, setStage] = useState("list"); // list, instructions, test, results
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violations, setViolations] = useState(0);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const timerRef = useRef(null);
  const violationsRef = useRef(0);

  useEffect(() => {
    loadTests();
  }, []);

  useEffect(() => {
    if (stage === "test") {
      // Anti-cheat: detect tab switch
      const handleVisibilityChange = () => {
        if (document.hidden) {
          violationsRef.current += 1;
          setViolations(violationsRef.current);
          setWarning(`⚠️ Warning ${violationsRef.current}/3: Do not switch tabs during the test!`);
          setTimeout(() => setWarning(""), 4000);
          if (violationsRef.current >= 3) {
            submitTest(true);
          }
        }
      };

      // Anti-cheat: detect copy
      const handleCopy = (e) => {
        e.preventDefault();
        setWarning("⚠️ Copying is not allowed during the test!");
        setTimeout(() => setWarning(""), 3000);
      };

      // Anti-cheat: detect right click
      const handleContextMenu = (e) => {
        e.preventDefault();
        setWarning("⚠️ Right click is disabled during the test!");
        setTimeout(() => setWarning(""), 3000);
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("copy", handleCopy);
      document.addEventListener("contextmenu", handleContextMenu);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        document.removeEventListener("copy", handleCopy);
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "test" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            submitTest(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  async function loadTests() {
    const { data } = await supabase.from("tests").select("*");
    if (data) setTests(data);
    setLoading(false);
  }

  async function startTest(test) {
    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("test_id", test.id);
    if (data) {
      setQuestions(data);
      setActiveTest(test);
      setTimeLeft(test.duration_minutes * 60);
      setAnswers({});
      setViolations(0);
      violationsRef.current = 0;
      setStage("instructions");
    }
  }

  async function submitTest(forceSubmit) {
    clearInterval(timerRef.current);
    let score = 0;
    let total = questions.length;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) score++;
    });

    const { data } = await supabase.from("test_attempts").insert({
      test_id: activeTest.id,
      user_id: user.id,
      score,
      total_marks: total,
      completed_at: new Date().toISOString(),
      violations: violationsRef.current,
    }).select();

    setResults({ score, total, violations: violationsRef.current, forceSubmit });
    setStage("results");
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timeColor = timeLeft < 300 ? "#F44336" : timeLeft < 600 ? "#FF9800" : "#1A7A4A";

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading tests...</div>
    </div>
  );

  // Test list
  if (stage === "list") return (
    <div style={{ padding: "32px 36px", maxWidth: 900, background: t.bg, minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>
        Online Tests
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28 }}>
        Supervised practice tests for Cambridge & ZIMSEC
      </p>

      <div style={{ background: "#FF980015", borderRadius: 12, padding: "16px 20px", marginBottom: 28, borderLeftWidth: 4, borderLeftStyle: "solid", borderLeftColor: "#FF9800" }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#FF9800", fontWeight: 700, marginBottom: 4 }}>
          ⚠️ Anti-Cheat Notice
        </div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text }}>
          All tests are supervised. Tab switching, copying and right-clicking are disabled. 3 violations will auto-submit your test.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {tests.map(test => (
          <div key={test.id} className="hover-lift" style={{ background: t.card, borderRadius: 16, padding: 24, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: "#1A4DB3" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ background: "#1A4DB322", color: "#1A4DB3", borderRadius: 6, padding: "3px 10px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>
                {test.curriculum} · {test.level}
              </div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
                ⏱ {test.duration_minutes} mins
              </div>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: t.text, marginBottom: 8 }}>
              {test.title}
            </h3>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 16 }}>
              {test.subject}
            </div>
            <button
              onClick={() => startTest(test)}
              style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "11px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}
            >
              Start Test →
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Instructions
  if (stage === "instructions") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: t.bg, padding: 24 }}>
      <div style={{ background: t.card, borderRadius: 20, padding: "40px 36px", maxWidth: 520, width: "100%" }}>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>📝</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: t.text, textAlign: "center", marginBottom: 8 }}>
          Ready to Start?
        </h2>
        <h3 style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: t.textMuted, textAlign: "center", marginBottom: 24 }}>
          {activeTest?.title}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {[
            ["📚", `${questions.length} questions`],
            ["⏱", `${activeTest?.duration_minutes} minutes`],
            ["🚫", "No tab switching allowed"],
            ["🚫", "No copying allowed"],
            ["⚠️", "3 violations = auto submit"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: t.bg, borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text }}>{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setStage("test")}
          style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 12, padding: "14px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16 }}
        >
          Begin Test →
        </button>
        <button
          onClick={() => setStage("list")}
          style={{ width: "100%", background: "transparent", border: "none", borderRadius: 12, padding: "12px", color: t.textMuted, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, marginTop: 8 }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );

  // Test screen
  if (stage === "test") return (
    <div style={{ minHeight: "100vh", background: t.bg, userSelect: "none" }}>
      {/* Warning banner */}
      {warning && (
        <div style={{ background: "#F44336", color: "#fff", padding: "12px 24px", textAlign: "center", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
          {warning}
        </div>
      )}

      {/* Header */}
      <div style={{ background: t.card, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: t.cardBorder, marginTop: warning ? 44 : 0 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, fontWeight: 700 }}>{activeTest?.title}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
            {Object.keys(answers).length}/{questions.length} answered · Violations: {violations}/3
          </div>
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: timeColor }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Questions */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{ background: t.card, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8 }}>
              Question {index + 1} of {questions.length} · {q.marks} mark{q.marks > 1 ? "s" : ""}
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: t.text, fontWeight: 600, marginBottom: 20, lineHeight: 1.5 }}>
              {q.question}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["A", "B", "C", "D"].map(option => {
                const optionText = q[`option_${option.toLowerCase()}`];
                const isSelected = answers[q.id] === option;
                return (
                  <div key={option} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: option }))} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    borderRadius: 10, cursor: "pointer",
                    background: isSelected ? "#1A4DB322" : t.bg,
                    borderWidth: 2, borderStyle: "solid", borderColor: isSelected ? "#1A4DB3" : t.cardBorder,
                    transition: "all 0.2s",
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: isSelected ? "#1A4DB3" : t.cardBorder,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isSelected ? "#fff" : t.textMuted,
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700,
                    }}>
                      {option}
                    </div>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text }}>
                      {optionText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={() => submitTest(false)}
          style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 12, padding: "14px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, marginTop: 8 }}
        >
          Submit Test →
        </button>
      </div>
    </div>
  );

  // Results
  if (stage === "results") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: t.bg, padding: 24 }}>
      <div style={{ background: t.card, borderRadius: 20, padding: "40px 36px", maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {results.score / results.total >= 0.7 ? "🎉" : results.score / results.total >= 0.5 ? "👍" : "📚"}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: t.text, marginBottom: 8 }}>
          {results.forceSubmit ? "Test Auto-Submitted" : "Test Complete!"}
        </h2>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 700, color: results.score / results.total >= 0.7 ? "#1A7A4A" : results.score / results.total >= 0.5 ? "#C9A84C" : "#F44336", margin: "16px 0" }}>
          {results.score}/{results.total}
        </div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: t.textMuted, marginBottom: 8 }}>
          {Math.round(results.score / results.total * 100)}% · {results.score / results.total >= 0.7 ? "Excellent!" : results.score / results.total >= 0.5 ? "Good effort!" : "Keep studying!"}
        </div>
        {results.violations > 0 && (
          <div style={{ background: "#F4433615", borderRadius: 8, padding: "8px 16px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#F44336" }}>
            ⚠️ {results.violations} violation{results.violations > 1 ? "s" : ""} recorded
          </div>
        )}
        <button
          onClick={() => { setStage("list"); setResults(null); }}
          style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 12, padding: "14px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, marginTop: 16 }}
        >
          Back to Tests
        </button>
      </div>
    </div>
  );
}