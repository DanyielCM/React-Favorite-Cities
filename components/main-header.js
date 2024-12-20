import Link from 'next/link';
import Image from 'next/image';

import classes from './main-header.module.css';
import logo from '@/assets/icon.png';
import { auth } from '@/configurations/auth';

export default async function MainHeader() {
  const session = await auth();

  return (
    <>
      <header className={classes.header}>
        <Image
          className={classes.logo}
          src={logo}
          alt='A city'
          priority
        ></Image>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/explore'>Explore</Link>
            </li>
            <li>
              <Link href='/favorites'>Favorites</Link>
            </li>
            <li>
              <Link href='/account'>Account</Link>
            </li>
            <li>
              {session?.user && (
                <div className={classes.imageContainer}>
                  <Image
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    width={50}
                    height={50}
                    className={classes.profileImage}
                  ></Image>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
