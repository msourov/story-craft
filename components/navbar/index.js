"use client";

import { Burger, Drawer } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    label: "Stories",
    path: "/stories",
  },
  {
    label: "Categories",
    path: "/categories",
  },
  {
    label: "About",
    path: "/about",
  },
];

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setDrawerOpened((prev) => !prev);
  };

  return (
    <nav
      className="flex flex-row justify-between sm:justify-around items-center px-6 sm:px-20 py-4 text-white"
      style={{
        background:
          "linear-gradient(60deg, rgba(70, 52, 75,1) 35%, rgba(199,172,146,1) 35%), rgb(133,148,114)",
      }}
    >
      <Link href="/">
        <h2>Storybook</h2>
      </Link>
      <ul className="flex invisible sm:visible flex-row content-center flex-wrap font-semibold">
        {links.map((item) => (
          <li className="mx-4" key={item.path}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path ? "text-[#46344B] rounded-md" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="visible sm:invisible absolute right-2">
        <Burger
          opened={drawerOpened}
          onClick={handleDrawerOpen}
          aria-label="Toggle navigation"
        />
      </div>
      <Drawer
        size="xs"
        opened={drawerOpened}
        onClose={handleDrawerOpen}
        position="right"
      >
        <Link href="/" className="text-center">
          <h3 className="text-[#241E4E] mb-6">Storybook</h3>
        </Link>
        <ul className="flex flex-col content-center gap-2 flex-wrap font-semibold text-[#6E9887]">
          {links.map((item) => (
            <li className="mx-4" key={item.path}>
              <Link
                href={item.path}
                onClick={handleDrawerOpen}
                className={`${
                  pathname === item.path ? "text-[#5D1027] rounded-md" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </nav>
  );
}
