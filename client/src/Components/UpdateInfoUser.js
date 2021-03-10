import React from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import { UpdateUser } from '../Assets/GetInfoUser';
import { DataContext } from '../Context/AppContext';

export const UpdateInfoUser = (props) => {
  const ctx = React.useContext(DataContext);
  const updateInfo = () => {
    let listError = [];
    if (!ctx.Validator('userName', props.userInfo.userName)) listError.push(ctx.Languages[ctx.Lang].UserNameNotValid);
    if (!ctx.Validator('email', props.userInfo.email)) listError.push(ctx.Languages[ctx.Lang].EmailNotValid);
    if (!ctx.Validator('firstName', props.userInfo.firstName)) listError.push(ctx.Languages[ctx.Lang].FirstNameNotValid);
    if (!ctx.Validator('lastName', props.userInfo.lastName)) listError.push(ctx.Languages[ctx.Lang].LastNameNameNotValid);
    // if (listError.length !== 0) props.setContentMessage('error', listError.toString().replace(/,/g, ' -'), (state: true));
    if (listError.length !== 0)
      props.setContentMessage({
        type: 'error',
        content: listError.toString(),
        state: true,
      });
    else {
      UpdateUser(props.setUserInfo, props.userInfo, props.setContentMessage, ctx.Lang);
    }
  };
  return (
    <div className='Info' style={{ justifyContent: 'start' }}>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].FirstName}</p>
        <Input
          DefaultValue={props.userInfo.firstName}
          Onchange={(userName) => {
            props.setUserInfo((oldValue) => ({
              ...oldValue,
              firstName: userName,
            }));
          }}
          Style={{ backgroundColor: '#bdbdbd', width: '50%', color: 'black' }}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].LastName}</p>
        <Input
          DefaultValue={props.userInfo.lastName}
          Onchange={(userName) => {
            props.setUserInfo((oldValue) => ({
              ...oldValue,
              lastName: userName,
            }));
          }}
          Style={{ backgroundColor: '#bdbdbd', width: '50%', color: 'black' }}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].Email}</p>
        <Input
          DefaultValue={props.userInfo.email}
          Onchange={(userName) => {
            props.setUserInfo((oldValue) => ({
              ...oldValue,
              email: userName,
            }));
          }}
          Style={{ backgroundColor: '#bdbdbd', width: '50%', color: 'black' }}
          Disabled='false'
          Type='text'
        />
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].UserName}</p>
        <Input
          DefaultValue={props.userInfo.userName}
          Onchange={(userName) => {
            props.setUserInfo((oldValue) => ({
              ...oldValue,
              userName: userName,
            }));
          }}
          Style={{ backgroundColor: '#bdbdbd', width: '50%', color: 'black' }}
          Disabled='false'
          Type='text'
        />
      </div>
      <Button
        variant='contained'
        size='large'
        onClick={updateInfo}
        style={{
          backgroundColor: '#ec4646',
          color: 'white',
          textTransform: 'none',
          width: '150px',
          marginTop: '30px',
          height: '35px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        Update
      </Button>
    </div>
  );
};
