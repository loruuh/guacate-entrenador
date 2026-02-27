'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export function NavIcon({ href, label, children }: NavIconProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-label={label}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 overflow-visible
        ${isActive
          ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 animate-bounce-slow'
          : 'bg-white/5 border-2 border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/20'
        }
      `}
    >
      {/* Icon */}
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {children}
      </span>

      {/* Glow overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tooltip */}
      <div className="absolute top-full mt-2 px-2.5 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700 hidden sm:block z-50">
        {label}
      </div>

      {/* Active dot indicator */}
      {isActive && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}
