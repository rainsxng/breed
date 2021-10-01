import { ImageList, ImageListItem } from '@mui/material';
import React from 'react'
interface Props {
    images : string[]
}

const PhotoList:React.FC<Props> = ({images}) => {
    return (
        <ImageList sx={{ width: 700, height: 450 }} cols={3} rowHeight={164}>
        {images.map((image) => (
          <ImageListItem key={image}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt='Breed'
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    )
}

export default PhotoList
