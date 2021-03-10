import React from 'react';
import Button from '@material-ui/core/Button';
import '../Css/Intro.css';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../Context/AppContext';

export default function Intro() {
  let history = useHistory();
  const ctx = React.useContext(DataContext);
  return (
    <div className='Titre'>
      <p>{ctx.Languages[ctx.Lang].TitleLogin}</p>
      <div>
        <Button
          variant='contained'
          size='large'
          style={{
            backgroundColor: '#ec4646',
            color: 'white',
            textTransform: 'none',
            width: '250px',
            fontSize: '18px',
          }}
          onClick={() => history.push('/Register')}>
          {ctx.Languages[ctx.Lang].JoinNow}
        </Button>
        <Button
          variant='outlined'
          size='large'
          style={{
            borderColor: '#ec4646',
            color: '#ec4646',
            textTransform: 'none',
            width: '100px',
          }}
          onClick={() => history.push('/Login')}>
          {ctx.Languages[ctx.Lang].Login}
        </Button>
      </div>
    </div>
  );
}
