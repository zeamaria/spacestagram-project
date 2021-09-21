import React, {useState, useEffect} from 'react'
import PhotosContainer from './components/PhotosContainer'
import Header from './components/Header'
import DetailPanel from './components/DetailPanel'
import Search from './components/Search'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [showPanel, setShowPanel] = useState(false)
  const [showFaves, setShowFaves] = useState(false)
  const favePhotoIds = JSON.parse(localStorage.getItem('favePhotoIds') || '[]')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=1bI8c6aDCLPD3LQyPhoBM0D5XIL8GSHY6nJFs0o0&start_date=2021-08-03&end_date=2021-08-22'
      )
      const photos = await response.json()
      setPhotos(photos.map((photo) => ({...photo, isFaved: favePhotoIds.includes(photo.date)})))
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pickPhoto = (photoId) => {
    setPhotos((photos) => photos.map((photo) => ({...photo, isPicked: photo.date === photoId})))
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
  }

  const toggleShowFaves = () => {
    setShowFaves((showFaves) => !showFaves)
  }

  const toggleFave = (photoId) => {
    setPhotos((photos) => {
      const updatedPhotos = photos.map((photo) =>
        photo.date === photoId ? {...photo, isFaved: !photo.isFaved} : photo
      )
      localStorage.setItem(
        'favePhotoIds',
        JSON.stringify(updatedPhotos.filter(({isFaved}) => isFaved).map(({date}) => date))
      )
      return updatedPhotos
    })
  }

  const filterPhotos = (searchTerm) => {
    const stringSearch = (photoAttribute, searchTerm) =>
      photoAttribute.toLowerCase().includes(searchTerm.toLowerCase())

    setPhotos((photos) =>
      photos.map((photo) => {
        const isFiltered = !searchTerm
          ? false
          : stringSearch(photo.title, searchTerm)
          ? false
          : true
        return {...photo, isFiltered: isFiltered}
      })
    )
  }

  const hasFiltered = photos.some((photo) => photo.isFiltered)

  const displayPhotos = hasFiltered
    ? photos.filter((photo) => !photo.isFiltered)
    : showFaves
    ? photos.filter((photo) => photo.isFaved)
    : photos

  const selectedPhoto = photos.find((photo) => photo.isPicked)

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search
          filterPhotos={filterPhotos}
          toggleShowFaves={toggleShowFaves}
          showFaves={showFaves}
          favePhotosLength={favePhotoIds.length}
        />
      </Header>
      <PhotosContainer
        photos={displayPhotos}
        pickPhoto={pickPhoto}
        isPanelOpen={showPanel}
        title={hasFiltered ? 'Search results' : showFaves ? 'Favorite photos' : 'All photos'}
      />
      <Transition in={showPanel} timeout={300}>
        {(state) => (
          <DetailPanel
            photo={selectedPhoto}
            state={state}
            toggleFave={toggleFave}
            closePanel={closePanel}
          />
        )}
      </Transition>
    </>
  )
}
export default App
