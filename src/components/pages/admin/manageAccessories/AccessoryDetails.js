import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../../../firebase"
import '../manageProjects/ProjectDetails.css'
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function AccessoryDetails() {
    const [id, setId] = useState('')
    const [product, setProduct] = useState([])
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
        autoplaySpeed: 5000,
        dotsClass: "slick-dots custom-indicator",
    }

    const shareUrl = `www.kcloft/accessory_details/${params.id}`

    useEffect(() => {
        if (params)
            setId(params)

        const singleDocRef = doc(db, 'accessories', `${params.id}`)
        getDoc(singleDocRef)
            .then((doc) => {
                setProduct(doc.data())
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
                <h2>{product.title}</h2>
                
            </div>
            <br />
            <h6>Product Details</h6>
                <p>Product Category: {product.category}</p>
            <br />
            <h6>Product Description</h6>
            <p>{product.description}</p>
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