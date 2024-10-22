"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-row flex-wrap justify-around px-20 py-4 bg-[#9CB380] text-[#212919]"
      style={{
        background:
          "linear-gradient(60deg, rgba(133,148,114,1) 35%, rgba(199,172,146,1) 35%), rgb(133,148,114)",
      }}
    >
      <Link href="/">
        <h2>Talethreads</h2>
      </Link>
      <ul className="flex flex-row content-center flex-wrap font-semibold">
        {links.map((item) => (
          <li className="mx-4" key={item.path}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path ? "text-[#effcde] rounded-md" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
