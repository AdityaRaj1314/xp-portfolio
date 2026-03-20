import styles from "./MyMusic.module.css";
import Image from "next/image";
import mediaplayer from "../../assets/mediaplayer.png";

const MyMusic = () => {
  return (
    <div className={styles.main}>
      {/* Aesthetic Media Player Header */}
      <div className={styles.header}>
        <div className={styles.logoTitle}>
          <Image src={mediaplayer} alt="Media Player" width={24} height={24} />
          <span>Windows Media Player - JioSaavn</span>
        </div>
        <div className={styles.controls}>
          <div className={styles.mockBtn}>⏮</div>
          <div className={styles.mockBtnPlay}>▶</div>
          <div className={styles.mockBtn}>⏭</div>
        </div>
      </div>
      
      {/* JioSaavn Web Player Content */}
      <div className={styles.iframeContainer}>
        <iframe
          src="https://www.jiosaavn.com/embed/playlist/158221044" 
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};

export default MyMusic;
