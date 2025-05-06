import React from "react";
import { GithubFill } from "./icons";

const ProjectCard = ({ data, link }) => {
  return (
    <div
      id="card_container"
      className="text-center w-96 justify-self-start font-xs bg-[#373f51] border-[#e07a5f] border-2 text-[#ebcfb2] rounded-lg shadow-lg shadow-black-500/50 p-5"
    >
      {/* Title row */}
      <div
        id="card_title"
        className="flex items-center text-[#e07a5f] font-medium gap-2 justify-start mb-2"
      >
        <GithubFill />
        <a href={link}>{data.title}</a>
      </div>
      {/* Body/Description */}
      <div id="card_body" className="mb-4 justify-start text-xs text-left">
        {data.body || data.description}
      </div>
      {/* Footer: Language indicator, status, version */}
      <div
        id="card_footer"
        className="flex items-center gap-2 text-sm text-zinc-300 justify-between mt-2"
      >
        <span className="text-sm">
        <span
          className="inline-block h-3 w-3 rounded-full mr-1 border border-[#ebcfb2]"
          style={{
            backgroundColor: data.backgroundColor || "#ebcfb2",
          }}
          aria-label={`Project Color: ${data.backgroundColor || "default"}`}
        />
        {data.language}</span>
        <div>
        <span className="ml-2 px-2 py-0.5 rounded bg-[#e07a5f] text-[#373f51]">{data.status}</span>
        <span className="ml-2 px-2 py-0.5 rounded bg-[#ebcfb2] text-[#373f51]">{data.version}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
