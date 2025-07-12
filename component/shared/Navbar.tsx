"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { LibraryBig, Menu, X, Search } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
      setSearchQuery(""); // optional
    }
  };

  const handleSearchs = (value: string) => {
    setSearchQuery(value);
    router.push(`/colleges?search=${encodeURIComponent(value)}`);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Colleges", href: "/colleges" },
    { label: "Admission", href: "/admission" },
    { label: "My College", href: "/myCollege" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Add College", href: "/addColleges" },
  ];

  return (
    <nav
      ref={navRef}
      className="w-full bg-white shadow-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center z-50 fixed top-0 bg-opacity-90 backdrop-blur-md "
    >
      <Link
        href="/"
        className="text-xl sm:text-2xl font-bold text-violet-600 flex items-center gap-2"
      >
        <LibraryBig className="text-black w-6 h-6 sm:w-8 sm:h-8" />
        <div>
          Campus<span className="text-black">Bondhu</span>
        </div>
      </Link>

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
          <Input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchs(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-40 xl:w-72 rounded-lg border-1  text-sm "
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"
            size={18}
          />
        </form>
      </div>

      {/* Login */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant={"link"} className="border">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={"default"}>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button className="lg:hidden text-violet-600" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          ref={menuRef}
          className="absolute top-14 sm:top-16 left-0 w-full bg-white shadow-2xl flex flex-col items-center py-6 sm:py-8 gap-4 sm:gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
          <Input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchs(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2  xl:w-72 rounded-lg border-1  text-sm w-full "
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"
            size={18}
          />
        </form>

          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-800 text-base sm:text-lg font-medium hover:text-violet-600"
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
