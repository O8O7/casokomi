import { Avatar } from "@mui/material";
import style from "./RightAvatarCard.module.css";

const RightAvatarCard = (props) => {
  return (
    <>
      <div>
        <div className={style.avatarContainer}>
          <div className={style.displayflex}>
            <div className={style.msgInfo}>
              <span className={style.msgTime}>{props.time}</span>
              <span className={style.msgName}>{props.username}</span>
            </div>
            <div className={style.msgBubble}>
              <div className={style.msgText}>{props.message}</div>
            </div>
          </div>
          <Avatar className={style.mt2} alt={props.alt} src={props.src} />
        </div>
      </div>
    </>
  );
};

export default RightAvatarCard;
