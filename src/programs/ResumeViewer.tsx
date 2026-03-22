import styles from "./ResumeViewer.module.css";
import Image from "next/image";

import zoomIcon from "../../assets/toolbar/search.png";
import printerIcon from "../../assets/toolbar/printer.png";
import mailIcon from "../../assets/toolbar/mailto.png";
import saveIcon from "../../assets/toolbar/paste.png";
import { AppDirectory } from "@/appData";
import store from "@/redux/store";
import { addTab } from "@/redux/tabSlice";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

export default function ResumeViewer({ id }: { id: number }) {
  const currTabID = useSelector((state: RootState) => state.tab.id);

  const handleOpenOutlook = () => {
    const newTab = { ...AppDirectory.get(1)!, id: uuidv4(), zIndex: currTabID };
    store.dispatch(addTab(newTab));
  };

  const handleSave = () => {
    const link = document.createElement("a");
    link.href = "/AdityaResume (16).pdf";
    link.download = "Aditya_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // print standard element or iframe context
    const iframe = document.getElementById("resume-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    } else {
      window.print();
    }
  };

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarItem}>
          <Image src={zoomIcon.src} width={24} height={24} alt="Zoom" />
          <span>Zoom</span>
        </div>
        <div className={styles.toolbarItem} onClick={handleSave}>
          <Image src={saveIcon.src} width={24} height={24} alt="Save" />
          <span>Save</span>
        </div>
        <div className={styles.toolbarItem} onClick={handlePrint}>
          <Image src={printerIcon.src} width={24} height={24} alt="Print" />
          <span>Print</span>
        </div>
        <div className={styles.toolbarItem} onClick={handleOpenOutlook}>
          <Image src={mailIcon.src} width={24} height={24} alt="Contact" />
          <span>Contact Me</span>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className={styles.viewport}>
        <iframe 
          id="resume-iframe"
          src="/AdityaResume (16).pdf#toolbar=0&navpanes=0" 
          width="100%" 
          height="100%" 
          style={{ border: "none" }} 
          title="Resume"
        />
      </div>

      {/* Status Bar */}
      <div className={styles.bottomBar}>
        Click to zoom, then drag to view other areas
      </div>
    </div>
  );
}

