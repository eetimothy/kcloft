import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom'
import './Hero.css'
import '../App.css'

function Hero() {
    return (
        <div className="hero-container">
            {/* autoplay loop */}
            <video src='/videos/video-2.mp4' muted style={{height: '70vh'}}/>
            <h1>DREAM HOME AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Link to="/contact">
                <Button 
                className='btns' 
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                >
                    GET QUOTE
                    </Button>
                    </Link>

                    <Link to="/projects">
                    <Button 
                className='btns' 
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                >
                    VIEW PROJECTS <i className='far fa-play-circle' />
                    </Button>
                    </Link>
            </div>
        </div>
    )
}

export default Hero