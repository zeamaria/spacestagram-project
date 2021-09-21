import React, {useRef, useEffect, useState} from 'react'
import {debounce} from 'lodash-es'
import Photo from '../Photo'
import {Container, H2, PhotoList, NoPhotosContainer, H3, SadFace, H4} from './styles'

const NoPhotosMessage = () => (
  <NoPhotosContainer>
    <H3>Hang on there space cadet!</H3>
    <SadFace />
    <H4>Your photos are loading...</H4>
  </NoPhotosContainer>
)

const PhotosContainer = ({photos, pickPhoto, title, isPanelOpen}) => {
  const prevPanelState = useRef(false)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    if (prevPanelState.current && !isPanelOpen) {
      window.scroll(0, scroll)
    }
    prevPanelState.current = isPanelOpen
  }, [isPanelOpen, prevPanelState, scroll])

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScroll(window.scrollY)
    }, 100)

    if (!isPanelOpen) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPanelOpen])

  return (
    <Container $isPanelOpen={isPanelOpen} $top={scroll}>
      <H2>{title}</H2>
      {photos.length > 0 ? (
        <PhotoList>
          {photos.map((photo) => (
            <Photo key={photo.date} photo={photo} pickPhoto={pickPhoto} />
          ))}
        </PhotoList>
      ) : (
        <NoPhotosMessage />
      )}
    </Container>
  )
}

export default PhotosContainer
