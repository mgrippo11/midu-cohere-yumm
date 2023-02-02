import React, {useState} from 'react'
import ruleta from '../ruleta.png';


const COHERE_API_KEY = 'SW291oCP7Zf34siESGiFAMlr3spDEnJM3UHL1M1B'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

const GetMealIdea = () => {

  const [getMeal, setGetMeal] = useState('')

    async function getMealCoHere(input){
      const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${COHERE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'command-xlarge-20221108',
          prompt: 'list 3 dinner ideas',
          max_tokens: 100,
          temperature: 0.9,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      })
      const data = await response.json()
      console.log(data)
      setGetMeal(data.text)
    }


    return (
      <div>
        <img src={ruleta} className="App-ruleta" alt="ruleta" onClick={() => {getMealCoHere('James')}}/>
        <p>{getMeal}</p>
      </div>
    )
}

export default GetMealIdea