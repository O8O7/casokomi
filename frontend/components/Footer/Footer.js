import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <small className={style.small}>
          Copyright © 2022 Shun Sakamoto All Right Reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
