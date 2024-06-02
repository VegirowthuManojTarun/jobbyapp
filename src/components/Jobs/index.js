import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoSearchSharp} from 'react-icons/io5'
import Header from '../Header'
import Filters from '../Filters'
import ProfileCard from '../ProfileCard'
import JobCard from '../JobCard'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    search: '',
    jobsList: [],
    salaryRangeId: '',
    employementTypeIdList: [],
  }

  updateSearch = event => {
    this.setState({search: event.target.value})
  }

  runSearch = () => {
    this.getJobDetails()
  }

  updataEmployementType = (employementTypeId, isChecked) => {
    const {employementTypeIdList} = this.state
    const updatedList = employementTypeIdList
    if (isChecked) {
      updatedList.push(employementTypeId)
    } else {
      const index = updatedList.indexOf(employementTypeId)
      if (index > -1) {
        updatedList.splice(index, 1)
      }
    }
    this.setState({employementTypeIdList: updatedList}, this.getJobDetails)
  }

  updateSalaryRange = salaryRangeId => {
    this.setState({salaryRangeId}, this.getJobDetails)
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {employementTypeIdList, salaryRangeId, search} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employementTypeIdList.join()}&minimum_package=${salaryRangeId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        title: job.title,
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return jobsList.length ? (
      <ul className="list-unstyled">
        {jobsList.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    ) : (
      this.renderNoJobsFound()
    )
  }

  renderSearchSection = () => {
    const {search} = this.state
    return (
      <div className="input-group mb-3 ">
        <input
          type="search"
          className="form-control bg-black  text-light"
          value={search}
          onChange={this.updateSearch}
          onKeyDown={this.updateSearchResults}
          id="search"
        />

        <button
          className="input-group-text bg-dark text-light"
          onClick={this.runSearch}
          type="button"
        >
          <IoSearchSharp aria-label="search" />
        </button>
      </div>
    )
  }

  renderNoJobsFound = () => (
    <div className="products-error-view-container text-center d-flex flex-column justify-content-center m-5">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text text-white">No Jobs Found</h1>
      <p className="products-failure-description text-light">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

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
        We cannot seem to find the page you are looking for
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
        <div className="container-fluid jobs-bg-container bg-black p-4">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-md-none">{this.renderSearchSection()}</div>
              <ProfileCard />
              <hr className="border-2 border-primary" />
              <Filters
                updateSalaryRange={this.updateSalaryRange}
                updataEmployementType={this.updataEmployementType}
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="d-none d-md-block w-50">
                {this.renderSearchSection()}
              </div>
              <div>{this.renderJobsSection()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Jobs
