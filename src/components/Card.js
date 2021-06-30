import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Card = (props) => {

    const checkDelay = () => {
        if (props.delay !== null && props.delay !== 0 && props.delay > 0) {
            return (
                <div>
                    <span className="badge">Delay: <span className="badge text-light bg-danger">{props.delay / 60} min</span></span>
                </div>
            )
        }
        else if (props.delay < 0) {
            return (
                <div className="d-flex w-100 justify-content-between">
                    <span className="badge">Delay: <span className="badge text-light bg-danger">{props.delay / 60} min</span></span>
                    <small className="text-warning">Warning! Transport comes earlier.</small>
                </div>
            )
        }
        else {
            return null
        }
    }

    return (
        <div>
            <div className="list-group">
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Departure: {props.departure_name}<br /></h5>
                        <small><strong> {moment(props.departure_time).calendar()}</strong></small>
                    </div>
                    <p className="mb-1">{props.transport_type} : {props.transport_name} (Transport Mode: {props.transport_mode})</p>
                    <p className="mb-1">Platform: {props.platform ? + props.platform : "N/A"}</p>
                    <h5 class="mb-1">Arrival: {props.destination}</h5>
                    {checkDelay()}
                </div>
            </div>
            <br />
        </div>
    )
}

Card.propTypes = {
    transport_type: PropTypes.string.isRequired,
    transport_name: PropTypes.string.isRequired,
    transport_mode: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    departure_time: PropTypes.string.isRequired
}

export default Card