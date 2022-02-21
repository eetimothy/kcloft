import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../../../firebase"
import './ProjectDetails.css'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function ProjectDetails() {
    const [id, setId] = useState('')
    const [project, setProject] = useState([])
    const [images, setImages] = useState([])
    const params = useParams()

    const settings = {
        dots: true,
        infinite: true,
        width: 600,
        slidesToShow: 1,
        variableWidth: true,
        centerMode: false,
        centerPadding: '10px',
        rows: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dotsClass: "slick-dots custom-indicator",
    }


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

            <div className="details_slider" style={{ marginLeft: 100, marginRight: 100, marginBottom: 30 }}>
                <Slider {...settings}>
                    {images.map(item => (
                        <div key={item} style={{ width: 600 }}>
                            <img src={item} alt="" style={{ width: '500px', height: '400px', objectFit: 'cover', overflow: 'hidden'}} />
                        </div>
                    ))}
                </Slider>
            </div>

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