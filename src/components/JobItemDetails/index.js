import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import JobItemDetailsCard from '../JobItemDetailsCard'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        title: fetchedData.job_details.title,
        id: fetchedData.job_details.id,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
        skills: fetchedData.job_details.skills,
        similarJobs: fetchedData.similar_jobs,
      }
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobs = () => {
    const {jobDetails} = this.state
    const {similarJobs} = jobDetails
    console.log(jobDetails)
    return (
      <>
        <JobItemDetailsCard jobDetails={jobDetails} />
        <h1 className="fs-3 fw-bold text-light mt-4 mb-5">Similar Jobs</h1>
        <ul className="list-unstyled container-fluid row">
          {similarJobs.map(job => (
            <SimilarJobCard job={job} key={job.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container text-center d-flex flex-column justify-content-center m-5">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text text-light">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description text-light">
        We cannot seem to find the page you are looking for.
      </p>
      <div className="text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={this.renderJobsSection}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container text-center">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="container-fluid jobs-bg-container bg-black p-3">
          <div className="row">
            <div className="col-12">
              <div>{this.renderJobsSection()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default JobItemDetails
