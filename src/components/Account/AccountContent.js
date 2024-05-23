import React from 'react'
import './AccountContent.css'
import DisplayInput from "../DisplayInput";
import DisplayUserProfile from "../DisplayUserProfile";

function AccountContent({ user }) {
    return (
        <>
            <div className="account-box">
                <div className="title">
                    <h1>USER ACCOUNT</h1>
                </div>
                <div className="account-detail-box">
                    <DisplayUserProfile user={user}/>

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
