import React from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import { DataContext } from '../Context/AppContext';
import { aythReset } from '../Assets/auth';
import { useHistory } from 'react-router-dom';

export default function ForgotPassword(props) {
  const [Email, SetEmail] = React.useState('');
  const ctx = React.useContext(DataContext);
  let history = useHistory();
  const ForgotPassword = async () => {
    if (ctx.Validator('email', Email)) {
      const result = await aythReset(Email);
      props.handleShowMessage(result.type, result.body);
      if (result.type === 'success') history.push('/');
    } else props.handleShowMessage('error', ctx.Languages[ctx.Lang].emailNotFound);
  };
  return (
    <div className='Sing'>
      <p className='Title-1'> {ctx.Languages[ctx.Lang].ForgotPassword}</p>
      <div className='Form-Group' style={{ width: '100%' }}>
        <p>{ctx.Languages[ctx.Lang].Email}</p>
        <Input
          DefaultValue={Email}
          Onchange={(password) => {
            SetEmail(password);
          }}
          Disabled='false'
          OnEnter={ForgotPassword}
          Type='email'
        />
      </div>
      <Button
        variant='contained'
        size='large'
        onClick={ForgotPassword}
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
