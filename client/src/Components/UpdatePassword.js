import React from "react";
import Input from "./Input";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { DataContext } from "../Context/AppContext";

export const UpdatePassword = (props) => {
  const [password, setPassword] = React.useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const updatePass = async () => {
    if (ctx.Validator("password", password.newPassword) && password.newPassword === password.confirmPassword && ctx.Validator("password", password.oldPassword)) {
      const PasswordData = await Axios.put(
        `/profile/password`,
        {
          newPassword: password.newPassword,
          oldPassword: password.oldPassword,
        },
        { withCredentials: true }
      );
      if (PasswordData.data.type === "success")
        setPassword({
          newPassword: "",
          confirmPassword: "",
          oldPassword: "",
        });
      props.setContentMessage({
        type: PasswordData.data.type,
        content: PasswordData.data.body[ctx.Lang],
        state: true,
      });
    } else
      props.setContentMessage({
        type: "error",
        content: ctx.Languages[ctx.Lang].PasswordNotValid,
        state: true,
      });
  };
  const ctx = React.useContext(DataContext);
  return (
    <div className='Info' style={{ justifyContent: "start" }}>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].CurrentPassword}</p>
        <Input
          DefaultValue={password.oldPassword}
          Onchange={(oldPassword) => {
            setPassword((oldValue) => ({
              ...oldValue,
              oldPassword: oldPassword,
            }));
          }}
          Style={{ backgroundColor: "#bdbdbd", width: "50%", color: "black" }}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].NewPassword}</p>
        <Input
          DefaultValue={password.newPassword}
          Onchange={(newPassword) => {
            setPassword((oldValue) => ({
              ...oldValue,
              newPassword: newPassword,
            }));
          }}
          Style={{ backgroundColor: "#bdbdbd", width: "50%", color: "black" }}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].ConfirmPassword}</p>
        <Input
          DefaultValue={password.confirmPassword}
          Onchange={(confirmPassword) => {
            setPassword((oldValue) => ({
              ...oldValue,
              confirmPassword: confirmPassword,
            }));
          }}
          Style={{ backgroundColor: "#bdbdbd", width: "50%", color: "black" }}
          Disabled='false'
          Type='text'
        />
      </div>
      <Button
        variant='contained'
        size='large'
        onClick={updatePass}
        style={{
          backgroundColor: "#ec4646",
          color: "white",
          textTransform: "none",
          width: "150px",
          marginTop: "40px",
          height: "35px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        Update
      </Button>
    </div>
  );
};
