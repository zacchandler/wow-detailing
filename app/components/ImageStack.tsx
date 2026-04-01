"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface StackImage {
  src: string;
  alt: string;
}

const IMAGES: StackImage[] = [
  {
    src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85&fit=crop",
    alt: "Ceramic coating finish",
  },
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=85&fit=crop",
    alt: "Premium interior detailing",
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&fit=crop",
    alt: "Luxury car exterior detail",
  },
];

const SWITCH_COOLDOWN = 250; // ms before allowing another card switch

export default function ImageStack() {
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const [mounted, setMounted] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSwitchTime = useRef(0);

  useEffect(() => setMounted(true), []);

  const scheduleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setIsHovering(false);
      setActiveIndex(2);
    }, 100);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const handleCardEnter = useCallback(
    (index: number) => {
      cancelLeave();
      const now = Date.now();

      if (!isHovering) {
        // First entry — no cooldown
        setIsHovering(true);
        setActiveIndex(index);
        lastSwitchTime.current = now;
      } else if (now - lastSwitchTime.current > SWITCH_COOLDOWN) {
        // Switching cards — only if cooldown elapsed
        setActiveIndex(index);
        lastSwitchTime.current = now;
      }
    },
    [cancelLeave, isHovering]
  );

  const handleCardLeave = useCallback(() => {
    scheduleLeave();
  }, [scheduleLeave]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  if (!mounted) return null;

  const getSlot = (i: number) => {
    if (i === activeIndex) return 2;
    const others = [0, 1, 2].filter((x) => x !== activeIndex);
    return others.indexOf(i);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "12%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(360px, 30vw)",
          height: "min(400px, 33vw)",
          minWidth: "260px",
          minHeight: "280px",
        }}
      >
        {/* Hover prompt */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            opacity: isHovering ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Hover to explore
          </span>
        </div>

        {IMAGES.map((image, index) => {
          const slot = getSlot(index);

          let tx = "0px";
          let ry = "0deg";
          let sc = "1";
          let op = index === activeIndex ? 1 : 0;
          let z = slot;
          let shadow = "0 15px 40px rgba(0,0,0,0.4)";

          if (isHovering) {
            op = 1;
            if (slot === 2) {
              ry = "30deg";
              tx = "60px";
              sc = "1";
              z = 30;
              shadow = "0 30px 70px rgba(0,0,0,0.6), 0 0 25px rgba(247,179,43,0.06)";
            } else if (slot === 1) {
              ry = "20deg";
              tx = "-50px";
              sc = "0.93";
              z = 20;
              shadow = "0 20px 50px rgba(0,0,0,0.5)";
            } else {
              ry = "12deg";
              tx = "-150px";
              sc = "0.86";
              op = 0.85;
              z = 10;
              shadow = "0 15px 40px rgba(0,0,0,0.5)";
            }
          }

          return (
            /* Outer: visual card with transforms */
            <div
              key={index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transformOrigin: "right center",
                transform: `perspective(1400px) rotateY(${ry}) translateX(${tx}) scale(${sc})`,
                opacity: op,
                zIndex: z,
                pointerEvents: "none",
                boxShadow: shadow,
                transition:
                  "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), " +
                  "opacity 0.5s ease, " +
                  "box-shadow 0.5s ease",
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  border:
                    isHovering && index === activeIndex
                      ? "1.5px solid rgba(247,179,43,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                  pointerEvents: "none",
                  transition: "border 0.4s ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              {isHovering && index === activeIndex && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {image.alt}
                  </span>
                </div>
              )}

              {/* Inset hitbox — smaller than the visual card by 12px on each side */}
              <div
                onMouseEnter={() => handleCardEnter(index)}
                onMouseLeave={handleCardLeave}
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  right: "12px",
                  bottom: "12px",
                  pointerEvents:
                    isHovering || index === activeIndex ? "auto" : "none",
                  zIndex: 50,
                  cursor: "pointer",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
