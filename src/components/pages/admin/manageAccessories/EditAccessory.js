import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import '../manageProjects/EditProject.css'
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
import Input from '@mui/material/Input'

const theme = createTheme();

export default function EditAccessory() {
    const [user] = useAuthState(auth)
    const params = useParams()
    const [accessory, setAccessory] = useState([])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        if (params.id) {
            const singleDocRef = doc(db, 'accessories', `${params.id}`)
            getDoc(singleDocRef)
                .then((doc) => {
                    setAccessory(doc.data())
                })
        }

    }, [params.id])


    const handleDelete = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'accessories', `${params.id}`)
        deleteDoc(docRef)
            .then(() => {
                alert('document deleted')
                navigate("/accessories")
            })
    }

    const updateInfo = async (e) => {
        e.preventDefault();
        const docRef = await doc(db, 'accessories', `${params.id}`)
        await updateDoc(docRef, {
            title: title ? title : accessory.title,
            category: category ? category : accessory.title,
            description: description ? description : accessory.description
        }).then(() => {
            const singleDocRef = doc(db, 'accessories', `${params.id}`)
            getDoc(singleDocRef)
                .then((doc) => {
                    setAccessory(doc.data())

                    const res = doc.data()
                    setDescription(res.description)
                    setCategory(res.category)
                    setTitle(res.title)
                })
        })
        alert('Product Updated..')
    }



    if (!user) {
        return (
            <div><Link to='/login'>Please login to continue</Link></div>
        )
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
                        Edit Product
                    </Typography>

                    <Box component="form" onSubmit={updateInfo} noValidate sx={{ mt: 1 }}>

                        <img src={accessory.imageUrl} alt="" width="350" height="300" style={{ marginBottom: '30px' }} />
                        <Input type='file' />
                        <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={accessory.title}
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={accessory.category}
                            name="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            label={accessory.description}
                            name="description"
                            type="text"
                            autoComplete="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="btn-grp" style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: '#000', borderRadius: 15 }}
                            >
                                Update
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: '#000', borderRadius: 15 }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>

                            <Link to='/accessories' style={{ textDecoration: 'none' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ backgroundColor: '#000', borderRadius: 15 }}
                                >

                                    Cancel
                                </Button>
                            </Link>
                        </div>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}