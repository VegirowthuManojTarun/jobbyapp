import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
      this.setState({errorMsg: ''})
    } else {
      const errorMsg = data.error_msg
      const warningMsg = '*' + errorMsg
      this.setState({errorMsg: warningMsg})
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderForm = () => {
    const {username, password, errorMsg} = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-white fw-bold"
          >
            USERNAME
          </label>
          <input
            type="text"
            className="form-control bg-dark p-2 border-light text-light"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={this.updateUsername}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-white fw-bold"
          >
            PASSWORD
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={this.updatePassword}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
          Login
        </button>
        <p className="text-danger mt-1 fw-bold">{errorMsg}</p>
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container-fluid bg-black login-bg-container d-flex flex-column justify-content-center align-items-center">
        <div className="login-card rounded-4 bg-dark p-5">
          <div className="text-center mb-3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>

          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default LoginForm
