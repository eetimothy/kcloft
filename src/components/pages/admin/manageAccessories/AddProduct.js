import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    addDoc, doc, deleteDoc, serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { productColRef, storage, auth } from '../../../../firebase'
import { Link } from 'react-router-dom';
import uuid from 'uuid-random'
import '../manageProjects/AddProject.css'

export default function AddProduct() {
    const [user] = useAuthState(auth)
    const [images, setImages] = useState([])
    const [urls, setUrls] = useState([])
    const [progress, setProgress] = useState(0)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

  const handleChange = (e) => {
      e.preventDefault()
    //   const file = e.target.files
      for(let i = 0; i < e.target.files.length; i++){
          const newImage = e.target.files[i];
          newImage["id"] = Math.random();
          setImages((prevState) => [...prevState, newImage])
          
      }
  }

  const handleUpload = () => {
      const promises = []
    images.map((image) => {
        const storageRef = ref(storage, `/product/${auth.currentUser.uid}/${image.name}/${uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        promises.push(uploadTask)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref)
                .then((urls) => {
                    setUrls((prevState) => [...prevState, urls])
                })
            }
        )
    })
    Promise.all(promises)
    .then(() => alert('All Images Uploaded'))
    .catch((err) => console.log(err))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
        await addDoc(productColRef, {
            title,
            category,
            description,
            imageUrls: urls,
            createdAt: serverTimestamp()
        }).then(() => {
            console.log('added')
        }).catch((err) => console.log(err))
    
  }

  console.log('images: ', images)
  console.log('urls: ', urls)

  return (
  <div className="form_container">
      <div className="add_form">
      <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      
        
        <br />
        <br />
        <h2>Step 1: Upload Product Images</h2>
        <progress value={progress} max="100"/>
        <input type="file" multiple onChange={handleChange}/>
        <button onClick={handleUpload}>Upload</button>
        {/* <br />
        {urls.map((url, i) => {
            return <div key={i}>{url}</div>
        })} */}
        <br />
        {
            urls.map((url, i) => {
            return <img
            key={i}
             src={url || "http://via.placeholder.com/300"} 
             alt="" 
             style={{ width: '150px'}}
             />
            })
        }

                
                    <h3>Step 2: Enter Product Details</h3>
                    <label htmlFor="title">Product Name</label>
                    <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" value={category} required onChange={(e) => setCategory(e.target.value)} />

                    <label htmlFor="description">Item Description</label>
                    <textarea type="text" name="description" value={description} rows="10" columns="8" required onChange={(e) => setDescription(e.target.value)} />

                    <button type="submit" style={{ marginTop: 10, backgroundColor: "black", color: 'white', cursor: 'pointer' }}>Submit</button>
                    </form>
                    </div>
  </div>
  )
}
