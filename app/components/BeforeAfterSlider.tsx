"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

function isRealImage(src: string): boolean {
  return src.startsWith("/") || src.startsWith("http");
}

function PlaceholderBefore({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
      <span className="font-poppins text-2xl font-bold text-white/60 select-none">
        {text}
      </span>
    </div>
  );
}

function PlaceholderAfter({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-blue-950 flex items-center justify-center overflow-hidden">
      {/* Gold shimmer overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, #F7B32B 45%, #F7B32B 55%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
      <span className="font-poppins text-2xl font-bold text-white/60 select-none relative z-10">
        {text}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 200%;
          }
          100% {
            background-position: -200% -200%;
          }
        }
      `}</style>
    </div>
  );
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const rafId = useRef<number | null>(null);
  const pendingPos = useRef<number | null>(null);

  const MIN = 5;
  const MAX = 95;

  const clamp = (val: number) => Math.min(MAX, Math.max(MIN, val));

  const getPosition = useCallback(
    (clientX: number): number => {
      const container = containerRef.current;
      if (!container) return 50;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      return clamp((x / rect.width) * 100);
    },
    []
  );

  const flushPosition = useCallback(() => {
    if (pendingPos.current !== null) {
      setSliderPos(pendingPos.current);
      pendingPos.current = null;
    }
    rafId.current = null;
  }, []);

  const scheduleUpdate = useCallback(
    (pos: number) => {
      pendingPos.current = pos;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(flushPosition);
      }
    },
    [flushPosition]
  );

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      scheduleUpdate(getPosition(e.clientX));
    },
    [getPosition, scheduleUpdate]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      scheduleUpdate(getPosition(e.clientX));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [getPosition, scheduleUpdate]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      scheduleUpdate(getPosition(e.touches[0].clientX));
    },
    [getPosition, scheduleUpdate]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      scheduleUpdate(getPosition(e.touches[0].clientX));
    },
    [getPosition, scheduleUpdate]
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard support for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSliderPos((prev) => clamp(prev - step));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSliderPos((prev) => clamp(prev + step));
      }
    },
    []
  );

  const useRealBefore = isRealImage(beforeSrc);
  const useRealAfter = isRealImage(afterSrc);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none ${
        isDragging.current ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="group"
      aria-label="Before and after image comparison"
    >
      {/* After layer (full width, behind) */}
      <div className="absolute inset-0">
        {useRealAfter ? (
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        ) : (
          <PlaceholderAfter text={afterAlt} />
        )}
      </div>

      {/* Before layer (clipped to slider position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        {useRealBefore ? (
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        ) : (
          <PlaceholderBefore text={beforeAlt} />
        )}
      </div>

      {/* Bottom gradient overlay for labels */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Before label */}
      <span
        className="absolute bottom-4 left-5 font-poppins font-bold text-xs uppercase tracking-widest text-white/90 pointer-events-none"
        style={{
          opacity: sliderPos > 12 ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        Before
      </span>

      {/* After label */}
      <span
        className="absolute bottom-4 right-5 font-poppins font-bold text-xs uppercase tracking-widest text-white/90 pointer-events-none"
        style={{
          opacity: sliderPos < 88 ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        After
      </span>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Vertical line */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: "2px",
            background: "#F7B32B",
            boxShadow: "0 0 8px rgba(247, 179, 43, 0.5)",
          }}
        />

        {/* Circle handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto"
          style={{
            background: "#F7B32B",
            boxShadow:
              "0 0 16px rgba(247, 179, 43, 0.45), 0 2px 8px rgba(0,0,0,0.3)",
          }}
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <ArrowLeftRight className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
