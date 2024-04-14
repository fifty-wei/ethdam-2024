"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { ConnectWallet } from "./connect-wallet";

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <header className="navbar py-4 top-0 left-0 z-50 w-full border-stroke border-b border-muted bg-background text-foreground duration-300">
      <div className="container relative lg:px-10">
        <div className="flex items-center justify-between">
          <div className="block py-4 lg:py-0">
            <Link href="/" className="block max-w-[145px] sm:max-w-[180px]">
              <Logo width={40} height={40} />
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
            aria-label="navbarOpen"
            name="navbarOpen"
          >
            <span className="block h-[2px] w-7 bg-foreground "></span>
            <span className="block h-[2px] w-7 bg-foreground "></span>
            <span className="block h-[2px] w-7 bg-foreground "></span>
          </button>

          <div
            className={`menu-wrapper relative ${
              isOpen ? "" : "hidden"
            } justify-between lg:flex`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
              name="navbarClose"
              aria-label="navbarClose"
            >
              <span className="block h-[2px] w-7 rotate-45 bg-foreground "></span>
              <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-foreground "></span>
            </button>

            <nav className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-background bg-opacity-95 text-center backdrop-blur-sm lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none ">
              <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-4">
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-foreground"
                  >
                    <Link onClick={() => setIsOpen(false)} href="#features">
                      Features
                    </Link>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-foreground"
                  >
                    <Link onClick={() => setIsOpen(false)} href="#bounties">
                      Bounties
                    </Link>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-foreground"
                  >
                    <Link onClick={() => setIsOpen(false)} href="#dashboard">
                      Dashboard
                    </Link>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-foreground"
                  >
                    <Link onClick={() => setIsOpen(false)} href="#contact">
                      Contact
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mr-8 flex items-center justify-end lg:mr-0 ">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </header>
  );
}
