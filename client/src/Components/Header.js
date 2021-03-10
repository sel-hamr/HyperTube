import React from "react";
import Logo from "../Images/Logo.svg";
import Button from "@material-ui/core/Button";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { DataContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import "../Css/Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { UseWindowSize } from "../Assets/UseWindowSize";

const LogoWebSite = () => {
  const width = UseWindowSize();
  return (
    <div className='Logo' onClick={() => (location.href = "/")}>
      <img src={Logo} alt='...' />
      {width <= 700 ? "" : <p>Hypertube</p>}
    </div>
  );
};
const NavWeb = (props) => {
  const ctx = React.useContext(DataContext);
  return (
    <div className='Nav'>
      <div
        className={`${props.isActive === 1 ? "LinkActive" : "Link"}`}
        onClick={() => {
          props.setIsActive(1);
          props.ctx.history.push("/");
        }}>
        <p style={{ color: `${props.isActive === 1 ? "#ec4646" : "white"}` }}>{ctx.Languages[ctx.Lang].Home}</p>
      </div>
      <div
        className={`${props.isActive === 2 ? "LinkActive" : "Link"}`}
        onClick={() => {
          props.setIsActive(2);
          props.ctx.history.push("/FavoriteMovie");
        }}>
        <p style={{ color: `${props.isActive === 2 ? "#ec4646" : "white"}` }}>{ctx.Languages[ctx.Lang].Mylist}</p>
      </div>
      <div
        className={`${props.isActive === 3 ? "LinkActive" : "Link"}`}
        onClick={() => {
          props.setIsActive(3);
          props.ctx.history.push("/Profile");
        }}>
        <p style={{ color: `${props.isActive === 3 ? "#ec4646" : "white"}` }}>{ctx.Languages[ctx.Lang].Profile}</p>
      </div>
      <Button
        variant='outlined'
        size={"small"}
        startIcon={<GTranslateIcon />}
        style={{
          boxSizing: "border-box",
          borderColor: "white",
          color: "white",
          textTransform: "none",
          display: "flex",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        onClick={() => props.ctx.setLang((oldValue) => (oldValue === "Eng" ? "Fr" : "Eng"))}>
        {props.ctx.Lang === "Eng" ? "Eng" : "Fre"}
      </Button>
      <Button
        variant='contained'
        size={"small"}
        startIcon={<ExitToAppIcon />}
        style={{
          backgroundColor: "#ec4646",
          color: "white",
          textTransform: "none",
          display: "flex",
          marginRight: "10px",
        }}
        onClick={() => props.ctx.setLang((oldValue) => (oldValue === "Eng" ? "Fr" : "Eng"))}>
        {ctx.Languages[ctx.Lang].Logout}
      </Button>
    </div>
  );
};
const NavMobil = (props) => {
  const ctx = React.useContext(DataContext);
  const [showMenuNav, setShowMenuNav] = React.useState(null);
  return (
    <div className='Nav'>
      <Button
        variant='outlined'
        size={"small"}
        startIcon={<GTranslateIcon />}
        style={{
          boxSizing: "border-box",
          borderColor: "white",
          color: "white",
          textTransform: "none",
          display: "flex",
          marginRight: "10px",
        }}
        onClick={() => props.ctx.setLang((oldValue) => (oldValue === "Eng" ? "Fr" : "Eng"))}>
        {props.ctx.Lang === "Eng" ? "Eng" : "Fre"}
      </Button>
      <MenuIcon style={{ color: "white", display: "flex", fontSize: "40px", cursor: "pointer", marginRight: "15px" }} onClick={(event) => setShowMenuNav(event.currentTarget)} />
      <Menu anchorEl={showMenuNav} keepMounted open={Boolean(showMenuNav)} onClose={() => setShowMenuNav(null)}>
        <MenuItem
          onClick={() => {
            setShowMenuNav(null);
            props.ctx.history.push("/");
            props.setIsActive(1);
          }}>
          {ctx.Languages[ctx.Lang].Home}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowMenuNav(null);
            props.setIsActive(3);
            props.ctx.history.push("/Profile");
          }}>
          {ctx.Languages[ctx.Lang].Profile}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowMenuNav(null);
            props.ctx.history.push("/FavoriteMovie");
            props.setIsActive(2);
          }}>
          {ctx.Languages[ctx.Lang].Mylist}
        </MenuItem>
        <MenuItem onClick={() => setShowMenuNav(null)}>{ctx.Languages[ctx.Lang].Logout}</MenuItem>
      </Menu>
    </div>
  );
};
export default function Header(props) {
  const ctx = React.useContext(DataContext);
  let location = useLocation();
  const [isActive, setIsActive] = React.useState(location.pathname === "/FavoriteMovie" ? 2 : location.pathname === "/Profile" ? 3 : 1);
  const width = UseWindowSize();
  if (props.type === "notLogin")
    return (
      <div className='Header'>
        <LogoWebSite ctx={ctx} />
        <Button
          variant='outlined'
          size={width < 533 ? "small" : "large"}
          startIcon={<GTranslateIcon />}
          style={{
            borderColor: "white",
            color: "white",
            textTransform: "none",
            display: "flex",
            marginRight: `${width < 533 ? "10px" : "42px"}`,
            marginLeft: "auto",
          }}
          onClick={() => ctx.setLang((oldValue) => (oldValue === "Eng" ? "Fr" : "Eng"))}>
          {ctx.Lang === "Eng" ? "English" : "French"}
        </Button>
      </div>
    );
  else
    return (
      <div className='Header' style={{ position: "sticky", top: "-3px", zIndex: "999999", height: "60px", backgroundColor: "rgba(34, 40, 49, 0.46)" }}>
        <LogoWebSite ctx={ctx} />
        {width < 840 ? (
          <NavMobil isActive={isActive} setIsActive={setIsActive} ctx={ctx} search={props.search} />
        ) : (
          <NavWeb isActive={isActive} setIsActive={setIsActive} ctx={ctx} search={props.search} />
        )}
      </div>
    );
}
