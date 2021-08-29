import React, {useState, useEffect} from 'react';
import './Component.css';

const Header =() =>{
    var axios = require("axios");
    let [customerData, setCustomerData] = useState([]);
    let [count, setCount] = useState([]);
    
    useEffect(() => {

        axios.get('https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0')
        .then((response) => {
            setCustomerData(response.data);
        });

        setCount(customerData && customerData.filter((obj) => obj.isActive === true).length);
    })

    return(
        <div className="header-wrapper">
            <div>User Management</div>
            <div>{`Number of Active Users:${count}`}</div>
        </div>
    )
}
export default Header