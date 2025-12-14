"use client";

interface WordTooltipProps {
  word: string;
  translation: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function WordTooltip({
  word,
  translation,
  position,
  onClose,
}: WordTooltipProps) {
  return (
    <div
      className="fixed z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-xl border border-primary/30 animate-fadeIn"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 60}px`,
        transform: "translateX(-50%)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full text-white flex items-center justify-center hover:bg-primary-dark transition-colors text-xs"
        aria-label="Schließen"
      >
        ✕
      </button>
      <div className="text-sm whitespace-nowrap">
        <span className="font-semibold text-primary">{word}</span>
        {" = "}
        <span>{translation}</span>
      </div>
    </div>
  );
}
