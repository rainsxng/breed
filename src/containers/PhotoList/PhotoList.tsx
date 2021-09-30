import React from 'react'
import Photo from "../../components/Photo/Photo";

interface Props {
    images : string[]
}

const PhotoList:React.FC<Props> = ({images}) => {
    const renderImages = () => {
        return images.map((image, i) => {
            return (
                <Photo key={i} imageUrl={image} />
            )
        })
    }
    return (
        <div className="PhotosList">
            {renderImages()}
        </div>
    )
}

export default PhotoList
