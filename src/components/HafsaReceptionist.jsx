
import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
//  SHOP KNOWLEDGE BASE  (edit to match your real products/policies)
// ─────────────────────────────────────────────
const SHOP_CONTEXT = `
You are "Hana", the friendly AI receptionist for "Hafsa's Art World" — a handmade online shop based in Pakistan, specialising in:
• Original paintings (acrylic, watercolour, oil)
• Hand-crocheted items (bags, amigurumi toys, hats, plant hangers, pouches)
• Custom / commission orders

CONFIRMED SHOP POLICIES (only share what is listed here — never guess or add anything extra):

SHIPPING:
- We currently ship within Pakistan only. We do not offer international or worldwide shipping.
- Estimated delivery time: 5–7 business days within Pakistan.

PAYMENT:
- Accepted methods: Bank Transfer, JazzCash, EasyPaisa, Visa/Mastercard card payments.
- We do NOT accept PayPal, Apple Pay, Google Pay, or cash on delivery.

RETURNS & REFUNDS:
- Our return/refund policy is not finalised yet. Direct the customer to contact Hafsa on WhatsApp for any concerns.

CUSTOM ORDERS:
- Yes! Hafsa accepts custom and commission orders for both paintings and crochet items.
- For custom orders, customers should contact Hafsa directly on WhatsApp.

CONTACT:
- WhatsApp is the main contact channel. Direct all queries, custom order requests, and complaints there.
- Do not mention email or Instagram as contact options unless the customer specifically asks for alternatives.

PRODUCTS:
- Do not list specific products, prices, or availability unless the customer is browsing the website directly.
- Instead, invite them to browse the shop and offer to help answer questions about what they see.

STRICT RULES — follow these at all times:
1. NEVER mention Apple Pay, Google Pay, PayPal, cash on delivery, or any payment method not listed above.
2. NEVER say we ship worldwide or outside Pakistan.
3. NEVER invent a return policy — say it is not finalised and point to WhatsApp.
4. NEVER make up product prices, stock levels, or delivery timelines beyond what is stated here.
5. If you are unsure about anything, say "I'm not sure about that — please reach out to Hafsa on WhatsApp and she'll help you right away! 🌸"

TONE: Warm, friendly, concise — like a helpful shop assistant. Use light emojis occasionally. Keep replies to 2–4 sentences unless explaining a policy.
`;

// ─────────────────────────────────────────────
//  QUICK REPLY SUGGESTIONS
// ─────────────────────────────────────────────
const INITIAL_SUGGESTIONS = [
  "🛍️ Browse products",
  "🚚 Shipping info",
  "💳 Payment methods",
  "🎨 Custom order",
  "💬 Contact Hafsa",
];

