import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import style from "./ChatPage.module.css";
import { useState } from "react";

// class chatPage extends Component {
//   //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   //   const { room_name } = router.query;

//   //   if (isAuthenticated) {
//   //     router.push("/");
//   //   }

//   //   const sendMessage = () => {
//   //     if (message) ``;
//   //   };

//   //   const handleKeyDown = (e) => {
//   //     if (e.key === "Enter") {
//   //       sendMessage();
//   //     }

//   //     if (message) {
//   //     }
//   //   };

//   constructor(props) {
//     super(props);
//     this.state = {};

//     this.waitForSocketConnection(() => {
//       WebSocketInstance.initChatUser(this.props.currentUser);
//       WebSocketInstance.addCallbacks(
//         this.setMessages.bind(this),
//         this.addMessage.bind(this)
//       );
//       WebSocketInstance.fetchMessages(this.props.currentUser);
//       WebSocketInstance.connect(this.props.match.params.chatID);
//     });
//   }

//   waitForSocketConnection(callback) {
//     const component = this;
//     setTimeout(function () {
//       // Check if websocket state is OPEN
//       if (WebSocketInstance.state() === 1) {
//         console.log("Connection is made");
//         callback();
//         return;
//       } else {
//         console.log("wait for connection...");
//         component.waitForSocketConnection(callback);
//       }
//     }, 100); // wait 100 milisecond for the connection...
//   }

//   componentDidMount() {
//     this.scrollToBottom();
//   }

//   componentDidUpdate() {
//     this.scrollToBottom();
//   }

//   scrollToBottom = () => {
//     const chat = this.messagesEnd;
//     const scrollHeight = chat.scrollHeight;
//     const height = chat.clientHeight;
//     const maxScrollTop = scrollHeight - height;
//     chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
//   };

//   addMessage(message) {
//     this.setState({ messages: [...this.state.messages, message] });
//   }

//   setMessages(messages) {
//     this.setState({ messages: messages.reverse() });
//   }

//   messageChangeHandler = (event) => {
//     this.setState({
//       message: event.target.value,
//     });
//   };

//   sendMessageHandler = (e, message) => {
//     const messageObject = {
//       from: this.props.currentUser,
//       text: message,
//     };
//     WebSocketInstance.newChatMessage(messageObject);
//     this.setState({
//       message: "",
//     });
//     e.preventDefault();
//   };

//   renderMessages = (messages) => {
//     const currentUser = this.props.currentUser;
//     return messages.map((message, i) => (
//       <li
//         key={message.id}
//         className={message.author === currentUser ? "me" : "him"}
//       >
//         {" "}
//         <h4 className="author">{message.author} </h4>
//         <p>{message.content}</p>
//       </li>
//     ));
//   };

//   return() {
//     const messages = this.state.messages;
//     const currentUser = this.props.currentUser;
//     <>
//       <div className={style.flexChat}>
//         <div className={style.flexchildren}>
//           <h1>Realtime Chat App</h1>
//           <h2>Name is {currentUser}</h2>
//         </div>
//         <div className={style.flexNextchildren}>
//           <div className={style.flexNextchildrenNext}>
//             <ul
//               ref={(el) => {
//                 this.messagesEnd = el;
//               }}
//             >
//               {messages && this.renderMessages(messages)}
//             </ul>
//             {/* {chat.length ? (
//             chat.map((chat, i) => (
//               <div key={"msg_" + i} tw="mt-1">
//                 <span
//                   css={chat.user === user ? tw`text-red-500` : tw`text-black`}
//                 >
//                   {chat.user === user ? "Me" : chat.user}
//                 </span>
//                 : {chat.msg}
//               </div>
//             ))
//           ) : (
//             <div tw="text-sm text-center text-gray-400 py-6">
//               No chat messages
//             </div>
//           )} */}
//           </div>
//           <div className={style.flexNextNext}>
//             <div className={style.flexNextNextIn}>
//               <div className={style.flexNextNextNextIn}>
//                 {/* <input
//                   type="text"
//                   value={message}
//                   onKeyDown={(e) => handleKeyDown(e)}
//                   placeholder="メッセージを送信"
//                 />
//               </div>
//               <div className={style.lastFlex}>
//                 <button onClick={() => sendMessage()}>SEND</button>
//               </div> */}
//                 <form
//                   onSubmit={(e) =>
//                     this.sendMessageHandler(e, this.state.message)
//                   }
//                   className="form"
//                 >
//                   <input
//                     type="text"
//                     onChange={this.messageChangeHandler}
//                     value={this.state.message}
//                     placeholder="Type a Message"
//                     required
//                   />
//                   <button className="submit" type="submit" value="Submit">
//                     Send
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>;
//   }
// }

// export default chatPage;

const chat = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { room_name } = router.query;
  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  if (router.isReady) {
    console.log(room_name);
    //   const path = `${process.env.SOCKET_URL}/ws/chat/${room_name}/`;
    const path = `ws://127.0.0.1:8000/ws/chat/${room_name}/`;
    const socketRef = new WebSocket(path);
    socketRef.onopen = function (event) {
      console.log("WebSocket is open now.");
    };
    socketRef.onmessage = function (event) {
      console.log("WebSocket message received:", event);
    };
    socketRef.onerror = function (event) {
      console.error("WebSocket error observed:", event);
    };
    socketRef.onclose = function (event) {
      console.log("WebSocket is closed now.");
    };
  }
  function sendNewMessage(data) {
    const parseData = JSON.parse(data);
    if (parseData) {
      socketRef.send(parseData);
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className={style.flexChat}>
        <div className={style.flexchildren}>
          <h1>Realtime Chat App</h1>
          {/* <h2>Name is {currentUser}</h2> */}
          <h2>Name is test</h2>
        </div>
        <div className={style.flexNextchildren}>
          <div className={style.flexNextchildrenNext}>
            {/* <ul
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              {messages && this.renderMessages(messages)}
            </ul> */}
            {/* {chat.length ? (
            chat.map((chat, i) => (
              <div key={"msg_" + i} tw="mt-1">
                <span
                  css={chat.user === user ? tw`text-red-500` : tw`text-black`}
                >
                  {chat.user === user ? "Me" : chat.user}
                </span>
                : {chat.msg}
              </div>
            ))
          ) : (
            <div tw="text-sm text-center text-gray-400 py-6">
              No chat messages
            </div>
          )} */}
          </div>
          <div className={style.flexNextNext}>
            <div className={style.flexNextNextIn}>
              <div className={style.flexNextNextNextIn}>
                {/* <input
                  type="text"
                  value={message}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="メッセージを送信"
                />
              </div>
              <div className={style.lastFlex}>
                <button onClick={() => sendMessage()}>SEND</button>
              </div> */}
                <form
                  onSubmit={(e) => sendNewMessage(e, this.state.message)}
                  className="form"
                >
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
