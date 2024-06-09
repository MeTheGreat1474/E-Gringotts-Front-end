import React from 'react'
import './DisplayUserProfile.css'

//display the user's profile info
function DisplayUserProfile({user}) {

    return (
        <div className="user-info-box">
            <img src={process.env.PUBLIC_URL +"/images/user2.png"} alt="user avatar"/>
            <div className="name">
                <h2 className='username'>{user?.username}</h2>
                <h4 className='usertype'>{user?.phone}</h4>
                <h4 className='userId'>{user?.user.accountType}</h4>
            </div>
        </div>
    )
}

export default DisplayUserProfile
