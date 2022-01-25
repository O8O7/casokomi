import Link from "next/link";
import style from "./404.module.css";

export default function NotFound() {
  return (
    <div className={style.wrapper}>
      <div className={style.error}>
        <h1>404 Not Found</h1>
        <h2>お探しのページは見つかりませんでした。</h2>
      </div>
      <Link href="/">
        <a className={style.btnSquare}>ホームへ</a>
      </Link>
    </div>
  );
}
