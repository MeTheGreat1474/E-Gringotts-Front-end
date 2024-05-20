import React, {useState} from 'react'
import {Button} from "../Button";
import {Input} from "../Input";
import FilterLogContainer from "./FilterLogContainer";

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

    //TODO: REPAIR TRANSACTION HISTORY

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
                    {/*<Button value="recent" onClick={(e) => {handleFilterChange(e, 'recent'); }} className='btns' buttonStyle='rectangle' buttonSize='small'>Recent</Button>*/}
                    {/*<Button value="recent" onClick={(e) => {handleFilterChange(e, 'category'); }} className='btns' buttonStyle='rectangle' buttonSize='small'>Category</Button>*/}
                    {/*<Button value="recent" onClick={(e) => {handleFilterChange(e, 'amount'); }} className='btns' buttonStyle='rectangle' buttonSize='small'>Amount</Button>*/}
                    <div className="search-container">
                        <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                               placeholder="Search by Name..." value={search}
                               onChange={handleSearchChange}/>
                    </div>
                </div>
                <div className="transac-log-container">

                    <FilterLogContainer search={search} filterType={filterType}/>

                    {/*<div className="filter-log">*/}
                    {/*    <h3 className='filter-name'>Today</h3>*/}
                    {/*    <div className="log-container">*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="filter-log">*/}
                    {/*    <h3 className='filter-name'>23 April</h3>*/}
                    {/*    <div className="log-container">*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="filter-log">*/}
                    {/*    <h3 className='filter-name'>23 April</h3>*/}
                    {/*    <div className="log-container">*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="log">*/}
                    {/*            <div className="details">*/}
                    {/*                <h4 className='username'>Username</h4>*/}
                    {/*                <p className='category'>category</p>*/}
                    {/*            </div>*/}
                    {/*            <p className='amount'>8 shekel</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}

export default TransactionHistory
