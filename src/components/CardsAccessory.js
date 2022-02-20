import React, { useState, useEffect, useRef } from 'react';
import './Cards.css';
import AccessoryCardItem from './AccessoryCardItem';
import { accessoriesColRef } from '../firebase';
import { onSnapshot } from 'firebase/firestore'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Hidden from '@mui/material/Hidden'

function CardsAccessory() {
  const [accessories, setAccessories] = useState([])
  const sliderRef = useRef(null)

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

  const responsiveSettings = {
    slidesToShow: 3,
    ref: sliderRef,
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
     ]
  }

return (
  <div className='cards'>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 50px', flexWrap: 'wrap' }}>
      <h2>Home Accessories</h2>
      <Hidden smDown={true}>
      <div style={{ display: 'flex'}}>
        <div 
        style={{ 
          width: 40, 
          height: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginRight: 7, 
          cursor: 'pointer', 
          boxShadow: "0 1px 3px rgb(0 0 0 / 10%)",
          color: 'gray'
          }}
          onClick={() => sliderRef.current.slickPrev()}
          >
          <ArrowBackIosIcon/>
        </div>
        <div 
        style={{ 
          width: 40, 
          height: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          boxShadow: "0 1px 3px rgb(0 0 0 / 10%)",
          color: 'gray'
          }}
          onClick={() => sliderRef.current.slickNext()}
          >
          <ArrowForwardIosIcon/>
        </div>
        </div>
        </Hidden>
      </div>
      <div style={{ margin: 30 }}>
        <Slider {...responsiveSettings}>
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

        </Slider>
      </div>

      <Hidden mdUp={true}>
      <div style={{ display: 'flex', marginLeft: 90, marginTop: -30 }}>
        <div 
        style={{ 
          width: 40, 
          height: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginRight: 20, 
          cursor: 'pointer', 
          boxShadow: "0 1px 3px rgb(0 0 0 / 10%)",
          color: 'gray'
          }}
          onClick={() => sliderRef.current.slickPrev()}
          >
          <ArrowBackIosIcon/>
        </div>
        <div 
        style={{ 
          width: 40, 
          height: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          boxShadow: "0 1px 3px rgb(0 0 0 / 10%)",
          color: 'gray'
          }}
          onClick={() => sliderRef.current.slickNext()}
          >
          <ArrowForwardIosIcon/>
        </div>
        </div>
        </Hidden>


  </div>
);

  // return (
  //   <div className='cards' style={{height: 650}}>
  //     <h1>Home Accessories by Luxton</h1>
  //     <div className='cards__container'>
  //       <div className='cards__wrapper'>
  //         <ul className='cards__items'>
  //           {
  //             accessories.map(pro => {
  //               return  <AccessoryCardItem 
  //                       key={pro.id}
  //                       src={pro.imageUrl}
  //                       text={pro.title}
  //                       label={pro.category}
  //                       path={`/accessory_details/${pro.id}`}
  //                       />
                     
  //             })
  //           }
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default CardsAccessory;