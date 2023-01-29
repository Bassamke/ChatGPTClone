import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #4d4f4d;
    padding: 20px;
    width: 100%;
    cursor: pointer;
    &:hover {
        background-color:#4f574f;
       
    }
`
const ItemHeader= styled.text`
    color: white;
    text-align: center;
    font-weight: 700;
`
const ItemDescription= styled.text`
    color: white;
    text-align: center;
`

const MenuItem = ({item, callback}) => {
  return (
    <Container onClick={()=>callback(item.id)}>
        <ItemHeader>{item.name}</ItemHeader>
        <ItemDescription>{item.description}</ItemDescription>
    </Container>
  )
}

export default MenuItem