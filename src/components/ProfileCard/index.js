import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.profile_details
      const updatedData = {
        name: data.name,
        shortBio: data.short_bio,
        profileImageUrl: data.profile_image_url,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobs = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="card text-light mb-3 rounded-top-5 mt-2 profile-bg-container">
        <div className="card-body">
          <img src={profileImageUrl} alt="profile" />
          <h1 className="card-title profile-name fw-bold mt-2">{name}</h1>
          <p className="card-text text-dark">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container d-flex flex-column justify-content-center align-items-center">
      <button
        className="btn btn-primary"
        onClick={this.renderJobsSection}
        type="button"
      >
        Retry
      </button>
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
      <div className="profile-card d-flex flex-column justify-content-center">
        {this.renderJobsSection()}
      </div>
    )
  }
}

export default ProfileCard
