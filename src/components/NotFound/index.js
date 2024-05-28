import './index.css'

const NotFound = () => (
  <div className="not-found-container bg-black text-center">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="text-white mt-5 fw-bold">Page Not Found</h1>
    <p className="text-light mt-4 fs-6">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
