import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data, status } = useSession();

  if (status === "authenticated") {
    console.log(data);
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          {/* <Link href="/photos"> */}
          {/* 링크에 변수보내는법 */}
          {/* <Link href={{ pathname: '/photos', query: { keyword: 'querytest' } }}> */}
          {/* 이거는 뒤에 query 쪽이 감춰진다. */}
          <Link href="/photos?title=testtest" as="/photos">
            <a>Photos</a>
          </Link>
        </li>
        <li>
          {status === "authenticated" ? (
            <div>
              <a onClick={() => signOut()}>signout</a>
            </div>
          ) : (
            <div className={navStyles.signinup}>
              <Link href="/api/auth/signin">
                <a className="py-5 px-3">signin</a>
              </Link>
              <Link href="/signup">
                <a className="py-5 px-3">signup</a>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
