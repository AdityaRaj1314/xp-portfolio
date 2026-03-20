import {
  App,
  GalleryImage,
  Tab,
  WorkContent,
  WorkFile,
  WorkType,
} from "src/types";
import error from "../../assets/dialog/error.png";
import info from "../../assets/dialog/info.png";
import warning from "../../assets/dialog/warning.png";
import help from "../../assets/dialog/help.png";
import cmd from "../../assets/cmd.png";
import mycomputer from "../../assets/mycomputer.png";
import gallery from "../../assets/folder_image.png";
import outlook from "../../assets/outlook.png";
import paint from "../../assets/paint.png";
import folder_music from "../../assets/folder_music.png";
import skillIcon from "../../assets/skill.png";
import notepadIcon from "../../assets/notepad.png";

import emptyfile from "../../assets/workaccordion/emptyfile.png";
import adlib_2 from "../../assets/work/adlibarts/Screenshot 2026-03-19 011614.png";
import adlib_3 from "../../assets/work/adlibarts/Screenshot 2026-03-19 011623.png";
import adlib_4 from "../../assets/work/adlibarts/Screenshot 2026-03-19 011633.png";

import portfolio_1 from "../../assets/IMG_20260320_173600_291.jpg";
import portfolio_2 from "../../assets/photo_2026-03-20_22-22-47.jpg";
import portfolio_3 from "../../assets/Screenshot 2026-03-20 172230.png";

import col1 from "../../assets/gallery/0.jpg";
import col2 from "../../assets/gallery/1.jpg";
import col3 from "../../assets/gallery/2.jpg";
import col4 from "../../assets/gallery/3.jpg";
import col5 from "../../assets/gallery/4.jpg";
import col6 from "../../assets/gallery/5.jpg";
import col7 from "../../assets/gallery/6.jpg";
export const TechIcon = {
  REACT:
    "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
  NEXTJS:
    "https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white",
  FIREBASE:
    "https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase",
  TYPESCRIPT:
    "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
  FIGMA:
    "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white",
  NODEJS:
    "https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white",
  GOOGLECLOUDFUNCTIONS:
    "https://img.shields.io/badge/gCloud_Functions-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white",
  JAVA: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white",
  FLUTTER:
    "https://img.shields.io/badge/flutter-%2302569B.svg?style=for-the-badge&logo=flutter&logoColor=white",
  VERILOG:
    "https://img.shields.io/badge/Verilog-%23F7DF1E.svg?style=for-the-badge&logo=verilog&logoColor=rgb(142%2C0%2C39)",
  PYTHON:
    "https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white",
  C: "https://img.shields.io/badge/C-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white",
  CPP: "https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&ogoColor=white",
  ROS: "https://img.shields.io/badge/ROS-%23000000.svg?style=for-the-badge&logo=ros&logoColor=white",
  ARDUINO:
    "https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white",
  HTML: "https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
  CSS: "https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
  JAVASCRIPT:
    "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
  RASPBERRYPI:
    "https://img.shields.io/badge/Raspberry%20Pi-C51A4A?style=for-the-badge&logo=Raspberry-Pi",
  REDUX:
    "https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white",
  MATERIALUI:
    "https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white",
  AUTOCAD:
    "https://img.shields.io/badge/AutoCAD-0696D7?style=for-the-badge&logo=autodesk&logoColor=white",
  MBOT: "https://img.shields.io/badge/Makeblock-FF7F00?style=for-the-badge&logo=makeblock&logoColor=white",
  GOOGLECLOUD:
    "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white",
  MONGODB:
    "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
  TELEGRAM:
    "https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white",
  VUEJS:
    "https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D",
  WEBPACK:
    "https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white",
  SUPABASE:
    "https://img.shields.io/badge/Supabase-1E2E3B?style=for-the-badge&logo=supabase&logoColor=white",
  CHATGPT:
    "https://img.shields.io/badge/chatGPT-74aa9c?logo=openai&logoColor=white",
  GIT: "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
  TAILWINDCSS:
    "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
  NEONDB:
    "https://img.shields.io/badge/NeonDB-00E599?style=for-the-badge&logo=postgresql&logoColor=white",
  PRISMA:
    "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white",
  EXPRESSJS:
    "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
  OOP: "https://img.shields.io/badge/OOP-%23007396.svg?style=for-the-badge&logo=codeblocks&logoColor=white",
  CN: "https://img.shields.io/badge/Computer_Networks-%23005C84.svg?style=for-the-badge&logo=cisco&logoColor=white",
  LINUX:
    "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  VERCEL:
    "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white",
  INNGEST:
    "https://img.shields.io/badge/Inngest-FFFFFF?style=for-the-badge&logo=Inngest&logoColor=black",
  BUN: "https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white",
  LANGCHAIN: "https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white",
  GEMINI: "https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white",
  POSTGRESQL: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
};

