import React from "react";

export default function TechTicker() {
  const skills = [
    "HTML5",
    "CSS",
    "JAVASCRIPT",
    "NODE.JS",
    "REACT",
    "GIT",
    "GITHUB",
  ];

  // Duplicate the skills array to create a seamless looping effect
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="bg-surface-container-lowest border-y border-outline-variant py-margin w-full overflow-hidden whitespace-nowrap">
      <div className="flex gap-[80px] animate-[scroll_30s_linear_infinite] w-max">
        {repeatedSkills.map((skill, index) => (
          <span
            key={index}
            className="font-label-caps text-on-surface-variant opacity-50 text-[32px]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
