"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-primary/20 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center gap-6">
          {/* Links */}
          <Link
            href="/impressum"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
