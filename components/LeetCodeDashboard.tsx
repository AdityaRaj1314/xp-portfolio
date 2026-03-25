"use client";
import { useLeetCode } from "@/hooks/useLeetCode";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#2cbb5d",
  Medium: "#f0a500",
  Hard: "#ef4743",
};

const STATUS_COLOR: Record<string, string> = {
  Accepted: "#2cbb5d",
  "Wrong Answer": "#ef4743",
  "Time Limit Exceeded": "#f0a500",
  "Runtime Error": "#ef4743",
  "Memory Limit Exceeded": "#f0a500",
};

function relativeTime(timestamp: string): string {
  const diff = Date.now() - Number(timestamp) * 1000;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatRating(r: number): string {
  return Math.round(r).toLocaleString();
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value" style={color ? { color } : {}}>
        {value}
      </span>
    </div>
  );
}

function DifficultyBar({
  easy,
  medium,
  hard,
  total,
}: {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}) {
  const pct = (n: number) => `${Math.round((n / Math.max(total, 1)) * 100)}%`;
  return (
    <div>
      <div className="diff-bar-track">
        <div style={{ width: pct(easy), background: "#2cbb5d", height: "100%" }} />
        <div style={{ width: pct(medium), background: "#f0a500", height: "100%" }} />
        <div style={{ width: pct(hard), background: "#ef4743", height: "100%" }} />
      </div>
      <div className="diff-legend">
        {[
          { label: "Easy", val: easy, color: "#2cbb5d" },
          { label: "Medium", val: medium, color: "#f0a500" },
          { label: "Hard", val: hard, color: "#ef4743" },
        ].map(({ label, val, color }) => (
          <span key={label} className="diff-legend-item">
            <span className="diff-dot" style={{ background: color }} />
            {label} <strong>{val}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  username: string;
  submissionLimit?: number;
}

export default function LeetCodeDashboard({ username, submissionLimit = 10 }: Props) {
  const { profile, solved, submissions, contest, contestHistory, daily, loading, error, lastFetched, refetch } =
    useLeetCode(username, submissionLimit);

  if (loading) {
    return (
      <div className="lc-wrapper lc-center">
        <div className="lc-spinner" />
        <p className="lc-muted">Loading LeetCode data…</p>
        <style>{styles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lc-wrapper lc-center">
        <p className="lc-error">⚠ {error}</p>
        <button className="lc-btn" onClick={refetch}>
          Retry
        </button>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="lc-wrapper">
      <div className="lc-header">
        <div className="lc-profile">
          {profile?.avatar && (
            <img src={profile.avatar} alt={profile.name} className="lc-avatar" />
          )}
          <div>
            <h2 className="lc-name">{profile?.name || username}</h2>
            <a
              href={`https://leetcode.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="lc-link"
            >
              @{username}
            </a>
            {profile?.country && <span className="lc-country"> · {profile.country}</span>}
          </div>
        </div>
        <div className="lc-header-right">
          {lastFetched && (
            <span className="lc-muted lc-small">
              Updated {relativeTime(String(Math.floor(lastFetched.getTime() / 1000)))}
            </span>
          )}
          <button className="lc-btn" onClick={refetch}>
            ↻ Refresh
          </button>
        </div>
      </div>

      {solved && (
        <section className="lc-section">
          <h3 className="lc-section-title">Problems Solved</h3>
          <div className="lc-stats-grid">
            <StatCard label="Total" value={solved.solvedProblem} />
            <StatCard label="Easy" value={solved.easySolved} color="#2cbb5d" />
            <StatCard label="Medium" value={solved.mediumSolved} color="#f0a500" />
            <StatCard label="Hard" value={solved.hardSolved} color="#ef4743" />
          </div>
          <DifficultyBar
            easy={solved.easySolved}
            medium={solved.mediumSolved}
            hard={solved.hardSolved}
            total={solved.solvedProblem}
          />
        </section>
      )}

      {contest && (
        <section className="lc-section">
          <h3 className="lc-section-title">Contest Stats</h3>
          <div className="lc-stats-grid">
            <StatCard label="Rating" value={formatRating(contest.contestRating)} />
            <StatCard label="Attended" value={contest.contestAttend} />
            <StatCard label="Global Rank" value={`#${contest.contestGlobalRanking.toLocaleString()}`} />
            <StatCard label="Top %" value={`${contest.contestTopPercentage?.toFixed(1) ?? "—"}%`} />
          </div>

          {contestHistory && contestHistory.length > 0 && (
            <div className="lc-sparkline-wrapper">
              <span className="lc-muted lc-small">Rating history (last {contestHistory.length} contests)</span>
              <ContestSparkline history={contestHistory} />
            </div>
          )}
        </section>
      )}

      {submissions && submissions.length > 0 && (
        <section className="lc-section">
          <h3 className="lc-section-title">Recent Submissions</h3>
          <ul className="lc-submissions">
            {submissions.map((s: any, i: number) => (
              <li key={i} className="lc-submission-row">
                <span
                  className="lc-status-dot"
                  style={{ background: STATUS_COLOR[s.statusDisplay] ?? "#888" }}
                />
                <a
                  href={`https://leetcode.com/problems/${s.titleSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lc-sub-title lc-link"
                >
                  {s.title}
                </a>
                <span className="lc-sub-lang">{s.lang}</span>
                <span className="lc-sub-status" style={{ color: STATUS_COLOR[s.statusDisplay] ?? "#888" }}>
                  {s.statusDisplay}
                </span>
                <span className="lc-muted lc-small lc-sub-time">{relativeTime(s.timestamp)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {daily && (
        <section className="lc-section">
          <h3 className="lc-section-title">Daily Problem</h3>
          <a
            href={`https://leetcode.com${daily.link}`}
            target="_blank"
            rel="noreferrer"
            className="lc-daily-card"
          >
            <div className="lc-daily-top">
              <span className="lc-daily-id">#{daily.question.questionFrontendId}</span>
              <span
                className="lc-difficulty-badge"
                style={{ color: DIFFICULTY_COLOR[daily.question.difficulty] }}
              >
                {daily.question.difficulty}
              </span>
            </div>
            <p className="lc-daily-title">{daily.question.title}</p>
            <div className="lc-tag-list">
              {daily.question.topicTags.slice(0, 5).map((t: any) => (
                <span key={t.slug} className="lc-tag">
                  {t.name}
                </span>
              ))}
            </div>
          </a>
        </section>
      )}

      <style>{styles}</style>
    </div>
  );
}

function ContestSparkline({ history }: { history: { rating: number; attended: boolean }[] }) {
  const attended = history.filter((h) => h.attended).slice(-20);
  if (attended.length < 2) return null;

  const ratings = attended.map((h) => h.rating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const range = max - min || 1;

  const W = 320;
  const H = 60;
  const pad = 4;

  const points = attended.map((h, i) => {
    const x = pad + (i / (attended.length - 1)) * (W - pad * 2);
    const y = H - pad - ((h.rating - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const lastPt = points[points.length - 1].split(",");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", marginTop: 8 }}>
      <polyline
        points={polyline}
        fill="none"
        stroke="#f0a500"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="#f0a500" />
    </svg>
  );
}

const styles = `
.lc-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  max-width: 720px;
  margin: 0 auto;
  color: inherit;
  padding: 10px;
}
.lc-center { display: flex; flex-direction: column; align-items: center; padding: 3rem 1rem; gap: 1rem; }
.lc-spinner {
  width: 28px; height: 28px;
  border: 2px solid rgba(128,128,128,0.2);
  border-top-color: #f0a500;
  border-radius: 50%;
  animation: lc-spin 0.8s linear infinite;
}
@keyframes lc-spin { to { transform: rotate(360deg); } }

.lc-header {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(128,128,128,0.15);
  margin-bottom: 1.5rem;
}
.lc-profile { display: flex; align-items: center; gap: 14px; }
.lc-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; }
.lc-name { margin: 0 0 2px; font-size: 18px; font-weight: 600; }
.lc-link { color: #f0a500; text-decoration: none; font-size: 13px; }
.lc-link:hover { text-decoration: underline; }
.lc-country { font-size: 13px; opacity: 0.6; }
.lc-header-right { display: flex; align-items: center; gap: 10px; }

.lc-section { margin-bottom: 1.75rem; }
.lc-section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.5; margin: 0 0 12px; }

.lc-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}
.stat-card {
  background: rgba(128,128,128,0.07);
  border-radius: 10px;
  padding: 12px 14px;
  display: flex; flex-direction: column; gap: 4px;
}
.stat-label { font-size: 11px; opacity: 0.55; }
.stat-value { font-size: 22px; font-weight: 700; }

.diff-bar-track {
  display: flex; height: 6px; border-radius: 3px; overflow: hidden;
  background: rgba(128,128,128,0.1);
  margin-bottom: 10px;
}
.diff-legend { display: flex; gap: 16px; }
.diff-legend-item { font-size: 12px; display: flex; align-items: center; gap: 5px; opacity: 0.8; }
.diff-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.lc-sparkline-wrapper { margin-top: 12px; }

.lc-submissions { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; }
.lc-submission-row {
  display: grid;
  grid-template-columns: 12px 1fr auto auto auto;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(128,128,128,0.08);
  font-size: 13px;
}
.lc-status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.lc-sub-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lc-sub-lang { font-size: 11px; opacity: 0.45; background: rgba(128,128,128,0.1); padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
.lc-sub-status { font-size: 12px; white-space: nowrap; }
.lc-sub-time { text-align: right; white-space: nowrap; }

.lc-daily-card {
  display: block; text-decoration: none; color: inherit;
  border: 1px solid rgba(240,165,0,0.3);
  border-radius: 12px;
  padding: 16px 18px;
  transition: border-color 0.15s, background 0.15s;
}
.lc-daily-card:hover { border-color: rgba(240,165,0,0.7); background: rgba(240,165,0,0.04); }
.lc-daily-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.lc-daily-id { font-size: 12px; opacity: 0.45; }
.lc-difficulty-badge { font-size: 12px; font-weight: 600; }
.lc-daily-title { margin: 0 0 10px; font-size: 16px; font-weight: 600; }
.lc-tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.lc-tag { font-size: 11px; background: rgba(128,128,128,0.1); padding: 2px 8px; border-radius: 20px; opacity: 0.7; }

.lc-btn {
  font-size: 12px; padding: 5px 12px;
  border: 1px solid rgba(128,128,128,0.25);
  border-radius: 6px; cursor: pointer;
  background: transparent; color: inherit;
  transition: background 0.15s;
}
.lc-btn:hover { background: rgba(128,128,128,0.1); }
.lc-error { color: #ef4743; font-size: 14px; }
.lc-muted { opacity: 0.5; }
.lc-small { font-size: 12px; }
`;
