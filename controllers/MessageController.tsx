import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MessageView from '../views/MessageView';
import userContext from '../contexts/userContext';
import { useAxiosAuto, useAxiosExec } from '../lib/hooks/useAxios';

export default function MessageController() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const { user } = useContext(userContext);
  const [error, setError] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const {
    data: getData,
    error: messageError,
    loading: getLoading,
    refetch,
  } = useAxiosAuto<Message[]>({
    url: '/api/msg',
    method: 'get',
  });
  const {
    error: postError,
    data: postData,
    exec: postExec,
  } = useAxiosExec<{
    success: boolean;
  }>({ url: '/api/msg', method: 'post' });
  const {
    error: deleteError,
    data: deleteData,
    exec: deleteExec,
  } = useAxiosExec<{ success: boolean }>({ url: '/api/msg', method: 'delete' });

  const messagesRef = useRef<HTMLDivElement>(null);

  let colors = [
    'red',
    'blue',
    'green',
    'pink',
    'orange',
    'magenta',
    'skyblue',
    'gray',
  ];

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    //로그인 확인
    if (user?.nickname) {
      setLoggedin(true);
      setError('');
    } else {
      setLoggedin(false);
      setError('로그인이 필요합니다.');
    }
  }, [user]);

  useEffect(() => {
    //로딩 시 스크롤 가장 위로
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    //메세지 데이터 가져오기
    if (getLoading) {
      setMessages([]);
      return;
    }
    if (messageError) {
      console.log(error);
      setError('에러 발생!');
      return;
    }
    if (getData?.data) {
      const data = getData.data;
      const userData: { nickname: string; color: string }[] = [];
      for (let i = 0; i < data.length; i++) {
        if (
          !userData.find((e) => {
            if (e.nickname === data[i].nickname) {
              data[i].color = e.color;
              return true;
            }
          })
        ) {
          data[i].color = randomColor();
          userData.push({
            nickname: data[i].nickname,
            color: data[i].color,
          });
        }
      }
      setMessages(data);
    }
    console.log('data');
  }, [getData]);

  useEffect(() => {
    //데이터 생성 성공 감지
    if (postData?.data.success) {
      setBody('');
      setError('');
      refetch();
    } else if (postError) {
      setError('에러발생!');
      refetch();
    }
  }, [postData, postError]);

  useEffect(() => {
    //데이터 삭제 성공 감지
    if (deleteData?.data.success) {
      setBody('');
      setError('');
      refetch();
    } else if (deleteError) {
      setError('에러발생!');
      refetch();
    }
  }, [deleteData, deleteError]);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    //메세지 생성
    e.preventDefault();
    if (body === '') {
      setError('모든 정보를 입력하세요.');
      refetch();
      return;
    }
    if (user === null || !user.nickname) {
      setError('로그인 해주세요.');
      refetch();
      return;
    }
    postExec({ body, nickname: user.nickname });
  };

  const onClickDelete = async (
    //메세지 삭제
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    nickname: string
  ) => {
    e.preventDefault();
    if (user === null || !user.nickname) {
      setError('로그인 해주세요.');
      refetch();
      return;
    }
    if (user.role !== 'admin' && nickname !== user.nickname) {
      setError('자신의 글만 삭제할 수 있습니다.');
      refetch();
      return;
    }
    setError('');
    deleteExec({}, `/${id}`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //변경 내용 적용
    e.preventDefault();
    const { value } = e.target;
    setBody(value);
  };

  const isMine = (nickname: string) => {
    //자신의 메세지인지 확인
    if (user === null) return false;
    if (user?.role === 'admin') return true;
    return nickname === user.nickname;
  };

  return (
    <MessageView
      onChange={onChange}
      onClick={onClick}
      refetch={refetch}
      messages={messages}
      body={body}
      error={error}
      messagesRef={messagesRef}
      loggedin={loggedin}
      onClickDelete={onClickDelete}
      isMine={isMine}
    />
  );
}
