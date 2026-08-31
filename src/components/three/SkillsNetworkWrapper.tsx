"use client";
import dynamic from "next/dynamic";
const SkillsNetwork = dynamic(() => import("./SkillsNetwork"), { ssr: false });
export default function SkillsNetworkWrapper() {
  return <SkillsNetwork />;
}
