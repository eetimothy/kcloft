import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import emailjs from '@emailjs/browser';

const theme = createTheme();

const Contact = () => {
    const [enquiryType, setEnquiryType] = useState('')
 
    const sendEmail = (e) => {
        e.preventDefault();
       
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USERID)
          .then((result) => {
              alert('Enquiry Sent')
          }, (error) => {
             alert(error.text);
          });
    
      };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Contact
                    </Typography>

                    <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>

                        <InputLabel id="enquiryType">Enquiry Type</InputLabel>
                        <Select
                            fullWidth
                            required
                            id="enquiryType"
                            name="enquiryType"
                            type="text"
                            value={enquiryType}
                            onChange={(e) => setEnquiryType(e.target.value)}
                            label="Enquiry Type"
                        >
                            <MenuItem value="">
                             
                            </MenuItem>
                            <MenuItem value="Quotation">Quotation</MenuItem>
                            <MenuItem value="Product Queries">Product Queries</MenuItem>
                            <MenuItem value="Partnerships">Partnerships</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>

                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type="text"
                            required
                            // value={form.name}
                            // onChange={onChangeInput}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            // value={form.email}
                            // onChange={onChangeInput}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile"
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            type="number"
                            // value={form.mobile}
                            // onChange={onChangeInput}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            label="Message"
                            name="message"
                            rows={4}
                            multiline
                            autoFocus
                            type="text"
                            // value={form.message}
                            // onChange={onChangeInput}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#000', borderRadius: 15 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Contact;