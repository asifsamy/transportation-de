import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import { Helmet } from 'react-helmet'

const StopDetail = (props) => {

    /** initialization of the states. departures state is for getting the data and others for pagination */
    const [departures, setDepartures] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage] = useState(5)

    useEffect(() => {
        /** variable $stopId is to get the selected stop */
        const stopId = props.match.params.id
        window.scrollTo(0, 0)
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://v5.db.transport.rest/stops/${stopId}/departures`)
                setDepartures(res.data)

            }
            catch (err) {
                console.log('Something wrong!')
            }
        }

        fetchData()

    }, [props.match.params.id])

    /** method to add the departures to anothe component called Card */
    const displayDepartures = () => {
        let display = []

        if (Array.isArray(currentData) && currentData.length) {
            /** Card component is used to show the depurtures */
            currentData.map(departure => {
                return display.push(
                    <Card
                        id={departure.stop.id}
                        departure_name = {departure.stop.name}
                        destination={departure.direction}
                        departure_time={departure.when}
                        delay={departure.delay}
                        transport_type={departure.line.product}
                        transport_name={departure.line.name}
                        transport_mode={departure.line.mode}
                        platform={departure.platform}
                    />
                )
            })

            return display
        }
        else {
            return(
                <span>No Deprture's Information</span>
            )
        }
    }

    /** Get current departures(data) */
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = departures.slice(indexOfFirstData, indexOfLastData)

    /** method to change paginate  */
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className='container mt-5'>
            <Helmet>
                <title>Transport - All Departures</title>
                <meta
                    name='description'
                    content='departures page' 
                />
            </Helmet>
            <div className="container">
                {displayDepartures()}
                {/** Pagination is acomponent to manage the pagination */}
                <Pagination
                    dataPerPage={dataPerPage}
                    totalData={departures.length}
                    paginate={paginate}
                />
            </div>

        </div>
    )
}

export default StopDetail