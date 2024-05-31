import React, {useState} from 'react'
import './TransferContent.css'
import DisplayInput from "../DisplayInput";
import {Button} from "../Button";
import {Input} from "../Input";
import BalanceAmount from "../BalanceAmount";
import TransferLog from "./TransferLog";
import {useLocation, useNavigate} from "react-router-dom";

function TransferContent({ user }) {
    const [nameSearch, setNameSearch] = useState("");
    const [contactSearch, setContactSearch] = useState("");
    const [filterType, setFilterType] = useState("recent");
    const filterRef = React.useRef();

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        if(e.target.value!==name){
            setNameSearch("")
            setContactSearch("")
        }
    }

    const handleNameSearchChange = (e) => {
        setNameSearch(e.target.value);
        setFilterType("name")
        filterRef.current.value = "name";
    }

    const handleContactSearchChange = (e) => {
        setContactSearch(e.target.value);
        setFilterType("contact")
        filterRef.current.value = "name";
    }

    //TODO: FILTER FOR TRANSFER

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
                                    <option value="contact">Contact No.</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                            {filterType === "name" && (
                                <div className="search-container">
                                    <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                           placeholder="Search by Name..." value={nameSearch}
                                           onChange={handleNameSearchChange}/>
                                </div>
                            )}
                            {filterType === "contact" && (
                                <div className="search-container">
                                    <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                           placeholder="Search by Contact..." value={contactSearch}
                                           onChange={handleContactSearchChange}/>
                                </div>
                            )}
                            {/*<div className="search-container">*/}
                            {/*    <Input inputStyle='input--filter' inputSize='input--medium' type='text'*/}
                            {/*           placeholder="Search by Name..." value={search}*/}
                            {/*           onChange={handleSearchChange} />*/}
                            {/*</div>*/}
                        </div>
                        <div className="logs-container">
                            <TransferLog contactSearch={contactSearch} nameSearch={nameSearch} filterType={filterType}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferContent
