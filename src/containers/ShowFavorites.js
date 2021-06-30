import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const ShowFavorites = () => {
    var favList = []
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')
    for (let i = 0; i < getArray.length; i++) {
        let x = getArray[i]
        favList[i] = JSON.parse(localStorage.getItem([x]) || '')
    }

    /** method to get all the favorite stops */
    const getStops = () => {
        let selectedstops = []
        if (Array.isArray(favList) && favList.length) {
            favList.map((stop, i) => {
                return selectedstops.push(
                    <div>
                        {
                            stop ? (
                                <p key={i}>
                                    <Link to={`/stop/${getArray[i]}`}>{stop}</Link>
                                </p>
                            ) : ""
                        }

                    </div>
                )
            })
            return selectedstops
        }
        else {
            return (
                <p>Nothing in the Favorites list</p>
            )
        }

    }

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Transport - My Favorites</title>
                <meta
                    name='description'
                    content='my favorites page'
                />
            </Helmet>
            <h2>My Favorite List</h2>
            <div className="mt-5">
                {getStops()}
            </div>
        </div>
    )
}

export default ShowFavorites