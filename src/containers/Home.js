import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { Helmet } from 'react-helmet'

const Home = () => {
    /** initialize the states called stops and name */
    const [stops, setStops] = useState([])
    const [name, setName] = useState("")
    const [favorites, setFavorites] = useState([])
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')

    useEffect(() => {
        if (name !== "") {
            const fetchData = async () => {
                try {
                    /** variable $name comes from the input element. response will show 10 results for matched string */
                    // const res = await axios.get(`https://v5.vbb.transport.rest/locations?query=${name}&results=10`)
                    const res = await axios.get(`https://v5.db.transport.rest/locations?query=${name}&results=10`)
                    setStops(res.data)
                }
                catch (error) {
                    console.log('Something wrong!')
                }
            }

            fetchData()
        }
    }, [name])

    useEffect(() => {
        if (getArray !== 0) {
            setFavorites([...getArray])
            // console.log(getArray)
        }
    }, [])

    /** event handler method to get input element */
    const handleSearchInput = e => {
        setName(e.target.value)
    }

    /** method for adding/removing stops to favorite list */
    const addFav = (name, id) => {
        let array = favorites
        let addArray = true
        array.map((item, key) => {
            if (item === id) {
                array.splice(key, 1)
                addArray = false
            }
        })
        if (addArray) {
            array.push(id)
        }
        setFavorites([...array])

        /** add to local storage */
        localStorage.setItem("favorites", JSON.stringify(favorites))
        var storage = localStorage.getItem(id || '0')
        if (storage == null) {
            localStorage.setItem((id), JSON.stringify(name))
        }
        else {
            localStorage.removeItem(id)
        }
    }

    /** method to get available transports for any stop */
    const availableTransport = (transports) => {
        let avail_trans = []
        Object.entries(transports).map((transport, i) => {
            if (transport[1] === true) {
                return avail_trans.push(
                    <small key={i}> {transport[0]} / </small>
                )
            }
            else {
                return avail_trans.push(
                    <small key={i}></small>
                )
            }
        })
        return avail_trans
    }

    /** method to get all the stops */
    const getStops = () => {
        let selectedstops = []
        stops.map(stop => {
            return selectedstops.push(
                <div>
                    {
                        stop.id ? (
                            <p key={stop.id}>
                                <Link to={`/stop/${stop.id}`}>{stop.name}</Link>
                                ({stop.products ? availableTransport(stop.products) : ""})
                                <span>&nbsp;&nbsp;</span>
                                {
                                    favorites.includes(stop.id) ? (
                                        <span>Unmark Favorite: <IoIosHeart
                                            onClick={() => addFav(stop.name, stop.id)}
                                            style={{ color: 'red' }}
                                        /></span>
                                    ) : (

                                        <span>Mark Favorite: <IoIosHeartEmpty
                                            onClick={() => addFav(stop.name, stop.id)}
                                            style={{ color: 'red' }}
                                        /></span>
                                    )
                                }
                            </p>
                        ) : ""
                    }

                </div>
            )
        })
        return selectedstops
    }

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Transport App - Home</title>
                <meta
                    name='description'
                    content='home page'
                />
            </Helmet>
            <div className="container">
                <div class="jumbotron">
                    <h1>Transportation Germany</h1>
                    <p>
                        By Searching any Stop in Germany, Find Your Depatures with the Informations of Arrivals, Available Transports, etc.
                        Mark/Unmark you Favorite Stops and Later You Can Find the Informations by Going to the My Favorinte
                        Page.
                </p>

                </div>
                <div className="form-outline">
                    <input
                        type="text"
                        className="form-control col-md-5"
                        value={name}
                        onChange={handleSearchInput}
                        placeholder="Enter your Stoppage"
                    />
                    {getStops()}
                </div>
            </div>
        </div>

    )
}

export default Home