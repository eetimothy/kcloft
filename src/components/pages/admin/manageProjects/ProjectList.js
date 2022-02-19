import React, { useState, useEffect } from 'react';
import './ProjectList.css'
import CardItem from '../../../CardItem';
import { projColRef, auth } from '../../../../firebase';
import { onSnapshot } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from '@mui/material/Typography';

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (user)
      setAdmin(true)
  }, [user, admin])

  useEffect(() => {
    //realtime collection data: onSnapshot
    onSnapshot(projColRef, (snapshot) => {
      let proj = []
      snapshot.docs.map((doc) => {
        return proj.push({ ...doc.data(), id: doc.id })
      })
      // console.log(proj)
      setProjects(proj)
    })
  }, [])

  // console.log(projects)
  return (
    <div className="container">

      <Typography component="h1" variant="h5">
        Completed Projects
      </Typography>
      <div className='list__wrapper'>
        <ul>
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
  );
}