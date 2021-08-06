import Head from 'next/head';
import { ChangeEvent, MouseEvent, MutableRefObject } from 'react';

import Responsive from '../components/common/Responsive';
import styles from './MessageView.module.scss';

type MessageViewProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  refetch: () => void;
  messages: Message[];
  body: string;
  error: string;
  messagesRef: MutableRefObject<any>;
  loggedin: boolean;
  onClickDelete: (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    nickname: string
  ) => Promise<void>;
  isMine: (nickname: string) => boolean;
};

export default function MessageView({
  onChange,
  onClick,
  refetch,
  messages,
  body,
  error,
  messagesRef,
  loggedin,
  onClickDelete,
  isMine,
}: MessageViewProps) {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>심플 방명록</title>
      </Head>
      <Responsive>
        <h1 className={styles.h1}>심플 방명록</h1>
        <div className={styles.write}>
          <span>실시간은 귀찮으니 알아서 새로고침 ㄱ</span>
          <button className={styles.confirm} onClick={refetch}>
            새로고침
          </button>
        </div>
        <br />
        <div className={styles.square} ref={messagesRef}>
          {messages?.map((msg, i) => (
            <div key={i} className={styles.space}>
              <span>
                <span
                  key={msg._id}
                  className={`${styles.message} ${styles[msg.color]}`}
                >
                  {msg.nickname}
                </span>
                : {msg.body}
              </span>
              {isMine(msg.nickname) ? (
                <button
                  name={msg.nickname}
                  className={styles.delete}
                  onClick={(e) => {
                    onClickDelete(e, msg._id, msg.nickname);
                  }}
                >
                  X
                </button>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <div className={styles.write}>
          <input
            type="text"
            placeholder="글 쓰기"
            className={styles.input}
            name="body"
            value={body}
            onChange={onChange}
          />
          <button
            className={styles.confirm}
            onClick={onClick}
            disabled={!loggedin}
          >
            확인
          </button>
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      </Responsive>
    </div>
  );
}
