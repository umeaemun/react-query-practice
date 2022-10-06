import React from 'react'
import {useQueries, useQuery} from 'react-query'
import axios from 'axios'


  const fetchUserByEmail = (email) =>{
    return axios.get(`http://localhost:4000/users/${email}`)
  }

  const fetchCoursesByChannelId = (channelId) =>{
    return axios.get(`http://localhost:4000/channels/${channelId}`)
  }

const Dependentqueries = ({email}) => {

  const {data: user} = useQuery(['user', email],()=> fetchUserByEmail(email))
  const channelId = user?.data.channelId
  const {data: channels} = useQuery(['courses', channelId],
   ()=> fetchCoursesByChannelId(channelId),
   {
    enabled: !!channelId
   }
   )
  console.log(channels)
  return (
    <>
    <h3>Dependent queries</h3>
    
    {
        channels?.data.courses.map(course =>{
            return <div>{course}</div>
        })
    }
    </>
  )
}

export default Dependentqueries