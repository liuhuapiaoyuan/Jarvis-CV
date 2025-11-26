import WebcamProcessorNeural from "@/components/WebcamProcessorNeural";
import HandUI from "@/components/HandUI";
import Link from "next/link";
import NeuralScene from "@/components/NeuralScene";
import { SocialLinks } from "@/components/SocialLinks";
import PhysicsEmoji from "@/components/PhysicsEmoji";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden ">
      {/* 背景：摄像头采集 */}
      <WebcamProcessorNeural />

      {/* 中间层：神经网络场景 */}
      <NeuralScene />

      {/* 手势交互层 */}
      <HandUI />

      {/* 物理Emoji交互层 */}
      <PhysicsEmoji />

      <SocialLinks className="top-6 left-10" />

      {/* 导航按钮 */}
    <div className="absolute bottom-10 right-10 z-50 flex flex-col gap-4 items-end">
        <Link href="/overwatch">
          <button className="px-6 py-3 bg-blue-900/20 border border-blue-500/50 text-blue-400 rounded-none font-mono text-sm tracking-[0.2em] hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-300 backdrop-blur-sm group w-64 text-right flex">
            <span className="mr-2 group-hover:animate-pulse">🌍</span>
            全球监控模式
          </button>
        </Link>
      </div>
      <div className="absolute top-6 right-6 z-50 text-right pointer-events-none">
        <h1 className="text-2xl font-bold text-white tracking-widest opacity-80 font-mono text-glow">
          神经网络接口
        </h1>
        <p className="text-cyan-400 text-xs mt-1 tracking-[0.3em] opacity-70">
          突触连接已建立
        </p>
      </div>
    </main>
  );
}
