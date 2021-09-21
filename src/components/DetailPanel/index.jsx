import React, {useRef, useEffect} from 'react'
import Photo from '../Photo'
import {CloseWrapper, Panel, BG, P, Em} from './styles'
import {Close, Button} from '../../styles'

const DetailPanel = ({photo, closePanel, state, toggleFave}) => {
  const panelEl = useRef(null)
  const prevPhoto = useRef(null)

  useEffect(() => {
    if (prevPhoto.current !== photo) {
      panelEl.current.scrollTop = 0
    }
    prevPhoto.current = photo
  }, [photo, prevPhoto])

  return (
    <>
      <BG onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <CloseWrapper onClick={closePanel} $state={state}>
          <Close />
        </CloseWrapper>
        {photo && (
          <>
            <Button onClick={() => toggleFave(photo.date)} $hasEmoji={true}>
              {photo.isFaved ? '💔 Unfave pic' : '❤️ Fave pic'}
            </Button>
            <Photo photo={photo} isLarge={true} />
            <P>{photo.explanation}</P>
            <P>
              <Em>Photo taken on {photo.date}</Em>
            </P>
          </>
        )}
      </Panel>
    </>
  )
}

export default DetailPanel
