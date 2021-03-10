import React from 'react';
import { DataContext } from '../Context/AppContext';
export const InformationUser = (props) => {
  const ctx = React.useContext(DataContext);
  return (
    <div className='Info'>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].FirstName}</p>
        <p>{props.UserInfo.firstName}</p>
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].LastName}</p>
        <p>{props.UserInfo.lastName}</p>
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].Email}</p>
        <p>{props.UserInfo.email}</p>
      </div>
      <div className='ew'>
        <p>{ctx.Languages[ctx.Lang].UserName}</p>
        <p>{props.UserInfo.userName}</p>
      </div>
    </div>
  );
};
