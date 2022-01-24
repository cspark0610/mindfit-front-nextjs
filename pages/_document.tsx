// main tools
import Document, { Html, Head, Main, NextScript } from 'next/document'

// types
import { DocumentContext, DocumentInitialProps } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps = async (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/assets/icon/MINDFIT-ICON.svg' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
