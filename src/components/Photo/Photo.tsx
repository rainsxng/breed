import React from 'react';

interface Props {
    imageUrl : string;
}

const Photo:React.FC<Props> = ({imageUrl}) => {
    return (
        <div className="image">
            <img width="100%" height="100%" src={imageUrl} alt='Breed photo' />
        </div>
    )
};

export default Photo;