// ─────────────────────────────────────────────
//  STYLES  (all scoped via className prefix "haw-")
// ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&family=Dancing+Script:wght@500;700&display=swap');

  :root {
    --haw-bg: #fdf8f2;
    --haw-bg2: #f5ece0;
    --haw-border: #e0cdb8;
    --haw-brown: #7a5c40;
    --haw-brown-light: #9c7a5b;
    --haw-brown-dark: #4a3525;
    --haw-sage: #8fa888;
    --haw-sage-light: #ddebd8;
    --haw-rose: #c9a0a0;
    --haw-white: #fefcf8;
    --haw-text: #3d2b1f;
    --haw-text-soft: #7a6255;
    --haw-radius: 20px;
  }

  .haw-toggle {
    position: fixed;
    bottom: 28px; right: 28px;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7a5c40 0%, #9c7a5b 100%);
    border: none; cursor: pointer;
    box-shadow: 0 6px 28px rgba(122,92,64,0.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
    transition: transform .25s, box-shadow .25s;
  }
  .haw-toggle:hover { transform: scale(1.1); box-shadow: 0 10px 36px rgba(122,92,64,0.55); }
  .haw-toggle-icon { font-size: 1.6rem; line-height: 1; }
  .haw-badge {
    position: absolute; top: -2px; right: -2px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--haw-rose); border: 2px solid #fff;
    font-size: 0.6rem; color: #fff; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  .haw-window {
    position: fixed;
    bottom: 104px; right: 28px;
    width: 370px;
    max-height: 580px;
    background: var(--haw-white);
    border-radius: var(--haw-radius);
    box-shadow: 0 12px 56px rgba(80,50,20,0.22);
    border: 1.5px solid var(--haw-border);
    display: flex; flex-direction: column;
    overflow: hidden;
    z-index: 9998;
    transform-origin: bottom right;
    transition: transform .3s cubic-bezier(0.34,1.56,0.64,1), opacity .25s ease;
  }
  .haw-window.haw-closed {
    transform: scale(0.82) translateY(20px);
    opacity: 0;
    pointer-events: none;
  }
  .haw-window.haw-open {
    transform: scale(1) translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  /* Header */
  .haw-header {
    background: linear-gradient(135deg, #7a5c40 0%, #9c7a5b 100%);
    padding: 16px 18px;
    display: flex; align-items: center; gap: 11px;
    flex-shrink: 0;
  }
  .haw-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    border: 2px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.35rem; flex-shrink: 0;
  }
  .haw-header-name {
    font-family: 'Dancing Script', cursive;
    font-size: 1.15rem; color: #fff; line-height: 1.1;
  }
  .haw-header-status {
    font-family: 'Lato', sans-serif;
    font-size: 0.7rem; color: rgba(255,255,255,0.75); letter-spacing: 0.05em;
    display: flex; align-items: center; gap: 4px;
  }
  .haw-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #a8e6a0;
    box-shadow: 0 0 0 2px rgba(168,230,160,0.35);
    animation: haw-pulse 2s infinite;
  }
  @keyframes haw-pulse { 0%,100%{box-shadow:0 0 0 2px rgba(168,230,160,0.3)} 50%{box-shadow:0 0 0 5px rgba(168,230,160,0.1)} }
  .haw-close-btn {
    margin-left: auto; background: rgba(255,255,255,0.15);
    border: none; width: 28px; height: 28px; border-radius: 50%;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .2s; flex-shrink: 0;
  }
  .haw-close-btn:hover { background: rgba(255,255,255,0.28); }
  .haw-close-btn svg { width: 13px; height: 13px; stroke: white; fill: none; stroke-width: 2.5; stroke-linecap: round; }

  /* Messages */
  .haw-messages {
    flex: 1; overflow-y: auto; padding: 16px 14px 8px;
    display: flex; flex-direction: column; gap: 12px;
    scroll-behavior: smooth;
  }
  .haw-messages::-webkit-scrollbar { width: 3px; }
  .haw-messages::-webkit-scrollbar-thumb { background: var(--haw-border); border-radius: 3px; }

  .haw-msg { display: flex; gap: 7px; align-items: flex-end; }
  .haw-msg.haw-bot { justify-content: flex-start; }
  .haw-msg.haw-user { justify-content: flex-end; }

  .haw-bot-icon {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--haw-bg2), var(--haw-border));
    border: 1px solid var(--haw-border);
    display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
  }
  .haw-bubble {
    max-width: 80%; padding: 10px 14px;
    border-radius: 16px; font-size: 0.855rem;
    font-family: 'Lato', sans-serif; line-height: 1.55;
  }
  .haw-msg.haw-bot .haw-bubble {
    background: var(--haw-bg2); color: var(--haw-text);
    border: 1px solid var(--haw-border); border-bottom-left-radius: 4px;
  }
  .haw-msg.haw-user .haw-bubble {
    background: linear-gradient(135deg, #7a5c40, #9c7a5b);
    color: white; border-bottom-right-radius: 4px;
  }

  /* Typing */
  .haw-typing { display: flex; gap: 4px; padding: 6px 2px; align-items: center; }
  .haw-typing span {
    width: 6px; height: 6px; border-radius: 50%; background: var(--haw-border);
    animation: haw-bounce 1.2s infinite;
  }
  .haw-typing span:nth-child(2) { animation-delay: .2s; }
  .haw-typing span:nth-child(3) { animation-delay: .4s; }
  @keyframes haw-bounce { 0%,60%,100%{transform:none;opacity:.4} 30%{transform:translateY(-6px);opacity:1} }

  /* Quick replies */
  .haw-qr {
    display: flex; flex-wrap: wrap; gap: 7px;
    padding: 4px 14px 10px;
  }
  .haw-qr-btn {
    background: var(--haw-white); border: 1.5px solid var(--haw-border);
    color: var(--haw-brown); padding: 6px 13px; border-radius: 20px;
    font-size: 0.78rem; font-family: 'Lato', sans-serif;
    cursor: pointer; transition: all .2s; white-space: nowrap;
  }
  .haw-qr-btn:hover { background: var(--haw-brown); color: #fff; border-color: var(--haw-brown); transform: translateY(-1px); }

  /* Input */
  .haw-input-row {
    padding: 10px 14px 14px;
    border-top: 1.5px solid var(--haw-bg2);
    background: var(--haw-white);
    display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
  }
  .haw-input {
    flex: 1; border: 1.5px solid var(--haw-border); border-radius: 20px;
    padding: 9px 14px; font-size: 0.855rem; font-family: 'Lato', sans-serif;
    background: var(--haw-bg); color: var(--haw-text);
    outline: none; resize: none; max-height: 76px; line-height: 1.4;
    transition: border-color .2s;
  }
  .haw-input:focus { border-color: var(--haw-brown-light); }
  .haw-input::placeholder { color: var(--haw-border); }
  .haw-send {
    width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%;
    background: linear-gradient(135deg, #7a5c40, #9c7a5b);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 12px rgba(122,92,64,0.35);
    transition: transform .2s, box-shadow .2s;
  }
  .haw-send:hover { transform: scale(1.1); box-shadow: 0 5px 18px rgba(122,92,64,0.45); }
  .haw-send svg { width: 16px; height: 16px; fill: white; margin-left: 2px; }

  .haw-footer {
    text-align: center; font-size: 0.62rem; color: var(--haw-border);
    padding-bottom: 6px; font-family: 'Lato', sans-serif; letter-spacing: 0.04em;
  }

  /* Error */
  .haw-error {
    font-size: 0.75rem; color: #c0392b; background: #fdecea;
    border: 1px solid #f5c6c4; border-radius: 10px; padding: 8px 12px;
    margin: 0 14px 8px; font-family: 'Lato', sans-serif;
  }

  @media (max-width: 440px) {
    .haw-window { width: calc(100vw - 20px); right: 10px; bottom: 90px; }
    .haw-toggle { bottom: 16px; right: 16px; }
  }
`;

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function HafsaReceptionist() {
  const [open, setOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [messages, setMessages] = useState([]);      // {role, text}
  const [history, setHistory]   = useState([]);      // Anthropic API format
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [started, setStarted]   = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const textareaRef    = useRef(null);

  // inject CSS once
  useEffect(() => {
    if (document.getElementById("haw-styles")) return;
    const tag = document.createElement("style");
    tag.id = "haw-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // open chat → greet once
  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setBadgeVisible(false);
      setTimeout(() => greet(), 350);
    }
  }, [open]);

  // auto-resize textarea
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 76) + "px"; }
  };

  // ── GREET ──
  const greet = () => {
    pushBot("Hi there! Welcome to **Hafsa's Art World** 🎨🧶\nI'm Hana, your shop assistant. I can help you explore our handmade paintings & crochet pieces, answer questions, or connect you with Hafsa. What can I do for you today?");
    setSuggestions(INITIAL_SUGGESTIONS);
  };

  // ── ADD MESSAGES ──
  const pushBot  = (text) => setMessages(prev => [...prev, { role: "bot",  text }]);
  const pushUser = (text) => setMessages(prev => [...prev, { role: "user", text }]);

  // ── SEND TO CLAUDE API ──
  const callClaude = async (userText, newHistory) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SHOP_CONTEXT,
          messages: newHistory,
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Sorry, I didn't catch that — could you try again?";
      pushBot(reply);
      setHistory(prev => [...prev,
        { role: "user",      content: userText },
        { role: "assistant", content: reply    },
      ]);
      // dynamic follow-up suggestions
      setSuggestions(pickSuggestions(userText, reply));
    } catch (err) {
      console.error(err);
      setError("Something went wrong reaching the AI. Please try again or contact Hafsa directly.");
    } finally {
      setLoading(false);
    }
  };

  // ── PICK FOLLOW-UP SUGGESTIONS ──
  const pickSuggestions = (userText, reply) => {
    const t = (userText + " " + reply).toLowerCase();
    if (t.includes("ship"))    return ["🔄 Return policy", "💳 Payment options", "📦 Track my order"];
    if (t.includes("return"))  return ["🚚 Shipping info",  "💬 Contact Hafsa",   "🛍️ Browse products"];
    if (t.includes("crochet")) return ["🖼️ See paintings",  "🎨 Custom order",    "🚚 Shipping info"];
    if (t.includes("paint"))   return ["🧶 See crochet",    "🎨 Custom order",    "📏 Sizes & framing"];
    if (t.includes("custom"))  return ["💬 Contact Hafsa",  "🚚 Shipping info",   "🛍️ Browse products"];
    if (t.includes("track"))   return ["🚚 Shipping info",  "🛍️ Browse products", "💬 Contact Hafsa"];
    return ["🛍️ Browse products", "🎨 Custom order", "💬 Contact Hafsa"];
  };

  // ── HANDLE SEND ──
  const handleSend = async (text) => {
    const msg = (text || inputVal).trim();
    if (!msg || loading) return;
    setInputVal("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
    setSuggestions([]);
    pushUser(msg);
    const newHistory = [...history, { role: "user", content: msg }];
    await callClaude(msg, newHistory);
  };

  // ── RENDER TEXT (bold via **) ──
  const renderText = (text) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part.split("\n").map((line, j) => <span key={`${i}-${j}`}>{line}{j < part.split("\n").length - 1 && <br/>}</span>)
    );

  return (
    <>
      {/* Toggle button */}
      <button
        className="haw-toggle"
        onClick={() => { setOpen(o => !o); }}
        aria-label="Open shop assistant"
      >
        <span className="haw-toggle-icon">{open ? "✕" : "🧶"}</span>
        {badgeVisible && !open && <div className="haw-badge">1</div>}
      </button>

      {/* Chat window */}
      <div className={`haw-window ${open ? "haw-open" : "haw-closed"}`} role="dialog" aria-label="Shop Assistant">

        {/* Header */}
        <div className="haw-header">
          <div className="haw-avatar">🌸</div>
          <div>
            <div className="haw-header-name">Hana — Shop Guide</div>
            <div className="haw-header-status">
              <span className="haw-dot" />
              Hafsa's Art World
            </div>
          </div>
          <button className="haw-close-btn" onClick={() => setOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="haw-messages" ref={messagesEndRef}>
          {messages.map((m, i) => (
            <div key={i} className={`haw-msg ${m.role === "bot" ? "haw-bot" : "haw-user"}`}>
              {m.role === "bot" && <div className="haw-bot-icon">🌸</div>}
              <div className="haw-bubble">{renderText(m.text)}</div>
            </div>
          ))}
          {loading && (
            <div className="haw-msg haw-bot">
              <div className="haw-bot-icon">🌸</div>
              <div className="haw-bubble">
                <div className="haw-typing"><span/><span/><span/></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && <div className="haw-error">⚠️ {error}</div>}

        {/* Quick replies */}
        {suggestions.length > 0 && !loading && (
          <div className="haw-qr">
            {suggestions.map((s, i) => (
              <button key={i} className="haw-qr-btn" onClick={() => handleSend(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="haw-footer">Powered by AI ✦ Hafsa's Art World</div>

        {/* Input */}
        <div className="haw-input-row">
          <textarea
            ref={textareaRef}
            className="haw-input"
            placeholder="Ask me anything…"
            rows={1}
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
          <button className="haw-send" onClick={() => handleSend()} aria-label="Send" disabled={loading}>
            <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
