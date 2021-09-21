import React from 'react'
import {Logo, HeaderContainer, RightContainer} from './styles'

const Header = ({children}) => (
  <HeaderContainer>
    <a href="/">
      <Logo title="Spacestagram" />
    </a>
    <RightContainer>{children}</RightContainer>
  </HeaderContainer>
)

export default Header
