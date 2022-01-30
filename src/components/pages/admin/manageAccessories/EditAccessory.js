import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import '../manageProjects/EditProject.css'


export default function EditAccessory() {
    const [user] = useAuthState(auth)
    const params = useParams()
    const [accessory, setAccessory] = useState([])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
  

    useEffect(() => {
        if(params.id){
            const singleDocRef = doc(db, 'accessories', `${params.id}`)
            getDoc(singleDocRef)
                .then((doc) => {
                    setAccessory(doc.data())
                })
        }
        
    },[params.id])


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



    if(!user){
        return (
            <div><Link to='/login'>Please login to continue</Link></div>
        )
    }

    return (
        <div className='edit_page'>
           
            <div className='edit_form'>
           
                <form onSubmit={updateInfo}>
                <h1>Edit Product</h1>

                    <img src={accessory.imageUrl} alt="" width="350" height="300" style={{ marginBottom: '30px' }}/>
                    <input type="file" style={{ marginBottom: '30px' }}/>


                     <label htmlFor="title">Product Name:</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={accessory.title}/>
                     <br />
                    <label htmlFor="category">Category:</label>
                    <input type="text" name="category" style={{ marginBottom: '30px' }} value={category} onChange={(e) => setCategory(e.target.value)} placeholder={accessory.category} />

                    <label htmlFor="description">Project Description:</label>
                    <textarea type="text" name="description" value={description}  style={{ marginBottom: '10px' }} rows="10" columns="8" onChange={(e) => setDescription(e.target.value)} placeholder={accessory.description}/>

                    <span style={{padding: '10px'}}>
                        
                    <button type='submit' style={{ cursor: 'pointer', marginRight: '10px' }}>Update</button>
                    <button onClick={handleDelete} style={{ cursor: 'pointer', marginRight: '10px'  }}>Delete</button>
                    <button><Link to='/accessories' style={{ textDecoration: 'none' }}>Cancel</Link></button>

                    </span>
                    
                    </form>
            </div>
        </div>
    )
}