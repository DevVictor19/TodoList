import { useState, MouseEvent, useCallback } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { UserCircle, SignOut, UserGear } from "phosphor-react";
import { useAuth } from "../../../hooks/useAuth";
import { AuthContextInterface } from "../../../interfaces/authContextInterface";

export function Profile() {
  const { logout } = useAuth() as AuthContextInterface;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <UserCircle size={22} weight="fill" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} dense>
          <ListItemIcon>
            <UserGear size={22} weight="fill" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout} dense>
          <ListItemIcon>
            <SignOut size={22} weight="fill" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
