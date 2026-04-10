import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
  "How often have you felt down, depressed, or hopeless?",
  "How often have you had trouble falling or staying asleep, or sleeping too much?",
  "How often have you felt tired or had little energy?",
  "How often have you had poor appetite or been overeating?",
  "How often have you felt bad about yourself — or that you are a failure?",
  "How often have you had trouble concentrating on things?",
  "How often have you been feeling nervous, anxious, or on edge?",
  "How often have you not been able to stop or control worrying?",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

type Result = { level: "low" | "moderate" | "high"; score: number };

const getResult = (score: number): Result => {
  if (score <= 9) return { level: "low", score };
  if (score <= 18) return { level: "moderate", score };
  return { level: "high", score };
};

const resultConfig = {
  low: {
    icon: CheckCircle2,
    title: "Low Risk",
    color: "text-sage",
    bg: "bg-sage-light",
    message: "Your responses suggest low levels of distress. Keep maintaining healthy habits! Consider regular check-ins with yourself.",
  },
  moderate: {
    icon: AlertCircle,
    title: "Moderate Risk",
    color: "text-sky",
    bg: "bg-sky-light",
    message: "Your responses indicate moderate levels of distress. This is common and manageable. Consider talking to a counselor or trying our AI companion for support.",
  },
  high: {
    icon: AlertTriangle,
    title: "High Risk",
    color: "text-peach",
    bg: "bg-peach-light",
    message: "Your responses suggest you may be experiencing significant distress. Please consider reaching out to a mental health professional. You deserve support.",
  },
};

const Assessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const progress = ((current) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      setResult(getResult(total));
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const config = resultConfig[result.level];
    const Icon = config.icon;
    return (
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className={`w-20 h-20 rounded-full ${config.bg} mx-auto flex items-center justify-center`}>
            <Icon className={`w-10 h-10 ${config.color}`} />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">{config.title}</h2>
            <p className="text-sm text-muted-foreground">Score: {result.score} / {questions.length * 3}</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">{config.message}</p>
          <div className="bg-secondary rounded-xl p-4 text-sm text-muted-foreground">
            <strong>Reminder:</strong> This assessment is for informational purposes only and does not constitute
            a medical diagnosis. Please consult a healthcare professional for proper evaluation.
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Button variant="outline" onClick={reset}>Take Again</Button>
            <Button asChild>
              <a href="/chatbot">Talk to AI Companion</a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-2">Mental Health Check-In</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Answer honestly — there are no right or wrong answers. Inspired by PHQ-9 & GAD-7.
        </p>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Question {current + 1} of {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-medium leading-relaxed">{questions[current]}</h2>
          <div className="space-y-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-calm transition-all text-sm font-medium"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {current > 0 && (
            <Button variant="ghost" size="sm" onClick={handleBack} className="mt-2">
              <ArrowLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Assessment;
