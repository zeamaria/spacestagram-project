import styled from 'styled-components'
import {Pill} from '../../styles'
import {ReactComponent as MagnifyingIcon} from '../../assets/search.svg'

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1000px) {
    border-top: 2px solid black;
    align-items: center;
    justify-content: center;
    background: #0d448c;
    height: 64px;
    width: 100vw;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
    gap: unset;
  }
`

export const SearchContainer = styled(Pill)`
  width: ${({$showOnDesktop}) => ($showOnDesktop ? '420px' : '20px')};
  transition: 300ms;

  @media (max-width: 1000px) {
    width: 85%;
  }

  input,
  button {
    display: ${({$showOnDesktop}) => ($showOnDesktop ? 'block' : 'none')};
  }

  @media (max-width: 1000px) {
    display: block;
  }
`

export const Input = styled.input`
  font-family: 'Work Sans', sans-serif;
  font-family: 700;
  font-size: 18px;
  flex-grow: 1;
  background: inherit;
  border: none;
  padding: 6px;
`

export const Icon = styled(MagnifyingIcon)`
  width: 30px;
  cursor: pointer;
`

export const FaveButtonContainer = styled.div`
  display: flex;
  @media (max-width: 1000px) {
    position: relative;
    left: -15px;
  }
`

export const Counter = styled(Pill)`
  position: relative;
  right: -150px;
  bottom: 10px;
  padding: 4px;
  @media (max-width: 1000px) {
    right: -120px;
    padding: 2px;
  }
`
