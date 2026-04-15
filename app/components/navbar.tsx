"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "https://midnight-code.tech/" },
  { name: "Projects", href: "https://midnight-code.tech/projects" },
  { name: "Blog", href: "https://late-night-code.midnight-code.tech/" },
  { name: "About", href: "https://midnight-code.tech/minuit-spence" },
  { name: "Contact", href: "https://midnight-code.tech/contact" },
];

const classNames = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black sticky top-0 z-50">
      <div className="container mx-auto flex justify-between h-16 items-center px-5">
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="Late Night Code logo"
            height={128}
            width={128}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger button */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-300 hover:text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile/tablet dropdown */}
      {menuOpen && (
        <nav className="lg:hidden bg-black border-t border-white/10 px-5 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={classNames(
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
