import React, {useState} from 'react'
import {Button} from "./Button";
import {Input} from "./Input";

function TransactionHistory() {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="transac-history-box">
                <h1>Penseive Past</h1>
                <div className="filter-container">
                    <Button className='btns' buttonStyle='btn--rectangle' buttonSize='btn--small'>Amount</Button>
                    <Button className='btns' buttonStyle='btn--rectangle' buttonSize='btn--small'>Category</Button>
                    <Button className='btns' buttonStyle='btn--rectangle' buttonSize='btn--small'>Etc...</Button>
                    <div className="search-container">
                        <Input inputStyle='input--filter' inputSize='input--medium' type='text'
                               placeholder="Search..." value={search}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="transac-log-container">
                    <div className="filter-log">
                        <h3 className='filter-name'>Today</h3>
                        <div className="log-container">
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                        </div>
                    </div>
                    <div className="filter-log">
                        <h3 className='filter-name'>23 April</h3>
                        <div className="log-container">
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                            <div className="log">
                                <div className="details">
                                    <h4 className='username'>Username</h4>
                                    <p className='category'>category</p>
                                </div>
                                <p className='amount'>8 shekel</p>
                            </div>
                        </div>
                    </div>
                    <div className="filter-log">

                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionHistory
