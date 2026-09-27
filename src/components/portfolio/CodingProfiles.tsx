import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Flame, Trophy, Layers, Calendar } from "lucide-react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { AnimatedDivider } from "@/components/portfolio/AnimatedDivider";
import { BentoGrid, BentoCard } from "@/components/ui/stats-bento";

/**
 * Snapshot pulled from LeetCode's public stats endpoint and GFG's profile
 * API on 2026-09-10. Both platforms' live endpoints are unofficial /
 * rate-limited, so this section ships a real snapshot instead of fetching
 * client-side (which would show a broken widget to visitors on downtime).
 */
const leetcode = {
  username: "_Mukul_Dev_",
  profileUrl: "https://leetcode.com/u/_Mukul_Dev_/",
  totalSolved: 516,
  totalQuestions: 4047,
  ranking: 197225,
  contributionPoints: 1083,
  difficulty: [
    { label: "Easy", solved: 233, total: 963, color: "#00B8A3" },
    { label: "Medium", solved: 244, total: 2111, color: "#FFC01E" },
    { label: "Hard", solved: 39, total: 973, color: "#FF375F" },
  ],
  submissionCalendar: {
    "1757721600": 2, "1758153600": 2, "1758585600": 3, "1758844800": 1,
    "1759017600": 2, "1760486400": 1, "1761955200": 2, "1762041600": 1,
    "1780963200": 2, "1781049600": 1, "1784073600": 2, "1784246400": 2,
    "1784332800": 2, "1784419200": 3, "1784505600": 1, "1784592000": 2,
    "1784937600": 1, "1785456000": 2, "1785542400": 2, "1785715200": 1,
    "1785801600": 3, "1785888000": 2, "1786320000": 2, "1786752000": 3,
    "1786838400": 3, "1786924800": 2, "1787011200": 1, "1787097600": 3,
    "1787184000": 1, "1787270400": 1, "1787356800": 1, "1787443200": 1,
    "1787529600": 4, "1787616000": 1, "1787702400": 1, "1787961600": 3,
    "1788134400": 1, "1788220800": 3, "1788307200": 1, "1788393600": 2,
    "1788480000": 1, "1788566400": 1, "1788652800": 2, "1788739200": 1,
    "1788825600": 1, "1788912000": 1,
  } as Record<string, number>,
};

const geeksforgeeks = {
  username: "3003mukulkumar",
  profileUrl: "https://www.geeksforgeeks.org/profile/3003mukulkumar?tab=activity",
  score: 96,
  problemsSolved: 30,
  currentStreak: 0,
  institute: "GLA University Mathura",
  memberSince: 2022,
};

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function heatmapLevel(count: number) {
  if (count <= 0) return "bg-secondary/50";
  if (count === 1) return "bg-primary/35";
  if (count === 2) return "bg-primary/60";
  if (count === 3) return "bg-primary/85";
  return "bg-primary";
}

function buildHeatmapWeeks(calendar: Record<string, number>, totalWeeks = 40) {
  const byDay = new Map<string, number>();
  let maxDate = new Date(0);
  Object.entries(calendar).forEach(([ts, count]) => {
    const date = new Date(Number(ts) * 1000);
    const key = date.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) ?? 0) + count);
    if (date > maxDate) maxDate = date;
  });

  const end = new Date(maxDate);
  end.setUTCHours(0, 0, 0, 0);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (totalWeeks * 7 - 1));

  const weeks: { date: Date; count: number }[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < totalWeeks; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const key = cursor.toISOString().slice(0, 10);
      week.push({ date: new Date(cursor), count: byDay.get(key) ?? 0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const ActivityHeatmap = ({ calendar }: { calendar: Record<string, number> }) => {
  const weeks = useMemo(() => buildHeatmapWeeks(calendar), [calendar]);
  const activeDays = useMemo(
    () => Object.values(calendar).filter((c) => c > 0).length,
    [calendar]
  );

  let lastMonth = -1;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Submission Activity
        </p>
        <p className="text-xs font-mono text-muted-foreground">{activeDays} active days</p>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => {
          const month = week[0].date.getUTCMonth();
          const showLabel = month !== lastMonth;
          if (showLabel) lastMonth = month;
          return (
            <div key={wi} className="flex flex-col gap-[3px] shrink-0">
              <span className="h-3 text-[9px] leading-3 font-mono text-muted-foreground whitespace-nowrap">
                {showLabel ? week[0].date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }) : ""}
              </span>
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date.toISOString().slice(0, 10)} · ${day.count} submission${day.count === 1 ? "" : "s"}`}
                  className={`w-[10px] h-[10px] rounded-[2px] ${heatmapLevel(day.count)}`}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RadialProgress = ({ percent }: { percent: number }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <svg viewBox="0 0 110 110" className="w-24 h-24 sm:w-28 sm:h-28 -rotate-90">
      <circle cx="55" cy="55" r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
      <motion.circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke="#FFA116"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
};

export const CodingProfiles = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const solvedPercent = (leetcode.totalSolved / leetcode.totalQuestions) * 100;

  return (
    <section id="coding-profiles" className="py-32 relative" ref={ref}>
      <div
        className="absolute inset-0 hero-glow opacity-20"
        style={{ top: "0%", right: "0", transform: "translateX(40%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono">06.</span>
            <h2 className="section-heading">Coding Profiles</h2>
            <AnimatedDivider isInView={isInView} />
          </div>
          <p className="section-subheading mb-12">
            Problem-solving activity across competitive programming platforms
          </p>
        </motion.div>

        {/* LeetCode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA116]/10 flex items-center justify-center">
                <SiLeetcode className="w-5 h-5" style={{ color: "#FFA116" }} />
              </div>
              <div>
                <h3 className="font-semibold leading-tight">LeetCode</h3>
                <p className="text-xs text-muted-foreground font-mono">@{leetcode.username}</p>
              </div>
            </div>
            <a
              href={leetcode.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              View Profile
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <BentoGrid>
            <BentoCard span="primary">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#FFA116_0px_1px,transparent_1px_14px)] opacity-[0.06] pointer-events-none" />
              <div className="flex items-start justify-between relative">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4 bg-[#FFA116]/10 text-[#FFA116]">
                    Problems Solved
                  </span>
                  <h3 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
                    {leetcode.totalSolved}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    out of {formatNumber(leetcode.totalQuestions)} problems on LeetCode
                  </p>
                </div>
                <div className="relative shrink-0">
                  <RadialProgress percent={solvedPercent} />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-mono text-foreground">
                    {solvedPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative mt-6">
                <ActivityHeatmap calendar={leetcode.submissionCalendar} />
              </div>
            </BentoCard>

            <BentoCard span="wide">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Difficulty Breakdown
              </p>
              <div className="space-y-4">
                {leetcode.difficulty.map((d, i) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium" style={{ color: d.color }}>
                        {d.label}
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {d.solved} / {d.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: d.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(d.solved / d.total) * 100}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard span="small" className="items-center text-center">
              <div className="flex flex-col items-center justify-center h-full">
                <Trophy className="w-5 h-5 text-[#FFA116] mb-2" />
                <p className="text-2xl font-bold text-foreground">{formatNumber(leetcode.ranking)}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                  Global Rank
                </p>
              </div>
            </BentoCard>

            <BentoCard span="medium" className="flex-row items-center justify-start gap-4">
              <div className="size-10 rounded-full bg-[#FFA116]/10 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#FFA116]" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground leading-none">
                  {formatNumber(leetcode.contributionPoints)}
                </p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Contribution Points</p>
              </div>
            </BentoCard>
          </BentoGrid>
        </motion.div>

        {/* GeeksforGeeks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F8D46]/10 flex items-center justify-center">
                <SiGeeksforgeeks className="w-5 h-5" style={{ color: "#2F8D46" }} />
              </div>
              <div>
                <h3 className="font-semibold leading-tight">GeeksforGeeks</h3>
                <p className="text-xs text-muted-foreground font-mono">@{geeksforgeeks.username}</p>
              </div>
            </div>
            <a
              href={geeksforgeeks.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              View Profile
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Coding Score", value: geeksforgeeks.score, icon: Trophy },
              { label: "Problems Solved", value: geeksforgeeks.problemsSolved, icon: Layers },
              { label: "Current Streak", value: geeksforgeeks.currentStreak, icon: Flame },
              { label: "Member Since", value: geeksforgeeks.memberSince, icon: Calendar },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card-elevated tilt-card rounded-2xl p-6 border border-border text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-3" style={{ color: "#2F8D46" }} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-4">
            {geeksforgeeks.institute}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
