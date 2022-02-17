import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import Button from '@mui/material/Button';

function AccessoryCardItem(props) {
  const [user] = useAuthState(auth)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if(user)
    setAdmin(true)
  }, [user, admin])

  const url = props.path
  const id = url.split('/').pop()

  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel_Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
        { user ? <Link to={`/edit_accessory/${id}`} style={{marginLeft: 10}}>
        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#000', borderRadius: 15, textDecoration: 'none' }}
                        >
                            Edit
                        </Button>
        </Link> : '' }
        
      </li>
    </>
  );
}

export default AccessoryCardItem;