import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../../../firebase"
import './ProjectDetails.css'
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'

export default function ProjectDetails() {
    const [id, setId] = useState('')
    const [project, setProject] = useState([])
    const [images, setImages] = useState([])
    const params = useParams()

    const shareUrl = `www.kcloft/project_details/${params.id}`

    useEffect(() => {
        if (params)
            setId(params)

        const singleDocRef = doc(db, 'projects', `${params.id}`)
        getDoc(singleDocRef)
            .then((doc) => {
                setProject(doc.data())
                setImages(doc.data().imageUrl)
            })
    }, [params, id])

    return (
        <div className="details">
            <img src={images[0]} alt="" />
        <div className="box-detail">
            <div className="row">
                <h2>{project.title}</h2>
                
            </div>
            <br />
            <h6>Project Details</h6>
                <p>Housing Type: {project.homeType}</p>
            <br />
            <h6>Project Description</h6>
            <p>{project.description}</p>
            <br />
            <h6>Share: </h6>
            <p>
                        <span>
                            <WhatsappShareButton url={shareUrl}>
                                <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>

                            <FacebookShareButton url={shareUrl} style={{ paddingLeft: '5px' }}>
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                        </span>
                    </p>
        </div>
        </div>

    )
}