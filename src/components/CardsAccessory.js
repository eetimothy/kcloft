import React, { useState, useEffect } from 'react';
import './Cards.css';
import AccessoryCardItem from './AccessoryCardItem';
import { accessoriesColRef } from '../firebase';
import { onSnapshot } from 'firebase/firestore'


function CardsAccessory() {
  const [accessories, setAccessories] = useState([])

  useEffect(() => {
 //realtime collection data: onSnapshot
 onSnapshot(accessoriesColRef, (snapshot) => {
  let acc = []
  snapshot.docs.map((doc) => {
      return acc.push({ ...doc.data(), id: doc.id })
  })
  setAccessories(acc)
})
  }, [])

  // console.log(projects)

  return (
    <div className='cards'>
      <h1>Home Accessories by Luxton</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {/* <CardItem
              src='images/img-9.jpg'
              text='Muji Themed 5 Room BTO At Bidadari'
              label='HDB BTO'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Modern Luxe Theme - Tapestry @ Tampines '
              label='Condos'
              path='/services'
            />      
            <CardItem
              src='images/img-3.jpg'
              text='Maximalist Design Overhaul (Compassvale)'
              label='HDB Resale'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Balinese Spa Concept at Binjai Park'
              label='Landed'
              path='/products'
            /> */}
           
            {
              accessories.map(pro => {
                return  <AccessoryCardItem 
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
    </div>
  );
}

export default CardsAccessory;