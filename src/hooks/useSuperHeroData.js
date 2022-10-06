import {useQuery,useQueryClient} from 'react-query'                       //1
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)

}

export const useSuperHeroData = (heroId) =>{

    const queryClient = useQueryClient()                                    //2

    return(       
          useQuery(['super-hero',heroId],
          fetchSuperHero
          ,
          {                                                                 //3
            initialData: () =>{
              const hero = queryClient.getQueriesData('super-heroes')       //4
              ?.data?.find((hero)=> hero.id ===parseInt(heroId))  
              
              if(hero){
                return { data:hero }
              }else{
                return undefined
              }

            }
          })
    )
}