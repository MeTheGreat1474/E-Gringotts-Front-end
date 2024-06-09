import React from 'react'
import './Card.css'
import DisplayInput from "../DisplayInput";

//display the user's card info
function Cards({ user }) {
    //retrieve the card's cvv date and convert into mm/yy format
    const expiryDate = new Date(user?.card.cardExpiry);
    const formattedExpiryDate = `${expiryDate.getMonth() + 1} / ${expiryDate.getFullYear() % 100}`;
    return (
        <>
            <div className="card-box">
                <div className="title">
                    <h1>CARD INFO</h1>
                </div>
                <div className="card-detail-box">
                    <div className="card-image">
                        <img src={process.env.PUBLIC_URL +"/images/card.jpg"} alt="card"/>
                    </div>
                    <div className="card-info-form-container">
                        <div className="row">
                            <DisplayInput label='User ID' value={user?.userId}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='Card Number' value={user?.card.cardNumber}/>
                        </div>
                        <div className="row">
                            <DisplayInput label='CVV' value={user?.card.cardCVV}/>
                            <DisplayInput label='Expiry Date' value={formattedExpiryDate}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards