import React from 'react'
import './DisplayUserProfile.css'

function DisplayUserProfile({user}) {


    return (
        <div className="user-info-box">
            <img src="/images/user2.png" alt="user avatar"/>
            <div className="name">
                <h2 className='username'>{user?.username}</h2>
                <h4 className='usertype'>{user?.phone}</h4>
                {/*TODO: REPLACE WITH ACCOUNT TYPE*/}
                <h4 className='userId'>{user?.user.accountType}</h4>
            </div>
        </div>
    )
}

export default DisplayUserProfile
