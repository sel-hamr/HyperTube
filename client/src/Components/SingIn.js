import React, { useState } from "react";
import Input from "./Input";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { DataContext } from "../Context/AppContext";
import { authLogin } from "../Assets/auth";

import SocialMedia from "./SocialMedia";
const SingIn = (props) => {
  const [DataInput, saveDataInput] = useState({ userName: "", password: "" });
  let history = useHistory();
  const ctx = React.useContext(DataContext);

  const login = async () => {
    if (ctx.Validator("userName", DataInput.userName) && ctx.Validator("password", DataInput.password)) {
      const result = await authLogin(DataInput);
      props.handleShowMessage(result.type, result.body[ctx.Lang]);
      if (result.type === "success") {
        props.setIsLogin(true);
        history.push("/");
      }
    } else props.handleShowMessage("error", ctx.Languages[ctx.Lang].MessageErrorLogin);
  };
  return (
    <div className='Sing'>
      <SocialMedia mode='login' type='Gmail' />
      <SocialMedia mode='login' type='Github' />
      <SocialMedia mode='login' type='Intra' />
      <div className='line'>
        <div></div>
        <p>Or</p>
        <div></div>
      </div>
      <div className='Form-Group' style={{ width: "100%" }}>
        <p>{ctx.Languages[ctx.Lang].UserName}</p>
        <Input
          DefaultValue={DataInput.userName}
          Onchange={(userName) => {
            saveDataInput((oldValue) => ({
              ...oldValue,
              userName: userName,
            }));
          }}
          OnEnter={login}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='Form-Group' style={{ width: "100%" }}>
        <p>{ctx.Languages[ctx.Lang].Password}</p>
        <Input
          DefaultValue={DataInput.password}
          Onchange={(password) => {
            saveDataInput((oldValue) => ({
              ...oldValue,
              password: password,
            }));
          }}
          Disabled='false'
          Type='password'
          OnEnter={login}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "30px",
          position: "relative",
        }}>
        <p
          style={{
            position: "absolute",
            right: "15px",
            cursor: "pointer",
            top: "5px",
            fontSize: "15px",
          }}
          onClick={() => history.push("/ForgotPassword")}
          className='Title-1'>
          {ctx.Languages[ctx.Lang].ForgotPassword} ?
        </p>
      </div>
      <Button
        variant='contained'
        size='large'
        style={{
          backgroundColor: "#ec4646",
          color: "white",
          textTransform: "none",
          width: "200px",
          marginTop: "22px",
        }}
        onClick={login}>
        {ctx.Languages[ctx.Lang].Login}
      </Button>
      <p
        style={{
          color: "white",
          marginTop: "35px",
          fontSize: "12px",
          textAlign: "center",
          fontWeight: "bold",
        }}>
        {ctx.Languages[ctx.Lang].dontHaveAccountYet} ?
        <span
          style={{
            color: "#03a9f1",
            fontSize: "14px",
            marginLeft: "8px",
            cursor: "pointer",
          }}
          onClick={() => history.push("/Register")}>
          {ctx.Languages[ctx.Lang].JoinNow} Hypertube
        </span>
      </p>
    </div>
  );
};

export default SingIn;
