import {MdWork, MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarJobCard = props => {
  const {job} = props
  const {title, location, rating} = job
  return (
    <li className="col-12 col-md-6 p-3">
      <div className="card  bg-dark text-light rounded-4 ">
        <div className="card-body">
          <div className="d-flex mb-1 align-items-center">
            <img
              src={job.company_logo_url}
              alt="similar job company logo"
              className="company-logo me-3"
            />
            <div className="p-1">
              <h1 className="mt-2 fs-2">{title}</h1>
              <p className=" fs-4">
                <span>
                  <FaStar className="text-warning fs-2 me-2" />
                </span>
                {rating}
              </p>
            </div>
          </div>

          <h5 className="card-title">Description</h5>
          <p className="card-text">{job.job_description}</p>
          <div className="d-flex">
            <p className="py-2 me-2">
              <span>
                <MdLocationOn className="text-light fs-2 me-1" />
              </span>
              {location}
            </p>
            <p className="ms-3 py-2">
              <span>
                <MdWork className="text-light fs-2 me-1" />
              </span>
              {job.employment_type}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
