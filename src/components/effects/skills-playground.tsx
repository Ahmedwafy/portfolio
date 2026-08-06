"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "@/components/theme/theme-provider";

const PALETTES = {
  light: [
    { fill: "#E0EBFB", text: "#2268C3" },
    { fill: "#E4E5FB", text: "#2426A8" },
    { fill: "#F7ECDE", text: "#9E6D2E" },
  ],
  dark: [
    { fill: "#16263B", text: "#5194EC" },
    { fill: "#1A1B3D", text: "#7476E7" },
    { fill: "#32281A", text: "#DBA257" },
  ],
};

export function SkillsPlayground({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia only exists client-side after mount
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cleanup = () => {};

    try {
      const palette = PALETTES[theme];
      const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } =
        Matter;

      const engine = Engine.create();
      engine.gravity.y = 0.6;

      let width = container.clientWidth;
      let height = container.clientHeight;

      function sizeCanvas() {
        canvas!.width = width;
        canvas!.height = height;
        canvas!.style.width = `${width}px`;
        canvas!.style.height = `${height}px`;
      }
      sizeCanvas();

      // Floor + side walls only — no ceiling, so tags fall freely from
      // their spawn point above the visible area with no risk of
      // colliding with a wall right at spawn.
      const wallOptions = { isStatic: true, render: { visible: false } };
      const walls = [
        Bodies.rectangle(width / 2, height + 20, width + 40, 40, wallOptions),
        Bodies.rectangle(-20, height / 2, 40, height + 400, wallOptions),
        Bodies.rectangle(width + 20, height / 2, 40, height + 400, wallOptions),
      ];
      World.add(engine.world, walls);

      ctx.font = "600 13px 'Plus Jakarta Sans', ui-sans-serif, sans-serif";
      const tags = skills.map((label, i) => {
        const textWidth = ctx.measureText(label).width;
        const padX = 20;
        const w = textWidth + padX * 2;
        const h = 38;
        const x = 40 + Math.random() * Math.max(width - 80, 40);
        const y = -200 - i * 90;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.4,
          friction: 0.15,
          frictionAir: 0.02,
          angle: (Math.random() - 0.5) * 0.6,
        });
        return {
          body,
          label,
          w,
          h,
          color: palette[i % palette.length],
        };
      });
      World.add(
        engine.world,
        tags.map((t) => t.body)
      );

      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);

      const runner = Runner.create();
      Runner.run(runner, engine);

      let raf: number;
      function render() {
        ctx!.clearRect(0, 0, width, height);
        for (const tag of tags) {
          const { x, y } = tag.body.position;
          const angle = tag.body.angle;
          ctx!.save();
          ctx!.translate(x, y);
          ctx!.rotate(angle);
          ctx!.fillStyle = tag.color.fill;
          roundRect(ctx!, -tag.w / 2, -tag.h / 2, tag.w, tag.h, tag.h / 2);
          ctx!.fill();
          ctx!.fillStyle = tag.color.text;
          ctx!.font = "600 13px 'Plus Jakarta Sans', ui-sans-serif, sans-serif";
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.fillText(tag.label, 0, 1);
          ctx!.restore();
        }
        raf = requestAnimationFrame(render);
      }
      render();

      function handleResize() {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        Body.translate(walls[0], { x: 0, y: newHeight - height });
        Body.translate(walls[2], { x: newWidth - width, y: 0 });
        width = newWidth;
        height = newHeight;
        sizeCanvas();
      }
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(raf);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    } catch (err) {
      console.error("SkillsPlayground: physics setup failed", err);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reporting an external library failure, not a render-derived value
      setFailed(true);
    }

    return () => cleanup();
  }, [theme, skills, reducedMotion]);

  if (reducedMotion || failed) {
    return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => {
          const palette = PALETTES.light;
          const color = palette[i % palette.length];
          return (
            <span
              key={skill}
              style={{ background: color.fill, color: color.text }}
              className="rounded-full px-4 py-2 text-sm font-semibold"
            >
              {skill}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[280px] w-full touch-none overflow-hidden rounded-3xl border border-border bg-bg-panel/50"
    >
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
