"use client";

import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/local-storage";

interface FavoriteButtonProps {
  vocabId: string;
}

export default function FavoriteButton({ vocabId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(vocabId));
  }, [vocabId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(vocabId);
      setFavorite(false);
    } else {
      addFavorite(vocabId);
      setFavorite(true);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-3 rounded-full hover:bg-secondary/10 transition-all duration-300 group"
      aria-label={favorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 transition-all duration-300 ${
          favorite
            ? "text-secondary fill-secondary"
            : "text-gray-400 group-hover:text-secondary"
        }`}
        fill={favorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
