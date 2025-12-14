"use client";

interface NextButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export default function NextButton({ onClick, loading = false }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full max-w-md mx-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Lädt...
        </span>
      ) : (
        "Nächster Satz"
      )}
    </button>
  );
}
