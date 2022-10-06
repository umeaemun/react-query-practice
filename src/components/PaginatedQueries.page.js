import {useState} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'


const fetchColors = (pageNumber) =>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

const PaginatedQueries = () => {

    const [pageNumber, setPageNumber] = useState(1)
    
    const {isLoading, data} = useQuery(['colors',pageNumber],
    () => fetchColors(pageNumber),
    {
        keepPreviousData: true,
    }
    )

    if(isLoading){
        return <h2>Loading...</h2>
      }

  return (
    <>
    <div>
      {
        data?.data.map((color)=>{
            return (
                <div key={color.id}>
                     <h3>{color.id}-{color.label}</h3>
                </div>
            )
        })
      }
    </div>

    <div>
        <button onClick={()=> setPageNumber(page => page-1)}
         disabled={pageNumber ===1}>Prev page</button>

        <button onClick={()=> setPageNumber(page => page+1)} 
        disabled={pageNumber ===4}>Next page</button>
    </div>
    </>
  )
}

export default PaginatedQueries
