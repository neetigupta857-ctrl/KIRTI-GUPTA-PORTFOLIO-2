"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  tooltipPosition = "bottom",
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: (e: React.MouseEvent) => void }[];
  desktopClassName?: string;
  mobileClassName?: string;
  tooltipPosition?: "top" | "bottom";
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} tooltipPosition={tooltipPosition} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: (e: React.MouseEvent) => void }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) item.onClick(e);
                  }}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 border border-white/10 text-white backdrop-blur-md"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 border border-white/10 text-white backdrop-blur-md"
      >
        <Menu className="h-5 w-5 text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  tooltipPosition = "bottom",
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: (e: React.MouseEvent) => void }[];
  className?: string;
  tooltipPosition?: "top" | "bottom";
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-neutral-900/90 border border-white/10 px-4 pb-3 md:flex backdrop-blur-md shadow-2xl relative z-50",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} tooltipPosition={tooltipPosition} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  tooltipPosition = "bottom",
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  tooltipPosition?: "top" | "bottom";
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const isTop = tooltipPosition === "bottom";

  return (
    <a href={href} onClick={onClick} className="relative z-50">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={
                isTop
                  ? { opacity: 0, y: -8, x: "-50%" }
                  : { opacity: 0, y: 8, x: "-50%" }
              }
              animate={
                isTop
                  ? { opacity: 1, y: 0, x: "-50%" }
                  : { opacity: 1, y: 0, x: "-50%" }
              }
              exit={
                isTop
                  ? { opacity: 0, y: -4, x: "-50%" }
                  : { opacity: 0, y: 4, x: "-50%" }
              }
              className={cn(
                "absolute left-1/2 w-fit rounded-lg border border-emerald-500/40 bg-[#0B0D0D] px-3 py-1 text-xs font-semibold whitespace-pre text-white shadow-2xl shadow-emerald-500/10 z-50 pointer-events-none",
                isTop ? "top-full mt-3" : "-top-10"
              )}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-neutral-300"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
