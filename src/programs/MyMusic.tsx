import { useState, useRef, useEffect } from "react";
import styles from "./MyMusic.module.css";
import axios from "axios";

const MyMusic = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("Arijit Singh"); // Initial lookup term
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchSongs = async (searchTerm: string) => {
    try {
      const res = await axios.get(`https://saavn.sumit.co/api/search/songs?query=${searchTerm}`);
      if (res.data.success && res.data.data.results?.length > 0) {
        setSongs(res.data.data.results);
        setCurrentTrack(0);
        setProgress(0);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    fetchSongs(query);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Play interrupted: ", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const selectTrack = (i: number) => {
    setCurrentTrack(i);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    setCurrentTrack((c) => (c + 1) % songs.length);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 48;
      const w = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const h = isPlaying ? Math.random() * 80 + 10 : 4;
        ctx.fillStyle = `hsl(${200 + i * 2}, 80%, 55%)`;
        ctx.fillRect(i * w + 1, canvas.height - h, w - 2, h);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const currentSong = songs[currentTrack];

  return (
    <div className={styles.player}>
      {/* Real Audio controller */}
      {currentSong && currentSong.downloadUrl && (
        <audio 
          ref={audioRef} 
          src={currentSong.downloadUrl[currentSong.downloadUrl.length - 1]?.url} 
          onTimeUpdate={handleTimeUpdate} 
          onEnded={handleEnded} 
        />
      )}

      <div className={styles.titlebar}>
        <div className={styles.titleLeft}>
          <div className={styles.titleIcon} />
          Windows Media Player
        </div>
        <div className={styles.titleBtns}>
          <span>_</span><span>□</span><span className={styles.close}>×</span>
        </div>
      </div>

      <div className={styles.menubar}>
        {["Now Playing","Library","Rip"].map(m => (
          <span key={m} className={styles.menuItem}>{m}</span>
        ))}
        {/* Search Layout */}
        <div className={styles.searchSection}>
          <input 
            type="text" 
            placeholder="Search your taste..." 
            className={styles.searchBar} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchSongs(query)}
          />
          <button className={styles.searchBtn} onClick={() => fetchSongs(query)}>Search</button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainArea}>
          <canvas ref={canvasRef} className={styles.visualizer} />
          <div className={styles.nowPlaying}>
            Now Playing: <span>{currentSong ? currentSong.name : "Syncing..."}</span> {currentSong && `— ${currentSong.artists.primary[0]?.name || "Artist"}`}
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Online Tracks</div>
          <div className={styles.playlist}>
            {songs.map((t, i) => (
              <div key={i} className={`${styles.track} ${i === currentTrack ? styles.active : ""}`} onClick={() => selectTrack(i)}>
                <span className={styles.trackNum}>{i + 1}</span>
                {t.image && t.image[0] && (
                  <img src={t.image[0].url} alt="album" width={24} height={24} style={{ borderRadius: "2px", alignSelf: "center" }} />
                )}
                <div>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <div className={styles.trackArtist}>{t.artists.primary[0]?.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.ctrlRow}>
          <span className={styles.time}>{currentSong ? `${Math.floor(currentSong.duration / 60)}:${String(currentSong.duration % 60).padStart(2, '0')}` : "0:00"}</span>
          <button className={styles.btn} onClick={() => selectTrack((currentTrack - 1 + songs.length) % songs.length)}>⏮</button>
          <button className={`${styles.btn} ${styles.playBtn}`} onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button className={styles.btn} onClick={() => selectTrack((currentTrack + 1) % songs.length)}>⏭</button>
          <input type="range" min={0} max={100} defaultValue={70} className={styles.vol} />
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
