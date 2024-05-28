import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {updateSalaryRange, updataEmployementType} = props
  const onUpdateEmployementType = event => {
    const checkedId = event.target.value
    updataEmployementType(checkedId, event.target.checked)
  }
  const onUpdateSalaryRange = event => {
    updateSalaryRange(event.target.value)
  }

  const renderCheckboxItem = job => (
    <li key={job.label} className="text-white mt-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={job.employmentTypeId}
          id={job.employmentTypeId}
          onClick={onUpdateEmployementType}
        />
        <label className="form-check-label" htmlFor={job.employmentTypeId}>
          {job.label}
        </label>
      </div>
    </li>
  )
  const renderRadioItem = job => (
    <li key={job.label} className="text-white mt-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          value={job.salaryRangeId}
          id={job.salaryRangeId}
          onChange={onUpdateSalaryRange}
        />
        <label className="form-check-label" htmlFor={job.salaryRangeId}>
          {job.label}
        </label>
      </div>
    </li>
  )

  return (
    <>
      <p className="fw-bold text-light fs-4 mt-3">Type of Employement</p>
      <ul className="list-unstyled ">
        {employmentTypesList.map(job => renderCheckboxItem(job))}
      </ul>
      <hr className="border-2 border-primary" />

      <p className="fw-bold text-light fs-4 mt-3">Salary Range</p>
      <ul className="list-unstyled mb-4">
        {salaryRangesList.map(job => renderRadioItem(job))}
      </ul>
    </>
  )
}

export default Filters
