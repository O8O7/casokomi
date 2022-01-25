import { Avatar } from "@mui/material";
import style from "./LeftAvatarCard.module.css";

const LeftAvatarCard = (props) => {
  return (
    <>
      <div className={style.avatarContainer}>
        <Avatar className={style.mt2} alt={props.alt} src={props.src} />
        <div className={style.displayflex}>
          <div className={style.msgInfo}>
            <span className={style.msgName}>{props.username}</span>
            <span className={style.msgTime}>{props.time}</span>
          </div>
          <div className={style.msgBubble}>
            <div className={style.msgText}>{props.message}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftAvatarCard;
