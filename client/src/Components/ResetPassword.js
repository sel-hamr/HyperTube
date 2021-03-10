import React from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import { DataContext } from '../Context/AppContext';

export default function ResetPassword(props) {
  const [password, changePassword] = React.useState({
    newPassword: '',
    confirmPassword: '',
  });
  const ctx = React.useContext(DataContext);

  const ResetPassword = () => {
    if (ctx.Validator('password', password.newPassword) && password.newPassword === password.confirmPassword) console.log('ok');
    else props.handleShowMessage('error', ctx.Languages[ctx.Lang].passwordNotMatch);
  };
  return (
    <div className='Sing'>
      <p className='Title-1'> {ctx.Languages[ctx.Lang].ResetPassword}</p>
      <div className='Form-Group' style={{ width: '100%' }}>
        <p>{ctx.Languages[ctx.Lang].NewPassword}</p>
        <Input
          DefaultValue={password.newPassword}
          Onchange={(newPassword) => {
            changePassword((oldValue) => ({ ...oldValue, newPassword: newPassword }));
          }}
          Disabled='false'
          Type='password'
          OnEnter={ResetPassword}
        />
        <p>{ctx.Languages[ctx.Lang].ConfirmPassword}</p>
        <Input
          DefaultValue={password.confirmPassword}
          Onchange={(confirmPassword) => {
            changePassword((oldValue) => ({ ...oldValue, confirmPassword: confirmPassword }));
          }}
          Disabled='false'
          OnEnter={ResetPassword}
          Type='password'
        />
      </div>
      <Button
        variant='contained'
        size='large'
        onClick={ResetPassword}
        style={{
          backgroundColor: '#03a9f1',
          color: 'white',
          textTransform: 'none',
          width: '250px',
          marginTop: '15px',
        }}>
        {ctx.Languages[ctx.Lang].ResetPassword}
      </Button>
    </div>
  );
}
