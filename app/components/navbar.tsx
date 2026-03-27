"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <div className="container mx-auto flex justify-between h-16 items-center">
      <div>
        <Image
          src="/logo.png"
          alt="Late Night Code logo"
          height={128}
          width={128}
        />
      </div>
      <nav>
        <div>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? " text-white"
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
    </div>
  );
}
