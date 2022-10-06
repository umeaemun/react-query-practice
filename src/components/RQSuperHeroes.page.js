import { useState } from 'react'
import {useSuperHeroesData,useAddSuperHero} from '../hooks/useSuperHeroesData'
import { Link } from 'react-router-dom'



export const RQSuperHeroesPage = () => {

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

 
  const {mutate: addHero} = useAddSuperHero()

  const onSuccess = (data) => {
    console.log('sucess')
  }

  const onError = (error ) => {
    console.log('error')
  }

  const {isLoading,data, isError , error, isFetching, refetch} = useSuperHeroesData(onSuccess,onError)


  const handleAddHero = ()=>{
    
    const hero = {name,alterEgo}
    addHero(hero)
    console.log({name,alterEgo})
  }

  if(isLoading){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return (
  <>
   <h2>React Query Super Heroes Page</h2>

<div>
  <input type='text' value={name} onChange={(e)=> setName(e.target.value)}/>
  <input type='text' value={alterEgo} onChange={(e)=> setAlterEgo(e.target.value)}/>
  <button onClick={handleAddHero}>Add Hero</button>
</div>

   <button onClick={refetch}>Fetch Heroes</button>
   {
    data?.data.map(hero=>{
      return(
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      )
    })

   }


  {/* {
    data.map(heroName=>{
      return <div key={heroName}>{heroName}</div>
    })
  } */}
  </>
  )
}
