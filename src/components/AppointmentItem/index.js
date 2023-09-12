import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, onChangeStarred} = props
  const {id, title, date, isStarred} = appointmentItem

  const onClickStarBtn = () => {
    onChangeStarred(id)
  }

  const changedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="title-container">
        <p className="title-name">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStarBtn}
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date1">{`Date: ${changedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
