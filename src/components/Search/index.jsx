import React, {useRef, useState} from 'react'
import {SearchContainer, Input, Icon, Wrapper, FaveButtonContainer, Counter} from './styles'
import {Close, Button} from '../../styles'

const FaveButton = ({favePhotosLength, toggleShowFaves, showFaves}) => (
  <FaveButtonContainer>
    <Counter>{favePhotosLength}</Counter>
    <Button onClick={toggleShowFaves} $isHeader={true}>
      {showFaves ? 'Hide faves' : 'Show faves'}
    </Button>
  </FaveButtonContainer>
)

const Search = ({filterPhotos, favePhotosLength, toggleShowFaves, showFaves}) => {
  const inputEl = useRef(null)
  const [showOnDesktop, setShowOnDesktop] = useState(false)

  const handleChange = (event) => {
    filterPhotos(event.target.value)
  }

  const showSearch = () => {
    setShowOnDesktop(true)
  }

  const clearSearch = () => {
    filterPhotos('')
    setShowOnDesktop(false)
    inputEl.current.value = ''
  }

  return (
    <Wrapper>
      <FaveButton
        toggleShowFaves={toggleShowFaves}
        showFaves={showFaves}
        favePhotosLength={favePhotosLength}
      />
      <SearchContainer $showOnDesktop={showOnDesktop}>
        <Icon onClick={showSearch} />
        <Input ref={inputEl} type="text" name="search" onChange={handleChange} autoComplete="off" />
        <Close onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  )
}

export default Search
