import styles from "./TurnOffDialog.module.css";
import Image from "next/image";
import shutdownIcon from "../../assets/shutdown.png";
import helpIcon from "../../assets/help.png"; // stand-in for standby
import runIcon from "../../assets/run.png"; // stand-in for restart
import { useDispatch } from "react-redux";
import { setTurnOffDialogOpen } from "@/redux/systemSlice";
import { useState, useEffect } from "react";

interface TurnOffDialogProps {
  onRestart?: () => void;
  onShutdown?: () => void;
}

const TurnOffDialog: React.FC<TurnOffDialogProps> = ({ onRestart, onShutdown }) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCancel = () => {
    setMounted(false);
    setTimeout(() => {
      dispatch(setTurnOffDialogOpen(false));
    }, 300); // Wait for fade out
  };

  const handleRestart = () => {
    setMounted(false);
    setTimeout(() => {
      dispatch(setTurnOffDialogOpen(false));
      if (onRestart) onRestart();
    }, 300);
  };

  const handleShutdown = () => {
    setShuttingDown(true);
    const audio = new Audio("https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play blocked"));
    
    setTimeout(() => {
      if (onShutdown) onShutdown();
    }, 2100); // Wait 2.1s for sound effect
  };

  if (!mounted) {
     return <div className={`${styles.overlay} ${styles.fadeIn}`}></div>; // just background initially
  }

  return (
    <div className={`${styles.overlay} ${mounted ? styles.fadeIn : styles.fadeOut}`}>
      {shuttingDown && <div className={styles.screenBlackout}></div>}
      <div className={styles.dialog}>
        <div className={styles.topbar}>
          <span className={styles.title}>Turn off computer</span>
          {/* Windows flag placeholder */}
          <div className={styles.flag}>
             <span style={{color: '#f05a28'}}>∎</span>
             <span style={{color: '#7fba00'}}>∎</span>
             <span style={{color: '#00a4ef'}}>∎</span>
             <span style={{color: '#ffb900'}}>∎</span>
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            <div className={styles.actionBtn}>
              <div className={styles.iconContainer} style={{ background: 'linear-gradient(135deg, #fff200, #ff8c00)' }}>
                 <Image src={helpIcon} alt="Stand By" width={30} height={30} />
              </div>
              <span>Stand By</span>
            </div>
            
            <div className={styles.actionBtn} onClick={handleShutdown}>
              <div className={styles.iconContainer} style={{ background: 'linear-gradient(135deg, #ff8c00, #ff0000)' }}>
                 <Image src={shutdownIcon} alt="Turn Off" width={30} height={30} />
              </div>
              <span>Turn Off</span>
            </div>
            
            <div className={styles.actionBtn} onClick={handleRestart}>
              <div className={styles.iconContainer} style={{ background: 'linear-gradient(135deg, #b5e61d, #22b14c)' }}>
                 <Image src={runIcon} alt="Restart" width={30} height={30} />
              </div>
              <span>Restart</span>
            </div>
          </div>
        </div>

        <div className={styles.bottombar}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurnOffDialog;
