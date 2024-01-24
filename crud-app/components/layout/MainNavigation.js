import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  // obtain session info to determine which links to display in nav bar
  const [session, loading] = useSession();

  // Sign user out if "Logout" button is clicked
  function logoutHandler() {
    signOut();
  }

  // return navbar, using session and loading vars to control available options
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Item Catalog</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Items</Link>
          </li>
          {session && (
            <li>
              <Link href="/manager-inventory">My Inventory</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/new-item">New Item</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
