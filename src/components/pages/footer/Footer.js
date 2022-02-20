import './Footer.css'
import * as React from 'react';
import { useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'
import Logo from '../../images/footer_logo.png'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" to="http://kcloft.com.sg/" style={{ color: "#000" }}>
                Kclofinterior.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <div className="footer-container">
         <Divider />
            <div className="footer-wrapper" style={{ display: 'flex', paddingTop: '50px', paddingLeft: '50px' }}>
           
                <div className="footer-logo" style={{ display: 'flex', flex: '1'}}>
                <a href="https://www.tiktok.com/@kcloftinterior"><img src={Logo} alt="" width="250px" /></a>
                </div>

                <div className="menu-footer" style={{ paddingLeft: '120px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'left' }}>

                    <h5 style={{ marginBottom: '15px' }}>Company</h5>
                    <Link to="/about"><p>About</p></Link>
                    <Link to="/contact"><p>Contact us</p></Link>
                    <p></p>
                    <p></p>
                </div>


                <div className="menu-footer" style={{ paddingLeft: '80px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'top' }}>
                    <h5 style={{ marginBottom: '15px' }}>Products & Services</h5>
                    <Link to="/projects"><p>Completed Projects</p></Link>
                    <Link to="/accessories"><p>Home Accessories</p></Link>
                    <p></p>
                    <p></p>
                    
                </div>

                <div className="menu-footer" style={{ paddingLeft: '100px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'left' }}>
                    <h5 style={{ marginBottom: '15px' }}>Admin Area</h5>
                    <Link to="/dashboard"><p>Admin Dashboard</p></Link>
                    <Link to="/login"><p>Admin Log in</p></Link>
                    <p></p>
                    <p></p>
                </div>

            </div>

            <Divider style={{ marginTop: '30px' }} />

            <div className="div footer-comments-wrapper" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between', paddingLeft: 50, paddingRight: 90, flexWrap: 'wrap' }}>

                <div className="div footer-comments" style={{ display: 'flex' }}>
                    <div>
                        <a href="https://www.facebook.com/pages/category/Interior-Design-Studio/KC-Loft-Interior-Pte-Ltd-270842576899063/">
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="facebook"
                        >
                            <FacebookIcon style={{ color: '#263238' }} />
                        </IconButton>
                        </a>
                    </div>
                    <div style={{ paddingLeft: '20px' }}>
                        <a href="https://www.tiktok.com/@kcloftinterior">
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="instagram"
                        >
                            <InstagramIcon style={{ color: '#263238' }} />
                        </IconButton>
                        </a>
                    </div>
                    
                    <div style={{ paddingLeft: '20px' }}>
                        <a href="https://wa.me/84881107">
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="whatsapp"
                        >
                            <WhatsAppIcon style={{ color: '#263238' }} />
                        </IconButton>
                        </a>
                    </div>

                </div>
                <div className="div footer-comments" style={{ display: 'flex' }}>

                </div>
                <div className="div footer-comments" style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                    <Copyright />
                </div>
            </div>
        </div>

    )
}