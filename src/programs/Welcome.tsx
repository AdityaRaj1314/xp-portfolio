import WelcomeIcon from "components/WelcomeIcon/WelcomeIcon";
import styles from "./Welcome.module.css";
import linkedin from "../../assets/linkedin.png";
import instagramIcon from "../../assets/instagram.png";
import outlook from "../../assets/outlook_large.png";
import skillIcon from "../../assets/skill.png";
import gallery from "../../assets/folder_image.png";
import pdf from "../../assets/pdf.png";
import github from "../../assets/github.png";
import cmd from "../../assets/cmd.png";
import users from "../../assets/users.png";
import butterfly from "../../assets/butterfly.png";
import { AppDirectory } from "@/appData";
import store from "@/redux/store";
import { addTab, setBackBtn } from "@/redux/tabSlice";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "../../assets/gallery/IMG_20240829_200948_692.jpg";
import img2 from "../../assets/gallery/DSC09656.jpg";
import img3 from "../../assets/gallery/IMG-20241011-WA0042.jpg";

const INTRO = `Hi, I’m Aditya Raj -an engineering student with a passion for technology, innovation, and problem-solving. I enjoy exploring how ideas can be transformed into real-world solutions through code and creativity. From building projects to experimenting with new technologies, I’m constantly learning and pushing my boundaries. This portfolio is a reflection of my journey, showcasing my skills, projects, and the curiosity that drives me to grow as an engineer.
`;


const INTERESTS = `Other than my interest in developing websites and applications, I have a deep passion for photography and videography. I enjoy capturing moments, telling stories through visuals, and experimenting with creative perspectives. Traveling is something I truly value, especially when combined with riding bikes — it gives me a sense of freedom and adventure while exploring new places.

During these journeys, I get the opportunity to meet new people, experience different lifestyles, and step outside my comfort zone. I believe that traveling not only broadens perspective but also helps in personal growth. It teaches adaptability, independence, and how to appreciate diverse cultures and environments, shaping me into a more open-minded and self-reliant individual.
`;


const INTERESTS3 = `I’m deeply passionate about filming, especially aerial videography using drones. The unique angles and perspectives I can capture from above feel far more immersive and dynamic than traditional DSLR or phone shots—it’s almost like experiencing the world through the eyes of a bird (which honestly feels like flying). Through my work, I try to create visuals that are not just seen, but felt. Beyond filming, I also enjoy reading non-fiction—particularly books on entrepreneurship, biographies, and self-development—as they offer meaningful insights and satisfy my curiosity about people and their journeys.
`;

interface props {
  id: number;
}

const Welcome = ({ id }: props) => {
  const currTabID = useSelector((state: RootState) => state.tab.id);
  const backBtnActive = useSelector(
    (state: RootState) =>
      state.tab.tray[state.tab.tray.findIndex((tab) => tab.id === id)]
        .backBtnActive
  );

  const [aboutmeView, setAboutmeView] = useState(false);

  const handleRunApp = (e: number) => {
    const newTab = { ...AppDirectory.get(e), id: uuidv4(), zIndex: currTabID };
    store.dispatch(addTab(newTab));
  };
  const handleSwitchView = () => {
    setAboutmeView(true);
    store.dispatch(setBackBtn({ id: id, backBtnActive: true }));
  };
  useEffect(() => {
    setAboutmeView(backBtnActive);
  }, [backBtnActive]);
  return (
    <div className={styles.main}>
      {!aboutmeView ? (
        <div>
          <h3 className={styles.welcome_text}>
            Welcome To Aditya Raj&apos;s Personal Website
          </h3>
          <p className={styles.subtitle}>
            Learn more about me by clicking any of the icons below to get
            started!
          </p>
          <div className={styles.content}>
            <div className={styles.leftpanel}>
              <WelcomeIcon
                img={butterfly}
                text={"About Me"}
                tooltip="Who am I?"
                onClick={handleSwitchView}
              />
              <WelcomeIcon
                img={github}
                text={"My GitHub Profile"}
                tooltip="My Brain Dump"
                onClick={() => {
                  window.open(
                    "https://github.com/AdityaRaj1314",
                    "_blank",
                    "noreferrer"
                  );
                }}
              />
              <WelcomeIcon
                img={linkedin}
                text={"My Linkedin"}
                tooltip="Connect with me!"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/aditya-raj-0a474927a/",
                    "_blank",
                    "noreferrer"
                  );
                }}
              />
              <WelcomeIcon
                img={instagramIcon}
                text={"My Instagram"}
                tooltip="Follow me!"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/aditya_raj1135/",
                    "_blank",
                    "noreferrer"
                  );
                }}
              />
              <WelcomeIcon
                img={pdf}
                text={"My Resume"}
                tooltip="My Curriculum Vitae"
                onClick={() => {
                  window.open("./AdityaResume (16).pdf");
                }}
              />
            </div>
            <div className={styles.rightpanel}>
              <WelcomeIcon
                img={cmd}
                text={"My Work"}
                tooltip="Interesting projects I have done"
                onClick={() => handleRunApp(2)}
              />
              <WelcomeIcon
                img={outlook}
                text={"Send Me An Email"}
                tooltip="Reach out to me!"
                onClick={() => handleRunApp(1)}
              />
              <WelcomeIcon
                img={gallery}
                text={"My Photography Collection"}
                tooltip="Click to view!"
                onClick={() => handleRunApp(4)}
              />
              <WelcomeIcon
                img={skillIcon}
                text={"Coding Profiles"}
                tooltip="My Competitive Programming"
                onClick={() => handleRunApp(11)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className={styles.welcome_text}>About Me</h3>
          <p className={styles.subtitle}></p>
          <div className={styles.content}>
            <div className={styles.pic_col}>
              <Image
                alt="profile_pic"
                src={img1.src}
                width={200}
                height={200}
                className={styles.profile_pic}
              />
              <Image
                alt="profile_pic"
                src={img2.src}
                width={200}
                height={200}
                className={styles.profile_pic}
              />
              <Image
                alt="profile_pic"
                src={img3.src}
                width={200}
                height={200}
                className={styles.profile_pic}
              />
            </div>
            <div className={styles.text_col}>
              <p className={styles.subtitle}>{INTRO}</p>
              <h3 className={styles.subtitle_header}>
                What are your interests?
              </h3>
              <p className={styles.subtitle}>{INTERESTS}</p>
              <br></br>
              <p className={styles.subtitle}>{INTERESTS3}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
