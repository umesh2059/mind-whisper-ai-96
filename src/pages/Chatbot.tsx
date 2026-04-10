import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = { role: "user" | "assistant"; content: string };

const CRISIS_KEYWORDS = ["suicide", "kill myself", "end my life", "self-harm", "want to die"];

const CrisisAlert = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mx-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
  >
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold text-sm text-destructive mb-1">You're Not Alone</p>
        <p className="text-sm text-muted-foreground mb-3">
          If you're in crisis, please reach out to a professional right away.
        </p>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-destructive" />
            <span><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-destructive" />
            <span><strong>Crisis Text Line:</strong> Text HOME to 741741</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your MindfulAI companion. 💚 I'm here to listen and support you. How are you feeling today?\n\n*Please note: I'm an AI and not a substitute for professional therapy.*",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const detectCrisis = (text: string) =>
    CRISIS_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

  const getResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    if (lower.includes("anxious") || lower.includes("anxiety") || lower.includes("worried"))
      return "I hear you — anxiety can feel overwhelming. Let's try a grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment. 🌿\n\nWould you like to explore what's triggering your anxiety?";
    if (lower.includes("stress") || lower.includes("overwhelm"))
      return "Feeling stressed is your body's way of signaling it needs care. Let's take a slow breath together — inhale for 4 counts, hold for 4, exhale for 6. 🧘\n\nWhat's been weighing on you the most?";
    if (lower.includes("sad") || lower.includes("depress") || lower.includes("hopeless"))
      return "I'm sorry you're going through this. Your feelings are valid. Sometimes just acknowledging sadness is the first step. 💙\n\nWould it help to talk about what's been making you feel this way?";
    if (lower.includes("happy") || lower.includes("good") || lower.includes("great"))
      return "That's wonderful to hear! 🌟 Positive moments are worth celebrating. What's been contributing to your good mood? Recognizing these patterns can help sustain them.";
    if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("tired"))
      return "Sleep is so important for mental health. Some tips: try a consistent bedtime routine, avoid screens 30 minutes before bed, and try a body scan meditation. 🌙\n\nHow long has sleep been a concern for you?";
    if (lower.includes("lonely") || lower.includes("alone") || lower.includes("isolated"))
      return "Loneliness can be really painful. Remember that reaching out — even here — is a brave step. 💚 Connection can start small. Is there someone in your life you could reach out to today?";
    return "Thank you for sharing that with me. I'm here to listen and support you. Could you tell me more about how you're feeling? Understanding your emotions better can help us find ways to support your wellbeing. 🌱";
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (detectCrisis(trimmed)) {
      setShowCrisis(true);
    }

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getResponse(trimmed) },
      ]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-sage flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">MindfulAI Companion</h2>
            <p className="text-xs text-muted-foreground">Always here to listen • Not a medical professional</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 space-y-4">
        <AnimatePresence>
          {showCrisis && <CrisisAlert />}
        </AnimatePresence>

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 px-4 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-sage-light flex-shrink-0 flex items-center justify-center">
                <Bot className="w-4 h-4 text-sage" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 px-4"
          >
            <div className="w-8 h-8 rounded-full bg-sage-light flex-shrink-0 flex items-center justify-center">
              <Bot className="w-4 h-4 text-sage" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-gentle" />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-gentle" style={{ animationDelay: "0.3s" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-gentle" style={{ animationDelay: "0.6s" }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="container mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Share how you're feeling..."
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <Button
            size="icon"
            className="h-12 w-12 rounded-xl"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
