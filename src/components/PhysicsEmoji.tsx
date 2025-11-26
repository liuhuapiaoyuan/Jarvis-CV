"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  isGrabbed: boolean;
  grabbedByHand: "left" | "right" | null;
}

const EMOJI_LIST = ["🌟", "💎", "🔮", "⚡", "🌀", "💫", "✨", "🎯", "🎨", "🎭"];
const GRAVITY = 0.5;
const FRICTION = 0.98;
const BOUNCE = 0.7;
const HAND_INFLUENCE_RADIUS = 100;
const THROW_MULTIPLIER = 1.5;

export default function PhysicsEmoji() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emojisRef = useRef<Emoji[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const leftHand = useStore((state) => state.leftHand);
  const rightHand = useStore((state) => state.rightHand);
  const prevHandPositions = useRef<{
    left: { x: number; y: number } | null;
    right: { x: number; y: number } | null;
  }>({ left: null, right: null });

  // 初始化emoji
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialEmojis: Emoji[] = EMOJI_LIST.map((emoji, i) => ({
      id: i,
      emoji,
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * 300 + 50,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      size: 40 + Math.random() * 20,
      isGrabbed: false,
      grabbedByHand: null,
    }));

    emojisRef.current = initialEmojis;
  }, []);

  // 物理引擎更新和绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // 调整画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const emojis = emojisRef.current;

      emojis.forEach((emoji) => {
        // 获取手部位置
        let leftHandPos: { x: number; y: number } | null = null;
        let rightHandPos: { x: number; y: number } | null = null;

        if (leftHand && leftHand.length > 0) {
          const palm = leftHand[0]; // 手掌中心
          leftHandPos = {
            x: palm.x * canvas.width,
            y: palm.y * canvas.height,
          };
        }

        if (rightHand && rightHand.length > 0) {
          const palm = rightHand[0]; // 手掌中心
          rightHandPos = {
            x: palm.x * canvas.width,
            y: palm.y * canvas.height,
          };
        }

        // 检查是否被抓取
        const checkGrab = (
          handPos: { x: number; y: number } | null,
          handType: "left" | "right"
        ) => {
          if (!handPos) return false;

          const dx = handPos.x - emoji.x;
          const dy = handPos.y - emoji.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < emoji.size) {
            emoji.isGrabbed = true;
            emoji.grabbedByHand = handType;
            emoji.x = handPos.x;
            emoji.y = handPos.y;

            // 计算投掷速度
            const prevPos = prevHandPositions.current[handType];
            if (prevPos) {
              emoji.vx = (handPos.x - prevPos.x) * THROW_MULTIPLIER;
              emoji.vy = (handPos.y - prevPos.y) * THROW_MULTIPLIER;
            }

            return true;
          }
          return false;
        };

        // 检查左右手抓取
        const isGrabbedByLeft = checkGrab(leftHandPos, "left");
        const isGrabbedByRight = checkGrab(rightHandPos, "right");

        if (!isGrabbedByLeft && !isGrabbedByRight) {
          emoji.isGrabbed = false;
          emoji.grabbedByHand = null;
        }

        // 如果没有被抓取，应用物理效果
        if (!emoji.isGrabbed) {
          // 手部推力效果
          [leftHandPos, rightHandPos].forEach((handPos) => {
            if (handPos) {
              const dx = emoji.x - handPos.x;
              const dy = emoji.y - handPos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < HAND_INFLUENCE_RADIUS && distance > 0) {
                const force =
                  (HAND_INFLUENCE_RADIUS - distance) / HAND_INFLUENCE_RADIUS;
                const pushX = (dx / distance) * force * 2;
                const pushY = (dy / distance) * force * 2;

                emoji.vx += pushX;
                emoji.vy += pushY;
              }
            }
          });

          // 重力
          emoji.vy += GRAVITY;

          // 摩擦力
          emoji.vx *= FRICTION;
          emoji.vy *= FRICTION;

          // 更新位置
          emoji.x += emoji.vx;
          emoji.y += emoji.vy;

          // 旋转
          emoji.rotation += emoji.rotationSpeed;
          emoji.rotationSpeed *= 0.99;

          // 边界碰撞
          const halfSize = emoji.size / 2;

          // 左右边界
          if (emoji.x - halfSize < 0) {
            emoji.x = halfSize;
            emoji.vx *= -BOUNCE;
            emoji.rotationSpeed = emoji.vx * 0.02;
          } else if (emoji.x + halfSize > canvas.width) {
            emoji.x = canvas.width - halfSize;
            emoji.vx *= -BOUNCE;
            emoji.rotationSpeed = emoji.vx * 0.02;
          }

          // 上下边界
          if (emoji.y - halfSize < 0) {
            emoji.y = halfSize;
            emoji.vy *= -BOUNCE;
            emoji.rotationSpeed = emoji.vx * 0.02;
          } else if (emoji.y + halfSize > canvas.height) {
            emoji.y = canvas.height - halfSize;
            emoji.vy *= -BOUNCE;
            emoji.rotationSpeed = emoji.vx * 0.02;

            // 地面摩擦
            emoji.vx *= 0.9;
          }
        }

        // 更新上一帧手部位置
        prevHandPositions.current = {
          left: leftHandPos,
          right: rightHandPos,
        };
      });

      // Emoji之间的碰撞检测
      for (let i = 0; i < emojis.length; i++) {
        for (let j = i + 1; j < emojis.length; j++) {
          const e1 = emojis[i];
          const e2 = emojis[j];

          if (e1.isGrabbed || e2.isGrabbed) continue;

          const dx = e2.x - e1.x;
          const dy = e2.y - e1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (e1.size + e2.size) / 2;

          if (distance < minDistance && distance > 0) {
            // 碰撞响应
            const angle = Math.atan2(dy, dx);
            const targetX = e1.x + Math.cos(angle) * minDistance;
            const targetY = e1.y + Math.sin(angle) * minDistance;

            const ax = (targetX - e2.x) * 0.5;
            const ay = (targetY - e2.y) * 0.5;

            e1.vx -= ax;
            e1.vy -= ay;
            e2.vx += ax;
            e2.vy += ay;

            // 添加旋转效果
            e1.rotationSpeed += 0.1;
            e2.rotationSpeed -= 0.1;
          }
        }
      }

      // 绘制所有emoji
      emojis.forEach((emoji) => {
        ctx.save();
        ctx.translate(emoji.x, emoji.y);
        ctx.rotate(emoji.rotation);

        // 绘制阴影
        if (!emoji.isGrabbed) {
          ctx.shadowColor = "rgba(0, 243, 255, 0.5)";
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowColor = "rgba(0, 243, 255, 0.8)";
          ctx.shadowBlur = 30;
        }

        // 绘制emoji
        ctx.font = `${emoji.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji.emoji, 0, 0);

        // 如果被抓取，绘制高亮圈
        if (emoji.isGrabbed) {
          ctx.beginPath();
          ctx.arc(0, 0, emoji.size / 2 + 10, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 243, 255, 0.6)";
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [leftHand, rightHand]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-15"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
