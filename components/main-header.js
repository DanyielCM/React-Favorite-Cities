
import Link from 'next/link';
import Image from 'next/image';

import classes from './main-header.module.css';
import logo from '@/assets/icon.png';



export default function MainHeader() {
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
              <Link href='/city-page'>City Page</Link>
            </li>
            <li>
              <Link href='/favorites'>Favorites</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
