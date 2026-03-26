import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const [historyRes, problemsRes, profileRes] = await Promise.all([
      fetch(`https://atcoder.jp/users/${username}/history/json`, { headers: { "User-Agent": "Mozilla/5.0" } }),
      fetch(`https://kenkoooo.com/atcoder/atcoder-api/v2/user_info?user=${username}`, { headers: { "User-Agent": "Mozilla/5.0" } }),
      fetch(`https://atcoder.jp/users/${username}`, { headers: { "User-Agent": "Mozilla/5.0" } })
    ]);
    
    // Parse Rating
    let currentRating = null;
    if (historyRes.ok) {
      const history = await historyRes.json();
      if (history && history.length > 0) {
        currentRating = history[history.length - 1].NewRating;
      }
    }

    // Parse Solved
    let solved = null;
    if (problemsRes.ok) {
      const pData = await problemsRes.json();
      if (pData && pData.accepted_count !== undefined) {
        solved = pData.accepted_count;
      }
    }

    // Parse Rank (e.g. "6 Kyu")
    let rank = null;
    if (profileRes.ok) {
      const html = await profileRes.text();
      const rankMatch = html.match(/>(\d+\s*(?:Kyu|Dan))</i);
      if (rankMatch) {
         rank = rankMatch[1];
      }
    }

    res.status(200).json({
      rating: currentRating,
      rank: rank,
      solved: solved
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
