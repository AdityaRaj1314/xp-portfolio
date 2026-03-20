import styles from "./StartMenu.module.css";
import userprofile from "../../assets/gallery/IMG_20240829_200948_692.jpg";
import folder from "../../assets/folder_plain.png";
import StartMenuItem from "components/StartMenuItem/StartMenuItem";
import recentdoc from "../../assets/recentdoc.png";
import mycomputer from "../../assets/mycomputer.png";
import folder_image from "../../assets/folder_image.png";
import folder_music from "../../assets/folder_music.png";
import clipboard from "../../assets/clipboard.png";
import help from "../../assets/help.png";
import search from "../../assets/search.png";
import run from "../../assets/run.png";
import skillIcon from "../../assets/skill.png";
import outlook from "../../assets/outlook.png";
import ie from "../../assets/ie.png";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import cmd from "../../assets/cmd.png";
import paint from "../../assets/paint.png";
import msn from "../../assets/msn.png";
import instagramIcon from "../../assets/instagram.png";
import notepadIcon from "../../assets/notepad.png";
import pdf from "../../assets/pdf.png";
import arrow from "../../assets/all-programs.ico";
import logoff from "../../assets/logoff.png";
import shutdown from "../../assets/shutdown.png";
import defaultprog from "../../assets/defaultprog.png";
import printerfax from "../../assets/printerfax.png";
import { AppDirectory } from "@/appData";
import { addTab } from "@/redux/tabSlice";
import store from "@/redux/store";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTurnOffDialogOpen } from "@/redux/systemSlice";

interface StartMenuProps {
  menuControl: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartMenu = ({ menuControl }: StartMenuProps) => {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const dispatch = useDispatch();
  const handleOpenGitHub = () => {
    window.open("https://github.com/AdityaRaj1314", "_blank", "noreferrer");
  };

  const handleOpenResume = () => {
    window.open("./AdityaResume (16).pdf", "_blank");
  };

  const handleOpenLinkedin = () => {
    window.open(
      "https://www.linkedin.com/in/aditya-raj-0a474927a/",
      "_blank",
      "noreferrer"
    );
  };

  const handleOpenInstagram = () => {
    window.open("https://www.instagram.com/aditya_raj1135/", "_blank", "noreferrer");
  };
  //const currTabID = useSelector((state: RootState) => state.tab.id);
  const handleRunApp = (e: number) => {
    menuControl(false);
    const newTab = { ...AppDirectory.get(e), id: uuidv4() };
    store.dispatch(addTab(newTab));
  };
  return (
    <div className={styles.startmenu}>
      <hr className={styles.whitehr} />
      <div className={styles.menutopbar}>
        <Image
          alt="userprofile"
          src={userprofile.src}
          width={55}
          height={55}
          style={{
            border: "2px",
            borderStyle: "solid",
            borderRadius: "3px",
            borderColor: "rgba(222, 222, 222, 0.8)",
            boxShadow: "0 0 3px 3px rgba(0, 0, 0, 0.2)",
            margin: "0 5px 0 5px",
          }}
        />
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            textShadow: "1px 1px #000000",
          }}
        >
          Aditya Raj&apos;s PC
        </p>
      </div>
      <hr className={styles.orangehr} />
      <div className={styles.menu}>
        <div className={styles.leftmenu}>
          <div>
            <StartMenuItem
              title="Internet"
              subtitle="Internet Explorer"
              icon={ie}
              type={1}
            />
            <StartMenuItem
              onClick={() => handleRunApp(1)}
              title="E-mail"
              subtitle="Drop me a message!"
              icon={outlook}
              type={1}
            />
            <hr className={styles.greyhr} />
            <StartMenuItem
              onClick={handleOpenResume}
              title="My Resume"
              icon={pdf}
              type={2}
            />
            <StartMenuItem
              onClick={handleOpenGitHub}
              title="My Github"
              icon={github}
              type={2}
            />
            <StartMenuItem
              onClick={handleOpenLinkedin}
              title="My Linkedin"
              icon={linkedin}
              type={2}
            />
            <StartMenuItem
              onClick={handleOpenInstagram}
              title="My Instagram"
              icon={instagramIcon}
              type={2}
            />
            <StartMenuItem
              title="Coding Profiles"
              onClick={() => handleRunApp(11)}
              icon={skillIcon}
              type={2}
            />
            <StartMenuItem
              title="My Work"
              onClick={() => handleRunApp(2)}
              icon={cmd}
              type={2}
            />
            <StartMenuItem title="Paint" onClick={() => handleRunApp(9)} icon={paint} type={2} />
            <StartMenuItem
              title="Notepad"
              onClick={() => handleRunApp(12)}
              icon={notepadIcon}
              type={1}
            />
          </div>
          <div>
            <hr className={styles.greyhr} />
            <div 
              className={styles.allprograms}
              onMouseEnter={() => setShowAllPrograms(true)}
              onMouseLeave={() => setShowAllPrograms(false)}
            >
              All Programs
              <Image
                height={15}
                width={15}
                alt="arrow"
                style={{ marginLeft: "4px" }}
                src={arrow.src}
              />
              {showAllPrograms && (
                <div className={styles.allprograms_menu}>
                  <StartMenuItem title="Paint" onClick={() => handleRunApp(9)} icon={paint} type={2} />
                  <StartMenuItem title="Minesweeper" icon={cmd} type={2} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.rightmenu}>
          <StartMenuItem title="My Documents" icon={folder} type={3} />
          <StartMenuItem
            title="My Recent Documents"
            icon={recentdoc}
            type={3}
            expanded={true}
          />
          <StartMenuItem title="My Pictures" onClick={() => handleRunApp(4)} icon={folder_image} type={3} />
          <StartMenuItem title="My Music" onClick={() => handleRunApp(10)} icon={folder_music} type={3} />
          <StartMenuItem title="My Computer" icon={mycomputer} type={3} />
          <hr className={styles.bluehr} />
          <StartMenuItem title="Control Panel" icon={clipboard} type={4} />
          <StartMenuItem
            title="Set Program Access and Defaults"
            icon={defaultprog}
            type={4}
          />
          <StartMenuItem title="Printer and Faxes" icon={printerfax} type={4} />
          <hr className={styles.bluehr} />
          <StartMenuItem title="Help and Support" icon={help} type={4} />
          <StartMenuItem title="Search" icon={search} type={4} />
          <StartMenuItem title="Run..." icon={run} type={4} />
        </div>
      </div>
      <div className={styles.menubtmbar}>
        <div className={styles.systemBtn}>
          <Image
            width={30}
            height={30}
            alt=""
            className={styles.systemBtnIcon}
            src={logoff.src}
          />
          Log Off
        </div>
        <div className={styles.systemBtn} onClick={() => {
            menuControl(false);
            dispatch(setTurnOffDialogOpen(true));
          }}>
          <Image
            width={30}
            height={30}
            alt=""
            className={styles.systemBtnIcon}
            src={shutdown.src}
          />
          Turn Off Computer
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
