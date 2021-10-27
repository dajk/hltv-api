import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HLTV API</title>
        <link rel="icon" href="/hltv.svg" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <a href="https://github.com/dajk/hltv-api">hltv-api</a>
        </h3>
        <h3>An unofficial JSON api for popular CS:GO website hltv.org.</h3>
        <ul className={styles.list}>
          <h4>Available methods (JSON Examples):</h4>
          <li>
            <Link href="/api/news.json">
              <a>News</a>
            </Link>
          </li>
          <li>
            <Link href="/api/results.json">
              <a>Results</a>
            </Link>
          </li>
          <li>
            <Link href="/api/matches.json">
              <a>Matches</a>
            </Link>
          </li>
          <li>
            <Link href="/api/liquid-vs-faze-blast-pro-series-miami-2019.json">
              <a>Stats (by match id)</a>
            </Link>
          </li>
          <li>
            <Link href="/api/players.json">
              <a>Players</a>
            </Link>
          </li>
          <li>
            <Link href="/api/player.json">
              <a>Player (by id)</a>
            </Link>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.radovanhajdukovic.com/" target="_blank" rel="noopener noreferrer">
          Built by{' '}
          <img
            src="https://www.radovanhajdukovic.com/logo.svg"
            alt="Radovan Hajdukovic logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  )
}
