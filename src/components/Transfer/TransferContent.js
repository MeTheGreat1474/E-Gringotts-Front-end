import React, {useState} from 'react'
import './TransferContent.css'
import DisplayInput from "../DisplayInput";
import {Button} from "../Button";
import {Input} from "../Input";
import BalanceAmount from "../BalanceAmount";
import TransferLog from "./TransferLog";
import {useLocation, useNavigate} from "react-router-dom";

function TransferContent({ user }) {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("recent");
    const filterRef = React.useRef();

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

    return (
        <>
            <div className="transfer-box">
                <div className="title">
                    <h1>TRANSFER</h1>
                </div>
                <div className="transfer-detail-box">
                    <BalanceAmount/>
                    <div className="transfer-to-container">
                        <div className="title">
                            <h1>Marauder's Map</h1>
                        </div>
                        <div className="filter-container">
                            <div className="dropdown-list">
                                <select onChange={handleFilterChange} ref={filterRef}>
                                    <option value="recent">Recent</option>
                                    <option value="alphabet">Alphabet</option>
                                    <option value="favourite">Favourite</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                            <div className="search-container">
                                <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                       placeholder="Search by Name..." value={search}
                                       onChange={handleSearchChange} />
                            </div>
                        </div>
                        <div className="logs-container">

                            <TransferLog search={search} filterType={filterType}/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferContent
