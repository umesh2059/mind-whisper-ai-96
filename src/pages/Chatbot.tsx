import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGroqResponse } from "@/integrations/groq/client";

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

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    if (detectCrisis(trimmed)) {
      setShowCrisis(true);
    }

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getGroqResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error getting Groq response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting to my AI system right now. Please try again in a moment. 💙",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
