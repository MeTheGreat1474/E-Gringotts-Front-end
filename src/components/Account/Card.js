import React from 'react'
import './Card.css'
import DisplayInput from "../DisplayInput";

function Cards({ user }) {
    return (
        <>
            <div className="card-box">
                <div className="title">
                    <h1>CARD INFO</h1>
                </div>
                <div className="card-detail-box">
                    <div className="card-image">
                        <img src="/images/card.jpg" alt="card"/>
                    </div>
                    <div className="card-info-form-container">
                        <div className="row">
                            <DisplayInput label='User ID' value={user?.id?.timestamp}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='Card Number' value={user?.cardNumber}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='CCV' value={user?.ccv}/>
                            <DisplayInput label='Expiry Date' value={user?.expiryDate}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards