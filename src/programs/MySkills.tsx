import WinAccordion from "components/WinAccordion/WinAccordion";
import { useEffect, useState } from "react";
import styles from "./MySkills.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { setBackBtn } from "@/redux/tabSlice";
import store from "@/redux/store";
import { RootState } from "@/types";
import skillIcon from "../../assets/skill.png";

type SkillData = {
  name: string;
  rating: string;
  rank: string;
  solved: string;
  profile: string;
  desc: string;
  logo: string;
};

const Platforms: SkillData[] = [
  {
    name: "LeetCode",
    rating: "Top 10%", // Estimated as API is blocked
    rank: "Knight",
    solved: "400+",
    profile: "https://leetcode.com/u/Arsckersan1314/",
    desc: "Consistent participant in weekly and biweekly contests.",
    logo: "https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black",
  },
  {
    name: "Codeforces",
    rating: "1161",
    rank: "Newbie",
    solved: "100+",
    profile: "https://codeforces.com/profile/Arscker",
    desc: "Active competitive programmer engaging in Div.2 / Div.3 / Div.4 rounds.",
    logo: "https://img.shields.io/badge/Codeforces-1F8ACB?style=for-the-badge&logo=Codeforces&logoColor=white",
  },
  {
    name: "CodeChef",
    rating: "1523",
    rank: "2 Star",
    solved: "922",
    profile: "https://www.codechef.com/users/sit1si23cs008",
    desc: "Participated in regular starters and long challenges.",
    logo: "https://img.shields.io/badge/CodeChef-5B4638?style=for-the-badge&logo=CodeChef&logoColor=white",
  },
  {
    name: "AtCoder",
    rating: "~600+",
    rank: "6 Kyu",
    solved: "50+",
    profile: "https://atcoder.jp/users/Arscker",
    desc: "Regular competitor in Beginner Contests and logic building puzzles.",
    logo: "https://img.shields.io/badge/AtCoder-222222?style=for-the-badge&logo=AtCoder&logoColor=white",
  }
];

const getCodeforcesColor = (ratingStr: string) => {
  const rating = parseInt(ratingStr);
  if (isNaN(rating)) return undefined;
  if (rating <= 1199) return "gray";
  if (rating <= 1399) return "green";
  if (rating <= 1599) return "#03A89E"; // cyan in CF
  if (rating <= 1899) return "blue";
  if (rating <= 2099) return "violet";
  if (rating <= 2299) return "#FF8C00"; // orange
  return "red";
};

interface Props {
  id: number;
}

