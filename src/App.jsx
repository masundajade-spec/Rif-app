import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import TestView from "./Test";
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
  // ZIMSEC O-Level
  { title: "Maths Today O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#1A4DB3" },
  { title: "O-Level Mathematics Complete", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#0D47A1" },
  { title: "Additional Mathematics O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#1565C0" },
  { title: "Pure Mathematics O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#1976D2" },
  { title: "Statistics O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#00838F" },
  { title: "Combined Science for Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#1A7A4A" },
  { title: "O-Level Physics Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#2196F3" },
  { title: "O-Level Chemistry Zimbabwe", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#9C27B0" },
  { title: "O-Level Biology Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#4CAF50" },
  { title: "Agriculture O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#8BC34A" },
  { title: "Crop Science O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#689F38" },
  { title: "Animal Science O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#558B2F" },
  { title: "History of Africa & Zimbabwe", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#795548" },
  { title: "Economic History O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#6D4C41" },
  { title: "Geography for Zimbabwe O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#00BCD4" },
  { title: "Sociology O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#EC407A" },
  { title: "Family and Religious Studies", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#FF9800" },
  { title: "Heritage Studies Zimbabwe", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#8D6E63" },
  { title: "Commerce O-Level Zimbabwe", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#FF5722" },
  { title: "Business Studies O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#FF9800" },
  { title: "Economics O-Level Guide", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#F44336" },
  { title: "Business Enterprise O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#E64A19" },
  { title: "Business Enterprise and Skills", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#BF360C" },
  { title: "Principles of Accounts Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#607D8B" },
  { title: "Shona O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#C9A84C" },
  { title: "Ndebele O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#E8803A" },
  { title: "Literature in English O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#6A1B9A" },
  { title: "Literature in Shona", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#A67C00" },
  { title: "Literature in Ndebele", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#D4840A" },
  { title: "French for Zimbabwe Schools", author: "Longman Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#009688" },
  { title: "Sign Language O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#26A69A" },
  { title: "Communication Skills O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#00ACC1" },
  { title: "English for Communication", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#7B1FA2" },
  { title: "Computer Science O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#3F51B5" },
  { title: "ICT O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#303F9F" },
  { title: "Building Technology and Design", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#5D4037" },
  { title: "Wood Technology and Design", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#6D4C41" },
  { title: "Metal Technology and Design", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#455A64" },
  { title: "Design and Technology", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#546E7A" },
  { title: "Technical Graphics O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#37474F" },
  { title: "Food Technology and Design", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#E91E63" },
  { title: "Fashion and Fabrics O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#F06292" },
  { title: "Textile Technology O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#EC407A" },
  { title: "Hospitality Management and Design", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#AD1457" },
  { title: "Home Management O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#C2185B" },
  { title: "Art and Design O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#FF4081" },
  { title: "Music O-Level Zimbabwe", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#7C4DFF" },
  { title: "Dance O-Level Zimbabwe", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#651FFF" },
  { title: "Theatre Arts O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#6200EA" },
  { title: "Physical Education O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#00C853" },
  { title: "Sport Management O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#1B5E20" },
  { title: "Sport and Technology O-Level", author: "College Press Zimbabwe", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#2E7D32" },
  { title: "Guidance and Counselling O-Level", author: "ZimEdPress", price: "$2.99/mo", tag: "ZIMSEC O-Level", color: "#78909C" },

  // ZIMSEC A-Level
  { title: "A-Level Mathematics Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#1A4DB3" },
  { title: "A-Level Pure Mathematics", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#1565C0" },
  { title: "A-Level Further Mathematics", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#0D47A1" },
  { title: "A-Level Statistics Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#00838F" },
  { title: "A-Level Physics Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#2196F3" },
  { title: "A-Level Chemistry Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#9C27B0" },
  { title: "A-Level Biology Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#4CAF50" },
  { title: "A-Level Geography Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#00BCD4" },
  { title: "A-Level History Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#795548" },
  { title: "A-Level Economic History", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#6D4C41" },
  { title: "A-Level Sociology Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#EC407A" },
  { title: "A-Level FRS Zimbabwe", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#FF9800" },
  { title: "A-Level Divinity Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#78909C" },
  { title: "A-Level Economics Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#F44336" },
  { title: "A-Level Business Studies", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#FF9800" },
  { title: "A-Level Accounting Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#607D8B" },
  { title: "A-Level Business Enterprise", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#E64A19" },
  { title: "A-Level Computer Science", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#3F51B5" },
  { title: "A-Level ICT Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#303F9F" },
  { title: "A-Level English Language", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#8B3FC8" },
  { title: "A-Level Literature in English", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#6A1B9A" },
  { title: "A-Level Communication Skills", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#00ACC1" },
  { title: "A-Level Shona Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#C9A84C" },
  { title: "A-Level Ndebele Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#E8803A" },
  { title: "A-Level Shona Literature", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#A67C00" },
  { title: "A-Level Ndebele Literature", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#D4840A" },
  { title: "A-Level Art and Design", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#FF4081" },
  { title: "A-Level Music Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#7C4DFF" },
  { title: "A-Level Theatre Arts", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#6200EA" },
  { title: "A-Level Physical Education", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#00C853" },
  { title: "A-Level Sport Science", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#2E7D32" },
  { title: "A-Level Agriculture Zimbabwe", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#8BC34A" },
  { title: "A-Level Crop Science", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#689F38" },
  { title: "A-Level Animal Science", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#558B2F" },
  { title: "A-Level Guidance and Counselling", author: "ZimEdPress", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#78909C" },
  { title: "Heritage Studies A-Level", author: "College Press Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#8D6E63" },
  { title: "A-Level French Zimbabwe", author: "Longman Zimbabwe", price: "$3.99/mo", tag: "ZIMSEC A-Level", color: "#009688" },

  // Cambridge IGCSE O-Level
  { title: "Cambridge IGCSE Mathematics", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#1A4DB3" },
  { title: "Cambridge IGCSE Add. Maths", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#0D47A1" },
  { title: "Cambridge IGCSE Physics", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#2196F3" },
  { title: "Cambridge IGCSE Chemistry", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#9C27B0" },
  { title: "Cambridge IGCSE Biology", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#4CAF50" },
  { title: "Cambridge IGCSE Combined Science", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#1A7A4A" },
  { title: "Cambridge IGCSE Economics", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#F44336" },
  { title: "Cambridge IGCSE Business Studies", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#FF9800" },
  { title: "Cambridge IGCSE Accounting", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#607D8B" },
  { title: "Cambridge IGCSE Computer Science", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#3F51B5" },
  { title: "Cambridge IGCSE ICT", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#303F9F" },
  { title: "Cambridge IGCSE Geography", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#00BCD4" },
  { title: "Cambridge IGCSE History", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#795548" },
  { title: "Cambridge IGCSE Sociology", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#EC407A" },
  { title: "Cambridge IGCSE Religious Studies", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#78909C" },
  { title: "Cambridge IGCSE English First Language", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#8B3FC8" },
  { title: "Cambridge IGCSE English Second Language", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#7B1FA2" },
  { title: "Cambridge IGCSE Literature in English", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#6A1B9A" },
  { title: "Cambridge IGCSE French", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#009688" },
  { title: "Cambridge IGCSE Food & Nutrition", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#E91E63" },
  { title: "Cambridge IGCSE Travel & Tourism", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#00ACC1" },
  { title: "Cambridge IGCSE Design & Technology", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#546E7A" },
  { title: "Cambridge IGCSE Physical Education", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#00C853" },
  { title: "Cambridge IGCSE Agriculture", author: "Cambridge University Press", price: "$4.99/mo", tag: "Cambridge O-Level", color: "#8BC34A" },

  // Cambridge A-Level
  { title: "Cambridge A-Level Mathematics", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#1A4DB3" },
  { title: "Cambridge A-Level Further Maths", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#0D47A1" },
  { title: "Cambridge A-Level Physics", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#2196F3" },
  { title: "Cambridge A-Level Chemistry", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#9C27B0" },
  { title: "Cambridge A-Level Biology", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#4CAF50" },
  { title: "Cambridge A-Level Economics", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#F44336" },
  { title: "Cambridge A-Level Business", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#FF9800" },
  { title: "Cambridge A-Level Accounting", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#607D8B" },
  { title: "Cambridge A-Level Computer Science", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#3F51B5" },
  { title: "Cambridge A-Level Information Technology", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#303F9F" },
  { title: "Cambridge A-Level Geography", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#00BCD4" },
  { title: "Cambridge A-Level History", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#795548" },
  { title: "Cambridge A-Level Sociology", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#EC407A" },
  { title: "Cambridge A-Level Psychology", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#AB47BC" },
  { title: "Cambridge A-Level English Language", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#8B3FC8" },
  { title: "Cambridge A-Level English Literature", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#6A1B9A" },
  { title: "Cambridge A-Level English General Paper", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#7B1FA2" },
  { title: "Cambridge Global Perspectives", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#00838F" },
  { title: "Cambridge A-Level Law", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#37474F" },
  { title: "Cambridge A-Level French", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#009688" },
  { title: "Cambridge Thinking Skills", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#455A64" },
  { title: "Cambridge Environmental Management", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#388E3C" },
  { title: "Cambridge A-Level Travel & Tourism", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#00ACC1" },
  { title: "Cambridge A-Level Design & Technology", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#546E7A" },
  { title: "Cambridge A-Level Media Studies", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#F06292" },
  { title: "Cambridge A-Level Marine Science", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#0277BD" },
  { title: "Cambridge A-Level Divinity", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#78909C" },
  { title: "Cambridge A-Level Physical Education", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#00C853" },
  { title: "Cambridge A-Level Art & Design", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#FF4081" },
  { title: "Cambridge A-Level Music", author: "Cambridge University Press", price: "$5.99/mo", tag: "Cambridge A-Level", color: "#7C4DFF" },
];

const navItems = [
  { id: "Dashboard", icon: "⊞", label: "Dashboard" },
  { id: "Syllabus", icon: "✓", label: "Syllabus" },
  { id: "Library", icon: "▤", label: "Library" },
  { id: "Notes", icon: "📖", label: "Notes" },
  { id: "Videos", icon: "🎥", label: "Videos" },
  { id: "Chat", icon: "💬", label: "Chat" },
  { id: "Tests", icon: "📝", label: "Tests" },
];

const extraNavItems = [
  { id: "Teacher", icon: "◎", label: "Teacher" },
  { id: "Parent", icon: "👨‍👩‍👧", label: "Parent" },
];
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [screen, setScreen] = useState("Landing");
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const t = isDark ? theme.dark : theme.light;
  const fontScale = fontSize === "small" ? 0.85 : fontSize === "large" ? 1.2 : fontSize === "xlarge" ? 1.4 : 1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {screen === "Terms" && <TermsScreen t={t} setScreen={setScreen} />}
      {screen === "Privacy" && <PrivacyScreen t={t} setScreen={setScreen} />}
      {screen === "Signup" && <AuthScreen t={t} mode="signup" setScreen={setScreen} step={step} setStep={setStep} selected={selected} setSelected={setSelected} />}
      {["Dashboard", "Syllabus", "Library", "Notes", "Videos", "Chat", "Tests", "Teacher", "Parent", "Admin", "More"].includes(screen) && (
      <AppShell t={t} isDark={isDark} setIsDark={setIsDark} screen={screen} setScreen={setScreen} user={user} handleLogout={handleLogout} isMobile={isMobile} fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} fontScale={fontScale} />
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
          <button className="outline-btn" onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })} style={{ border: "1px solid #FFFFFF22", borderRadius: 10, padding: "14px 32px", fontSize: 16, color: "#A0AECB" }}>See How It Works</button>
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
{/* How It Works */}
<div id="how-it-works" style={{ maxWidth: 720, margin: "60px auto 0", padding: "0 32px" }}>
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#F4F6FB", marginBottom: 12 }}>How RIF Works</h2>
    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: "#A0AECB" }}>Get started in 3 simple steps</p>
  </div>
  <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
    {[
      { step: "1", icon: "📝", title: "Sign Up Free", desc: "Create your account and select your curriculum — ZIMSEC or Cambridge, O-Level or A-Level." },
      { step: "2", icon: "📚", title: "Track & Learn", desc: "Follow your syllabus topic by topic, watch teacher videos, read AI notes and join subject chat rooms." },
      { step: "3", icon: "🎯", title: "Test Yourself", desc: "Take supervised practice tests with anti-cheat technology and get instant results with your score." },
    ].map(item => (
      <div key={item.step} style={{ textAlign: "center", padding: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>
          {item.icon}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#F4F6FB", marginBottom: 8, fontWeight: 700 }}>{item.title}</div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", lineHeight: 1.7 }}>{item.desc}</div>
      </div>
    ))}
  </div>
  <div style={{ textAlign: "center" }}>
    <button className="gold-btn" style={{ borderRadius: 10, padding: "14px 32px", fontSize: 16 }} onClick={() => setScreen("Signup")}>
      Get Started Free →
    </button>
  </div>
</div>
{/* Pricing */}
<div style={{ maxWidth: 900, margin: "60px auto 0", padding: "0 32px" }}>
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#F4F6FB", marginBottom: 12 }}>Simple Pricing</h2>
    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: "#A0AECB" }}>No hidden fees. Cancel anytime.</p>
  </div>
  <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
    {[
      { plan: "O-Level", price: "$2.99", desc: "Perfect for O-Level students", color: "#1A4DB3", features: ["ZIMSEC & Cambridge O-Level", "AI Study Notes", "Practice Tests", "Subject Chat Rooms", "Syllabus Tracker"] },
      { plan: "A-Level", price: "$3.99", desc: "For serious A-Level students", color: "#C9A84C", features: ["ZIMSEC & Cambridge A-Level", "AI Study Notes", "Practice Tests", "Subject Chat Rooms", "Syllabus Tracker"], popular: true },
      { plan: "All Access", price: "$6.99", desc: "Everything unlocked", color: "#1A7A4A", features: ["O-Level + A-Level", "ZIMSEC + Cambridge", "All Notes & Tests", "Teacher Videos", "Priority Support"] },
    ].map(plan => (
      <div key={plan.plan} style={{ background: plan.popular ? "linear-gradient(135deg, #1A3A6B, #0D2B6B)" : "#FFFFFF08", borderRadius: 16, padding: 24, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: plan.color, position: "relative" }}>
        {plan.popular && (
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", borderRadius: 99, padding: "4px 16px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#0A1628", whiteSpace: "nowrap" }}>
            MOST POPULAR
          </div>
        )}
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: plan.color, fontWeight: 700, marginBottom: 4 }}>{plan.plan}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#F4F6FB", fontWeight: 700, marginBottom: 4 }}>{plan.price}<span style={{ fontSize: 14, color: "#A0AECB" }}>/mo</span></div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#A0AECB", marginBottom: 20 }}>{plan.desc}</div>
        {plan.features.map(f => (
          <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: plan.color, flexShrink: 0 }}>✓</span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#A0AECB" }}>{f}</span>
          </div>
        ))}
        <button onClick={() => setScreen("Signup")} style={{ width: "100%", marginTop: 20, background: plan.popular ? "linear-gradient(135deg, #C9A84C, #E8CC80)" : "transparent", borderWidth: 1, borderStyle: "solid", borderColor: plan.color, borderRadius: 10, padding: "12px", color: plan.popular ? "#0A1628" : plan.color, fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
          Get Started →
        </button>
      </div>
    ))}
  </div>
</div>

{/* FAQ */}
<div style={{ maxWidth: 720, margin: "60px auto 0", padding: "0 32px" }}>
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#F4F6FB", marginBottom: 12 }}>Frequently Asked Questions</h2>
    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: "#A0AECB" }}>Everything you need to know</p>
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {[
      { q: "Is RIF-App free to use?", a: "Yes! You can sign up for free and access basic features. Premium features like AI study notes, unlimited tests and all study materials require a subscription starting at $2.99/mo." },
      { q: "What curricula does RIF-App cover?", a: "RIF-App covers both ZIMSEC (O-Level and A-Level) and Cambridge (IGCSE and A-Level) curricula with over 140 subjects available." },
      { q: "How do I pay for a subscription?", a: "We accept EcoCash, OneMoney, ZimSwitch, InnBucks and bank cards through Paynow Zimbabwe. All payments are secure and processed locally." },
      { q: "Can parents monitor their child's progress?", a: "Yes! Parents can create a Parent account, link their child's account using their Student ID, and monitor their progress, test scores and study activity." },
      { q: "Are the practice tests supervised?", a: "Yes! Our tests have anti-cheat technology that detects tab switching, copying and right-clicking. 3 violations automatically submit your test." },
      { q: "Can teachers upload lessons on RIF-App?", a: "Yes! Teachers can create a Teacher profile, upload video lessons and earn money when students access their paid content. RIF-App takes a 15% commission." },
      { q: "Is my data safe?", a: "Yes! We use Supabase for secure cloud storage and comply with Zimbabwe's Data Protection Act. We never sell your personal data." },
      { q: "How do I cancel my subscription?", a: "You can cancel anytime from your account settings. Your access continues until the end of the billing period." },
    ].map((item, i) => (
      <div key={i} style={{ background: "#FFFFFF08", borderRadius: 12, padding: "18px 20px", borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: "#C9A84C33" }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, color: "#F4F6FB", marginBottom: 8 }}>
          {item.q}
        </div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", lineHeight: 1.7 }}>
          {item.a}
        </div>
      </div>
    ))}
  </div>
</div>
      {/* Footer */}
      <div style={{ textAlign: "center", padding: "32px", borderTop: "1px solid #FFFFFF0F", marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B7A99" }}>© 2026 RIF-App. All rights reserved.</span>
          <span onClick={() => setScreen("Terms")} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", cursor: "pointer" }}>Terms & Conditions</span>
          <span onClick={() => setScreen("Privacy")} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", cursor: "pointer" }}>Privacy Policy</span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B7A99" }}>Not affiliated with ZIMSEC or Cambridge Assessment</span>
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

function AppShell({ t, isDark, setIsDark, screen, setScreen, user, handleLogout, isMobile, fontSize, setFontSize, highContrast, setHighContrast, fontScale }) {
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";
  const name = user?.user_metadata?.full_name || user?.email || "Student";

  return (
    <div style={{ display: "flex", minHeight: "100vh", filter: highContrast ? "contrast(1.5) brightness(1.1)" : "none", fontSize: `${fontScale}rem` }}>
    <div style={{ width: isMobile ? "100%" : 220, background: t.sidebar, display: isMobile ? "none" : "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
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
          <div style={{ borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#FFFFFF11", margin: "8px 0" }} />
          {extraNavItems.map(item => {
            const isActive = screen === item.id;
            return (
              <div key={item.id} className="nav-item" onClick={() => setScreen(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, marginBottom: 4, background: isActive ? "#C9A84C18" : "transparent", borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: isActive ? "#C9A84C" : "transparent" }}>
                <span style={{ fontSize: 18, opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? "#C9A84C" : "#8899BB" }}>{item.label}</span>
              </div>
            );
          })}
        {user?.id === "b91b35fa-3890-475e-a9fa-e4ffa4edb69a" && (
          <div onClick={() => setScreen("Admin")} className="nav-item" style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, marginBottom: 4, background: screen === "Admin" ? "#C9A84C18" : "transparent", borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: screen === "Admin" ? "#C9A84C" : "transparent" }}>
            <span style={{ fontSize: 16 }}>⚙️</span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: screen === "Admin" ? "#C9A84C" : "#A0AECB", fontWeight: screen === "Admin" ? 600 : 400 }}>Admin</span>
          </div>
        )}
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
           {/* Accessibility */}
<div style={{ padding: "8px 16px", marginBottom: 8 }}>
  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#6B7A99", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Accessibility</div>
  
  {/* Text size */}
  <div style={{ marginBottom: 8 }}>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#A0AECB", marginBottom: 4 }}>Text Size</div>
    <div style={{ display: "flex", gap: 4 }}>
      {[["S", "small"], ["M", "normal"], ["L", "large"], ["XL", "xlarge"]].map(([label, val]) => (
        <button key={val} onClick={() => setFontSize(val)} style={{ flex: 1, padding: "4px", borderRadius: 6, background: fontSize === val ? "#C9A84C" : "#FFFFFF11", border: "none", color: fontSize === val ? "#0A1628" : "#A0AECB", cursor: "pointer", fontSize: 11, fontWeight: fontSize === val ? 700 : 400 }}>
          {label}
        </button>
      ))}
    </div>
  </div>

  {/* High contrast */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#A0AECB" }}>High Contrast</div>
    <button onClick={() => setHighContrast(!highContrast)} style={{ background: highContrast ? "#C9A84C" : "#FFFFFF11", border: "none", borderRadius: 99, padding: "3px 10px", color: highContrast ? "#0A1628" : "#A0AECB", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
      {highContrast ? "ON" : "OFF"}
    </button>
  </div>
</div>
          <div style={{ padding: "8px 16px", marginBottom: 4 }}>
  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 9, color: "#FFFFFF33", lineHeight: 1.5, textAlign: "center" }}>
    Not affiliated with ZIMSEC or Cambridge Assessment
  </div>
</div>
          <button onClick={handleLogout} style={{ width: "100%", background: "#FF000015", border: "1px solid #FF000033", borderRadius: 8, padding: "8px 12px", color: "#FF6666", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
            Log Out
          </button>
        </div>
      </div>

     <div style={{ flex: 1, overflow: "auto", background: t.bg, paddingBottom: isMobile ? 70 : 0 }}>
        {screen === "Dashboard" && <DashboardView t={t} user={user} setScreen={setScreen} isMobile={isMobile} />}
        {screen === "Syllabus" && <SyllabusView t={t} user={user} isMobile={isMobile} />}
        {screen === "Library" && <LibraryView t={t} user={user} isMobile={isMobile} />}
        {screen === "Chat" && <ChatView t={t} user={user} isMobile={isMobile} />}
        {screen === "Tests" && <TestView t={t} user={user} isMobile={isMobile} />}
        {screen === "Notes" && <NotesView t={t} user={user} isMobile={isMobile} />}
        {screen === "Videos" && <VideosView t={t} user={user} isMobile={isMobile} />}
        {screen === "Admin" && user?.id === "b91b35fa-3890-475e-a9fa-e4ffa4edb69a" && <AdminView t={t} user={user} isMobile={isMobile} />}
        {screen === "More" && (
  <div style={{ padding: "24px 16px", background: t.bg, minHeight: "100vh" }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: t.text, marginBottom: 20 }}>More</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { id: "Syllabus", icon: "✓", label: "Syllabus Tracker", desc: "Track your topics" },
        { id: "Videos", icon: "🎥", label: "Video Lessons", desc: "Watch teacher videos" },
        { id: "Teacher", icon: "◎", label: "Teacher Dashboard", desc: "Manage your lessons" },
        { id: "Parent", icon: "👨‍👩‍👧", label: "Parent Dashboard", desc: "Monitor your child" },
      ].map(item => (
        <div key={item.id} onClick={() => setScreen(item.id)} style={{ background: t.card, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1A4DB322", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
            {item.icon}
          </div>
          <div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: t.text }}>{item.label}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{item.desc}</div>
          </div>
          <span style={{ marginLeft: "auto", color: t.textMuted, fontSize: 18 }}>→</span>
        </div>
      ))}
    </div>
  </div>
)}
        {screen === "Teacher" && <TeacherView t={t} user={user} isMobile={isMobile} />}
        {screen === "Parent" && <ParentView t={t} user={user} isMobile={isMobile} />}
      </div>
     {isMobile && (
  <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: t.sidebar, zIndex: 100, borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#FFFFFF11" }}>
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0" }}>
      {[
  { id: "Dashboard", icon: "⊞", label: "Home" },
  { id: "Library", icon: "▤", label: "Library" },
  { id: "Notes", icon: "📖", label: "Notes" },
  { id: "Tests", icon: "📝", label: "Tests" },
  { id: "Chat", icon: "💬", label: "Chat" },
].map(item => (
        <div key={item.id} onClick={() => setScreen(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "4px 8px", cursor: "pointer", flex: 1 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 9, color: screen === item.id ? "#C9A84C" : "#A0AECB", fontWeight: screen === item.id ? 700 : 400 }}>{item.label}</span>
        </div>
      ))}
      <div onClick={() => setScreen("More")} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "4px 8px", cursor: "pointer", flex: 1 }}>
  <span style={{ fontSize: 18, lineHeight: 1 }}>☰</span>
  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 9, color: screen === "More" ? "#C9A84C" : "#A0AECB", fontWeight: screen === "More" ? 700 : 400 }}>More</span>
</div>
      {user?.id === "b91b35fa-3890-475e-a9fa-e4ffa4edb69a" && (
  <div onClick={() => setScreen("Admin")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, marginBottom: 4, background: screen === "Admin" ? "#C9A84C18" : "transparent", cursor: "pointer" }}>
    <span style={{ fontSize: 16 }}>⚙️</span>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: screen === "Admin" ? "#C9A84C" : "#A0AECB" }}>Admin</span>
  </div>
)}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 16px", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#FFFFFF11" }}>
      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#A0AECB" }}>
        {user?.user_metadata?.full_name || user?.email}
      </span>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setIsDark(!isDark)} style={{ background: "#FFFFFF15", border: "none", borderRadius: 6, padding: "4px 10px", color: "#F4F6FB", cursor: "pointer", fontSize: 12 }}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <button onClick={handleLogout} style={{ background: "#F4433622", border: "none", borderRadius: 6, padding: "4px 10px", color: "#F44336", cursor: "pointer", fontSize: 12 }}>
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

function DashboardView({ t, user, setScreen, isMobile }) {
  const name = user?.user_metadata?.full_name?.split(" ")[0] || "Student";
  const [progress, setProgress] = useState([]);
  const [totalTopics, setTotalTopics] = useState(0);
  const [doneTopics, setDoneTopics] = useState(0);
  const [loading, setLoading] = useState(true);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [lockedBadges, setLockedBadges] = useState([]);

  useEffect(() => {
    if (user) loadDashboard();
  }, [user]);

  async function loadDashboard() {
    const { data: prog } = await supabase
      .from("student_progress")
      .select("*, syllabus_topics(subject, curriculum, level)")
      .eq("user_id", user.id);

    const { data: topics } = await supabase
      .from("syllabus_topics")
      .select("id, subject, curriculum, level");

   if (prog && topics) {
  setTotalTopics(topics.length);
  const done = prog.filter(p => p.status === "done").length;
  setDoneTopics(done);

  const subjectMap = {};
  topics.forEach(topic => {
    const key = `${topic.subject} (${topic.curriculum} ${topic.level})`;
    if (!subjectMap[key]) subjectMap[key] = { total: 0, done: 0, subject: topic.subject, curriculum: topic.curriculum, level: topic.level };
    subjectMap[key].total++;
  });

  prog.forEach(p => {
    if (p.syllabus_topics) {
      const key = `${p.syllabus_topics.subject} (${p.syllabus_topics.curriculum} ${p.syllabus_topics.level})`;
      if (subjectMap[key] && p.status === "done") subjectMap[key].done++;
    }
  });

  const subjectList = Object.entries(subjectMap)
    .filter(([, v]) => v.done > 0)
    .map(([key, v]) => ({ key, ...v, percent: Math.round(v.done / v.total * 100) }))
    .sort((a, b) => b.percent - a.percent)
  

  setProgress(subjectList);

  // Load achievements
  const { data: allBadges } = await supabase.from("achievements").select("*");
  const { data: earnedData } = await supabase.from("student_achievements").select("achievement_id").eq("user_id", user.id);
  const { data: testData } = await supabase.from("test_attempts").select("*").eq("user_id", user.id);
  const { data: msgData } = await supabase.from("messages").select("id").eq("user_id", user.id);

  if (allBadges && earnedData) {
    const earnedIds = earnedData.map(e => e.achievement_id);
    setEarnedBadges(allBadges.filter(b => earnedIds.includes(b.id)));
    setLockedBadges(allBadges.filter(b => !earnedIds.includes(b.id)));

    const testsCount = testData?.length || 0;
    const msgsCount = msgData?.length || 0;
    const bestScore = testData?.length > 0 ? Math.max(...testData.map(t => Math.round(t.score / t.total_marks * 100))) : 0;
    const subjectsStudied = Object.keys(subjectMap).filter(k => subjectMap[k].done > 0).length;

    const badgesToAward = [];
    allBadges.forEach(badge => {
      if (earnedIds.includes(badge.id)) return;
      if (badge.condition_type === "topics_done" && done >= badge.condition_value) badgesToAward.push(badge.id);
      if (badge.condition_type === "tests_taken" && testsCount >= badge.condition_value) badgesToAward.push(badge.id);
      if (badge.condition_type === "test_passed" && bestScore >= badge.condition_value) badgesToAward.push(badge.id);
      if (badge.condition_type === "messages_sent" && msgsCount >= badge.condition_value) badgesToAward.push(badge.id);
      if (badge.condition_type === "subjects_studied" && subjectsStudied >= badge.condition_value) badgesToAward.push(badge.id);
      if (badge.condition_type === "special") badgesToAward.push(badge.id);
    });

    if (badgesToAward.length > 0) {
      for (const badgeId of badgesToAward) {
        await supabase.from("student_achievements").insert({
          user_id: user.id,
          achievement_id: badgeId,
        });
      }
      const { data: newEarned } = await supabase.from("student_achievements").select("achievement_id").eq("user_id", user.id);
      if (newEarned) {
        const newEarnedIds = newEarned.map(e => e.achievement_id);
        setEarnedBadges(allBadges.filter(b => newEarnedIds.includes(b.id)));
        setLockedBadges(allBadges.filter(b => !newEarnedIds.includes(b.id)));
      }
    }
  }
}
    setLoading(false);
  }

  const overallPercent = totalTopics > 0 ? Math.round(doneTopics / totalTopics * 100) : 0;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 900, background: t.bg, minHeight: "100vh" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, fontSize: 14, marginBottom: 6 }}>{greeting} 👋</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 30, color: t.text }}>{name}'s Dashboard</h1>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.card, borderRadius: 8, padding: "6px 14px", marginTop: 8, cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.id); alert("Student ID copied!"); }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>Student ID:</span>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#C9A84C", fontWeight: 600 }}>{user?.id?.slice(0, 8)}...</span>
        <span style={{ fontSize: 12 }}>📋</span>
        </div>
        </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Overall Progress", value: `${overallPercent}%`, sub: "Across all subjects", color: "#1A4DB3" },
          { label: "Topics Completed", value: `${doneTopics}/${totalTopics}`, sub: doneTopics > 0 ? "Keep pushing!" : "Start studying!", color: "#C9A84C" },
          { label: "Subjects Active", value: `${progress.length}`, sub: "Subjects in progress", color: "#1A7A4A" },
        ].map(stat => (
          <div key={stat.label} style={{ background: t.card, borderRadius: 14, padding: "22px 20px", borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: stat.color }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: t.text }}>{stat.value}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: stat.color, marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: t.card, borderRadius: 16, padding: "24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text }}>Subject Progress</h2>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C" }}>Top subjects</span>
        </div>
        {loading ? (
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, fontSize: 14 }}>Loading progress...</div>
        ) : progress.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.textMuted }}>No progress yet — go to Syllabus to start tracking!</div>
          </div>
        ) : (
          <div style={{ maxHeight: 300, overflowY: "auto", paddingRight: 8 }}>
          {progress.map(sub => (
            <div key={sub.key} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: t.text }}>{sub.subject}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>{sub.done}/{sub.total} topics · {sub.curriculum} {sub.level}</span>
              </div>
              <div style={{ background: t.bg, borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${sub.percent}%`, height: "100%", background: "#1A4DB3", borderRadius: 99, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#1A4DB3", marginTop: 4 }}>{sub.percent}% complete</div>
            </div>
          ))}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: t.text, marginBottom: 16 }}>Quick Actions</h3>
          {[
            { label: "Continue Syllabus", icon: "✓", screen: "Syllabus" },
            { label: "Take a Test", icon: "📝", screen: "Tests" },
            { label: "Study Chat", icon: "💬", screen: "Chat" },
            { label: "Library", icon: "📚", screen: "Library" },
          ].map(item => (
            <div key={item.label} onClick={() => setScreen(item.screen)} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: t.bg, cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Ready to test yourself?</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F4F6FB", lineHeight: 1.3 }}>Practice Tests</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#A0AECB", marginTop: 8 }}>ZIMSEC & Cambridge · Anti-cheat · Instant results</p>
          </div>
          <button className="gold-btn" onClick={() => setScreen("Tests")} style={{ borderRadius: 10, padding: "12px", fontSize: 14, marginTop: 20 }}>Start Test →</button>
        </div>
      </div>

      {/* Achievements */}
      <div style={{ background: t.card, borderRadius: 16, padding: 24, marginTop: 20 }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text }}>🏆 Achievements</h3>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C" }}>{earnedBadges.length} earned</span>
  </div>
  {earnedBadges.length === 0 ? (
    <div style={{ textAlign: "center", padding: "20px 0", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.textMuted }}>
      Complete topics and take tests to earn badges! 🎯
    </div>
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: 12 }}>
      {earnedBadges.map(badge => (
        <div key={badge.id} style={{ textAlign: "center", padding: 12, background: t.bg, borderRadius: 12, borderWidth: 1, borderStyle: "solid", borderColor: "#C9A84C44" }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>{badge.icon}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.text, fontWeight: 600, marginBottom: 2 }}>{badge.name}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: t.textMuted }}>{badge.description}</div>
        </div>
      ))}
    </div>
  )}

  {/* Locked badges */}
  {lockedBadges.length > 0 && (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginBottom: 10 }}>Locked badges:</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(6, 1fr)", gap: 8 }}>
        {lockedBadges.slice(0, 6).map(badge => (
          <div key={badge.id} style={{ textAlign: "center", padding: 8, background: t.bg, borderRadius: 10, opacity: 0.4 }}>
            <div style={{ fontSize: 24, marginBottom: 4, filter: "grayscale(100%)" }}>{badge.icon}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 9, color: t.textMuted }}>{badge.name}</div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
    </div>
  );
}

function SyllabusView({ t, user, isMobile }) {
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ZIMSEC");
  const [level, setLevel] = useState("O-Level");

  useEffect(() => {
    loadSubjects();
  }, [filter, level]);

  useEffect(() => {
    if (activeSubject) loadTopics(activeSubject);
  }, [activeSubject]);

 async function loadSubjects() {
    try {
      const { data, error } = await supabase
        .from("syllabus_topics")
        .select("subject, curriculum, level")
        .eq("curriculum", filter)
        .eq("level", level);
      if (error) console.log("Syllabus error:", error);
      if (data) {
        const unique = [...new Set(data.map(d => d.subject))];
        setSubjects(unique);
        if (unique.length > 0) setActiveSubject(unique[0]);
      }
    } catch(e) {
      console.log("loadSubjects error:", e);
    }
    setLoading(false);
  }

  async function loadTopics(subject) {
    const { data } = await supabase
      .from("syllabus_topics")
      .select("*")
      .eq("subject", subject)
      .eq("curriculum", filter)
      .eq("level", level)
      .order("topic_order", { ascending: true });
    if (data) setTopics(data);

    if (user) {
      const { data: prog } = await supabase
        .from("student_progress")
        .select("*")
        .eq("user_id", user.id);
      if (prog) {
        const map = {};
        prog.forEach(p => { map[p.topic_id] = p.status; });
        setProgress(map);
      }
    }
  }

  async function updateProgress(topicId, status) {
    if (!user) return;
    await supabase.from("student_progress").upsert({
      user_id: user.id,
      topic_id: topicId,
      status,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,topic_id" });
    setProgress(prev => ({ ...prev, [topicId]: status }));
  }

  const done = topics.filter(t => progress[t.id] === "done").length;
  const inProgress = topics.filter(t => progress[t.id] === "in_progress").length;
  const percent = topics.length > 0 ? Math.round(done / topics.length * 100) : 0;

  const statusColor = { done: "#1A7A4A", in_progress: "#C9A84C", not_started: "#6B7A99" };
  const statusLabel = { done: "Done ✓", in_progress: "In Progress", not_started: "Not Started" };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading syllabus...</div>
    </div>
  );

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1000, background: t.bg, minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>
        Syllabus Tracker
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24 }}>
        Track every topic across your subjects
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", flexWrap: "wrap" }}>
        {["ZIMSEC", "Cambridge"].map(c => (
          <button key={c} onClick={() => { setFilter(c); setActiveSubject(null); }} style={{
            padding: "7px 18px", borderRadius: 99,
            background: filter === c ? "#C9A84C" : t.card,
            border: `1px solid ${filter === c ? "#C9A84C" : t.cardBorder}`,
            color: filter === c ? "#0A1628" : t.textMuted,
            fontSize: 14, fontWeight: filter === c ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{c}</button>
        ))}
        {["O-Level", "A-Level"].map(l => (
          <button key={l} onClick={() => { setLevel(l); setActiveSubject(null); }} style={{
            padding: "7px 18px", borderRadius: 99,
            background: level === l ? "#1A4DB3" : t.card,
            border: `1px solid ${level === l ? "#1A4DB3" : t.cardBorder}`,
            color: level === l ? "#fff" : t.textMuted,
            fontSize: 14, fontWeight: level === l ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{l}</button>
        ))}
      </div>

      {/* Subject tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {subjects.map(s => (
          <button key={s} onClick={() => setActiveSubject(s)} style={{
            padding: "7px 16px", borderRadius: 99,
            background: activeSubject === s ? "#1A4DB3" : t.card,
            border: `1px solid ${activeSubject === s ? "#1A4DB3" : t.cardBorder}`,
            color: activeSubject === s ? "#fff" : t.textMuted,
            fontSize: 13, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>{s}</button>
        ))}
      </div>

      {activeSubject && (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 260px", gap: 20 }}>
          {/* Topics list */}
          <div style={{ background: t.card, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: t.cardBorder, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text }}>{activeSubject}</h3>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>{done}/{topics.length} done</span>
            </div>
            {topics.map((topic, i) => {
              const status = progress[topic.id] || "not_started";
              return (
                <div key={topic.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 24px",
                  borderBottomWidth: i < topics.length - 1 ? 1 : 0,
                  borderBottomStyle: "solid",
                  borderBottomColor: t.cardBorder,
                  background: status === "in_progress" ? "#C9A84C11" : "transparent",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: statusColor[status],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0,
                    }}>
                      {status === "done" ? "✓" : status === "in_progress" ? "▶" : ""}
                    </div>
                    <span style={{
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
                      color: status === "done" ? t.textMuted : t.text,
                      fontWeight: status === "in_progress" ? 600 : 400,
                      textDecoration: status === "done" ? "line-through" : "none",
                    }}>
                      {topic.topic_order}. {topic.topic_name}
                    </span>
                  </div>
                  <select
                    value={status}
                    onChange={e => updateProgress(topic.id, e.target.value)}
                    style={{
                      padding: "4px 8px", borderRadius: 6,
                      borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder,
                      background: t.bg, color: statusColor[status],
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
                      cursor: "pointer", outline: "none",
                    }}
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              );
            })}
          </div>

          {/* Progress sidebar */}
          <div>
            <div style={{ background: t.card, borderRadius: 16, padding: 22, marginBottom: 16 }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: t.text, marginBottom: 16 }}>Progress</h4>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#1A4DB3" }}>{percent}%</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>Completed</div>
              </div>
              <div style={{ background: t.bg, borderRadius: 99, height: 10, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ width: `${percent}%`, height: "100%", background: "#1A4DB3", borderRadius: 99, transition: "width 0.5s" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Done", done, "#1A7A4A"],
                  ["In Progress", inProgress, "#C9A84C"],
                  ["Remaining", topics.length - done - inProgress, "#1A4DB3"],
                  ["Total", topics.length, "#6B7A99"],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ background: t.bg, borderRadius: 8, padding: 10, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color }}>{val}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => topics.forEach(topic => updateProgress(topic.id, "done"))}
              style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Mark All Done ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
async function generateHash(fields, integrationKey) {
  const str = Object.values(fields).join("") + integrationKey;
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function LibraryView({ t, user, isMobile }) {
  const [tab, setTab] = useState("All");
  const [paymentItem, setPaymentItem] = useState(null);
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("ecocash");
  const [paying, setPaying] = useState(false);
  const [payMessage, setPayMessage] = useState("");
  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 900 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: t.text, marginBottom: 6 }}>Book Library</h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 28 }}>Curated resources for Cambridge & ZIMSEC</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
       {["All", "ZIMSEC O-Level", "ZIMSEC A-Level", "Cambridge O-Level", "Cambridge A-Level"].map(tb => (
          <button key={tb} className="tab-btn" onClick={() => setTab(tb)} style={{ padding: "7px 18px", borderRadius: 99, background: tab === tb ? "#C9A84C" : t.card, border: `1px solid ${tab === tb ? "#C9A84C" : t.cardBorder}`, color: tab === tb ? "#0A1628" : t.textMuted, fontSize: 14, fontWeight: tab === tb ? 700 : 400 }}>{tb}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
        {books.filter(book => tab === "All" || book.tag === tab).map(book => (
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
           <button className="gold-btn" onClick={() => setPaymentItem({ name: book.title, price: parseFloat(book.price.replace("$","").replace("/mo","")) })} style={{ borderRadius: 7, padding: "5px 14px", fontSize: 12 }}>Subscribe</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 16 : 0 }}>
        <div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#C9A84C", marginBottom: 6 }}>📚 ALL ACCESS PLAN</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F4F6FB" }}>Unlock Every Book</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", marginTop: 6 }}>Full library access · EcoCash or Card · Cancel anytime</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#C9A84C" }}>$6.99<span style={{ fontSize: 14, color: "#A0AECB" }}>/mo</span></div>
          <button className="gold-btn" style={{ borderRadius: 10, padding: "10px 22px", fontSize: 14, marginTop: 10 }}>Get All Access</button>
        </div>
      </div>
      {paymentItem && (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#00000088", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
    <div style={{ background: t.card, borderRadius: 20, padding: "36px", maxWidth: 420, width: "90%", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: t.text, marginBottom: 8 }}>Subscribe to</h3>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 4 }}>{paymentItem.name}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#C9A84C", marginBottom: 24 }}>${paymentItem.price}/mo</p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, display: "block", marginBottom: 6 }}>Payment Method</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[["ecocash", "EcoCash"], ["onemoney", "OneMoney"], ["card", "Card"]].map(([val, label]) => (
            <div key={val} onClick={() => setPayMethod(val)} style={{ flex: 1, padding: "10px", borderRadius: 8, textAlign: "center", cursor: "pointer", background: payMethod === val ? "#C9A84C22" : t.bg, borderWidth: 2, borderStyle: "solid", borderColor: payMethod === val ? "#C9A84C" : t.cardBorder, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {payMethod !== "card" && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, display: "block", marginBottom: 6 }}>Phone Number</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 0771234567"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, borderWidth: 1.5, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}
          />
        </div>
      )}

    {payMessage && (
        <div style={{ background: payMessage.includes("✅") ? "#1A7A4A22" : "#F4433622", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: payMessage.includes("✅") ? "#1A7A4A" : "#F44336" }}>
          {payMessage}
        </div>
      )}

      <button onClick={async () => {
  setPaying(true);
  setPayMessage("");
  try {
    const res = await fetch("https://rif-app.vercel.app/api/payment", {
      method: "POST",
      headers: { 
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
      body: JSON.stringify({
        phone,
        amount: paymentItem.price,
        item: paymentItem.name,
        method: payMethod,
      }),
    });
    const data = await res.json();
    if (data.success) {
      if (data.redirectUrl) {
        window.open(data.redirectUrl, "_blank");
        setPayMessage("✅ Payment page opened! Complete payment there.");
      } else {
        setPayMessage("✅ " + data.instructions);
      }
    } else {
      setPayMessage("❌ " + data.error);
    }
  } catch (e) {
    setPayMessage("❌ Error: " + e.message);
  }
  setPaying(false);
}} style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 12, padding: "14px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, opacity: paying ? 0.7 : 1, marginBottom: 10 }}>
  {paying ? "Processing..." : "Pay Now →"}
</button>

<button onClick={() => { setPaymentItem(null); setPayMessage(""); setPhone(""); }} style={{ width: "100%", background: "transparent", border: "none", padding: "10px", color: t.textMuted, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
  Cancel
</button>
    </div>
  </div>
)}
    </div>
  );
}

function TeacherView({ t, user, isMobile }) {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    full_name: "", subject: "", school: "", bio: "", experience_years: "", rate_per_hour: ""
  });
  const [videoForm, setVideoForm] = useState({
    title: "", description: "", video_url: "", subject: "", curriculum: "ZIMSEC", level: "O-Level", is_free: true, price: 0
  });

  useEffect(() => {
    if (user) loadTeacherData();
  }, [user]);

 async function loadTeacherData() {
    console.log("Loading teacher data for user:", user.id);
    try {
      const { data } = await supabase
        .from("teacher_profiles")
        .select("*")
        .eq("user_id", user.id);
      
      if (data && data.length > 0) {
        setProfile(data[0]);
        setForm({
          full_name: data[0].full_name || "",
          subject: data[0].subject || "",
          school: data[0].school || "",
          bio: data[0].bio || "",
          experience_years: data[0].experience_years || "",
          rate_per_hour: data[0].rate_per_hour || ""
        });
        loadVideos(data[0].id);
        loadEarnings(data[0].id);
      }
    } catch(e) {
      console.log("Teacher load error:", e);
    }
    setLoading(false);
  }

  async function loadVideos(teacherId) {
    const { data } = await supabase
      .from("teacher_videos")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false });
    if (data) setVideos(data);
  }

  async function loadEarnings(teacherId) {
    const { data } = await supabase
      .from("teacher_earnings")
      .select("*")
      .eq("teacher_id", teacherId);
    if (data) setEarnings(data);
  }

  async function saveProfile() {
    setSaving(true);
    setMessage("");
    if (profile) {
      await supabase.from("teacher_profiles").update(form).eq("user_id", user.id);
    } else {
      await supabase.from("teacher_profiles").insert({ ...form, user_id: user.id });
    }
    setMessage("✅ Profile saved successfully!");
    loadTeacherData();
    setSaving(false);
  }

  async function addVideo() {
    if (!profile) { setMessage("❌ Save your profile first!"); return; }
    setSaving(true);
    await supabase.from("teacher_videos").insert({ ...videoForm, teacher_id: profile.id });
    setMessage("✅ Video submitted for review! It will appear once approved by RIF-App.");
    setVideoForm({ title: "", description: "", video_url: "", subject: "", curriculum: "ZIMSEC", level: "O-Level", is_free: true, price: 0 });
    loadVideos(profile.id);
    setSaving(false);
  }

  const totalEarnings = earnings.reduce((sum, e) => sum + (e.teacher_payout || 0), 0);

  const tabs = [
    { id: "profile", label: "👤 Profile" },
    { id: "videos", label: "🎥 Videos" },
    { id: "earnings", label: "💰 Earnings" },
    { id: "advertise", label: "📢 Advertise" },
  ];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 900, background: t.bg, minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: t.text, marginBottom: 6 }}>
        Teacher Dashboard
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24 }}>
        Manage your profile, videos and earnings
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            padding: "8px 16px", borderRadius: 99,
            background: tab === tb.id ? "#C9A84C" : t.card,
            borderWidth: 1, borderStyle: "solid",
            borderColor: tab === tb.id ? "#C9A84C" : t.cardBorder,
            color: tab === tb.id ? "#0A1628" : t.textMuted,
            fontSize: 13, fontWeight: tab === tb.id ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{tb.label}</button>
        ))}
      </div>

      {message && (
        <div style={{ background: message.includes("✅") ? "#1A7A4A22" : "#F4433622", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: message.includes("✅") ? "#1A7A4A" : "#F44336" }}>
          {message}
        </div>
      )}

      {/* Profile Tab */}
      {tab === "profile" && (
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 20 }}>Your Teacher Profile</h3>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { label: "Full Name", key: "full_name", placeholder: "Your full name" },
              { label: "Main Subject", key: "subject", placeholder: "e.g. Mathematics" },
              { label: "School", key: "school", placeholder: "Your school name" },
              { label: "Years Experience", key: "experience_years", placeholder: "e.g. 5" },
              { label: "Hourly Rate (USD)", key: "rate_per_hour", placeholder: "e.g. 10" },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>{field.label}</label>
                <input
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell students about yourself, your teaching style and experience..."
              rows={4}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none", resize: "vertical" }}
            />
          </div>
          <button onClick={saveProfile} disabled={saving} style={{ background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : "Save Profile →"}
          </button>
        </div>
      )}

      {/* Videos Tab */}
      {tab === "videos" && (
        <div>
          <div style={{ background: t.card, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 20 }}>Add Video Lesson</h3>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { label: "Video Title", key: "title", placeholder: "e.g. Quadratic Equations Explained" },
                { label: "Subject", key: "subject", placeholder: "e.g. Mathematics" },
                { label: "Video URL", key: "video_url", placeholder: "YouTube or Google Drive link" },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>{field.label}</label>
                  <input
                    value={videoForm[field.key]}
                    onChange={e => setVideoForm({ ...videoForm, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Curriculum</label>
                <select value={videoForm.curriculum} onChange={e => setVideoForm({ ...videoForm, curriculum: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}>
                  <option>ZIMSEC</option>
                  <option>Cambridge</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Level</label>
                <select value={videoForm.level} onChange={e => setVideoForm({ ...videoForm, level: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}>
                  <option>O-Level</option>
                  <option>A-Level</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Access</label>
                <select value={videoForm.is_free} onChange={e => setVideoForm({ ...videoForm, is_free: e.target.value === "true" })} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}>
                  <option value="true">Free</option>
                  <option value="false">Paid</option>
                </select>
              </div>
              {!videoForm.is_free && (
                <div>
                  <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Price (USD)</label>
                  <input
                    value={videoForm.price}
                    onChange={e => setVideoForm({ ...videoForm, price: e.target.value })}
                    placeholder="e.g. 2.99"
                    type="number"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}
                  />
                </div>
              )}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Description</label>
              <textarea
                value={videoForm.description}
                onChange={e => setVideoForm({ ...videoForm, description: e.target.value })}
                placeholder="What will students learn from this video?"
                rows={3}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none", resize: "vertical" }}
              />
            </div>
            <button onClick={addVideo} disabled={saving} style={{ background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
              {saving ? "Adding..." : "Add Video →"}
            </button>
          </div>

          {/* Video list */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {videos.length === 0 ? (
              <div style={{ background: t.card, borderRadius: 16, padding: 24, textAlign: "center", gridColumn: "1/-1" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎥</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>No videos yet — add your first lesson!</div>
              </div>
            ) : videos.map(video => (
              <div key={video.id} style={{ background: t.card, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 40 }}>🎥</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: t.text }}>{video.title}</h4>
                    <span style={{ background: video.is_free ? "#1A7A4A22" : "#C9A84C22", color: video.is_free ? "#1A7A4A" : "#C9A84C", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                      {video.is_free ? "FREE" : `$${video.price}`}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginBottom: 8 }}>{video.subject} · {video.curriculum} {video.level}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text, marginBottom: 12 }}>{video.description}</div>
                  <a href={video.video_url} target="_blank" rel="noreferrer" style={{ background: "linear-gradient(135deg, #C9A84C, #E8CC80)", borderRadius: 8, padding: "8px 16px", color: "#0A1628", fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif" }}>
                    Watch Video →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {tab === "earnings" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total Earnings", value: `$${totalEarnings.toFixed(2)}`, color: "#1A7A4A" },
              { label: "Total Students", value: earnings.length, color: "#1A4DB3" },
              { label: "RIF Commission (15%)", value: `$${(totalEarnings * 0.15).toFixed(2)}`, color: "#C9A84C" },
            ].map(stat => (
              <div key={stat.label} style={{ background: t.card, borderRadius: 14, padding: 20, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: stat.color }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8 }}>{stat.label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>
          {earnings.length === 0 ? (
            <div style={{ background: t.card, borderRadius: 16, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💰</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 8 }}>No earnings yet</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Add videos and students will start paying for your lessons!</div>
            </div>
          ) : (
            <div style={{ background: t.card, borderRadius: 16, overflow: "hidden" }}>
              {earnings.map((e, i) => (
                <div key={e.id} style={{ padding: "14px 20px", borderBottomWidth: i < earnings.length - 1 ? 1 : 0, borderBottomStyle: "solid", borderBottomColor: t.cardBorder, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 600 }}>Student Payment</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{new Date(e.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#1A7A4A" }}>${e.teacher_payout}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Advertise Tab */}
      {tab === "advertise" && (
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 8 }}>Advertise on RIF-App</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24, lineHeight: 1.7 }}>
            Reach thousands of Zimbabwean students directly. Feature your school or teaching services on RIF-App and grow your student base.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { plan: "Basic", price: "$50/mo", features: ["Featured in subject chat rooms", "Teacher profile badge", "50 student impressions/day"], color: "#1A4DB3" },
              { plan: "Standard", price: "$100/mo", features: ["Everything in Basic", "Featured on Library page", "School logo on dashboard", "200 student impressions/day"], color: "#C9A84C" },
              { plan: "Premium", price: "$200/mo", features: ["Everything in Standard", "Homepage featured banner", "Priority placement", "Unlimited impressions", "Monthly analytics report"], color: "#1A7A4A" },
            ].map(plan => (
              <div key={plan.plan} style={{ background: t.bg, borderRadius: 14, padding: 20, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: plan.color }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: plan.color, fontWeight: 700, marginBottom: 4 }}>{plan.plan}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, fontWeight: 700, marginBottom: 16 }}>{plan.price}</div>
                {plan.features.map(f => (
                  <div key={f} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8, display: "flex", gap: 8 }}>
                    <span style={{ color: plan.color }}>✓</span>{f}
                  </div>
                ))}
               <button onClick={() => window.open(`https://wa.me/263777269039?text=Hi RIF-App, I am interested in the ${plan.plan} advertising package at ${plan.price}`, "_blank")} style={{ width: "100%", marginTop: 16, background: plan.color === "#C9A84C" ? "linear-gradient(135deg, #C9A84C, #E8CC80)" : "transparent", borderWidth: 1, borderStyle: "solid", borderColor: plan.color, borderRadius: 8, padding: "10px", color: plan.color === "#C9A84C" ? "#0A1628" : plan.color, fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          <div style={{ background: "#1A4DB322", borderRadius: 12, padding: 20 }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 8 }}>📧 Contact us to advertise</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>Email us at <span style={{ color: "#C9A84C" }}>advertise@rif-app.com</span> or WhatsApp <span style={{ color: "#C9A84C" }}>+263 77 726 9039</span> to get started with your advertising package.</div>
          </div>
        </div>
      )}
    </div>
  );
}
function ChatView({ t, user, isMobile }) {
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const rooms = [
    // General
    { id: 1, name: "General Discussion", level: "All", curriculum: "All", color: "#C9A84C" },
    
    // ZIMSEC O-Level
    { id: 2, name: "Mathematics", level: "O-Level", curriculum: "ZIMSEC", color: "#1A4DB3" },
    { id: 3, name: "Additional Mathematics", level: "O-Level", curriculum: "ZIMSEC", color: "#1565C0" },
    { id: 4, name: "Pure Mathematics", level: "O-Level", curriculum: "ZIMSEC", color: "#1976D2" },
    { id: 5, name: "Statistics", level: "O-Level", curriculum: "ZIMSEC", color: "#00838F" },
    { id: 6, name: "Physics", level: "O-Level", curriculum: "ZIMSEC", color: "#2196F3" },
    { id: 7, name: "Chemistry", level: "O-Level", curriculum: "ZIMSEC", color: "#9C27B0" },
    { id: 8, name: "Biology", level: "O-Level", curriculum: "ZIMSEC", color: "#4CAF50" },
    { id: 9, name: "Combined Science", level: "O-Level", curriculum: "ZIMSEC", color: "#1A7A4A" },
    { id: 10, name: "Agriculture", level: "O-Level", curriculum: "ZIMSEC", color: "#8BC34A" },
    { id: 11, name: "Crop Science", level: "O-Level", curriculum: "ZIMSEC", color: "#689F38" },
    { id: 12, name: "Animal Science", level: "O-Level", curriculum: "ZIMSEC", color: "#558B2F" },
    { id: 13, name: "English Language", level: "O-Level", curriculum: "ZIMSEC", color: "#8B3FC8" },
    { id: 14, name: "English for Communication", level: "O-Level", curriculum: "ZIMSEC", color: "#7B1FA2" },
    { id: 15, name: "Literature in English", level: "O-Level", curriculum: "ZIMSEC", color: "#6A1B9A" },
    { id: 16, name: "Shona", level: "O-Level", curriculum: "ZIMSEC", color: "#C9A84C" },
    { id: 17, name: "Ndebele", level: "O-Level", curriculum: "ZIMSEC", color: "#E8803A" },
    { id: 18, name: "Literature in Shona", level: "O-Level", curriculum: "ZIMSEC", color: "#A67C00" },
    { id: 19, name: "Literature in Ndebele", level: "O-Level", curriculum: "ZIMSEC", color: "#D4840A" },
    { id: 20, name: "French", level: "O-Level", curriculum: "ZIMSEC", color: "#009688" },
    { id: 21, name: "History", level: "O-Level", curriculum: "ZIMSEC", color: "#795548" },
    { id: 22, name: "Economic History", level: "O-Level", curriculum: "ZIMSEC", color: "#6D4C41" },
    { id: 23, name: "Geography", level: "O-Level", curriculum: "ZIMSEC", color: "#00BCD4" },
    { id: 24, name: "Sociology", level: "O-Level", curriculum: "ZIMSEC", color: "#EC407A" },
    { id: 25, name: "Family and Religious Studies", level: "O-Level", curriculum: "ZIMSEC", color: "#FF9800" },
    { id: 26, name: "Heritage Studies", level: "O-Level", curriculum: "ZIMSEC", color: "#8D6E63" },
    { id: 27, name: "Economics", level: "O-Level", curriculum: "ZIMSEC", color: "#F44336" },
    { id: 28, name: "Business Studies", level: "O-Level", curriculum: "ZIMSEC", color: "#FF9800" },
    { id: 29, name: "Commerce", level: "O-Level", curriculum: "ZIMSEC", color: "#FF5722" },
    { id: 30, name: "Business Enterprise", level: "O-Level", curriculum: "ZIMSEC", color: "#E64A19" },
    { id: 31, name: "Principles of Accounting", level: "O-Level", curriculum: "ZIMSEC", color: "#607D8B" },
    { id: 32, name: "Computer Science", level: "O-Level", curriculum: "ZIMSEC", color: "#3F51B5" },
    { id: 33, name: "ICT", level: "O-Level", curriculum: "ZIMSEC", color: "#303F9F" },
    { id: 34, name: "Food Technology and Design", level: "O-Level", curriculum: "ZIMSEC", color: "#E91E63" },
    { id: 35, name: "Fashion and Fabrics", level: "O-Level", curriculum: "ZIMSEC", color: "#F06292" },
    { id: 36, name: "Physical Education", level: "O-Level", curriculum: "ZIMSEC", color: "#00C853" },
    { id: 37, name: "Building Technology", level: "O-Level", curriculum: "ZIMSEC", color: "#5D4037" },
    { id: 38, name: "Wood Technology", level: "O-Level", curriculum: "ZIMSEC", color: "#6D4C41" },
    { id: 39, name: "Metal Technology", level: "O-Level", curriculum: "ZIMSEC", color: "#455A64" },
    { id: 40, name: "Technical Graphics", level: "O-Level", curriculum: "ZIMSEC", color: "#37474F" },
    { id: 41, name: "Home Management", level: "O-Level", curriculum: "ZIMSEC", color: "#C2185B" },
    { id: 42, name: "Hospitality Management", level: "O-Level", curriculum: "ZIMSEC", color: "#AD1457" },
    { id: 43, name: "Art and Design", level: "O-Level", curriculum: "ZIMSEC", color: "#FF4081" },
    { id: 44, name: "Music", level: "O-Level", curriculum: "ZIMSEC", color: "#7C4DFF" },
    { id: 45, name: "Dance", level: "O-Level", curriculum: "ZIMSEC", color: "#651FFF" },
    { id: 46, name: "Theatre Arts", level: "O-Level", curriculum: "ZIMSEC", color: "#6200EA" },
    { id: 47, name: "Sport Management", level: "O-Level", curriculum: "ZIMSEC", color: "#1B5E20" },

    // ZIMSEC A-Level
    { id: 48, name: "Mathematics", level: "A-Level", curriculum: "ZIMSEC", color: "#1A4DB3" },
    { id: 49, name: "Further Mathematics", level: "A-Level", curriculum: "ZIMSEC", color: "#0D47A1" },
    { id: 50, name: "Pure Mathematics", level: "A-Level", curriculum: "ZIMSEC", color: "#1565C0" },
    { id: 51, name: "Statistics", level: "A-Level", curriculum: "ZIMSEC", color: "#00838F" },
    { id: 52, name: "Physics", level: "A-Level", curriculum: "ZIMSEC", color: "#2196F3" },
    { id: 53, name: "Chemistry", level: "A-Level", curriculum: "ZIMSEC", color: "#9C27B0" },
    { id: 54, name: "Biology", level: "A-Level", curriculum: "ZIMSEC", color: "#4CAF50" },
    { id: 55, name: "Agriculture", level: "A-Level", curriculum: "ZIMSEC", color: "#8BC34A" },
    { id: 56, name: "Economics", level: "A-Level", curriculum: "ZIMSEC", color: "#F44336" },
    { id: 57, name: "Business Studies", level: "A-Level", curriculum: "ZIMSEC", color: "#FF9800" },
    { id: 58, name: "Accounting", level: "A-Level", curriculum: "ZIMSEC", color: "#607D8B" },
    { id: 59, name: "Computer Science", level: "A-Level", curriculum: "ZIMSEC", color: "#3F51B5" },
    { id: 60, name: "History", level: "A-Level", curriculum: "ZIMSEC", color: "#795548" },
    { id: 61, name: "Geography", level: "A-Level", curriculum: "ZIMSEC", color: "#00BCD4" },
    { id: 62, name: "Sociology", level: "A-Level", curriculum: "ZIMSEC", color: "#EC407A" },
    { id: 63, name: "Family and Religious Studies", level: "A-Level", curriculum: "ZIMSEC", color: "#FF9800" },
    { id: 64, name: "Divinity", level: "A-Level", curriculum: "ZIMSEC", color: "#78909C" },
    { id: 65, name: "English Language", level: "A-Level", curriculum: "ZIMSEC", color: "#8B3FC8" },
    { id: 66, name: "Literature in English", level: "A-Level", curriculum: "ZIMSEC", color: "#6A1B9A" },
    { id: 67, name: "Shona", level: "A-Level", curriculum: "ZIMSEC", color: "#C9A84C" },
    { id: 68, name: "Ndebele", level: "A-Level", curriculum: "ZIMSEC", color: "#E8803A" },
    { id: 69, name: "French", level: "A-Level", curriculum: "ZIMSEC", color: "#009688" },
    { id: 70, name: "Heritage Studies", level: "A-Level", curriculum: "ZIMSEC", color: "#8D6E63" },

    // Cambridge O-Level
    { id: 71, name: "Mathematics", level: "O-Level", curriculum: "Cambridge", color: "#1A4DB3" },
    { id: 72, name: "Additional Mathematics", level: "O-Level", curriculum: "Cambridge", color: "#0D47A1" },
    { id: 73, name: "Physics", level: "O-Level", curriculum: "Cambridge", color: "#2196F3" },
    { id: 74, name: "Chemistry", level: "O-Level", curriculum: "Cambridge", color: "#9C27B0" },
    { id: 75, name: "Biology", level: "O-Level", curriculum: "Cambridge", color: "#4CAF50" },
    { id: 76, name: "Combined Science", level: "O-Level", curriculum: "Cambridge", color: "#1A7A4A" },
    { id: 77, name: "Economics", level: "O-Level", curriculum: "Cambridge", color: "#F44336" },
    { id: 78, name: "Business Studies", level: "O-Level", curriculum: "Cambridge", color: "#FF9800" },
    { id: 79, name: "Accounting", level: "O-Level", curriculum: "Cambridge", color: "#607D8B" },
    { id: 80, name: "Computer Science", level: "O-Level", curriculum: "Cambridge", color: "#3F51B5" },
    { id: 81, name: "ICT", level: "O-Level", curriculum: "Cambridge", color: "#303F9F" },
    { id: 82, name: "Geography", level: "O-Level", curriculum: "Cambridge", color: "#00BCD4" },
    { id: 83, name: "History", level: "O-Level", curriculum: "Cambridge", color: "#795548" },
    { id: 84, name: "Sociology", level: "O-Level", curriculum: "Cambridge", color: "#EC407A" },
    { id: 85, name: "Religious Studies", level: "O-Level", curriculum: "Cambridge", color: "#78909C" },
    { id: 86, name: "English First Language", level: "O-Level", curriculum: "Cambridge", color: "#8B3FC8" },
    { id: 87, name: "English Second Language", level: "O-Level", curriculum: "Cambridge", color: "#7B1FA2" },
    { id: 88, name: "Literature in English", level: "O-Level", curriculum: "Cambridge", color: "#6A1B9A" },
    { id: 89, name: "French", level: "O-Level", curriculum: "Cambridge", color: "#009688" },
    { id: 90, name: "Food and Nutrition", level: "O-Level", curriculum: "Cambridge", color: "#E91E63" },
    { id: 91, name: "Travel and Tourism", level: "O-Level", curriculum: "Cambridge", color: "#00ACC1" },
    { id: 92, name: "Design and Technology", level: "O-Level", curriculum: "Cambridge", color: "#546E7A" },
    { id: 93, name: "Physical Education", level: "O-Level", curriculum: "Cambridge", color: "#00C853" },

    // Cambridge A-Level
    { id: 94, name: "Mathematics", level: "A-Level", curriculum: "Cambridge", color: "#1A4DB3" },
    { id: 95, name: "Further Mathematics", level: "A-Level", curriculum: "Cambridge", color: "#0D47A1" },
    { id: 96, name: "Physics", level: "A-Level", curriculum: "Cambridge", color: "#2196F3" },
    { id: 97, name: "Chemistry", level: "A-Level", curriculum: "Cambridge", color: "#9C27B0" },
    { id: 98, name: "Biology", level: "A-Level", curriculum: "Cambridge", color: "#4CAF50" },
    { id: 99, name: "Economics", level: "A-Level", curriculum: "Cambridge", color: "#F44336" },
    { id: 100, name: "Business", level: "A-Level", curriculum: "Cambridge", color: "#FF9800" },
    { id: 101, name: "Accounting", level: "A-Level", curriculum: "Cambridge", color: "#607D8B" },
    { id: 102, name: "Computer Science", level: "A-Level", curriculum: "Cambridge", color: "#3F51B5" },
    { id: 103, name: "Geography", level: "A-Level", curriculum: "Cambridge", color: "#00BCD4" },
    { id: 104, name: "History", level: "A-Level", curriculum: "Cambridge", color: "#795548" },
    { id: 105, name: "Sociology", level: "A-Level", curriculum: "Cambridge", color: "#EC407A" },
    { id: 106, name: "Psychology", level: "A-Level", curriculum: "Cambridge", color: "#AB47BC" },
    { id: 107, name: "English Language", level: "A-Level", curriculum: "Cambridge", color: "#8B3FC8" },
    { id: 108, name: "English Literature", level: "A-Level", curriculum: "Cambridge", color: "#6A1B9A" },
    { id: 109, name: "French", level: "A-Level", curriculum: "Cambridge", color: "#009688" },
    { id: 110, name: "Law", level: "A-Level", curriculum: "Cambridge", color: "#37474F" },
    { id: 111, name: "Thinking Skills", level: "A-Level", curriculum: "Cambridge", color: "#455A64" },
    { id: 112, name: "Global Perspectives", level: "A-Level", curriculum: "Cambridge", color: "#00838F" },
    { id: 113, name: "Environmental Management", level: "A-Level", curriculum: "Cambridge", color: "#388E3C" },
    { id: 114, name: "Media Studies", level: "A-Level", curriculum: "Cambridge", color: "#F06292" },
    { id: 115, name: "Marine Science", level: "A-Level", curriculum: "Cambridge", color: "#0277BD" },
    { id: 116, name: "Travel and Tourism", level: "A-Level", curriculum: "Cambridge", color: "#00ACC1" },
    { id: 117, name: "General Paper", level: "A-Level", curriculum: "Cambridge", color: "#7B1FA2" },
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
    <div style={{ display: "flex", height: "100vh", flexDirection: isMobile ? "column" : "row" }}>
      <div style={{
        width: isMobile ? "100%" : 240,
        height: isMobile ? activeRoom ? "0" : "100%" : "100%",
        display: isMobile && activeRoom ? "none" : "flex",
        flexDirection: "column",
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: t.bg, height: isMobile ? "calc(100vh - 130px)" : "100vh", overflow: "hidden" }}>
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
            {isMobile && (
  <div onClick={() => setActiveRoom(null)} style={{ cursor: "pointer", color: "#C9A84C", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, marginRight: 8 }}>← Back</div>
)}
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: activeRoom.color }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, fontWeight: 700 }}>{activeRoom.name}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{activeRoom.curriculum} · {activeRoom.level}</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "12px" : "20px 24px", paddingBottom: isMobile ? "20px" : "20px" }}>
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
padding: isMobile ? "8px 12px 80px 12px" : "16px 24px",
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
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: t.bg, padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 56 }}>💬</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, fontWeight: 700 }}>Select a Chat Room</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Choose a subject from the left</div>
        </div>
      )}
    </div>
  );
}
function NotesView({ t, user }) {
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [filter, setFilter] = useState("ZIMSEC");
  const [level, setLevel] = useState("O-Level");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, [filter, level]);

  useEffect(() => {
    if (subject) loadTopics(subject);
  }, [subject]);

  async function loadSubjects() {
    const { data } = await supabase
      .from("syllabus_topics")
      .select("subject")
      .eq("curriculum", filter)
      .eq("level", level);
    if (data) {
      const unique = [...new Set(data.map(d => d.subject))];
      setSubjects(unique);
      setSubject(unique[0] || null);
      setTopic(null);
      setNotes("");
    }
  }

  async function loadTopics(subj) {
    const { data } = await supabase
      .from("syllabus_topics")
      .select("*")
      .eq("subject", subj)
      .eq("curriculum", filter)
      .eq("level", level)
      .order("topic_order", { ascending: true });
    if (data) setTopics(data);
  }

  async function generateNotes(topicName) {
    setTopic(topicName);
    setNotes("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an expert ${filter} ${level} teacher in Zimbabwe. Write clear, detailed study notes for the topic "${topicName}" in the subject "${subject}" for ${filter} ${level} students in Zimbabwe. 

Format your response with:
## Key Concepts
(3-5 main concepts explained clearly)

## Detailed Explanation
(thorough explanation students can understand)

## Examples
(2-3 worked examples or illustrations)

## Exam Tips
(3 specific tips for ${filter} ${level} exams)

## Summary
(5 bullet points summarizing the topic)

Keep it relevant to the Zimbabwe ${filter} curriculum and exam style.`,
          }],
        }),
      });
      const data = await response.json();
      if (data.content && data.content[0]) {
        setNotes(data.content[0].text);
      } else {
        setNotes("Failed to generate notes: " + JSON.stringify(data));
      }
    } catch (e) {
      setNotes("Error generating notes: " + e.message);
    }
    setLoading(false);
  }

  function formatNotes(text) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <div key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginTop: 20, marginBottom: 8 }}>{line.replace("## ", "")}</div>;
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        return <div key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, marginBottom: 6, paddingLeft: 16, display: "flex", gap: 8 }}><span style={{ color: "#C9A84C", flexShrink: 0 }}>•</span><span>{line.replace("- ", "").replace("• ", "")}</span></div>;
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return <div key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 700, marginBottom: 6 }}>{line.replace(/\*\*/g, "")}</div>;
      } else if (line.trim() === "") {
        return <div key={i} style={{ height: 8 }} />;
      } else {
        return <div key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, lineHeight: 1.7, marginBottom: 4 }}>{line}</div>;
      }
    });
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: t.bg }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: t.card, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: t.cardBorder, overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: t.cardBorder }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, fontWeight: 700, marginBottom: 12 }}>📖 Study Notes</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {["ZIMSEC", "Cambridge"].map(c => (
              <button key={c} onClick={() => { setFilter(c); setSubject(null); setNotes(""); }} style={{ padding: "4px 12px", borderRadius: 99, background: filter === c ? "#C9A84C" : t.bg, borderWidth: 1, borderStyle: "solid", borderColor: filter === c ? "#C9A84C" : t.cardBorder, color: filter === c ? "#0A1628" : t.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["O-Level", "A-Level"].map(l => (
              <button key={l} onClick={() => { setLevel(l); setSubject(null); setNotes(""); }} style={{ padding: "4px 12px", borderRadius: 99, background: level === l ? "#1A4DB3" : t.bg, borderWidth: 1, borderStyle: "solid", borderColor: level === l ? "#1A4DB3" : t.cardBorder, color: level === l ? "#fff" : t.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif" }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div style={{ padding: 8 }}>
          {subjects.map(s => (
            <div key={s} onClick={() => { setSubject(s); setNotes(""); setTopic(null); }} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 2, cursor: "pointer", background: subject === s ? "#1A4DB322" : "transparent", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: subject === s ? 700 : 400, color: subject === s ? "#1A4DB3" : t.text }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Topics list */}
      {subject && (
        <div style={{ width: 220, background: t.bg, borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: t.cardBorder, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "16px 14px", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: t.cardBorder }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: t.text }}>{subject}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{topics.length} topics</div>
          </div>
          <div style={{ padding: 8 }}>
            {topics.map(tp => (
              <div key={tp.id} onClick={() => generateNotes(tp.topic_name)} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 2, cursor: "pointer", background: topic === tp.topic_name ? "#C9A84C22" : "transparent", borderLeftWidth: topic === tp.topic_name ? 3 : 0, borderLeftStyle: "solid", borderLeftColor: "#C9A84C" }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: topic === tp.topic_name ? "#C9A84C" : t.text, fontWeight: topic === tp.topic_name ? 700 : 400 }}>
                  {tp.topic_order}. {tp.topic_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
        {!topic && !loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 64 }}>📖</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, fontWeight: 700 }}>Select a Topic</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, textAlign: "center" }}>Choose a subject and topic from the left to generate AI study notes instantly</div>
          </div>
        )}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 48 }}>✨</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: t.text }}>Generating Notes...</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>AI is writing your study notes for {topic}</div>
          </div>
        )}

        {notes && !loading && (
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#C9A84C", fontWeight: 600, marginBottom: 4 }}>{filter} {level} · {subject}</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: t.text, fontWeight: 700 }}>{topic}</h1>
              </div>
              <button onClick={() => generateNotes(topic)} style={{ background: t.card, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, borderRadius: 8, padding: "8px 16px", color: t.text, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                🔄 Regenerate
              </button>
            </div>
            <div style={{ background: t.card, borderRadius: 16, padding: "28px 32px", lineHeight: 1.8 }}>
              {formatNotes(notes)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function TermsScreen({ t, setScreen }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={() => setScreen("Landing")} style={{ background: "transparent", border: "none", color: "#C9A84C", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, marginBottom: 24 }}>← Back to Home</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#F4F6FB", marginBottom: 8 }}>Terms & Conditions</h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B7A99", marginBottom: 32 }}>Last updated: June 2026</p>

        {[
          ["1. Acceptance of Terms", "By accessing and using RIF-App, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform."],
          ["2. Description of Service", "RIF-App is an educational technology platform designed for Zimbabwean students following ZIMSEC and Cambridge curricula. We provide study tools, practice tests, chat rooms, and educational resources."],
          ["3. User Accounts", "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 13 years old to use this service."],
          ["4. Subscriptions and Payments", "Some features require a paid subscription. Payments are processed through Paynow Zimbabwe. Subscription fees are charged monthly. You may cancel your subscription at any time."],
          ["5. Acceptable Use", "You agree not to misuse the platform, share account credentials, attempt to cheat on supervised tests, harass other users in chat rooms, or reproduce our content without permission."],
          ["6. Intellectual Property", "All content on RIF-App including notes, tests, and materials is owned by RIF-App or its content providers. RIF-App is not affiliated with ZIMSEC or Cambridge Assessment International Education."],
          ["7. Privacy", "Your use of RIF-App is also governed by our Privacy Policy. We collect and process your data in accordance with Zimbabwe's Data Protection Act."],
          ["8. Limitation of Liability", "RIF-App provides educational content for study purposes only. We do not guarantee specific exam results. Our liability is limited to the amount paid for our services."],
          ["9. Changes to Terms", "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms."],
          ["10. Contact", "For any questions about these terms, contact us at support@rif-app.com"],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#C9A84C", marginBottom: 8 }}>{title}</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", lineHeight: 1.7 }}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyScreen({ t, setScreen }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={() => setScreen("Landing")} style={{ background: "transparent", border: "none", color: "#C9A84C", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, marginBottom: 24 }}>← Back to Home</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#F4F6FB", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B7A99", marginBottom: 32 }}>Last updated: June 2026</p>

        {[
          ["1. Information We Collect", "We collect information you provide when creating an account including your name, email address, curriculum and subject preferences. We also collect usage data such as topics studied, test scores, and chat messages."],
          ["2. How We Use Your Information", "We use your information to provide and improve our educational services, personalize your learning experience, process payments, send important updates about your account, and analyze platform usage to improve our service."],
          ["3. Data Storage", "Your data is stored securely using Supabase, a secure cloud database provider. We implement industry standard security measures to protect your personal information."],
          ["4. Data Sharing", "We do not sell your personal information to third parties. We may share data with payment processors (Paynow Zimbabwe) to process transactions, and with service providers who help us operate the platform."],
          ["5. Student Data Protection", "We take the protection of student data seriously. We comply with Zimbabwe's Data Protection Act. Parents or guardians of users under 18 may request access to or deletion of their child's data."],
          ["6. Cookies", "We use essential cookies to maintain your login session and remember your preferences. We do not use advertising cookies or track you across other websites."],
          ["7. Your Rights", "You have the right to access your personal data, correct inaccurate data, request deletion of your data, and opt out of non-essential communications. Contact us at support@rif-app.com to exercise these rights."],
          ["8. Children's Privacy", "RIF-App is designed for students aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we have collected data from a child under 13 please contact us immediately."],
          ["9. Changes to Privacy Policy", "We may update this Privacy Policy from time to time. We will notify users of significant changes via email or through the platform."],
          ["10. Contact Us", "If you have questions about this Privacy Policy or how we handle your data, contact us at support@rif-app.com or through our platform's support chat."],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#C9A84C", marginBottom: 8 }}>{title}</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#A0AECB", lineHeight: 1.7 }}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function ParentView({ t, user, isMobile }) {
  const [tab, setTab] = useState("overview");
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childProgress, setChildProgress] = useState([]);
  const [childTests, setChildTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childEmail, setChildEmail] = useState("");
  const [linking, setLinking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) loadChildren();
  }, [user]);

  useEffect(() => {
    if (selectedChild) {
      loadChildProgress(selectedChild.id);
      loadChildTests(selectedChild.id);
    }
  }, [selectedChild]);

  async function loadChildren() {
    try {
      const { data } = await supabase
        .from("parent_children")
        .select("*, profiles(id, full_name, curriculum, role)")
        .eq("parent_id", user.id);
      if (data && data.length > 0) {
        setChildren(data);
        setSelectedChild(data[0].profiles);
      }
    } catch(e) {
      console.log("Load children error:", e);
    }
    setLoading(false);
  }

  async function loadChildProgress(childId) {
    const { data } = await supabase
      .from("student_progress")
      .select("*, syllabus_topics(subject, curriculum, level)")
      .eq("user_id", childId)
      .eq("status", "done");
    if (data) setChildProgress(data);
  }

  async function loadChildTests(childId) {
    const { data } = await supabase
      .from("test_attempts")
      .select("*, tests(title, subject, curriculum, level)")
      .eq("user_id", childId)
      .order("started_at", { ascending: false })
      .limit(10);
    if (data) setChildTests(data);
  }

  async function linkChild() {
    if (!childEmail.trim()) return;
    setLinking(true);
    setMessage("");
    try {
      const { data: childProfile } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("id", childEmail.trim())
        .single();

      if (childProfile) {
        await supabase.from("parent_children").insert({
          parent_id: user.id,
          child_id: childProfile.id,
        });
        setMessage("✅ Child linked successfully!");
        setChildEmail("");
        loadChildren();
      } else {
        setMessage("❌ Student not found. Ask your child for their Student ID.");
      }
    } catch(e) {
      setMessage("❌ Error linking child: " + e.message);
    }
    setLinking(false);
  }

  const subjectMap = {};
  childProgress.forEach(p => {
    if (p.syllabus_topics) {
      const key = p.syllabus_topics.subject;
      if (!subjectMap[key]) subjectMap[key] = 0;
      subjectMap[key]++;
    }
  });

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "progress", label: "✓ Progress" },
    { id: "tests", label: "📝 Tests" },
    { id: "subscribe", label: "💳 Subscribe" },
    { id: "link", label: "🔗 Link Child" },
  ];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 900, background: t.bg, minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: t.text, marginBottom: 6 }}>
        Parent Dashboard
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24 }}>
        Monitor your child's learning progress
      </p>

      {/* Child selector */}
      {children.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {children.map(c => (
            <button key={c.id} onClick={() => setSelectedChild(c.profiles)} style={{
              padding: "8px 16px", borderRadius: 99,
              background: selectedChild?.id === c.profiles?.id ? "#1A4DB3" : t.card,
              borderWidth: 1, borderStyle: "solid",
              borderColor: selectedChild?.id === c.profiles?.id ? "#1A4DB3" : t.cardBorder,
              color: selectedChild?.id === c.profiles?.id ? "#fff" : t.textMuted,
              fontSize: 13, cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>👤 {c.profiles?.full_name || "Child"}</button>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            padding: "8px 16px", borderRadius: 99,
            background: tab === tb.id ? "#C9A84C" : t.card,
            borderWidth: 1, borderStyle: "solid",
            borderColor: tab === tb.id ? "#C9A84C" : t.cardBorder,
            color: tab === tb.id ? "#0A1628" : t.textMuted,
            fontSize: 13, fontWeight: tab === tb.id ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{tb.label}</button>
        ))}
      </div>

      {message && (
        <div style={{ background: message.includes("✅") ? "#1A7A4A22" : "#F4433622", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: message.includes("✅") ? "#1A7A4A" : "#F44336" }}>
          {message}
        </div>
      )}

      {/* No children linked yet */}
      {children.length === 0 && tab !== "link" && (
        <div style={{ background: t.card, borderRadius: 16, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>👨‍👩‍👧</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: t.text, marginBottom: 8 }}>No children linked yet</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 20 }}>Link your child's account to monitor their progress</div>
          <button onClick={() => setTab("link")} style={{ background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
            Link Child Account →
          </button>
        </div>
      )}

      {/* Overview Tab */}
      {tab === "overview" && selectedChild && (
        <div>
          <div style={{ background: t.card, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #1A4DB3, #3468D1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 700 }}>
                {selectedChild.full_name?.charAt(0) || "S"}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, fontWeight: 700 }}>{selectedChild.full_name}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>{selectedChild.curriculum} Student</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: "Topics Done", value: childProgress.length, color: "#1A7A4A" },
                { label: "Tests Taken", value: childTests.length, color: "#1A4DB3" },
                { label: "Subjects Active", value: Object.keys(subjectMap).length, color: "#C9A84C" },
              ].map(stat => (
                <div key={stat.label} style={{ background: t.bg, borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent test results */}
          <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 16 }}>Recent Test Results</h3>
            {childTests.length === 0 ? (
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, textAlign: "center", padding: "20px 0" }}>No tests taken yet</div>
            ) : childTests.slice(0, 5).map((attempt, i) => {
              const percent = Math.round(attempt.score / attempt.total_marks * 100);
              return (
                <div key={attempt.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottomWidth: i < 4 ? 1 : 0, borderBottomStyle: "solid", borderBottomColor: t.cardBorder }}>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 600 }}>{attempt.tests?.title}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{new Date(attempt.started_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: percent >= 70 ? "#1A7A4A" : percent >= 50 ? "#C9A84C" : "#F44336" }}>{percent}%</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{attempt.score}/{attempt.total_marks}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {tab === "progress" && selectedChild && (
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 20 }}>Subject Progress</h3>
          {Object.keys(subjectMap).length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>No progress recorded yet</div>
          ) : Object.entries(subjectMap).map(([subject, done]) => (
            <div key={subject} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: t.text }}>{subject}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>{done} topics done</span>
              </div>
              <div style={{ background: t.bg, borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(done * 10, 100)}%`, height: "100%", background: "#1A4DB3", borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tests Tab */}
      {tab === "tests" && selectedChild && (
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 20 }}>All Test Results</h3>
          {childTests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>No tests taken yet</div>
          ) : childTests.map((attempt, i) => {
            const percent = Math.round(attempt.score / attempt.total_marks * 100);
            return (
              <div key={attempt.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottomWidth: i < childTests.length - 1 ? 1 : 0, borderBottomStyle: "solid", borderBottomColor: t.cardBorder }}>
                <div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text, fontWeight: 600 }}>{attempt.tests?.title}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{attempt.tests?.subject} · {new Date(attempt.started_at).toLocaleDateString()}</div>
                  {attempt.violations > 0 && <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#F44336" }}>⚠️ {attempt.violations} violation(s)</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: percent >= 70 ? "#1A7A4A" : percent >= 50 ? "#C9A84C" : "#F44336" }}>{percent}%</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: t.textMuted }}>{attempt.score}/{attempt.total_marks}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
     {tab === "subscribe" && (
  <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 8 }}>
      Subscribe for Your Child
    </h3>
    <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24, lineHeight: 1.7 }}>
      Give your child access to premium study notes, unlimited tests and all learning resources on RIF-App.
    </p>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
      {[
       { plan: "O-Level", price: 2.99, color: "#1A4DB3", features: ["ZIMSEC O-Level notes", "Cambridge IGCSE notes", "Unlimited practice tests", "Subject chat rooms", "Syllabus tracker"] },
       { plan: "A-Level", price: 3.99, color: "#C9A84C", features: ["ZIMSEC A-Level notes", "Cambridge A-Level notes", "Unlimited practice tests", "Subject chat rooms", "Syllabus tracker"] },
       { plan: "All Access", price: 6.99, color: "#1A7A4A", features: ["O-Level + A-Level", "ZIMSEC + Cambridge", "All notes and tests", "Priority support", "Cancel anytime"] },
      ].map(plan => (
        <div key={plan.plan} style={{ background: t.bg, borderRadius: 14, padding: 20, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: plan.color }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: plan.color, fontWeight: 700, marginBottom: 4 }}>{plan.plan}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: t.text, fontWeight: 700, marginBottom: 16 }}>${plan.price}<span style={{ fontSize: 14, color: t.textMuted }}>/mo</span></div>
          {plan.features.map(f => (
            <div key={f} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, marginBottom: 8, display: "flex", gap: 8 }}>
              <span style={{ color: plan.color }}>✓</span>{f}
            </div>
          ))}
          <button
            onClick={() => {
              if (!selectedChild) { setMessage("❌ Please link your child's account first!"); setTab("link"); return; }
              setMessage(`✅ Redirecting to payment for ${selectedChild?.full_name}...`);
              setTimeout(() => setTab("overview"), 2000);
            }}
            style={{ width: "100%", marginTop: 16, background: plan.color === "#C9A84C" ? "linear-gradient(135deg, #C9A84C, #E8CC80)" : "transparent", borderWidth: 1, borderStyle: "solid", borderColor: plan.color, borderRadius: 8, padding: "10px", color: plan.color === "#C9A84C" ? "#0A1628" : plan.color, fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}
          >
            Subscribe Now →
          </button>
        </div>
      ))}
    </div>

    <div style={{ background: "#1A4DB322", borderRadius: 12, padding: 16 }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 4 }}>💡 Note</div>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
        Payment is processed securely via Paynow Zimbabwe. You can pay using EcoCash, OneMoney, ZimSwitch or bank card. Subscription renews monthly and can be cancelled anytime.
      </div>
    </div>
  </div>
)}
      {/* Link Child Tab */}
      {tab === "link" && (
        <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 8 }}>Link Your Child's Account</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 20, lineHeight: 1.7 }}>
            Ask your child to go to their Dashboard and share their Student ID with you. Enter it below to link their account.
          </p>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, display: "block", marginBottom: 6 }}>Child's Student ID</label>
            <input
              value={childEmail}
              onChange={e => setChildEmail(e.target.value)}
              placeholder="Paste your child's Student ID here"
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.bg, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none" }}
            />
          </div>
          <button onClick={linkChild} disabled={linking} style={{ background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, opacity: linking ? 0.7 : 1 }}>
            {linking ? "Linking..." : "Link Child →"}
          </button>

          <div style={{ background: "#1A4DB322", borderRadius: 12, padding: 16, marginTop: 20 }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 6 }}>How to find Student ID:</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
              1. Ask your child to open RIF-App and log in<br/>
              2. Go to Dashboard<br/>
              3. Scroll down to find their Student ID<br/>
              4. They copy and share it with you
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function VideosView({ t, user, isMobile }) {
  const [videos, setVideos] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const { data } = await supabase
        .from("teacher_videos")
        .select("*, teacher_profiles(full_name, subject, school, is_verified)")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data) setVideos(data);
    } catch(e) {
      console.log("Load videos error:", e);
    }
    setLoading(false);
  }

  const filtered = videos.filter(v => {
    const matchFilter = filter === "All" || v.curriculum === filter;
    const matchLevel = level === "All" || v.level === level;
    const matchSearch = search === "" || 
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchLevel && matchSearch;
  });

  const freeVideos = filtered.filter(v => v.is_free);
  const paidVideos = filtered.filter(v => !v.is_free);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading videos...</div>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 1000, background: t.bg, minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: t.text, marginBottom: 6 }}>
        Video Lessons
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24 }}>
        Learn from Zimbabwe's best teachers
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search videos by subject or title..."
        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: t.cardBorder, background: t.card, color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, outline: "none", marginBottom: 16 }}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["All", "ZIMSEC", "Cambridge"].map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 18px", borderRadius: 99,
            background: filter === c ? "#C9A84C" : t.card,
            borderWidth: 1, borderStyle: "solid",
            borderColor: filter === c ? "#C9A84C" : t.cardBorder,
            color: filter === c ? "#0A1628" : t.textMuted,
            fontSize: 13, fontWeight: filter === c ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{c}</button>
        ))}
        {["All", "O-Level", "A-Level"].map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{
            padding: "7px 18px", borderRadius: 99,
            background: level === l ? "#1A4DB3" : t.card,
            borderWidth: 1, borderStyle: "solid",
            borderColor: level === l ? "#1A4DB3" : t.cardBorder,
            color: level === l ? "#fff" : t.textMuted,
            fontSize: 13, fontWeight: level === l ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{l}</button>
        ))}
      </div>

      {videos.length === 0 ? (
        <div style={{ background: t.card, borderRadius: 16, padding: 60, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎥</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, marginBottom: 8 }}>No Videos Yet</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 20 }}>
            Teachers are uploading lessons. Check back soon!
          </div>
          <div style={{ background: "#1A4DB322", borderRadius: 12, padding: 16, maxWidth: 400, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 4 }}>Are you a teacher?</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.textMuted }}>Go to the Teacher tab to upload your video lessons and reach thousands of students!</div>
          </div>
        </div>
      ) : (
        <div>
          {/* Free Videos */}
          {freeVideos.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 16 }}>
                🆓 Free Lessons ({freeVideos.length})
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
                {freeVideos.map(video => (
                  <div key={video.id} style={{ background: t.card, borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ background: "linear-gradient(135deg, #0D2B6B, #1A4DB3)", padding: "28px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}
                      onClick={() => setSelectedVideo(video)}>
                      <span style={{ fontSize: 48 }}>▶️</span>
                      <div style={{ position: "absolute", top: 10, right: 10, background: "#1A7A4A", borderRadius: 6, padding: "2px 8px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#fff", fontWeight: 600 }}>FREE</div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: t.text, marginBottom: 6 }}>{video.title}</h4>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginBottom: 8 }}>
                        {video.subject} · {video.curriculum} {video.level}
                      </div>
                      {video.teacher_profiles && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0A1628" }}>
                            {video.teacher_profiles.full_name?.charAt(0)}
                          </div>
                          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
                            {video.teacher_profiles.full_name} · {video.teacher_profiles.school}
                            {video.teacher_profiles.is_verified && " ✓"}
                          </span>
                        </div>
                      )}
                      <a href={video.video_url} target="_blank" rel="noreferrer" style={{ display: "block", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", borderRadius: 8, padding: "10px", color: "#0A1628", fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif", textAlign: "center" }}>
                        Watch Now →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paid Videos */}
          {paidVideos.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 16 }}>
                💎 Premium Lessons ({paidVideos.length})
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
                {paidVideos.map(video => (
                  <div key={video.id} style={{ background: t.card, borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ background: "linear-gradient(135deg, #1A1A2E, #16213E)", padding: "28px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span style={{ fontSize: 48, filter: "blur(2px)" }}>▶️</span>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#00000066" }}>
                        <span style={{ fontSize: 32 }}>🔒</span>
                      </div>
                      <div style={{ position: "absolute", top: 10, right: 10, background: "#C9A84C", borderRadius: 6, padding: "2px 8px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#0A1628", fontWeight: 700 }}>${video.price}</div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: t.text, marginBottom: 6 }}>{video.title}</h4>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginBottom: 8 }}>
                        {video.subject} · {video.curriculum} {video.level}
                      </div>
                      {video.teacher_profiles && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0A1628" }}>
                            {video.teacher_profiles.full_name?.charAt(0)}
                          </div>
                          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
                            {video.teacher_profiles.full_name} · {video.teacher_profiles.school}
                          </span>
                        </div>
                      )}
                      <button style={{ width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8CC80)", border: "none", borderRadius: 8, padding: "10px", color: "#0A1628", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif" }}>
                        Unlock for ${video.price} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function AdminView({ t, user, isMobile }) {
  const [tab, setTab] = useState("videos");
  const [pendingVideos, setPendingVideos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    try {
      const { data: videos } = await supabase
        .from("teacher_videos")
        .select("*, teacher_profiles(full_name, school, subject)")
        .eq("status", "pending");
      if (videos) setPendingVideos(videos);

      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: testCount } = await supabase
        .from("test_attempts")
        .select("*", { count: "exact", head: true });

      const { count: messageCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      const { count: teacherCount } = await supabase
        .from("teacher_profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        users: userCount || 0,
        tests: testCount || 0,
        messages: messageCount || 0,
        teachers: teacherCount || 0,
      });
    } catch(e) {
      console.log("Admin load error:", e);
    }
    setLoading(false);
  }

  async function approveVideo(videoId) {
    await supabase.from("teacher_videos").update({ status: "approved" }).eq("id", videoId);
    setMessage("✅ Video approved!");
    setPendingVideos(prev => prev.filter(v => v.id !== videoId));
  }

  async function rejectVideo(videoId) {
    await supabase.from("teacher_videos").update({ status: "rejected" }).eq("id", videoId);
    setMessage("❌ Video rejected!");
    setPendingVideos(prev => prev.filter(v => v.id !== videoId));
  }

  const tabs = [
    { id: "videos", label: "🎥 Pending Videos" },
    { id: "stats", label: "📊 Platform Stats" },
  ];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: t.bg }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>Loading admin...</div>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? "16px" : "32px 36px", maxWidth: 900, background: t.bg, minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: t.text }}>
          ⚙️ Admin Panel
        </h1>
        <span style={{ background: "#F4433622", color: "#F44336", borderRadius: 6, padding: "2px 8px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700 }}>PRIVATE</span>
      </div>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted, marginBottom: 24 }}>
        Manage RIF-App platform
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            padding: "8px 16px", borderRadius: 99,
            background: tab === tb.id ? "#C9A84C" : t.card,
            borderWidth: 1, borderStyle: "solid",
            borderColor: tab === tb.id ? "#C9A84C" : t.cardBorder,
            color: tab === tb.id ? "#0A1628" : t.textMuted,
            fontSize: 13, fontWeight: tab === tb.id ? 700 : 400,
            cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>{tb.label}</button>
        ))}
      </div>

      {message && (
        <div style={{ background: message.includes("✅") ? "#1A7A4A22" : "#F4433622", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: message.includes("✅") ? "#1A7A4A" : "#F44336" }}>
          {message}
        </div>
      )}

      {/* Stats Tab */}
      {tab === "stats" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total Users", value: stats.users, icon: "👤", color: "#1A4DB3" },
              { label: "Tests Taken", value: stats.tests, icon: "📝", color: "#C9A84C" },
              { label: "Messages Sent", value: stats.messages, icon: "💬", color: "#1A7A4A" },
              { label: "Teachers", value: stats.teachers, icon: "👨‍🏫", color: "#9C27B0" },
            ].map(stat => (
              <div key={stat.label} style={{ background: t.card, borderRadius: 14, padding: 20, borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: stat.color, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: t.card, borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, marginBottom: 16 }}>Platform Health</h3>
            {[
              { label: "Supabase Database", status: "Operational", color: "#1A7A4A" },
              { label: "Paynow Payments", status: "Live - Pending Approval", color: "#C9A84C" },
              { label: "EcoCash Payments", status: "Active", color: "#1A7A4A" },
              { label: "Visa/Mastercard", status: "Pending Verification", color: "#F44336" },
              { label: "AI Notes", status: "Credits Needed", color: "#F44336" },
              { label: "Vercel Hosting", status: "Operational", color: "#1A7A4A" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: t.cardBorder }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: t.text }}>{item.label}</span>
                <span style={{ background: item.color + "22", color: item.color, borderRadius: 6, padding: "2px 10px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Videos Tab */}
      {tab === "videos" && (
        <div>
          {pendingVideos.length === 0 ? (
            <div style={{ background: t.card, borderRadius: 16, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, marginBottom: 8 }}>All caught up!</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>No videos pending review</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {pendingVideos.map(video => (
                <div key={video.id} style={{ background: t.card, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: t.text, marginBottom: 4 }}>{video.title}</h4>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
                        {video.subject} · {video.curriculum} {video.level} · {video.is_free ? "Free" : `$${video.price}`}
                      </div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 4 }}>
                        By {video.teacher_profiles?.full_name} · {video.teacher_profiles?.school}
                      </div>
                    </div>
                    <span style={{ background: "#FF980022", color: "#FF9800", borderRadius: 6, padding: "2px 8px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>PENDING</span>
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: t.text, marginBottom: 12 }}>{video.description}</div>
                  <a href={video.video_url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#1A4DB3", display: "block", marginBottom: 16 }}>
                    🔗 {video.video_url}
                  </a>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => approveVideo(video.id)} style={{ flex: 1, background: "linear-gradient(135deg, #1A7A4A, #2EAD6A)", border: "none", borderRadius: 8, padding: "10px", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                      ✅ Approve
                    </button>
                    <button onClick={() => rejectVideo(video.id)} style={{ flex: 1, background: "#F4433622", borderWidth: 1, borderStyle: "solid", borderColor: "#F44336", borderRadius: 8, padding: "10px", color: "#F44336", fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}