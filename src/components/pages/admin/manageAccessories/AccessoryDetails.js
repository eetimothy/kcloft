import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../../../firebase"
import '../manageProjects/ProjectDetails.css'
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'


export default function AccessoryDetails() {
    const [id, setId] = useState('')
    const [product, setProduct] = useState([])
    const params = useParams()

    const shareUrl = `www.kcloft/accessory_details/${params.id}`

    useEffect(() => {
        if (params)
            setId(params)

        const singleDocRef = doc(db, 'accessories', `${params.id}`)
        getDoc(singleDocRef)
            .then((doc) => {
                setProduct(doc.data())
            })
    }, [params, id])


    return (
        <div className="details">
            <img src={product.imageUrl} alt="" />
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