import React, {useState} from 'react'
import {Button} from "../Button";
import {Input} from "../Input";
import TransactionFilterLogContainer from "./TransactionFilterLogContainer";

function TransactionHistory() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("recent");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [category, setCategory] = useState("");
    const filterRef = React.useRef();

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        // Reset other filters
        setSearch("");
        setMinAmount("");
        setMaxAmount("");
        setCategory("");
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setFilterType("name");
        filterRef.current.value = "name";
    }

    const handleMinAmountChange = (e) => {
        setMinAmount(e.target.value);
    }

    const handleMaxAmountChange = (e) => {
        setMaxAmount(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    React.useEffect(() => {
        console.log(`Filter ${filterType}, Search ${search}, minAmount=${minAmount} maxAmount=${maxAmount}  category=${category}`);
    }, [filterType, search, category, minAmount, maxAmount]);

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
                    {filterType === "amount" && (
                        <div className="amount-inputs">
                            <Input inputStyle='input--filter' inputSize='input--small' type='number'
                                   placeholder="Min Amount" value={minAmount}
                                   onChange={handleMinAmountChange}/>
                            <Input inputStyle='input--filter' inputSize='input--small' type='number'
                                   placeholder="Max Amount" value={maxAmount}
                                   onChange={handleMaxAmountChange}/>
                        </div>
                    )}
                    {filterType === "category" && (
                        <div className="amount-inputs">
                            <div className="dropdown-list">
                                <select onChange={handleCategoryChange} ref={filterRef}>
                                    <option value="FOOD">Food</option>
                                    <option value="GROCERY">Grocery</option>
                                    <option value="AMOUNT">Medical</option>
                                    <option value="ENTERTAINMENT">Entertainment</option>
                                    <option value="UTILITIES">Utilities</option>
                                    <option value="RELOAD">Reload</option>
                                    <option value="OTHERS">Others</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {filterType === "name" && (
                        <div className="search-container">
                            <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                                   placeholder="Search by Name..." value={search}
                                   onChange={handleSearchChange}/>
                        </div>
                    )}
                </div>
                <div className="transac-log-container">
                    <TransactionFilterLogContainer search={search} filterType={filterType} minAmount={minAmount}
                                                   maxAmount={maxAmount} category={category}/>
                </div>
            </div>
        </>
    )
}

export default TransactionHistory