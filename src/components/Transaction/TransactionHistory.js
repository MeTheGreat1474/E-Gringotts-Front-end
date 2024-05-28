import React, {useState} from 'react'
import {Button} from "../Button";
import {Input} from "../Input";
import TransactionFilterLogContainer from "./TransactionFilterLogContainer";

function TransactionHistory() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("recent");
    const filterRef = React.useRef();

    // const handleFilterChange = (e, value) => {
    //     setFilterType(value);
    //     console.log(value)
    // }

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        if(e.target.value!==name){
            setSearch("")
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setFilterType("name")
        filterRef.current.value = "name";
    }

    React.useEffect(() => {
        console.log(`Filter ${filterType}, Search ${search}`);
    }, [filterType, search]);

    return (
        <>
            <div className="transac-history-box">
                <h1>Penseive Past</h1>
                <div className="filter-container">
                    <div className="dropdown-list">
                        <select onChange={handleFilterChange} ref={filterRef}>
                            <option value="recent">Recent</option>
                            <option value="category">Category</option>
                            <option value="amount">Amount</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                    <div className="search-container">
                        <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                               placeholder="Search by Name..." value={search}
                               onChange={handleSearchChange}/>
                    </div>
                </div>
                <div className="transac-log-container">

                    <TransactionFilterLogContainer search={search} filterType={filterType}/>

                </div>
            </div>
        </>
    )
}

export default TransactionHistory
