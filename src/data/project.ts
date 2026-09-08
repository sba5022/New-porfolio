export type Project = {
  id: string;
  name: string;
  image: string;
  technologies: string[];
  description: string;
  liveLink: string;
  githubLink?: string;
  challenges: string[];
  improvements: string[];
};

export const projects: Project[] = [
   {
    id: "digital-life-lesson",
    name: "Digital Life Lesson",
    image: "https://i.ibb.co.com/nMgYhp4T/Screenshot-2026-09-08-at-1-10-01-AM.png",
    technologies: [
      "Next.js",
      "Tailwind CSS",
    ],
    description:
      "Digital Life Lesson is a platform for creating, managing, and sharing digital life lessons and experiences.",
    liveLink: "https://assignment-10-pink.vercel.app",
    githubLink: "https://github.com/sba5022/Digital-Life-Lessons.git",
    challenges: [
      "Creating a responsive travel interface.",
      "Building reusable components.",
      "Managing layouts across different screen sizes.",
    ],
    improvements: [
      "Add maps.",
      "Add user reviews and ratings.",
    ],
  },

  {
    id: "ideavault",
    name: "IdeaVault",
    image: "https://i.ibb.co.com/tPXJhzrq/Screenshot-2026-08-07-at-1-21-32-PM.png",
    technologies: [
      "Next.js",

      "Tailwind CSS",
      "MongoDB",
      "Better Auth",
    ],
    description:
      "IdeaVault is a modern platform for creating, managing, and sharing personal ideas and life lessons.",
    liveLink: "https://ideavault-beta.vercel.app/",
    githubLink: "https://github.com/sba5022/IdeaVault.git",
    challenges: [
      "Implementing user authentication and session management.",
      "Connecting the application with MongoDB.",
      "Creating a responsive interface for different screen sizes.",
    ],
    improvements: [
      "Add advanced search and filtering.",
      "Add user recommendations.",
      "Improve the admin dashboard.",
      "Add notifications.",
    ],
  },

 
  {
    id: "library",
    name: "Library",
    image: "https://i.ibb.co.com/5gPq9cbY/Screenshot-2026-08-07-at-1-21-11-PM.png",
    technologies: [
      "Next.js",
     "HeroUi",
      "Tailwind CSS",
      
    ],
    description:
      "Library is a platform where users can preserve, manage, and share valuable lessons and experiences from their reading experiences.",
    liveLink: "https://assignment-8-teal-alpha.vercel.app/",
    githubLink: "https://github.com/sba5022/Assignment-8.git",
    challenges: [
      "Implementing email and Google authentication.",
      "Managing authenticated user sessions.",
      "Creating a dynamic lesson management system.",
    ],
    improvements: [
      "Add categories and filtering.",
      "Add social interactions.",
      "Add personalized recommendations.",
    ],
  },
];