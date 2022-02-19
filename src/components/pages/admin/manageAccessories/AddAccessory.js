import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import '../manageProjects/AddProject.css'
import {
    addDoc, serverTimestamp

} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage"
import { accessoriesColRef, storage, auth } from '../../../../firebase'
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'uuid-random'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import Loading from '../../../utils/loading/Loading'

const theme = createTheme();

export default function AddAccessory() {
    const [user] = useAuthState(auth)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(0)
    const [image1, setImage1] = useState('')
    const [image1Ref, setImage1Ref] = useState('')
    const [image2, setImage2] = useState('')
    const [image2Ref, setImage2Ref] = useState('')
    const [image3, setImage3] = useState('')
    const [image3Ref, setImage3Ref] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image1 && !image2 && !image3)
            return alert('Please upload at least 1 photo.')

        await addDoc(accessoriesColRef, {
            title,
            price,
            category,
            description,
            imageUrl: [image1, image2, image3],
            createdAt: serverTimestamp()
        })
        alert('New Product added: ', title)
        navigate("/accessories")
    }

    const uploadImage1 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (!file) return alert("File does not exist..")

        const storageRef = ref(storage, `/accessory/${auth.currentUser.uid}/${uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(prog)
            setLoading(true)
            // console.log(snapshot, snapshot.ref.fullPath)
            setImage1Ref(snapshot.ref.fullPath)
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        // console.log(url)
                        setImage1(url)
                        // console.log(image1)
                        setLoading(false)
                    })
            })
    }

    const uploadImage2 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (!file) return alert("File does not exist..")

        const storageRef = ref(storage, `/accessory/${auth.currentUser.uid}/${uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(prog)
            setLoading(true)
            //  console.log(snapshot, snapshot.ref.fullPath)
            setImage2Ref(snapshot.ref.fullPath)
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        //  console.log(url)
                        setImage2(url)
                        //  console.log(image2)
                        setLoading(false)
                    })
            })
    }

    const uploadImage3 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (!file) return alert("File does not exist..")

        const storageRef = ref(storage, `/accessory/${auth.currentUser.uid}/${uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(prog)
            setLoading(true)
            //  console.log(snapshot, snapshot.ref.fullPath)
            setImage3Ref(snapshot.ref.fullPath)
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        //  console.log(url)
                        setImage3(url)
                        //  console.log(image3)
                        setLoading(false)
                    })
            })
    }

    const deleteImage1 = () => {
        const imgRef = ref(storage, image1Ref)
        deleteObject(imgRef)
            .then(() => {
                alert('image deleted..')
                setImage1('')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteImage2 = () => {
        const imgRef = ref(storage, image2Ref)
        deleteObject(imgRef)
            .then(() => {
                alert('image 2 deleted..')
                setImage2('')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteImage3 = () => {
        const imgRef = ref(storage, image3Ref)
        deleteObject(imgRef)
            .then(() => {
                alert('image 3 deleted..')
                setImage3('')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const styleUpload = {
        display: image1 ? "block" : "none"
    }

    const styleUpload2 = {
        display: image2 ? "block" : "none"
    }

    const styleUpload3 = {
        display: image3 ? "block" : "none"
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
                        Add Product
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <div className="img_container">

                            <h5>Primary Image</h5>
                            <div className="upload">

                                <input type="file" name="file" id="file_up" onChange={uploadImage1} />
                                {
                                    loading ? <div id="file_img"><h1><Loading /></h1></div>
                                        : <div id="file_img" style={styleUpload}>
                                            <img src={image1 ? image1 : ''} alt="" />
                                            <span onClick={deleteImage1}><DeleteForeverIcon style={{ color: "#000" }} /></span>
                                        </div>
                                }
                            </div>

                            <div className="upload" style={{ marginTop: 20 }}>
                                <input type="file" name="file" id="file_up" onChange={uploadImage2} />
                                {
                                    loading ? <div id="file_img"><h1><Loading /></h1></div>
                                        : <div id="file_img" style={styleUpload2}>
                                            <img src={image2 ? image2 : ''} alt="" />
                                            <span onClick={deleteImage2}><DeleteForeverIcon style={{ color: "#000" }} /></span>
                                        </div>
                                }
                            </div>

                            <div className="upload" style={{ marginTop: 20 }}>
                                <input type="file" name="file" id="file_up" onChange={uploadImage3} />
                                {
                                    loading ? <div id="file_img"><h1><Loading /></h1></div>
                                        : <div id="file_img" style={styleUpload3}>
                                            <img src={image3 ? image3 : ''} alt="" />
                                            <span onClick={deleteImage3}><DeleteForeverIcon style={{ color: "#000" }} /></span>
                                        </div>
                                }
                            </div>

                        </div>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Product Name"
                            name="title"
                            type="text"
                            autoComplete="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            autoComplete="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Product Category"
                            name="category"
                            type="text"
                            autoComplete="category"
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
                            label="Product Description"
                            name="description"
                            type="text"
                            autoComplete="description"
                            value={description}
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