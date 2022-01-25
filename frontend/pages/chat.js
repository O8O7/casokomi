import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import style from "./chat.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { load_user } from "../reduxs/actions/auth";
import { LeftAvatarCard } from "../components/UIkit";
import { RightAvatarCard } from "../components/UIkit";
import Container from "@mui/material/Container";

const chat = () => {
  const router = useRouter();
  const { room_name } = router.query;
  const [message, setMessage] = useState("");
  const [receivedData, setRecivedData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [fetchData, setFetchData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const scrollBottomRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
  }, []);
  useEffect(() => {
    // urlにqueryが入ったときにメッセージ履歴をフェッチ
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/app/chatmessage/?room_name=${room_name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data);
        setLoading(false);
      });
  }, [router.query]);
  useEffect(() => {
    if (scrollBottomRef && scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fetchData, receivedData]);
  const ws = useRef(null);

  useEffect(() => {
    //  最初のレンダリングで発生するもの
    //  およびその後の再レンダリング
    const path = `ws://127.0.0.1:8000/ws/chat/${room_name}/`;
    ws.current = new WebSocket(path);
    const wsCurrent = ws.current;
    ws.current.onclose = function (event) {
      console.log(event);
    };
    // ws.current.onopen = () => console.log("ws opened");
    // ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = (event) => {
      let jsonObject = JSON.parse(event.data);
      setRecivedData((receivedData) => [...receivedData, jsonObject]);
    };
    ws.current.onerror = (event) =>
      console.log("WebSocket error observed:", event);

    // コンポーネントがアンマウントされたときに発生するもの
    return () => {
      wsCurrent.close();
    };
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let messageObject = {
      user_id: user.id,
      username: user.name,
      image: user.image,
      message: message,
      room_name: room_name,
    };
    messageObject = JSON.stringify(messageObject);
    ws.current.send(messageObject);
    setMessage("");
  });

  const handleChange = (e) => {
    setMessage(() => e.target.value);
  };

  return (
    <div>
      <div className={style.chatHeader}>
        <h4 className={style.chatTitle}>{room_name}チャットページ</h4>
      </div>
      <div className={style.chatContainer}>
        <Container>
          <div className={style.chat}>
            {/* ユーザがログインしているか */}
            {user ? (
              <>
                {/* ユーザーがログインしており、チャットデータがあるか */}
                {fetchData.length ? (
                  // ユーザーがログインしており、チャットデータがあるとき表示
                  fetchData.map((chat, i) => (
                    <div key={"login_msg_" + i}>
                      {/* チャットデータのIDと自分のIDを検証 */}
                      {chat.username.id === user.id ? (
                        <RightAvatarCard
                          time={chat.posted_at}
                          username={user.name}
                          message={chat.comment}
                          alt={user.name}
                          src={chat.username.image}
                        />
                      ) : (
                        <LeftAvatarCard
                          time={chat.posted_at}
                          username={chat.username.name}
                          message={chat.comment}
                          alt={chat.username.name}
                          src={chat.username.image}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div tw="text-sm text-center text-gray-400 py-6">
                    チャットメッセージはまだありません
                  </div>
                )}
              </>
            ) : (
              // ユーザーがログインしていない場合
              <>
                {fetchData.length ? (
                  fetchData.map((chat, i) => (
                    <div key={"not_login_msg_" + i}>
                      <LeftAvatarCard
                        time={chat.posted_at}
                        username={chat.username.name}
                        message={chat.comment}
                        alt={chat.username.name}
                        src={chat.username.image}
                      />
                    </div>
                  ))
                ) : (
                  <div tw="text-sm text-center text-gray-400 py-6">
                    チャットメッセージはまだありません
                  </div>
                )}
              </>
            )}
            {/* WebSocketのメッセージを受信している場合 */}
            {receivedData && (
              <>
                {user ? (
                  <>
                    {/* ユーザーがログインしている場合 */}
                    {receivedData.map((chat, i) => (
                      <div key={"login_received_msg_" + i}>
                        {chat.user_id === user.id ? (
                          // 受信したメーセージが自分の場合
                          <RightAvatarCard
                            time="21:50"
                            username={user.name}
                            message={chat.message}
                            alt={user.name}
                            src={chat.image}
                          />
                        ) : (
                          // 自分ではない場合
                          <LeftAvatarCard
                            time="21:50"
                            username={chat.username}
                            message={chat.message}
                            alt={chat.username}
                            src={chat.image}
                          />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {/* ログインしていない場合 */}
                    {receivedData.map((chat, i) => (
                      <div key={"not_login_recieved_msg_" + i}>
                        <LeftAvatarCard
                          time="21:50"
                          username={chat.username}
                          message={chat.message}
                          alt={chat.username}
                          src={chat.image}
                        />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
          <div ref={scrollBottomRef} />
        </Container>
        <div className={style.buttonContainer}>
          <form onSubmit={handleSubmit} className={style.form}>
            {user ? (
              <>
                <input
                  className={style.input}
                  type="text"
                  onChange={handleChange}
                  value={message}
                  placeholder="メッセージを入力"
                  required
                />
                <button className="submit" type="submit" value="Submit">
                  送信
                </button>
              </>
            ) : (
              <>
                <input
                  className={style.input}
                  type="text"
                  onChange={handleChange}
                  value={message}
                  placeholder="ログインしてメッセージを送信"
                  required
                  disabled
                />
                <button
                  className="submit"
                  type="submit"
                  value="Submit"
                  disabled
                >
                  送信
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default chat;
