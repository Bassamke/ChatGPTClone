import React, { useState } from 'react'
import { MenuItems } from '../Data/MenuItems'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { Backspace, SendOutlined } from '@material-ui/icons'
import { Configuration, OpenAIApi  } from 'openai';

const Container=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100vh;
    width: 100%;
    background-color: #354134;
    margin: 0px;
`
const Title= styled.h1`
    text-align: center;
    color: white;
`
const ItemsWrapper= styled.div`
    display: ${ props=>props.display?"grid": "none"};
    grid-template-columns: 40% 40%;
    grid-column-gap: 20%;
    grid-row-gap: 20px;
`
const InputWrapper= styled.div`
    padding: 20px;
    margin: 2% 20%; 
    width: 80vw;
    background-color:  #354134;
    border: 1px solid black;
    display: ${ props=>props.display?"flex": "none"};
    flex-direction: row;
`
const Input= styled.input`
    width: 80vw;
    background-color:  #354134;
    outline: none;
    border: none;
    height: 100%;
    color: white;
`
const Button = styled.button`
    background-color: #354134;
    border: none;
    cursor: pointer;
`
const ResultWrapper=styled.div`
    border: 1px solid black;
    border-radius: 15px;
    padding: 15px;
    width: 60%;
    display: ${ props=>props.display?"flex": "none"}
`
const Text=styled.text`
    color: white;
    font-size: 14px;
    font-weight: 300;
    padding: 20px;
`
const Home = () => {
    const [selectedOption, setSelectedOption]=useState({})
    const [showPromptInput, setShowPromptInput]=useState(false)
    const [inputPlaceHolder, setinputPlaceHolder]=useState(false)
    const [userInput, setUserInput]=useState("")
    const [result, setResult]=useState("")
    const [headerText, setHeaderText]=useState("Select An option Below to proceed")
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
    const openai= new OpenAIApi(configuration)

    const setValues=(item)=>{
        setSelectedOption(item.options)
        setHeaderText(item.name)
        setShowPromptInput(true)
        setUserInput("")
        setResult("")
        setinputPlaceHolder(`Example: ${item.description}`)
    }
    const callOpenAi=async()=>{
        console.log(userInput)
        let openAiApiObject=({...selectedOption, prompt: userInput})
        console.log(openAiApiObject)
        const response = await openai.createCompletion(openAiApiObject);
        console.log(response)
        setResult(response.data.choices[0].text)
    }
    const resetToHome=()=>{
        setResult("")
        setUserInput("")
    }
  return (
    <Container>
        <Title>ChatGPT</Title>
        <Text>{headerText}</Text>
        <ItemsWrapper display={result?result.length>0?false: true: true}>
            {MenuItems.map(item=>
                    <MenuItem item={item} callback={()=>setValues(item)}/>
                )}
        </ItemsWrapper>
        <InputWrapper display={showPromptInput}>
            <Input value={userInput} placeholder={inputPlaceHolder} onChange={(e)=>setUserInput(e.target.value)}></Input>
            <Button onClick={callOpenAi}>
                <SendOutlined/>
            </Button>
        </InputWrapper>
        <ResultWrapper display={result?result.length>0?true: false: false}>
        <Button onClick={resetToHome}>
                <Backspace/>
            </Button>
            <Text>{result}</Text>
        </ResultWrapper>
    </Container>
    
  )
}

export default Home