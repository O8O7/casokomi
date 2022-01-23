import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxs/actions/auth";
import Link from 'next/link';

export default function TemporaryDrawer() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false,
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logoutHandler = async () => {
    console.log("clicked!")
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(logout());
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {isAuthenticated ? (
      <>
        <Link href="/ProfileSample">
          <a>
            <List>
              <ListItem>
                <ListItemIcon>
                <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"プロフィール"} />
              </ListItem>
            </List>
          </a>
        </Link>
          <List onClick={logoutHandler}>
          <ListItem>
            <ListItemIcon>
            <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </>
      ) : (
      <>
        <Divider />
        <Link href="/register">
          <a>
            <List>
              <ListItem>
                <ListItemIcon>
                <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"新規登録"} />
              </ListItem>
            </List>
          </a>
        </Link>
        <Link href="/login">
          <a>
            <List>
              <ListItem>
                <ListItemIcon>
                <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"ログイン"} />
              </ListItem>
            </List>
          </a>
        </Link>
      </>
      )}
      <Divider />
      {/* <Link href="/ChatPage">
        <a>
          <List>
            <ListItem>
              <ListItemIcon>
              <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"チャットページ"} />
            </ListItem>
          </List>
        </a>
      </Link> */}
      <Link href="/">
        <a>
          <List>
            <ListItem>
              <ListItemIcon>
              <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Homeへ"} />
            </ListItem>
          </List>
        </a>
      </Link>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>
        <DehazeIcon fontSize='large' />
      </Button>
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
      {list('right')}
      </Drawer>
    </div>
  );
}