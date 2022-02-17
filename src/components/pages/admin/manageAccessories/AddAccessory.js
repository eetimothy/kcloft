import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import '../manageProjects/AddProject.css'
import {
    addDoc, doc, deleteDoc, serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { accessoriesColRef, storage, auth } from '../../../../firebase'
import { Link } from 'react-router-dom';
import uuid from 'uuid-random'

export default function AddAccessory() {
    const [user] = useAuthState(auth)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
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

        const storageRef = ref(storage, `/accessory/${auth.currentUser.uid}/${uuid()}`)
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
        await addDoc(accessoriesColRef, {
            title,
            category,
            description,
            imageUrl: url,
            createdAt: serverTimestamp()
        })
    }

    if(!user) {
        return <Link to='/login'> Please Login to continue</Link>
    }

    return (
        <div className="form_container">
           
            <div className="add_form">
            
                <form onSubmit={handleUpload}>
                    <h2>Add Accessory</h2>
                    <input type="file" />
                    <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5>
                    {/* 
                <input type="file"/>
                <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5>

                <input type="file"/>
                <h5 style={{ paddingBottom: '10px' }}>Uploaded {progress} %</h5> */}

                    <label htmlFor="title">Accessory Name</label>
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