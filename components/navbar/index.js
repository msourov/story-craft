import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row content-center flex-wrap justify-between px-20 py-4 bg-zinc-300">
      <Link href="/">
        <h2>Talethreads</h2>
      </Link>
      <ul className="flex flex-row content-center flex-wrap">
        <li className="mx-4">
          <Link href="/stories">All Stories</Link>
        </li>
        <li className="mx-4">
          <Link href="/categories">Categories</Link>
        </li>
        <li className="mx-4">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
