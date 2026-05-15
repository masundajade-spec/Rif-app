import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

const chatRooms = [
  { id: 1, name: "Mathematics", curriculum: "ZIMSEC", level: "O-Level", color: "#1A4DB3" },
  { id: 2, name: "Mathematics", curriculum: "ZIMSEC", level: "A-Level", color: "#0D47A1" },
  { id: 3, name: "Physics", curriculum: "ZIMSEC", level: "O-Level", color: "#2196F3" },
  { id: 4, name: "Chemistry", curriculum: "ZIMSEC", level: "O-Level", color: "#9C27B0" },
  { id: 5, name: "Biology", curriculum: "ZIMSEC", level: "O-Level", color: "#4CAF50" },
  { id: 6, name: "English Language", curriculum: "ZIMSEC", level: "O-Level", color: "#8B3FC8" },
  { id: 7, name: "Economics", curriculum: "ZIMSEC", level: "A-Level", color: "#F44336" },
  { id: 8, name: "History", curriculum: "ZIMSEC", level: "O-Level", color: "#795548" },
  { id: 9, name: "Geography", curriculum: "ZIMSEC", level: "O-Level", color: "#00BCD4" },
  { id: 10, name: "Computer Science", curriculum: "ZIMSEC", level: "O-Level", color: "#3F51B5" },
  { id: 11, name: "Mathematics", curriculum: "Cambridge", level: "O-Level", color: "#1565C0" },
  { id: 12, name: "General Discussion", curriculum: "All", level: "All", color: "#C9A84C" },
];

export default function ChatView({ t, user }) {
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const userName = user && user.user_metadata && user.user_metadata.full_name
    ? user.user_metadata.full_name
    : user && user.email ? user.email : "Student";

 useEffect(() => {
    if (!activeRoom) return;
    try {
      loadMessages();
    } catch(e) {
      console.log(e);
    }
  }, [activeRoom]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

 async function loadMessages() {
    try {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", activeRoom.id)
        .order("created_at", { ascending: true })
        .limit(50);
      if (data) setMessages(data);
    } catch(e) {
      console.log(e);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim() || sending || !user) return;
    setSending(true);
    await supabase.from("messages").insert({
      room_id: activeRoom.id,
      user_id: user.id,
      user_name: userName,
      content: newMessage.trim(),
    });
    setNewMessage("");
    setSending(false);
    loadMessages();
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Room list */}
      <div style={{
        width: 240, background: t.card,
        borderRight: "1px solid " + t.cardBorder,
        overflowY: "auto", flexShrink: 0
      }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid " + t.cardBorder }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: t.text, fontWeight: 700 }}>
            Study Chat
          </div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 4 }}>
            Discuss with other students
          </div>
        </div>
        <div style={{ padding: 8 }}>
          {chatRooms.map(function(room) {
            var isActive = activeRoom && activeRoom.id === room.id;
            return (
              <div
                key={room.id}
                onClick={function() { setActiveRoom(room); setMessages([]); }}
                style={{
                  padding: "12px 14px", borderRadius: 10, marginBottom: 4,
                  cursor: "pointer",
                  background: isActive ? room.color + "22" : "transparent",
                  border: "1px solid " + (isActive ? room.color : "transparent"),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: room.color, flexShrink: 0
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 13, fontWeight: 600, color: t.text
                    }}>{room.name}</div>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11, color: t.textMuted
                    }}>{room.curriculum} · {room.level}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {activeRoom ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: t.bg }}>
          {/* Header */}
          <div style={{
            padding: "16px 24px", background: t.card,
            borderBottom: "1px solid " + t.cardBorder,
            display: "flex", alignItems: "center", gap: 12
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: activeRoom.color }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: t.text, fontWeight: 700 }}>
                {activeRoom.name}
              </div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: t.textMuted }}>
                {activeRoom.curriculum} · {activeRoom.level}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: "center", marginTop: 60,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 14, color: t.textMuted
              }}>
                No messages yet — start the discussion!
              </div>
            )}
            {messages.map(function(msg) {
              var isMe = user && msg.user_id === user.id;
              return (
                <div key={msg.id} style={{
                  display: "flex",
                  flexDirection: isMe ? "row-reverse" : "row",
                  gap: 10, alignItems: "flex-end", marginBottom: 12
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: isMe
                      ? "linear-gradient(135deg, #C9A84C, #E8CC80)"
                      : "linear-gradient(135deg, #1A4DB3, #3468D1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0,
                    fontFamily: "'Source Sans 3', sans-serif"
                  }}>
                    {msg.user_name ? msg.user_name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div style={{ maxWidth: "65%" }}>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11, color: t.textMuted, marginBottom: 3,
                      textAlign: isMe ? "right" : "left"
                    }}>
                      {isMe ? "You" : msg.user_name}
                    </div>
                    <div style={{
                      background: isMe
                        ? "linear-gradient(135deg, #C9A84C, #E8CC80)"
                        : t.card,
                      border: "1px solid " + (isMe ? "#C9A84C" : t.cardBorder),
                      borderRadius: 12, padding: "10px 14px",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 14,
                      color: isMe ? "#0A1628" : t.text
                    }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "16px 24px", background: t.card,
            borderTop: "1px solid " + t.cardBorder,
            display: "flex", gap: 12
          }}>
            <input
              value={newMessage}
              onChange={function(e) { setNewMessage(e.target.value); }}
              onKeyPress={function(e) { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type a message and press Enter..."
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 12,
                border: "1.5px solid " + t.cardBorder,
                background: t.bg, color: t.text,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 14, outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8CC80)",
                border: "none", borderRadius: 12,
                padding: "12px 20px", color: "#0A1628",
                fontWeight: 700, cursor: "pointer", fontSize: 14,
                opacity: (sending || !newMessage.trim()) ? 0.5 : 1,
                fontFamily: "'Source Sans 3', sans-serif"
              }}
            >
              {sending ? "..." : "Send"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column",
          gap: 16, background: t.bg
        }}>
          <div style={{ fontSize: 56 }}>💬</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: t.text, fontWeight: 700 }}>
            Select a Chat Room
          </div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: t.textMuted }}>
            Choose a subject from the left to start chatting
          </div>
        </div>
      )}
    </div>
  );
}