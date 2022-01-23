import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import style from "./ChatPage.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { load_user } from "../reduxs/actions/auth";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const chat = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [recievedData, setRecivedData] = useState([
    { user_id: 1, username: "sakamoto", message: "abababa", room_name: "BNB" },
  ]);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { room_name } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("login");
    dispatch(load_user());
  }, []);
  const ws = useRef(null);
  //   const [isPaused, setPause] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/app/chatmessage/?room_name=${room_name}`,
    fetcher
  );

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  //   useEffect(() => {
  //     if (router.isReady) {
  //       console.log(room_name);
  //       //   const path = `${process.env.SOCKET_URL}/ws/chat/${room_name}/`;
  //       const path = `ws://127.0.0.1:8000/ws/chat/${room_name}/`;
  //       const socketRef = new WebSocket(path);
  //       socketRef.onopen = function (event) {
  //         console.log("WebSocket is open now.");
  //       };
  //       socketRef.onmessage = function (event) {
  //         console.log("WebSocket message received:", event);
  //       };
  //       socketRef.onerror = function (event) {
  //         console.error("WebSocket error observed:", event);
  //       };
  //       socketRef.onclose = function (event) {
  //         console.log("WebSocket is closed now.");
  //       };
  //     }
  //   }, [router.isReady]);
  //   function sendNewMessage(data) {
  //     const parseData = JSON.parse(data);
  //     if (parseData) {
  //       socketRef.send(parseData);
  //     }
  //   }
  useEffect(() => {
    //  最初のレンダリングで発生するもの
    //  およびその後の再レンダリング
    const path = `ws://127.0.0.1:8000/ws/chat/${room_name}/`;
    ws.current = new WebSocket(path);
    const wsCurrent = ws.current;
    ws.current.onclose = function (event) {
      console.log(event);
    };
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = (event) =>
      setRecivedData(...recievedData, event.data);
    ws.current.onerror = (event) =>
      console.log("WebSocket error observed:", event);

    // コンポーネントがアンマウントされたときに発生するもの
    return () => {
      wsCurrent.close();
    };
  }, []);
  // コネクションが開き、通信の準備ができている状態
  //   if (ws.current.readyState === 1) {
  //     console.log("connection is open");
  //   }
  //   ws.current.onopen = () => console.log("ws opened");
  //   ws.current.onclose = () => console.log("ws closed");
  //   ws.current.onmessage = (event) =>
  //     console.log("WebSocket message received:", event);
  //   ws.current.onerror = (event) =>
  // console.log("WebSocket error observed:", event);
  //   useEffect(() => {
  //     if (!ws.current) return;

  //     ws.current.onmessage = (e) => {
  //       if (isPaused) return;
  //       const message = JSON.parse(e.data);
  //       console.log("e", message);
  //     };
  //   }, [isPaused]);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let messageObject = {
      user_id: user.id,
      username: user.name,
      message: message,
      room_name: room_name,
    };
    messageObject = JSON.stringify(messageObject);
    console.log(messageObject);
    ws.current.send(messageObject);
    setMessage("");
  });

  const handleChange = (e) => {
    setMessage(() => e.target.value);
  };

  if (error) return <>Failed to load</>;
  if (!data) return <>FLoading...</>;

  return (
    <>
      <div className={style.flexChat}>
        <div className={style.flexchildren}>
          <h1>Realtime Chat App</h1>
          <h2>Name is test</h2>
        </div>
        <div className={style.flexNextchildren}>
          <div className={style.flexNextchildrenNext}>
            {user ? (
              <>
                {data.length ? (
                  data.map((chat, i) => (
                    <div key={"msg_" + i} tw="mt-1">
                      <span
                        css={
                          chat.username.id === user.id
                            ? `text-red-500`
                            : `text-black`
                        }
                      >
                        {chat.username.id === user.id
                          ? "Me"
                          : chat.username.name}
                      </span>
                      : {chat.comment}
                    </div>
                  ))
                ) : (
                  <div tw="text-sm text-center text-gray-400 py-6">
                    No chat messages
                  </div>
                )}
              </>
            ) : (
              <>
                {data.length ? (
                  data.map((chat, i) => (
                    <div key={"msg_" + i} tw="mt-1">
                      <span>{chat.username.name}</span>: {chat.comment}
                    </div>
                  ))
                ) : (
                  <div tw="text-sm text-center text-gray-400 py-6">
                    No chat messages
                  </div>
                )}
              </>
            )}
            {recievedData &&
              recievedData.map((chat, i) => (
                <div key={"msg_" + i} tw="mt-1">
                  <span
                    css={
                      chat.username.id === user.id
                        ? `text-red-500`
                        : `text-black`
                    }
                  >
                    {chat.username.id === user.id ? "Me" : chat.username.name}
                  </span>
                  : {chat.comment}
                </div>
              ))}
          </div>
          <div className={style.flexNextNext}>
            <div className={style.flexNextNextIn}>
              <div className={style.flexNextNextNextIn}>
                <form onSubmit={handleSubmit} className="form">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={message}
                    placeholder="Type a Message"
                    required
                  />
                  <button className="submit" type="submit" value="Submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default chat;
