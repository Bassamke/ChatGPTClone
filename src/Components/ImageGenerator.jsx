import React from 'react'
import styled from 'styled-components'
import { Configuration, OpenAIApi  } from 'openai';
import { useState } from 'react';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f7f1d3;
    align-items: center;
    justify-content: center;
    height: 100vh; 
`
const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 5%;
    padding: 2%;
`
const Title=styled.h2`
    color: black;
    font-weight: 400;
    font-size: 15px;
`
const Input= styled.input`
    padding: 20px;
    margin-bottom: 5px;  
`
const Button= styled.button`
    padding: 20px;
    margin-bottom: 5px;
    background-color: teal;
    outline: none;
    border: none;
`
const ImageWrapper= styled.div`
    max-height: 50%;
    border: 1px solid black;
`
const Image=styled.img`
    max-width: 100%;
    max-height: 100%;
`

const ImageGenerator = () => {
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai= new OpenAIApi(configuration)
      const[imgUrl, setImgUrl]=useState("https://oaidalleapiprodscus.blob.core.windows.net/private/org-xBHPcxiNFX01Kg4YI633YRsL/user-JrzOQwo2wmREGoC9eXwRP80a/img-6wz4ilOhXxWf1HyIL9jdQoxC.png?st=2023-01-24T09%3A21%3A21Z&se=2023-01-24T11%3A21%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-24T06%3A58%3A51Z&ske=2023-01-25T06%3A58%3A51Z&sks=b&skv=2021-08-06&sig=vPe6kdxpg1u1NMFxbQwtLrvyFf8Rjj%2BbnJqz7efILTc%3D")
      const[description, setDescription]=useState("")
      const generateImage= async ()=> {
        console.log(description)
        const res=await openai.createImage({
        prompt: description,
        n: 1,
        size: "1024x1024",
      })
      console.log(res)
      setImgUrl(res.data.data[0].url)
    }

  return (
    <Container>
        <Wrapper>
            <Title>Open AI based Image Generator</Title>
            <Input type="text" value={description} placeholder="type description" onChange={(event)=>setDescription(event.target.value)}></Input>
            <Button onClick={generateImage}> GENERATE IMAGE</Button>
        </Wrapper>
        <ImageWrapper>
            <Image src={imgUrl}/>
        </ImageWrapper>
    </Container>
  )
}

export default ImageGenerator