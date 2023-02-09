import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { data: session, status } = useSession();

  return (
    <div className="container">
      <nav className="navigation">
        <div className="navigation navigation__links">
          <Link href="/expense">Expense Tracker</Link>
          <Link href="/todo">Todo List</Link>
          <Link href="/notes">Personal Notes</Link>
          <Link href="/password">Password Manager</Link>
          <Link href="/converter">Youtube Downloader</Link>
          <Link href="/converter">Universal Unit Converter</Link>
          <Link href="/calculator">Calculator</Link>
        </div>
        {status !== "authenticated" && (
          <Link href="/" className="navigation navigation__button">
            Login
          </Link>
        )}
        {status === "authenticated" && (
          <button
            className="navigation navigation__button login__logout"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}
