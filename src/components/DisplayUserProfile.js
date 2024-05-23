import React from 'react'
import './DisplayUserProfile.css'

function DisplayUserProfile({user}) {
    return (
        <div className="user-info-box">
            <img src="/images/user2.png" alt="user avatar"/>
            <div className="name">
                <h2 className='username'>{user?.username}</h2>
                <h4 className='usertype'>{user?.accountType}</h4>
                <h4 className='userId'>{user?.id?.timestamp}</h4>
            </div>
        </div>
    )
}

export default DisplayUserProfile
