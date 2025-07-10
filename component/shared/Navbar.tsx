
"use client"; // Needed for Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { LibraryBig, Menu, X, Search } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Navbar entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  // Search input click animation
  const handleInputClick = () => {
    if (searchInputRef.current) {
      gsap.to(searchInputRef.current, {
        scale: 1.02,
        boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)",
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
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
      className="w-full bg-white shadow-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center z-50 fixed top-0"
    >
      {/* Logo */}
      <Link href="/" className="text-xl sm:text-2xl font-bold text-violet-600 flex items-center gap-2">
        <LibraryBig className="text-black w-6 h-6 sm:w-8 sm:h-8" />
        <div>
          Campus<span className="text-black">Bondhu</span>
        </div>
      </Link>

      {/* Desktop Links and Search */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        <div className="flex gap-4 xl:gap-6 text-gray-700 font-medium text-sm xl:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative group hover:text-violet-600 transition-colors duration-300"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleInputClick}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-40 xl:w-72 rounded-lg border border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 text-sm active:scale-95"
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </form>
      </div>

      {/* Login Button (Desktop) */}
<div className="hidden lg:block">
  <div className="flex items-center gap-4">
    {/* Render buttons for users who are not signed in */}
    <SignedOut>
      {/* Sign In Button */}
      <SignInButton>
        <Button
          variant={"link"} className="border"
          aria-label="Sign in to your account"
        >
          Sign In
        </Button>
      </SignInButton>

      {/* Sign Up Button */}
      <SignUpButton>
        <Button
          variant={"default"}
          aria-label="Create a new account"
        >
          Sign Up
        </Button>
      </SignUpButton>
    </SignedOut>

    {/* Render user profile button for signed-in users */}
    <SignedIn>
      <UserButton aria-label="User profile and account settings" />
    </SignedIn>
  </div>
</div>

      {/* Mobile Hamburger */}
      <button
        className="lg:hidden text-violet-600 transition-transform duration-300 hover:scale-110"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          ref={menuRef}
          className="absolute top-14 sm:top-16 left-0 w-full bg-white shadow-2xl flex flex-col items-center py-6 sm:py-8 gap-4 sm:gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="w-11/12 sm:w-3/4 relative mb-4">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={handleInputClick}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 text-sm sm:text-base active:scale-95"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>

          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-800 text-base sm:text-lg font-medium hover:text-violet-600 transition-colors duration-300"
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <button className="bg-violet-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-violet-700 transition-transform duration-300 hover:scale-105 text-sm sm:text-base">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}