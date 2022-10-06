import {useQuery, useMutation, useQueryClient} from 'react-query'
// import axios from 'axios'
import {request} from '../utils/axios-utils'

  const fetchSuperHeroes = ()=>{
      // return axios.get('http://localhost:4000/superheroes')                //simple
      return request({ url: '/superheroes'})                                  //axios-interceptor
  }
  
  const addSuperHero = (hero)=>{
      // return axios.post('http://localhost:4000/superheroes', hero)         //simple
      return request({ url: '/superheroes', method:'post', data: hero})       //axios-interceptor
}


export const useSuperHeroesData = (onSuccess,onError) => {
    return useQuery(
        'super-heroes',
         fetchSuperHeroes,
         {
          // cacheTime: 5000,
          // staleTime: 30000,
    
    //fetching on mounting or window focus or db change     
          // refetchOnMount: true,    //,false, always(stale or not just refetch on every mount)
          // refetchOnWindowFocus: true, //fetch when user focus a window and db is changed //,false, always(fetch on window focus even db is not changed)
    
          // refetchInterval: false, //2000 
          // refetchIntervalInBackground: true, //refetch every 2 sec without window focus
    
    //fetching with different ways
          // enabled: false,
          onSuccess,
          onError,
          // select: (data)=>{
          //   const superHeroNames = data.data.map((hero)=>{
          //     return hero.name
          //   })
    
          //   return superHeroNames
          // }
    
        }
         )
}


//query invalidation
// export const useAddSuperHero = () =>{
//       const queryClient = useQueryClient()
//        return useMutation(addSuperHero,{
//             onSuccess: () =>{
//                queryClient.invalidateQueries('super-heroes')
//             }
//        })
// }


// handling mutation responses

// export const useAddSuperHero = () =>{
//       const queryClient = useQueryClient()
//        return useMutation(addSuperHero,{
//             onSuccess: (data) =>{    
//                   queryClient.setQueryData('super-heroes',(oldQueryData)=>{
//                         return {
//                               ...oldQueryData,
//                               data: [...oldQueryData.data, data.data],
//                         }
//                   })
//             }
//        })
// }


//optimistic updates

export const useAddSuperHero = () =>{
      const queryClient = useQueryClient()
       return useMutation(addSuperHero,{
         
            onMutate: async(newHero)=>{
                  await queryClient.cancelQueries('super-heroes')
                  const previousHeroData = queryClient.getQueryData('super-heroes')

                  queryClient.setQueryData('super-heroes',(oldQueryData)=>{    //method2
                        return {
                              ...oldQueryData,
                              data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero}],
                        }
                  })

                  return {
                        previousHeroData,
                  }
            },

            onError: (_error,_hero, context)=>{
                  queryClient.setQueryData('super-heroes', context.previousHeroData)
            },

            onSettled: ()=>{
                  queryClient.invalidateQueries('super-heroes')
            }

       })
}

