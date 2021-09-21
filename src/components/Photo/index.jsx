import React from 'react'
import {Container, Cover, Title} from './styles'

const Photo = ({photo, pickPhoto, isLarge}) => (
  <Container $isLarge={isLarge} onClick={() => pickPhoto && pickPhoto(photo.date)}>
    <Cover alt={`${photo.title}`} src={photo.url} />
    <figcaption>
      <Title $isLarge={isLarge}>{photo.title}</Title>
    </figcaption>
  </Container>
)

export default Photo
