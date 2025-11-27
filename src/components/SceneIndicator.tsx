"use client";

import { useStore } from "@/store/useStore";

const SCENE_NAMES = [
  { name: "方舟反应堆", icon: "⚡", colorClass: "text-cyan-400" },
  { name: "全息地球", icon: "🌐", colorClass: "text-green-400" },
  { name: "太阳系", icon: "☀️", colorClass: "text-yellow-400" },
  { name: "神经网络", icon: "🧠", colorClass: "text-purple-400" },
  { name: "真实地球", icon: "🌍", colorClass: "text-blue-400" },
];

export default function SceneIndicator() {
  const activeScene = useStore((state) => state.activeScene);
  const scene = SCENE_NAMES[activeScene];

  return (
    <div className="absolute bottom-6 left-6 z-50 pointer-events-none">
      <div className="flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full">
        <span className="text-2xl animate-pulse">{scene.icon}</span>
        <div>
          <p className="text-xs text-cyan-400/70 font-mono tracking-widest">
            场景 {activeScene + 1}/5
          </p>
          <p className={`text-sm font-mono tracking-wider ${scene.colorClass}`}>
            {scene.name}
          </p>
        </div>
      </div>
      <p className="text-xs text-cyan-400/50 mt-2 font-mono text-center">
        👋 左右滑动切换场景
      </p>
    </div>
  );
}
