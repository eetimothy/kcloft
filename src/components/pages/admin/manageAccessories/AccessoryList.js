import React, { useState, useEffect } from 'react'
import '../../../Cards.css'
import AccessoryCardItem from '../../../AccessoryCardItem';
import { accessoriesColRef, auth } from '../../../../firebase';
import { onSnapshot } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from '@mui/material/Typography';
import '../manageProjects/ProjectList.css'

export default function AccessoryList() {
  const [accessories, setAccessories] = useState([])
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (user)
      setAdmin(true)
  }, [user, admin])

  useEffect(() => {
    //realtime collection data: onSnapshot
    onSnapshot(accessoriesColRef, (snapshot) => {
      let acc = []
      snapshot.docs.map((doc) => {
        return acc.push({ ...doc.data(), id: doc.id })
      })
      //  console.log(acc)
      setAccessories(acc)
    })
  }, [setAccessories])

  return (
    <div className="container">
      <Typography component="h1" variant="h5">
        Products
      </Typography>
      <div className='list__wrapper'>
        <ul>
          {
            accessories.map(pro => {
              return <AccessoryCardItem
                key={pro.id}
                src={pro.imageUrl}
                text={pro.title}
                label={pro.category}
                path={`/accessory_details/${pro.id}`}
              />
            })
          }
        </ul>
      </div>
    </div>
  );
}