import { useState } from 'react'
import * as React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import './AddProject.css'
import {
    addDoc,  serverTimestamp
   
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { projColRef, storage, auth } from '../../../../firebase'
import { Link } from 'react-router-dom';
import uuid from 'uuid-random'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input'

const theme = createTheme();

export default function AddProject() {
    const [user] = useAuthState(auth)
    const [title, setTitle] = useState('')
    const [homeType, setHomeType] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(0)

    const handleUpload = async (e) => {
        e.preventDefault()
        // const fileList = []
        // const file = e.target[0].files[0]
        const file1 = e.target[0].files[0]
        // const file2 = e.target[1].files[0]
        // const file3 = e.target[2].files[0]
        // console.log(file1, file2, file3)

        // if(file1 && !file2 && !file3){
        //     fileList.push(file1)
        // } else if (file1 && file2 && !file3){
        //     fileList.push(file1, file2)
        // } else if (file1 && file2 && file3) {
        //     fileList.push(file1, file2, file3)
        // }

        // console.log(fileList)

        // fileList.forEach((file) => {
        //     console.log(file)
        // })
        uploadToFirebaseStorage(file1)
    }

    const uploadToFirebaseStorage = (file1) => {
        if (!file1) return alert('Please include an image.');



        // fileList.forEach((file) => {

        const storageRef = ref(storage, `/project/${auth.currentUser.uid}/${uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, file1)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(prog)
            console.log(snapshot)
        }, (err) => console.log(err),

            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        handleSubmitDetails(url)
                    })
            })
        // })


    }

    const handleSubmitDetails = async (url) => {
        await addDoc(projColRef, {
            title,
            homeType,
            description,
            imageUrl: url,
            createdAt: serverTimestamp()
        })
    }

    if (!user) {
        return <Link to='/login'> Please Login to continue</Link>
    }

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
                        Add Project
                    </Typography>

                    <Box component="form" onSubmit={handleUpload} noValidate sx={{ mt: 1 }}>

                        <Input type='file'/>
                        <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Project Title"
                            name="title"
                            type="text"
                            autoComplete="title"
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Home Type"
                            name="homeType"
                            type="text"
                            autoComplete="homeType"
                            onChange={(e) => setHomeType(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={5}
                            label="Project Description"
                            name="description"
                            type="text"
                            autoComplete="description"
                            onChange={(e) => setDescription(e.target.value)}
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
    )
}