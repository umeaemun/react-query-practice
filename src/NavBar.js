import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
       <nav>
          <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional SH</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ-SH</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>Parallel-Q</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel'>Dynamic-Q</Link>
              </li>
              <li>
                <Link to='/rq-dependent'>Dependent-Q</Link>
              </li>
              <li>
                <Link to='/rq-paginated'>Paginated-Q</Link>
              </li>
              <li>
                <Link to='/rq-infinite'>Infinite-Q</Link>
              </li>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar
