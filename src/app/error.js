'use client'
import Link from 'next/link';
import Head from 'next/head';
import './globals.scss'

export default function Custom404({statusCode}) {
  return (
    <>
      <Head>
        <title>{statusCode}- Page Not Found</title>
      </Head>
      <div className="error-page">
        <div className="error-container">
          <h1>{statusCode}</h1>
          <p>Oops! Something went wrong.</p>
          <Link href="/">
            <button className="back-btn">Return to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
