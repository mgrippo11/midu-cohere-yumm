import React, {useState} from 'react'
import ruleta from '../img/ruleta.png';
import flecha from '../img/flecha.png';
import recipeLogo from '../img/recipe.svg'

const COHERE_API_KEY = 'SW291oCP7Zf34siESGiFAMlr3spDEnJM3UHL1M1B'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

const mealsArray = ['breakfast', 'lunch', 'afternoon snack', 'Dinner']
const tipesMealsArray = ['Vegetarian', 'Vegan', 'Celiac']

const GetMealIdea = () => {

  const [spin, setSpin] = useState(false)

  const [getMeal, setGetMeal] = useState([])
  const [loading, setLoading] = useState(false)

  const [GetRecipe, setGetRecipe] = useState('')
  const [meal, setMeal] = useState('')
  const [loadingR, setLoadingR] = useState(false)

    async function getMealCoHere(input){
      setLoading(true)
      setSpin(true)

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

      const dataSplit = data.text.split('\n')

      setLoading(false)
      setSpin(false)
      setGetMeal(dataSplit)
    }

    async function getRecipeCoHere(input){
      console.log(input)
      setLoadingR(true)
      setMeal(input)
      const responseR = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${COHERE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'command-xlarge-20221108',
          prompt: `Recipe of${input}`,
          max_tokens: 200,
          temperature: 0.9,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      })
      const dataRecipe = await responseR.json()
      console.log(dataRecipe.text)
      setLoadingR(false)
      setGetRecipe(dataRecipe.text)
    }
    
    return (
      <div className='getMeal'>
        <div>
          <img src={ruleta} className={spin ? 'App-ruleteSpin' : 'App-ruleta'} alt='ruleta' onClick={() => {getMealCoHere('')}}/>
          <img src={flecha} className='App-flecha' alt='flecha'/>
          <h3>Click roulette to spin!</h3>
        </div>
        
          {
            loading ? 
              <h5 className='loading'>loading...</h5>
            : 
              <div className='mealIdeas'>
                {
                  getMeal.map(data => (
                    data ?
                    <div key={data.split('.')[0]} className='idea'>
                      <img src={recipeLogo} className='recipeLogo' alt='recipeLogo' onClick={() => {getRecipeCoHere(`${data.split('. ')[1]}`)}}/>
                      <h5 className='mealIdea'>{data}</h5>
                    </div>
                    :
                    <h3 key='0'>Some Ideas</h3>
                  ))
                }
             </div>
          }
        
          <div className='getRecipe'>
            <div className='divRecipe'>
              {
                loadingR ?
                <h5 className='loading'>loading...</h5>
                :
                <div>
                  <h3>Recipe of {meal}</h3>
                  <p>{GetRecipe}</p>
                </div>
              }
            </div>
          </div>

      </div>
    )
}

export default GetMealIdea