import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className='home-bg-container p-3 p-md-5 '>
      <div className='container-fluid'>
        <h1 className='h1 fw-bold text-white mt-5'>
          Find The Job That Fits Your Life
        </h1>
        <p className='fs-7 mt-4 text-light'>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button className='btn btn-primary btn-lg mt-4' type='button'>
          <Link to='/jobs' className='text-decoration-none text-light'>
            Find Jobs
          </Link>
        </button>
      </div>
    </div>
  </>
)

export default Home
