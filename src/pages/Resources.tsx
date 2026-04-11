import { motion } from "framer-motion";
import { BookOpen, Phone, ExternalLink, Heart, Brain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const articles = [
  { title: "Understanding Anxiety", desc: "Learn about common anxiety symptoms and coping strategies", category: "Anxiety", emoji: "🧠" },
  { title: "The Science of Sleep", desc: "How sleep impacts mental health and tips for better rest", category: "Sleep", emoji: "🌙" },
  { title: "Mindfulness for Beginners", desc: "A practical guide to starting a mindfulness practice", category: "Meditation", emoji: "🧘" },
  { title: "Building Resilience", desc: "Strategies to bounce back from life's challenges", category: "Wellness", emoji: "💪" },
  { title: "AI vs Human Therapy", desc: "Understanding the role of AI in mental health support", category: "Education", emoji: "🤖" },
  { title: "Stress Management 101", desc: "Evidence-based techniques to manage daily stress", category: "Stress", emoji: "🌿" },
];

const helplines = [
  { name: "988 Suicide & Crisis Lifeline", number: "988", desc: "24/7 crisis support" },
  { name: "QuickText Support", number: "Text HOME to 741741", desc: "Text-based crisis counseling" },
  { name: "MindCare National Helpline", number: "1-800-662-4357", desc: "Treatment referral service" },
  { name: "Emotional Support Line", number: "1-800-950-6264", desc: "Mental health information" },
];

const exercises = [
  { title: "Box Breathing", duration: "4 min", desc: "Inhale 4s, hold 4s, exhale 4s, hold 4s", emoji: "🌬️" },
  { title: "Body Scan", duration: "10 min", desc: "Progressive relaxation from toes to head", emoji: "✨" },
  { title: "5-4-3-2-1 Grounding", duration: "3 min", desc: "Engage your five senses to ground yourself", emoji: "🌍" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const Resources = () => (
  <div className="container mx-auto px-4 py-8 space-y-10">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-display font-bold mb-1">Resources</h1>
      <p className="text-muted-foreground">Educational content, exercises, and crisis support</p>
    </motion.div>

    {/* Crisis Resources */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-5 h-5 text-destructive" />
        <h2 className="text-xl font-display font-semibold">Crisis Resources</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {helplines.map((h, i) => (
          <motion.div key={h.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="hover:shadow-calm transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold text-sm">{h.name}</p>
                <p className="text-primary font-bold mt-1">{h.number}</p>
                <p className="text-xs text-muted-foreground mt-1">{h.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Exercises */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-sage" />
        <h2 className="text-xl font-display font-semibold">Quick Exercises</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {exercises.map((e, i) => (
          <motion.div key={e.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="hover:shadow-calm transition-shadow cursor-pointer group">
              <CardContent className="p-5 text-center">
                <span className="text-4xl block mb-3">{e.emoji}</span>
                <p className="font-semibold text-sm">{e.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.duration}</p>
                <p className="text-xs text-muted-foreground mt-2">{e.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Articles */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-sky" />
        <h2 className="text-xl font-display font-semibold">Articles & Guides</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a, i) => (
          <motion.div key={a.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="hover:shadow-calm transition-shadow cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{a.category}</span>
                </div>
                <p className="font-semibold text-sm mt-3">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{a.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Disclaimer */}
    <div className="rounded-2xl bg-secondary p-6 text-center">
      <Heart className="w-6 h-6 text-peach mx-auto mb-2" />
      <p className="text-sm text-muted-foreground max-w-xl mx-auto">
        These resources are for informational purposes only. If you're experiencing a mental health emergency,
        please call 988 or go to your nearest emergency room.
      </p>
    </div>
  </div>
);

export default Resources;
