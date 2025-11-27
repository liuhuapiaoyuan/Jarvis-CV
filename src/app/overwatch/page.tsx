"use client";
import WebcamProcessorOverwatch from "@/components/WebcamProcessorOverwatch";
import OverwatchScene from "@/components/OverwatchScene";
import HandUI from "@/components/HandUI";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import PhysicsEmoji from "@/components/PhysicsEmoji";

export default function OverwatchPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 背景视频 / 手势处理器 - 画中画模式 */}
      <WebcamProcessorOverwatch className="fixed bottom-6 right-6 w-80 h-60 rounded-2xl overflow-hidden border-2 border-cyan-500/50 z-50 shadow-[0_0_30px_rgba(0,255,255,0.2)] bg-black/80 backdrop-blur-sm" />

      {/* 监控场景（真实地球） */}
      <OverwatchScene />

      {/* 手势交互层 */}
      <HandUI />

      {/* 物理Emoji交互层 */}
      <PhysicsEmoji />

      {/* 导航返回 */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-900/30 hover:text-blue-200 transition-all group">
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs font-mono tracking-widest">
              返回主界面
            </span>
          </button>
        </Link>
      </div>

      <SocialLinks className="top-6 right-10"/>
    </main>
  );
}
