import Head from 'next/head';
import { ChangeEvent, MouseEvent } from 'react';
import Responsive from '../components/common/Responsive';

type RandomViewProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
  reset: (e: MouseEvent<HTMLButtonElement>) => void,
  data: {min: number, max: number, random: number | null, pop: number[]}
}

export default function RandomView({ 
  onChange, 
  onClick, 
  reset, 
  data 
}: RandomViewProps) {
  const { min, max, random, pop } = data;
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>랜덤숫자뽑기</title>
      </Head>
      <Responsive>
        <h1>랜덤 숫자 뽑기</h1>
        <div>
          최소 :{' '}
          <input
            type="number"
            className="min"
            value={min}
            onChange={onChange}
          />
        </div>
        <div>
          최대 :{' '}
          <input
            type="number"
            className="max"
            value={max}
            onChange={onChange}
          />
        </div>
        <button onClick={onClick}>뽑기</button>
        <button onClick={reset}>초기화</button>
        <br />
        <div>숫자 : {random ? random : '없음'}</div>
        <div>
          이전에 뽑은 숫자:{' '}
          {pop === [] ? '' : pop.map((num, i) => <span key={i}>{num} </span>)}
        </div>
        <br />
        <br />
      </Responsive>
    </div>
  );
}