"use client"; // Needed if you're using Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar entrance
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

    if (!menuOpen) {
      // Animate menu in
      gsap.fromTo(
        menuRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.1,
        }
      );
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Colleges", href: "/colleges" },
    { label: "Admission", href: "/admission" },
    { label: "My College", href: "/myCollege" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <nav
      ref={navRef}
      className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50 relative"
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-violet-600">
        CampusBondhu
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="hover:text-violet-600 transition">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Login Button */}
      <div className="hidden md:block">
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition">
          Login
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-violet-600"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-4 z-40"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-800 text-lg hover:text-violet-600 transition"
              ref={(el) => { menuItemsRef.current[index] = el; }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition mt-4">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
