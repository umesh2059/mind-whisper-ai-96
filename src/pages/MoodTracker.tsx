import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle2 } from "lucide-react";

const moods = [
  { emoji: "😢", label: "Terrible", value: 1 },
  { emoji: "😔", label: "Bad", value: 3 },
  { emoji: "😐", label: "Okay", value: 5 },
  { emoji: "🙂", label: "Good", value: 7 },
  { emoji: "😊", label: "Great", value: 9 },
];

const historyData = [
  { date: "Apr 4", score: 5 },
  { date: "Apr 5", score: 7 },
  { date: "Apr 6", score: 4 },
  { date: "Apr 7", score: 6 },
  { date: "Apr 8", score: 8 },
  { date: "Apr 9", score: 7 },
];

const MoodTracker = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    if (selected === null) return;
    setLogged(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Mood Tracker</h1>
        <p className="text-muted-foreground">Check in with yourself daily</p>
      </motion.div>

      {/* Today's Mood */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-sans">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {logged ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-sage mx-auto" />
                <p className="font-semibold">Mood logged! 🎉</p>
                <p className="text-sm text-muted-foreground">Great job checking in with yourself today.</p>
                <Button variant="outline" size="sm" onClick={() => { setLogged(false); setSelected(null); setNote(""); }}>
                  Log Again
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-between gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelected(m.value)}
                      className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                        selected === m.value
                          ? "border-primary bg-sage-light shadow-calm"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="text-3xl">{m.emoji}</span>
                      <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
                    </button>
                  ))}
                </div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about your day (optional)..."
                  className="resize-none"
                  rows={3}
                />
                <Button onClick={handleLog} disabled={selected === null} className="w-full">
                  Log Mood
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* History */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-sans">Your Mood History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(200, 50%, 55%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(200, 50%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(140, 15%, 90%)", fontSize: "14px" }} />
                  <Area type="monotone" dataKey="score" stroke="hsl(200, 50%, 55%)" strokeWidth={2.5} fill="url(#histGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-secondary">
              <p className="text-sm font-medium mb-1">💡 AI Insight</p>
              <p className="text-sm text-muted-foreground">
                Your mood has been trending upward this week! Your best days seem to be on weekends.
                Consider what activities bring you joy during those times.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MoodTracker;
