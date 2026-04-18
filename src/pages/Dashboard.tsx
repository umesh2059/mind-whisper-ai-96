import { motion } from "framer-motion";
import { TrendingUp, Smile, Frown, Meh, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const moodData = [
  { day: "Mon", score: 6 },
  { day: "Tue", score: 5 },
  { day: "Wed", score: 7 },
  { day: "Thu", score: 4 },
  { day: "Fri", score: 8 },
  { day: "Sat", score: 7 },
  { day: "Sun", score: 9 },
];

const suggestions = [
  { emoji: "🧘", title: "5-Minute Breathing Exercise", desc: "A guided box breathing session" },
  { emoji: "📝", title: "Gratitude Journaling", desc: "Write 3 things you're grateful for" },
  { emoji: "🎵", title: "Calming Playlist", desc: "Nature sounds to ease your mind" },
];

const stats = [
  { label: "Current Streak", value: "7 days", icon: Calendar, color: "text-sage" },
  { label: "Avg Mood", value: "6.6/10", icon: TrendingUp, color: "text-sky" },
  { label: "Chat Sessions", value: "12", icon: MessageCircle, color: "text-lavender" },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Welcome back 👋</h1>
        <p className="text-muted-foreground">Here's how you've been feeling this weeks</p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mood Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-sans">Mood Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(158, 40%, 42%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(158, 40%, 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(140, 15%, 90%)",
                      fontSize: "14px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(158, 40%, 42%)"
                    strokeWidth={2.5}
                    fill="url(#moodGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions + Suggestions */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-sans">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" asChild>
                <Link to="/chatbot">
                  Talk to AI Companion
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/mood">
                  Log Today's Mood
                  <Smile className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/assessment">
                  Take Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-sans">Personalized Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((s) => (
                <div
                  key={s.title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <p className="font-medium text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
