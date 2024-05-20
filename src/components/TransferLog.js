import React from 'react'

function TransferLog({ search, filterType }) {

    // Placeholder data
    const data = [
        { username: 'User1', phone: '1234567890' },
        { username: 'ASD', phone: '0987654321' },
        { username: 'User2', phone: '0987654321' },
        { username: 'llll', phone: '0987654321' },
        { username: 'User1', phone: '1234567890' },
        { username: 'ASD', phone: '0987654321' },
        { username: 'User2', phone: '0987654321' },
        { username: 'llll', phone: '0987654321' },
        { username: 'User1', phone: '1234567890' },
        { username: 'ASD', phone: '0987654321' },
        { username: 'User2', phone: '0987654321' },
        { username: 'llll', phone: '0987654321' },

        // Add more data as needed
    ];

    // Placeholder function to simulate API call
    const getFilteredData = (data, filterType, search) => {
        // Implement your filtering logic here
        // For now, just return the data as is
        console.log(`Filter ${filterType}, Search ${search}`)
        return data;
    }

    const filteredData = getFilteredData(data, filterType, search);

    return (
        <div className="logs-wrapper">
            {filteredData.map((item, index) => (
                <div className="logs-box" key={index}>
                    <div className="log">
                        <div className="username">
                            <h3>{item.username}</h3>
                        </div>
                        <div className="phone">
                            <h4>{item.phone}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TransferLog
