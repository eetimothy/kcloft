import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import './EditProject.css'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import Loading from '../../../utils/loading/Loading'
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import uuid from 'uuid-random'

const theme = createTheme();

export default function EditProject() {
    const [user] = useAuthState(auth)
    const params = useParams()
    const [project, setProject] = useState([])
    const [title, setTitle] = useState('')
    const [homeType, setHomeType] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(0)
    const [images, setImages] = useState([])
    const [image1, setImage1] = useState('')
    const [image1Ref, setImage1Ref] = useState('')
    const [image2, setImage2] = useState('')
    const [image2Ref, setImage2Ref] = useState('')
    const [image3, setImage3] = useState('')
    const [image3Ref, setImage3Ref] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(params.id){
            const singleDocRef = doc(db, 'projects', `${params.id}`)
            getDoc(singleDocRef)
                .then((doc) => {
                    setProject(doc.data())
                    setImages(doc.data().imageUrl)
                    // console.log(doc.data().imageUrl[0])
                    setImage1(doc.data().imageUrl[0])
                    setImage2(doc.data().imageUrl[1])
                    setImage3(doc.data().imageUrl[2])
                })
        }
    },[params.id, image1, image2, image3, setImage1, setImage2, setImage3])

    

    const handleDelete = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'projects', `${params.id}`)
        deleteDoc(docRef)
            .then(() => {
                if(images[0]){
                    let picRef1 = ref(storage, images[0])
                    deleteObject(picRef1)
                }
                if(images[1]){
                    let picRef2 = ref(storage, images[1])
                    deleteObject(picRef2)
                }
                if(images[2]){
                    let picRef3 = ref(storage, images[2])
                    deleteObject(picRef3)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                alert('document deleted')
                    navigate("/projects")
            })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const docRef = await doc(db, 'projects', `${params.id}`)
        await updateDoc(docRef, {
            title: title ? title : project.title,
            homeType: homeType ? homeType : project.homeType,
            description: description ? description : project.description
        }).then(() => {
            const singleDocRef = doc(db, 'projects', `${params.id}`)
        getDoc(singleDocRef)
            .then((doc) => {
                setProject(doc.data())
                const res = doc.data()
                setTitle(res.title)
                setHomeType(res.homeType)
                setDescription(res.description)
            })
        })
        alert('Updated Project Details..')
    }

    const deleteImage1 = () => {
        let picRef = ref(storage, images[0])
        // console.log(picRef)

        deleteObject(picRef)
        .then(() => {
            alert('image 1 deleted successfully')
            setImage1('')
        }).then(() => {
            const docRef = doc(db, 'projects', `${params.id}`)
            updateDoc(docRef, {
                imageUrl: [
                    '',
                    image2 ? images[1] : '',
                    image3 ? images[2] : ''
                ]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteImage2 = () => {
        let picRef = ref(storage, images[1])
        // console.log(picRef)

        deleteObject(picRef)
        .then(() => {
            alert('image 2 deleted successfully')
            setImage2('')
        }).then(() => {
            const docRef = doc(db, 'projects', `${params.id}`)
            updateDoc(docRef, {
                imageUrl: [
                    image1 ? images[0] : '',
                    '',
                    image3 ? images[2] : ''
                ]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteImage3 = () => {
        let picRef = ref(storage, images[2])
        // console.log(picRef)

        deleteObject(picRef)
        .then(() => {
            alert('image 3 deleted successfully')
            setImage3('')
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
            const docRef = doc(db, 'projects', `${params.id}`)
            updateDoc(docRef, {
                imageUrl: [
                    image1 ? images[0] : '',
                    image2 ? images[1] : '',
                    ''
                ]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const uploadImage1 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
       
        if(!file) return alert("File does not exist..")
 
        const storageRef = ref(storage, `/project/${auth.currentUser.uid}/${uuid()}`)
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
                const docRef = doc(db, 'projects', `${params.id}`)
                updateDoc(docRef, {
                imageUrl: [
                    url,
                    image2 ? image2 : '',
                    image3 ? image3 : ''
                ]
            })
            setImage1(url)
            setLoading(false)
             })
             .catch((err) => {
                console.log(err)
            })
         })
     }

     const uploadImage2 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
       
        if(!file) return alert("File does not exist..")
 
        const storageRef = ref(storage, `/project/${auth.currentUser.uid}/${uuid()}`)
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
                 const docRef = doc(db, 'projects', `${params.id}`)
                updateDoc(docRef, {
                imageUrl: [
                    image1 ? image1 : '',
                    url,
                    image3 ? image3 : ''
                ]
            })
            setImage2(url)
            setLoading(false)
             })
             .catch((err) => {
                 console.log(err)
             })
            
         })
     }

     const uploadImage3 = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
       
        if(!file) return alert("File does not exist..")
 
        const storageRef = ref(storage, `/project/${auth.currentUser.uid}/${uuid()}`)
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
                const docRef = doc(db, 'projects', `${params.id}`)
                updateDoc(docRef, {
                imageUrl: [
                    image1 ? image1 : '',
                    image2 ? image2 : '',
                    url,
                ]
            })
            setImage2(url)
            setLoading(false)
             })
             .catch((err) => {
                console.log(err)
            })
         })
     }

    const styleUpload = {
        display: images[0] ? "block" : "none"
    }

    const styleUpload2 = {
        display: images[1] ? "block" : "none"
    }

    const styleUpload3 = {
        display: images[2] ? "block" : "none"
    }

    if(!user){
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
                        Edit Project
                    </Typography>

                    <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>

                    <div className="img_container">
                    <h5>Primary Image</h5>
                    <div className="upload">
                        
                            <input type="file" name="file" id="file_up" onChange={uploadImage1}/>
                            {
                                loading ? <div id="file_img"><h1><Loading/></h1></div>
                                    : <div id="file_img" style={styleUpload}>
                                        <img src={image1 ? image1 : ''} alt="" />
                                        <span onClick={deleteImage1}><DeleteForeverIcon style={{ color: "#000" }}/></span>
                                    </div>
                            }
                        </div>

                        <div className="upload" style={{ marginTop: 20 }} onChange={uploadImage2}>
                            <input type="file" name="file" id="file_up"/>
                            {
                                loading ? <div id="file_img"><h1><Loading/></h1></div>
                                    : <div id="file_img" style={styleUpload2}>
                                        <img src={image2 ? image2 : ''} alt="" />
                                        <span onClick={deleteImage2}><DeleteForeverIcon style={{ color: "#000" }}/></span>
                                    </div>
                            }
                        </div>

                        <div className="upload" style={{ marginTop: 20 }} onChange={uploadImage3}>
                            <input type="file" name="file" id="file_up" />
                            {
                                loading ? <div id="file_img"><h1><Loading/></h1></div>
                                    : <div id="file_img" style={styleUpload3}>
                                        <img src={image3 ? image3 : ''} alt="" />
                                        <span onClick={deleteImage3}><DeleteForeverIcon style={{ color: "#000" }}/></span>
                                    </div>
                            }
                        </div>

                        </div>

                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={project.title}
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
                            label={project.homeType}
                            name="homeType"
                            type="text"
                            value={homeType}
                            onChange={(e) => setHomeType(e.target.value)}
                            autoFocus
                            />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            label={project.description}
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

                        <Link to='/projects' style={{ textDecoration: 'none' }}>
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
                    {/* <button type='submit' style={{ cursor: 'pointer', marginRight: '10px' }}>Update</button>
                    <button onClick={handleDelete} style={{ cursor: 'pointer', marginRight: '10px'  }}>Delete</button>
                    <button><Link to='/projects' style={{ textDecoration: 'none' }}>Cancel</Link></button> */}

              
                    
                    
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}