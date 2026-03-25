import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    
    if (!response.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const html = await response.text();

    // 1) Extract rating
    let currentRating = null;
    const ratingMatch = html.match(/class="rating-number"[^>]*>\s*(\d+)/i);
    if (ratingMatch) {
      currentRating = parseInt(ratingMatch[1]);
    }

    // 2) Extract star/rank
    let stars = null;
    if (html.includes('1&#9733;')) stars = "1 Star";
    else if (html.includes('2&#9733;')) stars = "2 Star";
    else if (html.includes('3&#9733;')) stars = "3 Star";
    else if (html.includes('4&#9733;')) stars = "4 Star";
    else if (html.includes('5&#9733;')) stars = "5 Star";
    else if (html.includes('6&#9733;')) stars = "6 Star";
    else if (html.includes('7&#9733;')) stars = "7 Star";
    
    // 3) Extract solved problems
    // HTML usually looks like: <section class="rating-data-section problems-solved"><h3>Total Problems Solved:</h3> <h3>937</h3>
    let solved = null;
    const solvedMatch = html.match(/Total Problems Solved:[^0-9]*(\d+)/i);
    if (solvedMatch) {
      solved = solvedMatch[1];
    } else {
      // fallback if the string has changed
      const fullySolvedMatch = html.match(/Fully Solved\s*\((.*?)\)/i);
      if (fullySolvedMatch) {
         solved = fullySolvedMatch[1];
      }
    }

    res.status(200).json({
      rating: currentRating,
      stars: stars,
      solved: solved
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
