"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  IoCartOutline,
  IoLogIn,
  IoPersonAdd,
  IoMenu,
  IoClose,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import { authClient } from "@/lib/auth-client";
import { UserUpdate } from "./UserUpdate";
import Image from "next/image";

/* ================= LOGO ================= */

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden">
      <Image src="/favicon.png" alt="logo" fill sizes="40px" className="object-cover" />
    </div>

    <h1 className="font-black text-xl md:text-2xl">
      <span className="gradient-text">Qurbani</span>
      <span className="text-orange-500">Hut</span>
    </h1>
  </div>
);

/* ================= CUSTOM DROPDOWN ================= */

const CustomDropdown = ({ user, onLogout, onSettings, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="outline-none cursor-pointer rounded-full hover:ring-2 hover:ring-blue-500/50 transition-all focus:ring-2 focus:ring-blue-500"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 animate-[fadeIn_0.2s_ease]">
          {/* User Info Header */}
          <div className="px-5 py-4 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
            <div className="flex items-center gap-3">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/my-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                <IoPersonCircleOutline className="size-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">
                  My Profile
                </p>
                <p className="text-xs text-neutral-400">View your profile</p>
              </div>
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                onSettings();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm">
                <IoSettingsOutline className="size-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-800 group-hover:text-orange-600 transition-colors">
                  Settings
                </p>
                <p className="text-xs text-neutral-400">Update your profile</p>
              </div>
            </button>

            <div className="h-px bg-neutral-100 my-1"></div>

            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
                <IoLogOutOutline className="size-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-red-600 group-hover:text-red-700 transition-colors">
                  Log Out
                </p>
                <p className="text-xs text-red-400">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= NAVBAR ================= */

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUserUpdateOpen, setIsUserUpdateOpen] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Animals", href: "/animals" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* NAV TOP */}
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* LOGO */}
          <Link href="/">
            <Logo />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl font-semibold transition
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* CART */}
            <button className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all">
              <IoCartOutline size={22} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* ===== USER AREA ===== */}
            {user ? (
              <CustomDropdown
                user={user}
                onLogout={handleLogout}
                onSettings={() => setIsUserUpdateOpen(true)}
              />
            ) : (
              <div className="hidden md:flex gap-3 items-center">
                <Link
                  href="/login"
                  className="btn-secondary flex items-center gap-2 px-5 py-2"
                >
                  <IoLogIn size={18} />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary flex items-center gap-2 px-5 py-2"
                >
                  <IoPersonAdd size={18} />
                  Register
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 bg-white border-t space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-center font-semibold py-3 rounded-xl hover:bg-neutral-100"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3 px-2">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-neutral-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/my-profile"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary text-center py-3"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsUserUpdateOpen(true);
                }}
                className="btn-secondary text-center py-3"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="btn-primary bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-center py-3"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/login"
                className="btn-secondary text-center py-3"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-primary text-center py-3"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <UserUpdate
        isOpen={isUserUpdateOpen}
        onOpenChange={setIsUserUpdateOpen}
        customTrigger={<button className="hidden" />}
      />
    </header>
  );
};

export default NavBar;