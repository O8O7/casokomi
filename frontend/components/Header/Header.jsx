import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import SearchInput from "../UIkit/SearchInput"
import style from "./Header.module.css"
import Link from 'next/link';

import TemporaryDrawer from '../Drawer/TemporaryDrawer';

function Header(props) {
  const { title } = props;

  return (
    <div className={style.headerContainer}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link href="/"><a><h2 className={style.logo}>{title}</h2></a></Link>
        <div className={style.borderBlack}>
          <SearchInput />
        </div>
        <TemporaryDrawer />
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;