import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import '../styles/loadingStyle.css';
import ruleta from '../img/ruleta.png';
import flecha from '../img/flecha.png';
import recipeLogo from '../img/recipe.svg'

const mealsArray = ['breakfast', 'lunch', 'afternoon snack', 'Dinner']
const typesMealsArray = ['','Vegetarian', 'Vegan', 'Celiac']

const GetMealIdea = () => {

  const [spin, setSpin] = useState(false)

  const [getMeal, setGetMeal] = useState([])
  const [loading, setLoading] = useState(false)
  const [mealView, setMealView] = useState(false)

  const [GetRecipe, setGetRecipe] = useState('')
  const [meal, setMeal] = useState('')
  const [loadingR, setLoadingR] = useState(false)
  const [recipeView, setRecipeView] = useState(false)

    async function getMealCoHere(input){
      console.log(input.meal)
      console.log(input.tmeal)

      setRecipeView(false)
      setMealView(true)
      setLoading(true)
      setSpin(true)

      const response = await fetch(process.env.REACT_APP_COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${process.env.REACT_APP_COHERE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'command-xlarge-20221108',
          prompt: `list 3 ${input.meal} ${input.tmeal} ideas`,
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
      setRecipeView(true)
      setLoadingR(true)
      setMeal(input)
      const responseR = await fetch(process.env.REACT_APP_COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${process.env.REACT_APP_COHERE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'command-xlarge-20221108',
          prompt: `Recipe of${input}`,
          max_tokens: 500,
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
      setLoadingR(false)
      setGetRecipe(dataRecipe.text)
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = form => {
      getMealCoHere(form)
    };

    
    return (
      <div className='getMeal'>
        <div className='spin'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='selectOpctions'>
              <div className='opction'>
                <h5>Meals</h5>
                <select {...register("meal")} defaultValue={'Dinner'}>
                  {
                    mealsArray.map(meal => (
                      <option key={meal} value={meal}>{meal}</option>
                    ))
                  }
                </select>
              </div>
              <div className='opction'>
                <h5>Type of meals</h5>
                <select {...register("tmeal")}>
                  {
                    typesMealsArray.map(tmeal => (
                      <option key={tmeal} value={tmeal}>{tmeal}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <input type="image" id="myimage" src={ruleta} className={spin ? 'App-ruleteSpin' : 'App-ruleta'} alt='ruleta'/>
          </form>
                
          <img src={flecha} className='App-flecha' alt='flecha'/>
          <h3>Click roulette to spin!</h3>
        </div>
          {
            mealView ?
              loading ? 
                <div className="loading A">Loading&#8230;</div>
              : 
                <div className='mealIdeas'>
                  <h3>Some Ideas</h3>
                  {
                    getMeal.map(data => (
                      data ?
                      (Number(data.split('.')[0]) < 4) ?
                          <button className='idea' key={data.split('.')[0]} onClick={() => {getRecipeCoHere(`${data.split('. ')[1]}`)}}>
                            <img src={recipeLogo} className='recipeLogo' alt='recipeLogo'/>
                            <p>{data}</p>
                          </button>
                        :
                        null
                      :
                        null
                    ))
                  }
                </div>
            :
            null
          }

          {
            recipeView ?
              loadingR ?
                <div className="loading B">Loading&#8230;</div>
              :
              <div className='getRecipe'>
                <div className='divRecipe'>
                  <div>
                    <h3>Recipe of {meal}</h3>
                    <p>{GetRecipe}</p>
                  </div>
                </div>
              </div> 
            :
              null
          }
      </div>
    )
}

export default GetMealIdea