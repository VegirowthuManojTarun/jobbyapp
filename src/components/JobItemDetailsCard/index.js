import {MdWork, MdLocationOn} from 'react-icons/md'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import './index.css'

const JobItemDetailsCard = props => {
  const {jobDetails} = props
  console.log(jobDetails)
  const renderSkill = skill => (
    <li className="col-6 col-md-4 d-flex mt-3 p-2" key={skill.name}>
      <img src={skill.image_url} className="skill-logo me-3" alt="skill name" />
      <p className="fw-bold fs-5"> {skill.name}</p>
    </li>
  )

  const {
    title,
    location,
    rating,
    packagePerAnnum,
    employmentType,
    companyLogoUrl,
    jobDescription,
    companyWebsiteUrl,
    skills,
    description,
    imageUrl,
  } = jobDetails

  return (
    <div className="card w-100 text-light mb-3 rounded-4 bg-dark">
      <div className="card-body">
        <div className="d-flex mb-1 align-items-center">
          <img
            src={companyLogoUrl}
            className="company-logo me-3"
            alt="job details company logo"
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
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="border-primary border-4 mt-1" />
        <div className="d-flex flex-row justify-content-between mb-3">
          <h5 className="card-title">Description</h5>
          <a href={companyWebsiteUrl} className="link fs-6">
            Visit
            <span>
              <FaExternalLinkAlt className="fs-6 ms-2" />
            </span>
          </a>
        </div>
        <p className="card-text">{jobDescription}</p>
        <div className="container-fluid px-0">
          <h1 className="mt-3 fs-5">Skills</h1>
          <ul className="row list-unstyled px-0">
            {skills.map(skill => renderSkill(skill))}
          </ul>
        </div>
        <h5 className="card-title mb-3">Life at Company</h5>

        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-12 col-md-8">
              <p className="card-text mb-4">{description}</p>
            </div>
            <div className="col-12 col-md-4">
              <img src={imageUrl} className="w-100" alt="company" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobItemDetailsCard
