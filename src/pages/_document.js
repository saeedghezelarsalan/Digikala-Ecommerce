import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json"/>
      </Head>
      <body dir='rtl' lang='fa' className='overflow-x-hidden'>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}