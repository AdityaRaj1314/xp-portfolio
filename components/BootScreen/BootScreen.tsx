import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./BootScreen.module.css";
import xpLogo from "../../assets/pngwing.com.png";

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Automatically finish booting after 3.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoImageWrapper}>
          <Image src={xpLogo} alt="XP Logo" width={260} height={190} style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.logoGroup}>
          <div className={styles.windowsXp}>
            Arscker's<span className={styles.xpText}> xp</span>
          </div>
        </div>
        <div className={styles.loadingBarContainer}>
          <div className={styles.loadingBox}>
            <div className={styles.loadingBlocks}></div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.copyright}>Copyright © Microsoft Corporation</div>
        <div className={styles.microsoftLogo}>Microsoft</div>
      </div>
    </div>
  );
};

export default BootScreen;
