import React from 'react'
import './AccountContent.css'
import DisplayInput from "../DisplayInput";

function AccountContent({ user }) {
    return (
        <>
            <div className="account-box">
                <div className="title">
                    <h1>USER ACCOUNT</h1>
                </div>
                <div className="account-detail-box">
                    <div className="user-info-box">
                        <img src="/images/user2.png" alt="user avatar"/>
                        <div className="name">
                            <h2 className='username'>{user?.username}</h2>
                            <h4 className='usertype'>{user?.accountType}</h4>
                            <h4 className='userId'>{user?.id?.timestamp}</h4>
                        </div>
                    </div>
                    <div className="user-info-form-container">
                        <div className="row">
                            <DisplayInput label='Full Name' value={user?.fullName}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='Email' value={user?.email}/>
                            <DisplayInput label='Phone' value={user?.phone}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='Address' type='address' value={user?.address}/>
                            <DisplayInput label='Date of Birth' value={user?.dob}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountContent
