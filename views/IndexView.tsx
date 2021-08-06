import Head from 'next/head'

import Responsive from '../components/common/Responsive'

export default function IndexView() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>ㅇㅉ</title>
      </Head>
      <Responsive>
        <h1>으쯔라구요</h1>
        <p>대충 만든 사이트임 ㅋㅋ</p>
      </Responsive>
    </div>
  );
}