const MySkills = ({ id }: Props) => {
  const [platforms, setPlatforms] = useState<SkillData[]>(Platforms);
  const [currDisplay, setCurrDisplay] = useState<SkillData | null>(null);

  const backBtnActive = useSelector(
    (state: RootState) =>
      state.tab.tray[state.tab.tray.findIndex((tab) => tab.id === id)]
        .backBtnActive
  );

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const [cfInfoRes, cfStatusRes, lcRes, ccRes] = await Promise.all([
          fetch("https://codeforces.com/api/user.info?handles=Arscker").then(res => res.json()).catch(() => ({ status: "FAILED" })),
          fetch("https://codeforces.com/api/user.status?handle=Arscker").then(res => res.json()).catch(() => ({ status: "FAILED" })),
          fetch("/api/leetcode?username=Arsckersan1314&limit=0").then(res => res.json()).catch(() => ({ error: true })),
          fetch("/api/codechef?username=sit1si23cs008").then(res => res.json()).catch(() => ({ error: true }))
        ]);

        let cfSolvedCount = "100+";
        if (cfStatusRes.status === "OK") {
          const submissions = cfStatusRes.result;
          const solvedProblems = new Set();
          submissions.forEach((sub: any) => {
            if (sub.verdict === "OK" && sub.problem && sub.problem.name) {
              solvedProblems.add(sub.problem.name);
            }
          });
          cfSolvedCount = solvedProblems.size.toString();
        }

        setPlatforms(prev => prev.map(p => {
          let updatedPlatform = { ...p };
          if (p.name === "Codeforces" && cfInfoRes.status === "OK" && cfInfoRes.result?.length > 0) {
            const info = cfInfoRes.result[0];
            updatedPlatform.rating = info.rating ? info.rating.toString() : p.rating;
            updatedPlatform.rank = info.rank ? info.rank.charAt(0).toUpperCase() + info.rank.slice(1) : p.rank;
            updatedPlatform.solved = cfSolvedCount;
          }
          if (p.name === "LeetCode" && !lcRes.error) {
            if (lcRes.solved) {
              updatedPlatform.solved = lcRes.solved.solvedProblem?.toString() || p.solved;
            }
            if (lcRes.contest) {
              updatedPlatform.rating = Math.round(lcRes.contest.contestRating).toString();
              updatedPlatform.rank = lcRes.contest.contestGlobalRanking 
                ? `#${lcRes.contest.contestGlobalRanking.toLocaleString()}` 
                : p.rank;
            }
          }
          if (p.name === "CodeChef" && !ccRes.error) {
            if (ccRes.rating) updatedPlatform.rating = ccRes.rating.toString();
            if (ccRes.stars) updatedPlatform.rank = ccRes.stars;
            if (ccRes.solved) updatedPlatform.solved = ccRes.solved.toString();
          }
          return updatedPlatform;
        }));
        
        setCurrDisplay(prev => {
          if (!prev) return prev;
          let updatedPrev = { ...prev };
          if (prev.name === "Codeforces" && cfInfoRes.status === "OK" && cfInfoRes.result?.length > 0) {
            const info = cfInfoRes.result[0];
            updatedPrev.rating = info.rating ? info.rating.toString() : prev.rating;
            updatedPrev.rank = info.rank ? info.rank.charAt(0).toUpperCase() + info.rank.slice(1) : prev.rank;
            updatedPrev.solved = cfSolvedCount;
          }
          if (prev.name === "LeetCode" && !lcRes.error) {
            if (lcRes.solved) {
              updatedPrev.solved = lcRes.solved.solvedProblem?.toString() || prev.solved;
            }
            if (lcRes.contest) {
              updatedPrev.rating = Math.round(lcRes.contest.contestRating).toString();
              updatedPrev.rank = lcRes.contest.contestGlobalRanking 
                ? `#${lcRes.contest.contestGlobalRanking.toLocaleString()}` 
                : prev.rank;
            }
          }
          if (prev.name === "CodeChef" && !ccRes.error) {
            if (ccRes.rating) updatedPrev.rating = ccRes.rating.toString();
            if (ccRes.stars) updatedPrev.rank = ccRes.stars;
            if (ccRes.solved) updatedPrev.solved = ccRes.solved.toString();
          }
          return updatedPrev;
        });
      } catch (err) {
        console.error("Error fetching platform data:", err);
      }
    };

    fetchPlatformData();
  }, []);

  useEffect(() => {
    if (currDisplay && !backBtnActive) {
      store.dispatch(setBackBtn({ id: id, backBtnActive: true }));
    }
  }, [currDisplay]);

  useEffect(() => {
    if (!backBtnActive) {
      setCurrDisplay(null);
    }
  }, [backBtnActive]);

  const loaderProp = ({ src }: any) => {
    return src;
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftpanel}>
        <div className={styles.accordion}>
          <WinAccordion title="Competitive Programming">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={styles.accordion_content_item}
                onClick={() => setCurrDisplay(platform)}
              >
                <div className={styles.accordion_content_text}>
                  <Image
                    alt="accordionbtn"
                    src={skillIcon.src}
                    height={15}
                    width={15}
                  />
                  <p>{platform.name}</p>
                </div>
              </div>
            ))}
          </WinAccordion>
        </div>
      </div>
      <div className={styles.rightpanel}>
        {currDisplay === null ? (
          <div className={styles.body}>
            <h4>Welcome to My Coding Profiles Section</h4>
            <h5>Click on any of the platforms on the left to view my competitive programming profiles, rankings, and stats!</h5>
            <div style={{ marginTop: 20 }}>
               <Image alt="skills" src={skillIcon} width={120} height={120} />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <h4>{currDisplay.name} Profile</h4>
            </div>
            
            <div className={styles.body}>
              <Image
                  style={{ borderRadius: "5px", marginBottom: "15px" }}
                  alt="platform-logo"
                  src={currDisplay.logo}
                  width={150}
                  height={40}
                  loader={loaderProp}
              />
              
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Current Rating</div>
                  <div className={styles.statValue} style={currDisplay.name === "Codeforces" ? { color: getCodeforcesColor(currDisplay.rating) } : {}}>
                    {currDisplay.rating}
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Global Rank/Title</div>
                  <div className={styles.statValue} style={currDisplay.name === "Codeforces" ? { color: getCodeforcesColor(currDisplay.rating) } : {}}>
                    {currDisplay.rank}
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Problems Solved</div>
                  <div className={styles.statValue}>{currDisplay.solved}</div>
                </div>
              </div>

              <h4 style={{marginTop: "20px"}}>Overview:</h4>
              <p style={{textAlign: "center", marginBottom: "20px"}}>{currDisplay.desc}</p>

              {currDisplay.profile !== "" && (
                <div
                  onClick={() =>
                    window.open(currDisplay.profile, "_blank", "noreferrer")
                  }
                  className={styles.profile_button}
                >
                  View Profile Online
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySkills;
