import React from 'react'
import './AdminContent.css'

function AdminContent() {
    return (
        <div className='admin-box'>
            <div className="title">
                <h1>ADMIN</h1>
            </div>
            <div className="admin-content-box">
                <h2>Statistics</h2>
                <div className="admin-content-container">
                    <h3>Total Number of users</h3>
                    <div className="admin-content">
                        <h4>120</h4>
                        <p>users since 2022</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>New user</h3>
                    <div className="admin-content">
                        <h4>120</h4>
                        <p>users registered since 24-hours ago</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>Number of transactions per day</h3>
                    <div className="admin-content">
                        <h4>120</h4>
                        <p>users since 2022</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminContent
