import React from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import SocialMedia from './SocialMedia';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../Context/AppContext';
import { authRegister } from '../Assets/auth';
export default function Register(props) {
  const [DataInput, saveDataInput] = React.useState({ email: '', password: '', firstName: '', lastName: '', userName: '' });
  let history = useHistory();
  const ctx = React.useContext(DataContext);
  const register = async () => {
    let listError = [];
    if (!ctx.Validator('userName', DataInput.userName)) listError.push(ctx.Languages[ctx.Lang].UserNameNotValid);
    if (!ctx.Validator('email', DataInput.email)) listError.push(ctx.Languages[ctx.Lang].EmailNotValid);
    if (!ctx.Validator('password', DataInput.password)) listError.push(ctx.Languages[ctx.Lang].PasswordNotValid);
    if (!ctx.Validator('firstName', DataInput.firstName)) listError.push(ctx.Languages[ctx.Lang].FirstNameNotValid);
    if (!ctx.Validator('lastName', DataInput.lastName)) listError.push(ctx.Languages[ctx.Lang].LastNameNameNotValid);
    if (listError.length !== 0) props.handleShowMessage('error', listError.toString().replace(/,/g, ' -'));
    else {
      const result = await authRegister(DataInput);
      props.handleShowMessage(result.type, result.body);
      if (result.type === 'success') history.push('/Login');
    }
  };
  return (
    <div className='Sing'>
      <SocialMedia mode='register' type='Gmail' />
      <SocialMedia mode='register' type='Github' />
      <SocialMedia mode='register' type='Intra' />
      <div className='line'>
        <div></div>
        <p>{ctx.Languages[ctx.Lang].Or}</p>
        <div></div>
      </div>
      <div className='Inline-Group'>
        <div className='Form-Group'>
          <p className='t1'>{ctx.Languages[ctx.Lang].FirstName}</p>
          <Input
            DefaultValue={DataInput.firstName}
            Onchange={(firstName) => {
              saveDataInput((oldValue) => ({ ...oldValue, firstName: firstName }));
            }}
            Disabled='false'
            Type='text'
          />
        </div>
        <div className='Form-Group'>
          <p>{ctx.Languages[ctx.Lang].LastName}</p>
          <Input
            DefaultValue={DataInput.lastName}
            Onchange={(lastName) => {
              saveDataInput((oldValue) => ({ ...oldValue, lastName: lastName }));
            }}
            Disabled='false'
            Type='text'
          />
        </div>
      </div>
      <div className='Inline-Group'>
        <div className='Form-Group'>
          <p>{ctx.Languages[ctx.Lang].UserName}</p>
          <Input
            DefaultValue={DataInput.userName}
            Onchange={(useName) => {
              saveDataInput((oldValue) => ({ ...oldValue, userName: useName }));
            }}
            Disabled='false'
            Type='text'
          />
        </div>
        <div className='Form-Group'>
          <p>{ctx.Languages[ctx.Lang].Password}</p>
          <Input
            DefaultValue={DataInput.password}
            Onchange={(password) => {
              saveDataInput((oldValue) => ({ ...oldValue, password: password }));
            }}
            Disabled='false'
            Type='password'
          />
        </div>
      </div>
      <div className='Form-Group' style={{ width: '100%' }}>
        <p>{ctx.Languages[ctx.Lang].Email}</p>
        <Input
          DefaultValue={DataInput.email}
          Onchange={(email) => {
            saveDataInput((oldValue) => ({ ...oldValue, email: email }));
          }}
          Disabled='false'
          Type='Email'
        />
      </div>
      <Button
        variant='contained'
        size='large'
        onClick={register}
        style={{
          backgroundColor: '#ec4646',
          color: 'white',
          textTransform: 'none',
          width: '200px',
          marginTop: '15px',
        }}>
        {ctx.Languages[ctx.Lang].Register}
      </Button>
      <p
        style={{
          color: 'white',
          marginTop: '35px',
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {ctx.Languages[ctx.Lang].AlreadyHaveAccount} ?
        <span
          style={{
            color: '#03a9f1',
            fontSize: '14px',
            marginLeft: '8px',
            cursor: 'pointer',
          }}
          onClick={() => history.push('/Login')}>
          {ctx.Languages[ctx.Lang].Login}
        </span>
      </p>
    </div>
  );
}
