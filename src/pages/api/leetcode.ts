import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, limit = "10" } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const profileQuery = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            userAvatar
            realName
            countryName
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const contestQuery = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          attended
          rating
        }
      }
    `;

    const submissionsQuery = `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;

    const dailyQuery = `
      query questionOfToday {
        activeDailyCodingChallengeQuestion {
          date
          link
          question {
            questionFrontendId
            difficulty
            title
            topicTags {
              name
              slug
            }
          }
        }
      }
    `;

    const fetchGql = async (query: string, variables: any = {}) => {
      const resp = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({ query, variables }),
      });
      return resp.json();
    };

    const [profileData, contestData, submissionsData, dailyData] = await Promise.all([
      fetchGql(profileQuery, { username }),
      fetchGql(contestQuery, { username }),
      fetchGql(submissionsQuery, { username, limit: Number(limit) }),
      fetchGql(dailyQuery),
    ]);

    const mu = profileData.data?.matchedUser;
    if (!mu) {
      return res.status(404).json({ error: "User not found" });
    }

    const { userAvatar, realName, countryName } = mu.profile || {};
    const stats = mu.submitStats?.acSubmissionNum || [];
    
    const getStat = (diff: string) => stats.find((s: any) => s.difficulty === diff)?.count || 0;

    const contest = contestData.data?.userContestRanking || null;
    let history = contestData.data?.userContestRankingHistory || [];
    history = history.filter((h: any) => h.attended).map((h: any) => ({
      rating: h.rating,
      attended: h.attended,
    }));

    const responseData = {
      profile: {
        avatar: userAvatar,
        name: realName,
        country: countryName,
      },
      solved: {
        solvedProblem: getStat("All"),
        easySolved: getStat("Easy"),
        mediumSolved: getStat("Medium"),
        hardSolved: getStat("Hard"),
      },
      contest: contest ? {
        contestRating: contest.rating,
        contestAttend: contest.attendedContestsCount,
        contestGlobalRanking: contest.globalRanking,
        contestTopPercentage: contest.topPercentage,
      } : null,
      contestHistory: history,
      submissions: submissionsData.data?.recentAcSubmissionList || [],
      daily: dailyData.data?.activeDailyCodingChallengeQuestion || null,
    };

    res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
