import { Routes, Route } from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import './App.css'
import NavBar from './NavBar'
import {ReactQueryDevtools} from 'react-query/devtools'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import RQSuperHeroPage from './components/RQSuperHero.page'
import ParallelQueries from './components/ParallelQueries.page'
import DynamicParallel from './components/DynamicParallel.page'
import Dependentqueries from './components/Dependentqueries.page'
import PaginatedQueries from './components/PaginatedQueries.page'
import InfiniteQueries from './components/InfiniteQueries.page'

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="super-heroes" element={<SuperHeroesPage />} />
            <Route path="rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
            <Route path="rq-parallel" element={<ParallelQueries />} />
            <Route path="rq-dynamic-parallel" element={<DynamicParallel heroIds={[1,3]}/>} />
            <Route path="rq-dependent" element={<Dependentqueries email = 'umeaemun@gmail.com'/>} />
            <Route path="rq-paginated" element={<PaginatedQueries/>} />
            <Route path="rq-infinite" element={<InfiniteQueries/>} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
