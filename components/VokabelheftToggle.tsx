"use client";

interface VokabelheftToggleProps {
  hideGerman: boolean;
  hideSpanish: boolean;
  onToggleGerman: () => void;
  onToggleSpanish: () => void;
}

export default function VokabelheftToggle({
  hideGerman,
  hideSpanish,
  onToggleGerman,
  onToggleSpanish,
}: VokabelheftToggleProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <button
        onClick={onToggleGerman}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          hideGerman
            ? "bg-primary text-white shadow-lg"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
      >
        {hideGerman ? "Deutsch anzeigen" : "Deutsch verbergen"}
      </button>

      <button
        onClick={onToggleSpanish}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          hideSpanish
            ? "bg-primary text-white shadow-lg"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
      >
        {hideSpanish ? "Spanisch anzeigen" : "Spanisch verbergen"}
      </button>
    </div>
  );
}
