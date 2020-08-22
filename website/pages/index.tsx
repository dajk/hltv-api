import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HLTV API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <a href="https://github.com/dajk/hltv-api">HLTV API!</a>
        </h3>
        <h3>Check following APIs</h3>
        <ul>
          <li>
            <Link href="/api/news">
              <a>News</a>
            </Link>
          </li>
          <li>
            <Link href="/api/results">
              <a>Results</a>
            </Link>
          </li>
          <li>
            <Link href="/api/matches">
              <a>Matches</a>
            </Link>
          </li>
          <li>
            <Link href="/api/matches/2332210/liquid-vs-faze-blast-pro-series-miami-2019">
              <a>Stats by matchId</a>
            </Link>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
