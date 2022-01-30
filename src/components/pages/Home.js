import React from 'react';
import '../../App.css'
import Cards from '../Cards';
import CardsAccessory from '../CardsAccessory';
import Hero from '../Hero'
import Footer from './footer/Footer';


function Home() {
    return (
        <>
          <Hero/>
          <Cards/>
          <CardsAccessory/>
          <Footer/>
        </>
    )
}

export default Home;