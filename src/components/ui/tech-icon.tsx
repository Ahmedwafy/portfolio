import { Code2 } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiSupabase,
  SiRedux,
  SiReacthookform,
  SiZod,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGraphql,
  SiDocker,
  SiFigma,
  SiFramer,
  SiVercel,
  SiGit,
  SiHtml5,
  SiCss,
  SiSass,
  SiVuedotjs,
  SiAngular,
  SiFirebase,
  SiGithub,
  SiPython,
  SiRedis,
  SiJest,
  SiSanity,
  SiNetlify,
} from "react-icons/si";

interface TechEntry {
  icon: IconType;
  color: string;
}

const TECH_MAP: Record<string, TechEntry> = {
  react: { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#000000" },
  nextjs: { icon: SiNextdotjs, color: "#000000" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  supabase: { icon: SiSupabase, color: "#3ECF8E" },
  "redux toolkit": { icon: SiRedux, color: "#764ABC" },
  redux: { icon: SiRedux, color: "#764ABC" },
  "react hook form": { icon: SiReacthookform, color: "#EC5990" },
  zod: { icon: SiZod, color: "#3E67B1" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress, color: "#000000" },
  "express.js": { icon: SiExpress, color: "#000000" },
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  postgres: { icon: SiPostgresql, color: "#4169E1" },
  prisma: { icon: SiPrisma, color: "#2D3748" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  docker: { icon: SiDocker, color: "#2496ED" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  framer: { icon: SiFramer, color: "#0055FF" },
  vercel: { icon: SiVercel, color: "#000000" },
  git: { icon: SiGit, color: "#F05032" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  html: { icon: SiHtml5, color: "#E34F26" },
  css3: { icon: SiCss, color: "#663399" },
  css: { icon: SiCss, color: "#663399" },
  sass: { icon: SiSass, color: "#CC6699" },
  "vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  angular: { icon: SiAngular, color: "#DD0031" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  github: { icon: SiGithub, color: "#181717" },
  python: { icon: SiPython, color: "#3776AB" },
  redis: { icon: SiRedis, color: "#FF4438" },
  jest: { icon: SiJest, color: "#C21325" },
  sanity: { icon: SiSanity, color: "#F03E2F" },
  netlify: { icon: SiNetlify, color: "#00C7B7" },
};

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const entry = TECH_MAP[name.toLowerCase().trim()];
  if (!entry) return <Code2 size={size} />;
  const Icon = entry.icon;
  return <Icon size={size} color={entry.color} />;
}
