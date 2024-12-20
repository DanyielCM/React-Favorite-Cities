import { auth, signIn, signOut } from '@/configurations/auth';
import classes from './page.module.css';
import Image from 'next/image';

export default async function Account() {
  const session = await auth();

  async function fetchUserData() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users?email=${encodeURIComponent(
          session?.user?.email
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to get data:', await response.text());
      } else {
        console.log('Data get successfully');
        return response.json();
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  async function saveUserData() {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: session?.user?.name,
          locations: [],
        }),
      });

      if (!response.ok) {
        console.error('Failed to save new user:', await response.text());
      } else {
        console.log('Successfully saved new user');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  if (session?.user) {
    fetchUserData().then((user) => {
      if (user) {
        console.log('User data found:', user);
      } else {
        console.log('No user data found');
        saveUserData();
      }
    });
  }

  return (
    <>
      <div className={classes.container}>
        {!session?.user && (
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <button type='submit' className={classes.google_button}>
              Sign In with Google
            </button>
          </form>
        )}

        {session?.user && (
          <>
            <h1>Logged-In User:</h1>
            <h3>{session?.user?.name}</h3>
            <div className={classes.imageContainer}>
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={80}
                height={80}
                className={classes.profileImage}
              ></Image>
            </div>

            <form
              action={async () => {
                'use server';
                await signOut('google');
              }}
            >
              <button type='submit' className={classes.google_button}>
                Sign Out
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
