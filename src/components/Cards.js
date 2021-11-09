import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out Our Featured Projects!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
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
          </ul>
          <ul className='cards__items'>
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
            />
            <CardItem
              src='images/img-8.jpg'
              text='Bubble Tea Shop at Plaza Singapura'
              label='Commercial'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;