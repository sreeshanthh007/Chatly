import { motion } from "framer-motion";
import { useMemo } from "react";

interface SuccessAnimationProps {
  title?: string;
  subtitle?: string;
}

export function SuccessAnimation({
  title = "Verification Successful!",
  subtitle = "Taking you to sign in...",
}: SuccessAnimationProps) {
  // Generate random particle coordinates once upon mount
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * 20 * Math.PI) / 180 + (Math.random() - 0.5) * 0.15;
      const distance = 45 + Math.random() * 55;
      const xVal = Math.cos(angle) * distance;
      const yVal = Math.sin(angle) * distance;
      const size = 3 + Math.random() * 5;
      const delay = Math.random() * 0.12;

      // Color scheme: golds, light creams, and warm text tones
      const colors = ["#D4A84B", "#F0C060", "#A89880", "#F5F0E8", "#E6BA5E"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return { xVal, yVal, size, delay, color };
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      {/* Animation Container */}
      <div className="relative h-20 w-20 flex items-center justify-center mb-6">
        {/* Animated Checkmark Wrapper */}
        <motion.div
          initial={{ backgroundColor: "rgba(212, 168, 75, 0)", scale: 1 }}
          animate={{ backgroundColor: "#D4A84B", scale: [1, 1.12, 1] }}
          transition={{
            backgroundColor: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
            scale: { delay: 0.9, duration: 0.3, ease: "easeInOut" },
          }}
          className="z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 border-accent relative"
        >
          {/* Inner draw SVG */}
          <svg
            className="w-8 h-8 text-background absolute"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
          >
            <motion.path
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l7 7 16-16"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.8, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Confetti Particles */}
        {particles.map((p, idx) => (
          <motion.span
            key={idx}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: p.xVal, y: p.yVal, scale: 0, opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: p.delay,
              ease: [0.1, 0.8, 0.3, 1], // Clean ease-out
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: "50%",
              top: "50%",
              marginLeft: `-${p.size / 2}px`,
              marginTop: `-${p.size / 2}px`,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Texts */}
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl font-semibold tracking-wide text-text-primary mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="text-xs text-text-secondary leading-relaxed px-4 max-w-[280px]"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
