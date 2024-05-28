import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {IoLogOut} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar p-2 bg-dark">
      <div className="container-fluid d-flex align-items-center ">
        <div>
          <Link to="/" className="text-decoration-none">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </div>
        <ul className="d-flex list-unstyled align-items-center">
          <div className="d-flex me-md-5 mt-2">
            <li className="mx-2">
              <Link to="/" className="text-decoration-none">
                <p className="d-none d-md-inline text-light fw-bold me-1 fs-5">
                  Home
                </p>
              </Link>
              <Link to="/" className="text-decoration-none">
                <AiFillHome className="text-light fs-2 d-md-none" />
              </Link>
            </li>

            <li className="mx-2 me-md-5">
              <Link to="/jobs" className="text-decoration-none">
                <p className="d-none d-md-inline text-light fw-bold me-5 fs-5">
                  Jobs
                </p>
              </Link>
              <Link to="/jobs" className="text-decoration-none">
                <MdWork className="text-light fs-2 d-md-none" />
              </Link>
            </li>
          </div>

          <li className="ms-2 mt-2">
            <button
              className="btn btn-primary d-none d-md-inline fw-bold"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
            <IoLogOut className="text-light fs-2 d-md-none" onClick={logout} />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
