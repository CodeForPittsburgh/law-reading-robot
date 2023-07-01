// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuPopupState from "./PopupMenu";
//import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <MenuPopupState>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
        </MenuPopupState>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

// commented out was code with the static Burger Icon not including a popup menu
