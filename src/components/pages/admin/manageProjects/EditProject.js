import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import './EditProject.css'
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

export default function EditProject() {
    const [user] = useAuthState(auth)
    const params = useParams()
    const [project, setProject] = useState([])
    const [title, setTitle] = useState('')
    const [homeType, setHomeType] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(params.id){
            const singleDocRef = doc(db, 'projects', `${params.id}`)
            getDoc(singleDocRef)
                .then((doc) => {
                    setProject(doc.data())
                })
        }
    },[params.id])


    const handleDelete = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'projects', `${params.id}`)
        deleteDoc(docRef)
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
           
                    <img src={project.imageUrl} alt="" width="450" height="300" style={{ marginBottom: '30px' }}/>
                    
                        <Input type='file'/>
                        <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5>

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