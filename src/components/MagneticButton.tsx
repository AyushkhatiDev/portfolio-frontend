import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    // GPU transform WITHOUT triggering React updates
    el.style.transform = `translate(${offsetX * 0.25}px, ${offsetY * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0, 0)`;
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </div>
  );
};
