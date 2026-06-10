"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoCartOutline,
  IoLogIn,
  IoPersonAdd,
  IoMenu,
  IoClose,
} from "react-icons/io5";

import { Avatar, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { UserUpdate } from "./UserUpdate";
import Image from "next/image";

/* ================= LOGO ================= */

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden">
      <Image src="/favicon.png" alt="logo" fill className="object-cover" />
    </div>

    <h1 className="font-black text-xl md:text-2xl">
      <span className="gradient-text">Qurbani</span>
      <span className="text-orange-500">Hut</span>
    </h1>
  </div>
);

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
                  ${active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-neutral-100"
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
            <button className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white">
              <IoCartOutline size={22} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* ===== USER AREA ===== */}
            {user ? (
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  <button className="outline-none cursor-pointer rounded-full hover:ring-2 hover:ring-blue-500/50 transition-all">
                    <Avatar className="cursor-pointer">
                      <Avatar.Image
                        referrerPolicy="no-referrer"
                        src={user?.image}
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                  </button>
                </Dropdown.Trigger>

                <Dropdown.Popover className="rounded-2xl mt-3 p-2 min-w-[220px] shadow-2xl border border-neutral-100">
                  <Dropdown.Menu className="space-y-1">
                    {/* User Info Header */}
                    <div className="px-3 py-3 mb-1 border-b border-neutral-100">
                      <p className="text-sm font-bold text-neutral-900 truncate">{user?.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>

                    <Dropdown.Item id="profile">
                      <Link href="/my-profile" className="flex items-center justify-between w-full px-1 py-1.5 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <Person className="size-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900">My Profile</span>
                        </div>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="settings"
                      onAction={() => setIsUserUpdateOpen(true)}
                    >
                      <div className="flex items-center justify-between w-full px-1 py-1.5 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                            <Gear className="size-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900">Settings</span>
                        </div>
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      variant="danger"
                      onAction={async () => {
                        await authClient.signOut();
                        router.push("/login");
                        window.location.reload();
                      }}
                    >
                      <div className="flex items-center justify-between w-full px-1 py-1.5 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <ArrowRightFromSquare className="size-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-red-500 group-hover:text-red-600">Log Out</span>
                        </div>
                      </div>
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              /* ===== LOGIN REGISTER DESKTOP ===== */
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
        className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px]" : "max-h-0"
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

          {/* MOBILE LOGIN REGISTER */}
          {!user && (
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