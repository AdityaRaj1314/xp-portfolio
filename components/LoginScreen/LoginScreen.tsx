import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import Image from "next/image";
import userImg from "../../assets/gallery/DSC09554.jpg";
import xpLogo from "../../assets/pngwing.com.png";

interface LoginScreenProps {
  onLogin: () => void;
  onShutdown?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShutdown }) => {
  const [shuttingDown, setShuttingDown] = useState(false);

  const handleShutdown = () => {
    setShuttingDown(true);
    const audio = new Audio("https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Sound error"));
    
    setTimeout(() => {
      if (onShutdown) onShutdown();
    }, 2200);
  };

  return (
    <div className={`${styles.container} ${shuttingDown ? styles.fadeOutScreen : ""}`}>
      <div className={styles.topBar}></div>
      <div className={styles.mainContent}>
        
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <Image src={xpLogo} alt="XP Logo" width={140} height={100} style={{ objectFit: 'contain' }} />
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoWindows}>Arscker&apos;s</span>
              <span className={styles.logoXp}>xp</span>
            </div>
          </div>
          <p className={styles.tagline}>To begin, ping Arscker</p>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.rightSide}>
          <div className={styles.userBlock} onClick={onLogin}>
            <div className={styles.userIconWrapper}>
              <Image src={userImg} alt="User" width={60} height={60} className={styles.userImage} />
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>Arscker</h2>
              <p className={styles.userRole}>invictus</p>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.bottomBar}>
        <div className={styles.turnOffButton} onClick={handleShutdown}>
           <div className={styles.powerIcon}></div>
           <span>Turn off computer</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