// Badges to display on the Welcome/Portfolio page
export const WelcomeTechBadges = [
  TechIcon.REACT,
  TechIcon.NEXTJS,
  TechIcon.NODEJS,
  TechIcon.C,
  TechIcon.CPP,
  TechIcon.JAVASCRIPT,
  TechIcon.HTML,
  TechIcon.CSS,
  TechIcon.RASPBERRYPI,
  TechIcon.ARDUINO,
  TechIcon.AUTOCAD,
  TechIcon.MONGODB,
  TechIcon.PYTHON,
  TechIcon.GIT,
  TechIcon.TELEGRAM,
  TechIcon.TAILWINDCSS,
  TechIcon.NEONDB,
  TechIcon.PRISMA,
  TechIcon.EXPRESSJS,
  TechIcon.OOP,
  TechIcon.CN,
  TechIcon.LINUX,
];

export const AppDirectory: Map<number, Tab> = new Map([
  [
    0,
    {
      id: 0,
      title: "Welcome To My Website - Quick Start Guide",
      message: "",
      Icon: help,
      isMinimized: false,
      zIndex: 0,
      program: App.WELCOME,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    1,
    {
      id: 0,
      title: "Outlook Express",
      message: "",
      Icon: outlook,
      isMinimized: false,
      zIndex: 0,
      program: App.OUTLOOK,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    2,
    {
      id: 0,
      title: "My Work",
      message: "",
      Icon: cmd,
      isMinimized: false,
      zIndex: 0,
      program: App.MYWORK,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    4,
    {
      id: 0,
      title: "My Photography Collection",
      message: "",
      Icon: gallery,
      isMinimized: false,
      zIndex: 0,
      program: App.MYGALLERY,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    5,
    {
      id: 0,
      title: "Error",
      message: "",
      Icon: error,
      isMinimized: false,
      zIndex: 0,
      program: App.ERROR,
      prompt: true,
      backBtnActive: false,
    },
  ],
  [
    6,
    {
      id: 0,
      title: "Warning",
      message: "",
      Icon: warning,
      isMinimized: false,
      zIndex: 0,
      program: App.WARNING,
      prompt: true,
      backBtnActive: false,
    },
  ],
  [
    7,
    {
      id: 0,
      title: "Info",
      message: "",
      Icon: info,
      isMinimized: false,
      zIndex: 0,
      program: App.INFO,
      prompt: true,
      backBtnActive: false,
    },
  ],
  [
    8,
    {
      id: 0,
      title: "Help",
      message: "",
      Icon: help,
      isMinimized: false,
      zIndex: 0,
      program: App.HELP,
      prompt: true,
      backBtnActive: false,
    },
  ],
  [
    9,
    {
      id: 0,
      title: "Paint",
      message: "",
      Icon: paint,
      isMinimized: false,
      zIndex: 0,
      program: App.PAINT,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    10,
    {
      id: 0,
      title: "JioSaavn",
      message: "",
      Icon: folder_music,
      isMinimized: false,
      zIndex: 0,
      program: App.MYMUSIC,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    11,
    {
      id: 0,
      title: "Coding Profiles",
      message: "",
      Icon: skillIcon,
      isMinimized: false,
      zIndex: 0,
      program: App.MYSKILLS,
      prompt: false,
      backBtnActive: false,
    },
  ],
  [
    12,
    {
      id: 0,
      title: "Untitled - Notepad",
      message: "",
      Icon: notepadIcon,
      isMinimized: false,
      zIndex: 0,
      program: App.NOTEPAD,
      prompt: false,
      backBtnActive: false,
    },
  ],
]);

export const WorkAccordionTitles = [
  WorkType.PERSONAL,
  WorkType.GROUP,
];

export const GalleryAccordionTitles = ["Details"];

export const WorkData = [
  {
    id: 15,
    title: "Asuna",
    date: "2023 - Present",
    gitURL: "https://github.com/AdityaRaj1314/Asuna",
    techstack: [
      TechIcon.TYPESCRIPT,
      TechIcon.TAILWINDCSS,
      TechIcon.JAVASCRIPT,
      TechIcon.INNGEST,
      TechIcon.VERCEL,
      TechIcon.PRISMA,
    ],
    gallery: [],
    overview: `Asuna is a conversational AI inspired by virtual companions—built for natural interaction, emotional context, and modular extensibility.`,
  },
  {
    id: 14,
    title: "Adlib-Arts Website",
    date: "2025 - 2026",
    gitURL: "https://github.com/Adlibarts01/adlib-main-website",
    techstack: [
      TechIcon.TYPESCRIPT,
      TechIcon.CSS,
      TechIcon.JAVASCRIPT,
    ],
    gallery: [adlib_2, adlib_3, adlib_4],
    overview: `Adlib-Arts is the official website for the Photography Club of SIT Tumakuru. The platform showcases a curated photography gallery featuring work from talented club members across categories like Wildlife, Architecture, Macro, Street, and Astrophotography. It also features an events section with announcements and upcoming workshops such as Visual Storytelling, along with team information and a contact page. Built with modern web technologies using TypeScript and deployed on Vercel.`,
  },
  {
    id: 16,
    title: "Kuma - AI-Powered Personal Assistant",
    date: "2024 - Present",
    gitURL: "",
    techstack: [
      TechIcon.REACT,
      TechIcon.BUN,
      TechIcon.EXPRESSJS,
      TechIcon.TYPESCRIPT,
      TechIcon.GEMINI,
      TechIcon.LANGCHAIN,
      TechIcon.POSTGRESQL,
    ],
    gallery: [],
    overview: `Built a full-stack AI assistant with real-time streaming chat, multimodal PDF processing, and long-term memory using Gemini 2.5 Pro. Implemented agent-based orchestration, semantic memory, and context summarization to reduce token usage by 80% and improve response latency. Integrated JWT authentication, OAuth (Gmail/GitHub), SSE streaming, and scalable cloud-ready backend architecture.`,
  },
  {
    id: 17,
    title: "Windows XP Retro Portfolio",
    date: "2026 - Present",
    gitURL: "https://github.com/AdityaRaj1314/Personal_portfolio",
    techstack: [
      TechIcon.REACT,
      TechIcon.NEXTJS,
      TechIcon.TYPESCRIPT,
      TechIcon.CSS,
      TechIcon.REDUX,
    ],
    gallery: [portfolio_1, portfolio_2, portfolio_3],
    overview: `An immersive, interactive personal portfolio website meticulously designed to replicate the classic Windows XP operating system experience. Built from the ground up using React and Next.js, this web application features a fully functional robust Start Menu, interactive desktop icons, draggable and z-indexed window components, and custom-built applications. It includes an integrated JioSaavn music player, an automated competitive programming skills visualizer, and a responsive photography gallery. The project showcases high-level attention to UI/UX nostalgic details and heavily relies on complex state management architectures utilizing Redux.`,
  },
] as WorkContent[];

export const WorkAccordionContent = [
  {
    id: 15,
    type: WorkType.PERSONAL,
    icon: emptyfile,
    title: "Asuna",
    content: WorkData[WorkData.findIndex((x) => x.id === 15)],
  },
  {
    id: 14,
    type: WorkType.GROUP,
    icon: emptyfile,
    title: "Adlib-Arts Website",
    content: WorkData[WorkData.findIndex((x) => x.id === 14)],
  },
  {
    id: 16,
    type: WorkType.GROUP,
    icon: emptyfile,
    title: "Kuma - AI-Powered Personal Assistant",
    content: WorkData[WorkData.findIndex((x) => x.id === 16)],
  },
  {
    id: 17,
    type: WorkType.PERSONAL,
    icon: emptyfile,
    title: "Windows XP Retro Portfolio",
    content: WorkData[WorkData.findIndex((x) => x.id === 17)],
  },
] as WorkFile[];

// For My Photography Collection
export const PhotoCollection = [
  {
    id: 0,
    title: "Biscoman Bhawan with Golghar",
    location: "Patna, Bihar",
    desc: "t screnetic pic of biscoman with golghar aligned",
    date: "14 March 2025",
    img: col1,
  },
  {
    id: 1,
    title: "coorg Raja Seat",
    location: "Coorg, Karnataka",
    desc: "A serene at the Raja seat with the valley view",
    date: "1 January 2025",
    img: col2,
  },
  {
    id: 2,
    title: "Butterfly Garden",
    location: "Patna, Bihar",
    desc: "A Butterfly on the petal",
    date: "23 November 2023",
    img: col3,
  },
  {
    id: 3,
    title: "Cathedral",
    location: "Mysuru , Karnataka",
    desc: "A Cathedral in Mysuru",
    date: "15 November 2025",
    img: col4,
  },
  {
    id:4,
    title:"Silent Horizon",
    location:"marine drive -patna,Bihar",
    desc:"A quiet, minimal seascape with a lone white structure standing in still water The soft gradient sky and reflection create a calm, almost surreal mood.",
    date:"13 March 2025",
    img:col5,
  },
  {
    id:5,
    title:"Lessons by the Water",
    location:"patna Bihar",
    desc:"A man stands beside a child near a river, guiding them gently.The black-and-white tones give the moment a timeless, emotional depth",
    date:"13 March 2025",
    img:col6,
  },
  {
    id:6,
    title:"Echoes of Silence",
    location:"Bihar Sarif, Bihar",
    desc:"A child walks alone along the shoreline, reflected softly in the wet sand beneath.The muted tones and open space create a peaceful yet introspective mood.",
    date:"13 March 2025",
    img:col7,
  }
] as GalleryImage[];
