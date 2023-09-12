import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appoinmentsList: [],
    title: '',
    date: '',
    isStarredBtnClicked: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const appointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appoinmentsList: [...prevState.appoinmentsList, appointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = e => this.setState({title: e.target.value})

  onChangeDate = e => this.setState({date: e.target.value})

  onClickStarredBtn = () => {
    this.setState(prevState => ({
      isStarredBtnClicked: !prevState.isStarredBtnClicked,
    }))
  }

  onChangeStarred = id => {
    this.setState(prevState => ({
      appoinmentsList: prevState.appoinmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {appoinmentsList, title, date, isStarredBtnClicked} = this.state

    let appoinmentsList1
    if (isStarredBtnClicked === true) {
      appoinmentsList1 = appoinmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    } else {
      appoinmentsList1 = appoinmentsList.filter(
        eachAppointment =>
          eachAppointment.isStarred === false ||
          eachAppointment.isStarred === true,
      )
    }

    const starredBtnClsValue = isStarredBtnClicked ? 'star-btn1' : ''

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="container">
            <form className="input-container" onSubmit={this.onAddAppointment}>
              <label className="title" htmlFor="Title">
                TITLE
              </label>
              <input
                type="text"
                value={title}
                placeholder="Title"
                className="title-input"
                id="Title"
                onChange={this.onChangeTitle}
              />
              <label className="title" htmlFor="Date">
                DATE
              </label>
              <input
                type="date"
                value={date}
                className="date-input"
                id="Date"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`star-btn ${starredBtnClsValue}`}
              onClick={this.onClickStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {appoinmentsList1.map(eachItem => (
              <AppointmentItem
                appointmentItem={eachItem}
                onChangeStarred={this.onChangeStarred}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
