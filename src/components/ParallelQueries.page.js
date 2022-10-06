import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'


const fetchSuperHeroes = () =>{
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () =>{
  return axios.get('http://localhost:4000/friends')
}

const ParallelQueries = () => {

  const {data: superHeroes} = useQuery('super-heroes',fetchSuperHeroes)
  const {data: friends} = useQuery('friends',fetchFriends)

  return (
    <>
    <h3>ParallelQueriespage</h3>

    {
      superHeroes?.data.map(superhero =>{
        return(
          <div> {superhero.name} </div>
        )
      })
    }
    <br/>
    {
      friends?.data.map(friend =>{
        return(
          <div> {friend.name} </div>
        )
      })
    }

    
    </>
  )
}

export default ParallelQueries