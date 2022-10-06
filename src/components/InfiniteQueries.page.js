import React, { Fragment } from 'react'
import {useInfiniteQuery} from 'react-query'
import axios from 'axios'

const fetchColors = ({pageParam = 1}) =>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueries = () => {

    const {isLoading, data,hasNextPage, fetchNextPage} = useInfiniteQuery(['colors'],
    fetchColors,
    {
        getNextPageParam: (_lastPage,pages) => {
            if(pages.length<4){
                return pages.length + 1
            }else{
                return undefined
            }
        }
    }
    )

    if(isLoading){
        return <h2>Loading...</h2>
    }

  return (
    <>
            <div>
            {data?.pages.map((group, i)=>{
                return (
                    <Fragment key={i}>
                       { group.data.map((color)=>(
                                <h3 key={color.id}>{color.id}-{color.label}</h3>
                       ))
                       }
                    </Fragment>
                )
            })
            }
        </div>

        <div>
            <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More</button>
        </div>
  </>
  )
}

export default InfiniteQueries