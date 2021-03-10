import React, { useState } from 'react';
import { DataContext } from '../Context/AppContext';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import '../Css/Search.css';
export default function Search(props) {
  const [search, setSearch] = useState();
  const ctx = React.useContext(DataContext);
  return (
    <div className='search'>
      <SearchIcon style={{ color: 'white', fontSize: '25px', marginRight: '10px' }} />
      <InputBase
        placeholder={`${ctx.Languages[ctx.Lang].Search} ...`}
        style={{ fontSize: '17px', color: 'white', width: '100%' }}
        onChange={(e) => {
          document.querySelector('.App').scrollTop = 0;
          props.Onchange(e.target.value);
        }}
      />
    </div>
  );
}
