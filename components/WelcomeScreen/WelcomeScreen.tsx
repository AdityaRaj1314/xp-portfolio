import React, { useEffect, useState } from "react";
import styles from "./WelcomeScreen.module.css";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    // Start progress bar fill animation shortly after mount
    const fillTimer = setTimeout(() => {
      setFillWidth(100);
    }, 100);

    const audio = new Audio("https://www.myinstants.com/media/sounds/windows-xp-startup.mp3");
    audio.volume = 0.5;

    // Wait 3.5 seconds, start sound and fade out to Desktop
    const timer = setTimeout(() => {
      audio.play().catch(e => console.log("Audio autoplay was prevented by browser rules."));
      setFade(true);
      setTimeout(() => {
        onComplete();
      }, 500); // 500ms fade duration
    }, 3500);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${fade ? styles.fadeOut : ""}`}>
      <div className={styles.stageWelcome}>
        <div className={styles.welcomeText}>Welcome</div>
        <div className={styles.welcomeTrack}>
          <div className={styles.welcomeFill} style={{ width: `${fillWidth}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
