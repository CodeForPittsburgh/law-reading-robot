import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import "./PopupMenu.css"



const MenuPopupState = () => {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  return (
    <div className={"mobile"}>
      <Button variant="contained" {...bindTrigger(popupState)}>
        <MenuIcon></MenuIcon>
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Link One</MenuItem>
        <MenuItem onClick={popupState.close}>Link Two</MenuItem>
        <MenuItem onClick={popupState.close}>Link Three</MenuItem>
        <MenuItem onClick={popupState.close}>Link Four</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuPopupState;

// Added this popup menu MUI component if we want to use it, but take it or leave it
// -MT