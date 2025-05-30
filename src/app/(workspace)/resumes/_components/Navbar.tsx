"use client";

import logo from "@/assets/logo.png";
import { ModeToggle } from "@/components/theme-toggle";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-2xl font-bold tracking-tight">
            Resumateer
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="How it works"
                labelIcon={<CreditCard className="size-4" />}
                href="/blog/resume"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
