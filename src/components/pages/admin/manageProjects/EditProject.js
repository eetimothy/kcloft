import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import './EditProject.css'

export default function EditProject() {
    const [user] = useAuthState(auth)
    const params = useParams()
    const [project, setProject] = useState([])
    const [title, setTitle] = useState('')
    const [homeType, setHomeType] = useState('')
    const [description, setDescription] = useState('')
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
        <div className='edit_page'>
           
            <div className='edit_form'>
           
                <form onSubmit={handleUpdate}>
                <h1>Edit Project</h1>

                    <img src={project.imageUrl} alt="" width="450" height="300" style={{ marginBottom: '30px' }}/>
                    <input type="file" style={{ marginBottom: '30px' }}/>


                     <label htmlFor="title">Project Name:           </label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={project.title}/>
                     <br />
                    <label htmlFor="homeType">Home Type:       </label>
                    <input type="text" name="updatedHomeType" style={{ marginBottom: '30px' }} value={homeType} onChange={(e) => setHomeType(e.target.value)} placeholder={project.homeType}/>

                    <label htmlFor="description">Project Description:       </label>
                    <textarea type="text" name="updatedDescription" value={description}  style={{ marginBottom: '10px' }} rows="10" columns="8" onChange={(e) => setDescription(e.target.value)} placeholder={project.description}/>

                    <span style={{padding: '10px'}}>
                        
                    <button type='submit' style={{ cursor: 'pointer', marginRight: '10px' }}>Update</button>
                    <button onClick={handleDelete} style={{ cursor: 'pointer', marginRight: '10px'  }}>Delete</button>
                    <button><Link to='/projects' style={{ textDecoration: 'none' }}>Cancel</Link></button>

                    </span>
                    
                    </form>
            </div>
        </div>
    )
}