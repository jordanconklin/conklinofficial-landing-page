import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  console.log("App loaded")
  return <Component {...pageProps} />
}

export default MyApp
