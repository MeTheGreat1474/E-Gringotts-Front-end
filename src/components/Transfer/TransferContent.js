import React, {useState} from 'react'
import './TransferContent.css'
import DisplayInput from "../DisplayInput";
import {Button} from "../Button";
import {Input} from "../Input";
import BalanceAmount from "../BalanceAmount";
import TransferLog from "./TransferLog";
import {useLocation, useNavigate} from "react-router-dom";

//component for handling filter for transfer
function TransferContent({ user }) {
    const [nameSearch, setNameSearch] = useState("");
    const [contactSearch, setContactSearch] = useState("");
    const [emailSearch, setEmailSearch] = useState("");
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("recent");
    const filterRef = React.useRef();

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        if(e.target.value!==name){
            setSearch("")
        }
    }

    const handleNameSearchChange = (e) => {
        setSearch(e.target.value);
        setFilterType("name")
        filterRef.current.value = "name";
    }

    const handleContactSearchChange = (e) => {
        setSearch(e.target.value);
        setFilterType("contact")
        filterRef.current.value = "contact";
    }

    const handleEmailSearchChange = (e) => {
        setSearch(e.target.value);
        setFilterType("email")
        filterRef.current.value = "email";
    }

    return (
        <>
            <div className="transfer-box">
                <div className="title">
                    <h1>PORTKEY TRANSFER</h1>
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
                                    <option value="name">Name</option>
                                    <option value="contact">Contact No.</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                            {filterType === "name" && (
                                <div className="search-container">
                                    <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                           placeholder="Search by Name..." value={search}
                                           onChange={handleNameSearchChange}/>
                                </div>
                            )}
                            {filterType === "contact" && (
                                <div className="search-container">
                                    <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                           placeholder="Search by Contact..." value={search}
                                           onChange={handleContactSearchChange}/>
                                </div>
                            )}
                            {filterType === "email" && (
                                <div className="search-container">
                                    <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                           placeholder="Search by Email..." value={search}
                                           onChange={handleEmailSearchChange}/>
                                </div>
                            )}

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
