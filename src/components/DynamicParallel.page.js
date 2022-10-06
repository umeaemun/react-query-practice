import React from 'react'
import {useQueries} from 'react-query'
import axios from 'axios'


const fetchSuperHero = (heroId) =>{
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}



const DynamicParallel = ({heroIds}) => {
console.log(heroIds)
   const queryResults = useQueries(
        heroIds.map(id =>{
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )
    console.log(queryResults)

  return (
    <>
    <h3>Dynamic Queries page</h3>
    </>
  )
}

export default DynamicParallel