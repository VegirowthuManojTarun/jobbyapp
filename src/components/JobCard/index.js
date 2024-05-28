import {MdWork, MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

// companyLogoUrl: job.company_logo_url,
//         employmentType: job.employment_type,
//         jobDescription: job.job_description,
//         location: job.location,
//         packagePerAnnum: job.package_per_annum,
//         rating: job.rating,

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    id,
    location,
    rating,
    packagePerAnnum,
    employmentType,
    companyLogoUrl,
    jobDescription,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="text-decoration-none">
      <li className="card text-light mb-3 rounded-4 bg-dark">
        <div className="card-body">
          <div className="d-flex mb-1 align-items-center">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex">
              <p className="p-2">
                <span>
                  <MdLocationOn className="text-light fs-2 me-1" />
                </span>
                {location}
              </p>
              <p className="ms-3 p-2">
                <span>
                  <MdWork className="text-light fs-2 me-1" />
                </span>
                {employmentType}
              </p>
            </div>
            <div className="p-2">
              <h4>{packagePerAnnum}</h4>
            </div>
          </div>
          <hr className="border-primary mt-1" />
          <h5 className="card-title">Description</h5>
          <p className="card-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
