import React, { useState, useEffect } from 'react';
import '../../../Cards.css'
import CardItem from '../../../CardItem';
import { projColRef, auth } from '../../../../firebase';
import { onSnapshot } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProjectList() {
    const [projects, setProjects] = useState([])
    const [user] = useAuthState(auth);
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        if(user)
       setAdmin(true)
    },[user, admin])

useEffect(() => {
   //realtime collection data: onSnapshot
   onSnapshot(projColRef, (snapshot) => {
    let proj = []
    snapshot.docs.map((doc) => {
        return proj.push({ ...doc.data(), id: doc.id })
    })
    console.log(proj)
    setProjects(proj)
  })
    }, [])
  
    // console.log(projects)
    return (
        <div className='cards'>
          <h1>Our Projects</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                {/* <CardItem
                  src='images/img-9.jpg'
                  text='Muji Themed 5 Room BTO At Bidadari'
                  label='HDB BTO'
                  path='/services'
                />
                <CardItem
                  src='images/img-2.jpg'
                  text='Modern Luxe Theme - Tapestry @ Tampines '
                  label='Condos'
                  path='/services'
                />      
                <CardItem
                  src='images/img-3.jpg'
                  text='Maximalist Design Overhaul (Compassvale)'
                  label='HDB Resale'
                  path='/services'
                />
                <CardItem
                  src='images/img-4.jpg'
                  text='Balinese Spa Concept at Binjai Park'
                  label='Landed'
                  path='/products'
                /> */}
               
                {
                  projects.map(pro => {
                    return <CardItem 
                            key={pro.id}
                            src={pro.imageUrl}
                            text={pro.title}
                            label={pro.homeType}
                            path={`/project_details/${pro.id}`}
                            />
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      );
}