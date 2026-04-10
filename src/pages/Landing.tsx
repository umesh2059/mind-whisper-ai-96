import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Shield, Heart, MessageCircle, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: MessageCircle,
    title: "AI Companion",
    description: "Chat with an empathetic AI that understands your feelings and provides supportive guidance.",
    color: "bg-sage-light text-sage",
  },
  {
    icon: Brain,
    title: "Mental Health Assessment",
    description: "Take clinically-inspired assessments to understand your mental health patterns.",
    color: "bg-sky-light text-sky",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your emotional journey with mood tracking and insightful analytics.",
    color: "bg-lavender-light text-lavender",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and anonymized. Your mental health journey stays private.",
    color: "bg-peach-light text-peach",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="relative container mx-auto px-4 pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground mb-8">
              <Sparkles className="w-4 h-4 text-sage" />
              AI-Powered Mental Wellness
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              Your mind deserves{" "}
              <span className="text-gradient-sage">gentle care</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              An AI companion that listens, understands, and supports your mental health journey
              — privately, accessibly, and with compassion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="px-8 shadow-calm" asChild>
                <Link to="/chatbot">
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8" asChild>
                <Link to="/assessment">Take Assessment</Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-32 left-[10%] w-16 h-16 rounded-full bg-sage-light opacity-60"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-48 right-[15%] w-10 h-10 rounded-full bg-sky-light opacity-50"
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-32 left-[20%] w-12 h-12 rounded-full bg-lavender-light opacity-40"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            How we support you
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Comprehensive tools designed with empathy and backed by research
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-calm transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-sans">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-secondary p-8 text-center">
          <Heart className="w-8 h-8 text-peach mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Important Notice</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            MindfulAI is an AI-powered wellness tool and is <strong>not a substitute for professional
            therapy or medical advice</strong>. If you're in crisis, please contact emergency services
            or a mental health professional immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-sage" />
            <span>MindfulAI © 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Crisis Resources</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
