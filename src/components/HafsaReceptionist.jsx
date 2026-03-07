import { useState, useRef, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Lato:wght@300;400;700&display=swap');

  :root {
    --haw-bg: #fdf8f2;
    --haw-bg2: #f5ece0;
    --haw-border: #e0cdb8;
    --haw-brown: #7a5c40;
    --haw-brown-light: #9c7a5b;
    --haw-brown-dark: #4a3525;
    --haw-sage: #8fa888;
    --haw-white: #fefcf8;
    --haw-text: #3d2b1f;
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
  .haw-toggle:hover { transform: scale(1.1); }
  .haw-toggle-icon { font-size: 1.5rem; line-height: 1; }
  .haw-badge {
    position: absolute; top: -2px; right: -2px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #c9a0a0; border: 2px solid #fff;
    font-size: 0.6rem; color: #fff; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  .haw-window {
    position: fixed;
    bottom: 104px; right: 28px;
    width: 360px; max-height: 560px;
    background: var(--haw-white);
    border-radius: 20px;
    box-shadow: 0 12px 56px rgba(80,50,20,0.22);
    border: 1.5px solid var(--haw-border);
    display: flex; flex-direction: column;
    overflow: hidden; z-index: 9998;
    transform-origin: bottom right;
    transition: transform .3s cubic-bezier(0.34,1.56,0.64,1), opacity .25s ease;
  }
  .haw-window.haw-closed { transform: scale(0.82) translateY(20px); opacity: 0; pointer-events: none; }
  .haw-window.haw-open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

  .haw-header {
    background: linear-gradient(135deg, #7a5c40 0%, #9c7a5b 100%);
    padding: 14px 16px;
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .haw-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    border: 2px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
  }
  .haw-header-name { font-family: 'Dancing Script', cursive; font-size: 1.1rem; color: #fff; line-height: 1.1; }
  .haw-header-status { font-family: 'Lato', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.75); display: flex; align-items: center; gap: 4px; }
  .haw-dot { width: 7px; height: 7px; border-radius: 50%; background: #a8e6a0; animation: haw-pulse 2s infinite; }
  @keyframes haw-pulse { 0%,100%{box-shadow:0 0 0 2px rgba(168,230,160,0.3)} 50%{box-shadow:0 0 0 5px rgba(168,230,160,0.1)} }
  .haw-close-btn {
    margin-left: auto; background: rgba(255,255,255,0.15); border: none;
    width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: background .2s;
  }
  .haw-close-btn:hover { background: rgba(255,255,255,0.28); }
  .haw-close-btn svg { width: 12px; height: 12px; stroke: white; fill: none; stroke-width: 2.5; stroke-linecap: round; }

  .haw-messages {
    flex: 1; overflow-y: auto; padding: 14px 12px 8px;
    display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
  }
  .haw-messages::-webkit-scrollbar { width: 3px; }
  .haw-messages::-webkit-scrollbar-thumb { background: var(--haw-border); border-radius: 3px; }

  .haw-msg { display: flex; gap: 7px; align-items: flex-end; animation: haw-in .25s ease; }
  @keyframes haw-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .haw-msg.haw-bot { justify-content: flex-start; }
  .haw-msg.haw-user { justify-content: flex-end; }

  .haw-bot-icon {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #f5ece0, #e0cdb8);
    border: 1px solid #e0cdb8;
    display: flex; align-items: center; justify-content: center; font-size: 0.8rem;
  }
  .haw-bubble {
    max-width: 80%; padding: 9px 13px; border-radius: 15px;
    font-size: 0.845rem; font-family: 'Lato', sans-serif; line-height: 1.55;
  }
  .haw-msg.haw-bot .haw-bubble {
    background: var(--haw-bg2); color: var(--haw-text);
    border: 1px solid var(--haw-border); border-bottom-left-radius: 4px;
  }
  .haw-msg.haw-user .haw-bubble {
    background: linear-gradient(135deg, #7a5c40, #9c7a5b);
    color: white; border-bottom-right-radius: 4px;
  }

  .haw-typing { display: flex; gap: 4px; padding: 4px 2px; align-items: center; }
  .haw-typing span { width: 6px; height: 6px; border-radius: 50%; background: #c4a882; animation: haw-bounce 1.2s infinite; }
  .haw-typing span:nth-child(2) { animation-delay: .2s; }
  .haw-typing span:nth-child(3) { animation-delay: .4s; }
  @keyframes haw-bounce { 0%,60%,100%{transform:none;opacity:.4} 30%{transform:translateY(-5px);opacity:1} }

  .haw-qr { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 12px 8px; }
  .haw-qr-btn {
    background: var(--haw-white); border: 1.5px solid var(--haw-border);
    color: var(--haw-brown); padding: 6px 12px; border-radius: 20px;
    font-size: 0.77rem; font-family: 'Lato', sans-serif;
    cursor: pointer; transition: all .18s; white-space: nowrap;
  }
  .haw-qr-btn:hover { background: var(--haw-brown); color: #fff; border-color: var(--haw-brown); transform: translateY(-1px); }

  .haw-input-row {
    padding: 9px 12px 13px; border-top: 1.5px solid var(--haw-bg2);
    background: white; display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
  }
  .haw-input {
    flex: 1; border: 1.5px solid var(--haw-border); border-radius: 18px;
    padding: 8px 13px; font-size: 0.845rem; font-family: 'Lato', sans-serif;
    background: var(--haw-bg); color: var(--haw-text);
    outline: none; resize: none; max-height: 70px; line-height: 1.4;
    transition: border-color .2s;
  }
  .haw-input:focus { border-color: var(--haw-brown-light); }
  .haw-input::placeholder { color: #c4a882; }
  .haw-send {
    width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%;
    background: linear-gradient(135deg, #7a5c40, #9c7a5b);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(122,92,64,0.35); transition: transform .2s;
  }
  .haw-send:hover { transform: scale(1.1); }
  .haw-send svg { width: 15px; height: 15px; fill: white; margin-left: 2px; }
  .haw-footer { text-align: center; font-size: 0.6rem; color: #c4a882; padding-bottom: 5px; font-family: 'Lato', sans-serif; }

  @media (max-width: 440px) {
    .haw-window { width: calc(100vw - 20px); right: 10px; bottom: 88px; }
    .haw-toggle { bottom: 16px; right: 16px; }
  }
`;

// ── RESPONSES ──
const getResponse = (input) => {
  const t = input.toLowerCase();

  // Greetings
  if (t.match(/^(hi|hello|hey|salam|assalam|hola|good\s*(morning|evening|afternoon))/)) {
    return {
      text: "Wa alaikum assalam! 🌸 Welcome to Hafsa's Art World! I'm Hana, your shop guide. How can I help you today?",
      suggestions: ["🛍️ Browse products", "🚚 Shipping info", "💳 Payment methods", "🎨 Custom order", "💬 Contact Hafsa"]
    };
  }

  // Browse / products
  if (t.match(/browse|products|shop|what.*sell|show.*items|catalogue|catalog/)) {
    return {
      text: "We have two beautiful collections 🎨🧶\n\n🖼️ **Paintings** — Original acrylic, watercolour & oil paintings\n🧶 **Crochet** — Handmade bags, amigurumi toys, hats, pouches & more\n\nWhat would you like to explore?",
      suggestions: ["🖼️ See paintings", "🧶 See crochet items", "🎨 Custom order", "💬 Contact Hafsa"]
    };
  }

  // Paintings
  if (t.match(/paint(ing)?s?|canvas|acrylic|watercolour|watercolor|oil paint/)) {
    return {
      text: "Our paintings are all original, one-of-a-kind pieces 🖼️ Hafsa works in acrylic, watercolour and oil on canvas.\n\nEach piece is unique — once sold it's gone! Browse the shop to see what's currently available.",
      suggestions: ["🧶 See crochet instead", "🎨 Commission a painting", "🚚 Shipping info", "💬 Contact Hafsa"]
    };
  }

  // Crochet
  if (t.match(/crochet|knit|yarn|amigurumi|tote|bag|hat|pouch|hanger|stuffed|plush|toy/)) {
    return {
      text: "Our crochet collection is made with love 🧶 We have:\n\n• Tote bags & pouches\n• Amigurumi toys & plushies\n• Hats & accessories\n• Plant hangers\n\nAll made by hand with quality yarn!",
      suggestions: ["🖼️ See paintings instead", "🎨 Custom crochet order", "🚚 Shipping info", "💬 Contact Hafsa"]
    };
  }

  // Shipping
  if (t.match(/ship|deliver|delivery|courier|dispatch|send|postal|post/)) {
    return {
      text: "📦 **Shipping Info:**\n\n• We ship within **Pakistan only**\n• Estimated delivery: **5–7 business days**\n• Your order is carefully packed before dispatch\n\nFor any shipping questions, contact Hafsa on WhatsApp!",
      suggestions: ["💳 Payment methods", "🔄 Return policy", "💬 Contact Hafsa"]
    };
  }

  // Payment
  if (t.match(/pay(ment)?|price|cost|how much|method|transfer|jazzcash|easypaisa|visa|card|bank/)) {
    return {
      text: "💳 **We accept:**\n\n• Bank Transfer\n• JazzCash\n• EasyPaisa\n• Visa / Mastercard\n\nWe do **not** accept PayPal, Apple Pay, Google Pay or cash on delivery.",
      suggestions: ["🚚 Shipping info", "🎨 Custom order", "💬 Contact Hafsa"]
    };
  }

  // Returns / refunds
  if (t.match(/return|refund|exchange|cancel|money back/)) {
    return {
      text: "Our return & refund policy is currently being finalised 🌸\n\nFor any concerns about your order, please reach out to Hafsa directly on WhatsApp and she'll sort it out for you!",
      suggestions: ["💬 Contact Hafsa", "🚚 Shipping info", "🛍️ Browse products"]
    };
  }

  // Custom orders
  if (t.match(/custom|commission|personalise|personalize|made to order|specific|own design|request/)) {
    return {
      text: "Yes! Hafsa loves custom orders 🎨🧶\n\nYou can request:\n• Custom painting commissions\n• Personalised crochet items\n• Specific colours or sizes\n\nJust contact Hafsa on WhatsApp with your idea!",
      suggestions: ["💬 Contact Hafsa on WhatsApp", "🚚 Shipping info", "💳 Payment methods"]
    };
  }

  // Contact
  if (t.match(/contact|whatsapp|reach|talk|speak|message|instagram|email|get in touch/)) {
    return {
      text: "You can reach Hafsa directly on 📱 **WhatsApp** — she's friendly and responds quickly!\n\nShe's available to help with:\n• Custom orders\n• Order queries\n• Any questions about products",
      suggestions: ["🎨 Custom order", "🛍️ Browse products", "🚚 Shipping info"]
    };
  }

  // Care instructions
  if (t.match(/care|wash|clean|maintain|look after|dry/)) {
    return {
      text: "🧺 **Care Guide:**\n\n**Crochet items:** Hand-wash in cold water, lay flat to dry\n**Paintings:** Keep away from direct sunlight & moisture\n\nA care card is included with every order! 🌸",
      suggestions: ["🛍️ Browse products", "💬 Contact Hafsa"]
    };
  }

  // Prices
  if (t.match(/price|how much|cost|pkr|rupee/)) {
    return {
      text: "Prices vary by product and are listed in **PKR** on the shop 🌸\n\nBrowse the shop to see current prices. For custom orders, contact Hafsa on WhatsApp for a quote!",
      suggestions: ["🛍️ Browse products", "🎨 Custom order", "💬 Contact Hafsa"]
    };
  }

  // Gift
  if (t.match(/gift|present|birthday|eid|surprise|someone special/)) {
    return {
      text: "Handmade gifts are the most special kind 🎁🌸\n\nAll our items make wonderful gifts! We can also add a **personalised gift note** with your order.\n\nContact Hafsa on WhatsApp to arrange it!",
      suggestions: ["🛍️ Browse products", "💬 Contact Hafsa", "🚚 Shipping info"]
    };
  }

  // Order tracking
  if (t.match(/track|where.*order|order.*status|when.*arrive/)) {
    return {
      text: "📦 To track your order, please contact Hafsa directly on WhatsApp with your order details.\n\nShe'll give you the latest update on your delivery!",
      suggestions: ["💬 Contact Hafsa", "🚚 Shipping info"]
    };
  }

  // About
  if (t.match(/about|who.*hafsa|who.*you|story|brand/)) {
    return {
      text: "Hafsa's Art World is a handmade shop run by Hafsa — a passionate artist and crochet creator based in Pakistan 🇵🇰🌸\n\nEvery piece is made by hand with love and care. No two items are exactly alike!",
      suggestions: ["🛍️ Browse products", "🎨 Custom order", "💬 Contact Hafsa"]
    };
  }

  // Thank you
  if (t.match(/thank|thanks|shukria|jazakallah/)) {
    return {
      text: "You're so welcome! 🌸 It was lovely helping you. Enjoy browsing Hafsa's Art World! ✨",
      suggestions: ["🛍️ Browse products", "💬 Contact Hafsa"]
    };
  }

  // Fallback
  return {
    text: "I'm not sure about that, but I don't want to leave you without help! 🌸 Here's what I can assist with:",
    suggestions: ["🛍️ Browse products", "🚚 Shipping info", "💳 Payment methods", "🎨 Custom order", "💬 Contact Hafsa"]
  };
};

const QUICK_MAP = {
  "🛍️ Browse products": "What products do you sell?",
  "🚚 Shipping info": "Tell me about shipping",
  "💳 Payment methods": "What payment methods do you accept?",
  "🎨 Custom order": "I want a custom order",
  "💬 Contact Hafsa": "How do I contact Hafsa?",
  "💬 Contact Hafsa on WhatsApp": "How do I contact Hafsa?",
  "🖼️ See paintings": "Show me your paintings",
  "🧶 See crochet items": "Show me your crochet items",
  "🖼️ See paintings instead": "Show me your paintings",
  "🧶 See crochet instead": "Show me crochet items",
  "🎨 Custom crochet order": "I want a custom crochet order",
  "🎨 Commission a painting": "I want to commission a painting",
  "🔄 Return policy": "What is your return policy?",
};

export default function HafsaReceptionist() {
  const [open, setOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    if (document.getElementById("haw-styles")) return;
    const tag = document.createElement("style");
    tag.id = "haw-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setBadgeVisible(false);
      setTimeout(() => showTypingThen(
        "Assalam o Alaikum! 🌸 Welcome to **Hafsa's Art World**!\n\nI'm Hana, your shop guide. I can help you explore our handmade paintings & crochet pieces, answer questions, or connect you with Hafsa. What can I help you with today?",
        ["🛍️ Browse products", "🚚 Shipping info", "💳 Payment methods", "🎨 Custom order", "💬 Contact Hafsa"]
      ), 400);
    }
  }, [open]);

  const pushMsg = (text, role) => setMessages(p => [...p, { text, role }]);

  const showTypingThen = (text, suggs, delay = 900) => {
    setTyping(true);
    setSuggestions([]);
    setTimeout(() => {
      setTyping(false);
      pushMsg(text, "bot");
      setSuggestions(suggs || []);
    }, delay);
  };

  const handleSend = (text) => {
    const msg = (text || inputVal).trim();
    if (!msg) return;
    setInputVal("");
    if (taRef.current) taRef.current.style.height = "auto";
    setSuggestions([]);
    pushMsg(msg, "user");
    const { text: reply, suggestions: suggs } = getResponse(msg);
    showTypingThen(reply, suggs, 800);
  };

  const handleQR = (label) => {
    const mapped = QUICK_MAP[label] || label;
    handleSend(mapped);
  };

  const renderText = (text) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part.split("\n").map((line, j, arr) =>
            <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
          )
    );

  return (
    <>
      <button className="haw-toggle" onClick={() => setOpen(o => !o)} aria-label="Open shop assistant">
        <span className="haw-toggle-icon">{open ? "✕" : "🧶"}</span>
        {badgeVisible && !open && <div className="haw-badge">1</div>}
      </button>

      <div className={`haw-window ${open ? "haw-open" : "haw-closed"}`}>
        <div className="haw-header">
          <div className="haw-avatar">🌸</div>
          <div>
            <div className="haw-header-name">Hana — Shop Guide</div>
            <div className="haw-header-status"><span className="haw-dot" />Hafsa's Art World</div>
          </div>
          <button className="haw-close-btn" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="haw-messages">
          {messages.map((m, i) => (
            <div key={i} className={`haw-msg ${m.role === "bot" ? "haw-bot" : "haw-user"}`}>
              {m.role === "bot" && <div className="haw-bot-icon">🌸</div>}
              <div className="haw-bubble">{renderText(m.text)}</div>
            </div>
          ))}
          {typing && (
            <div className="haw-msg haw-bot">
              <div className="haw-bot-icon">🌸</div>
              <div className="haw-bubble"><div className="haw-typing"><span/><span/><span/></div></div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {suggestions.length > 0 && !typing && (
          <div className="haw-qr">
            {suggestions.map((s, i) => (
              <button key={i} className="haw-qr-btn" onClick={() => handleQR(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="haw-footer">Hafsa's Art World ✦ Handmade with love 🌸</div>

        <div className="haw-input-row">
          <textarea
            ref={taRef}
            className="haw-input"
            placeholder="Type a message…"
            rows={1}
            value={inputVal}
            onChange={e => {
              setInputVal(e.target.value);
              const ta = taRef.current;
              if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 70) + "px"; }
            }}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
          <button className="haw-send" onClick={() => handleSend()}>
            <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
