"use client";

import dynamic from "next/dynamic";

// Dynamically import WorldGlobe for free 3D earth visualization
const WorldGlobe = dynamic(() => import("@/components/WorldGlobe"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-cyan-500 font-mono animate-pulse">初始化卫星上行链路...</div>
});

export default function OverwatchScene() {
  return (
    <div className="absolute inset-0 z-10">
        {/* WorldGlobe - Free 3D Earth */}
        <WorldGlobe />

      {/* 监控界面叠加层 */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 tracking-[0.5em] font-mono drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            全球监控系统
        </h1>
        <p className="text-cyan-500 text-xs mt-2 tracking-[0.8em] uppercase animate-pulse">
            卫星上行链路已建立
        </p>
      </div>

      {/* 操作说明 */}
      <div className="absolute top-24 left-6 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/30 text-white font-mono pointer-events-none max-w-sm shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        <h3 className="text-cyan-400 font-bold text-lg mb-4 tracking-widest border-b border-white/10 pb-2">全球视图控制</h3>
        <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-bold">🌍</span>
                <span>3D 真实地球纹理</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-bold">✈️</span>
                <span>实时飞行弧线动画</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-bold">🔄</span>
                <span>自动旋转地球</span>
            </div>
        </div>
      </div>
    </div>
  );
}
