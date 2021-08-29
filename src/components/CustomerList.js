import React, {useState, useEffect} from 'react';
import { Container, Table, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useHistory } from "react-router";
import Pagination from 'react-bootstrap/Pagination';
import './Component.css';

const CustomerList =() =>{

    var axios = require("axios");
    let totalPageIndex = [];
    let history = useHistory();
    const [pageIndex, setPageIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    let [customerData, setCustomerData] = useState([]);
    let [customerNameData, setCustomerNameData] = useState([]);
    let [customerDigestData, setCustomerDigestData] = useState([]);
    const tableHeader = ["First Name", "Last Name", "Company", "City", "State", "Digest Value", "SetIsActive"];

    const splitAddress = (address, type) =>{
        let addressArray = address.split(",");
        if(type === "City"){
            return addressArray[1];
        }
        else{
            return addressArray[2];
        }
    }
    const handleClick = (event) =>{
        const customerDetail = event.target.getAttribute('data-item'); 
        let customerParsedData = JSON.parse(customerDetail);
        history.push({
            pathname: "/customer?id=" + customerParsedData._id,
            state: {
                customerDetail: customerDetail
            }
        })   
    }

    const handlePageClick = (event) =>{
        let activeId = event.target.id;  
        setPageIndex( event.target.id)
        setActiveIndex(activeId);
    }

    const fetchDigetNames = (nameData) =>{
        let promises = [];
        let myObject = [];

        for (let i = 0; i < nameData.length; i++) {
            promises.push(axios.get(`https://api.hashify.net/hash/md4/hex?value=${nameData[i]}`));
        }

        axios.all(promises)
            .then(axios.spread((...args) => {
                for (let i = 0; i < args.length; i++) {
                    myObject.push(args[i].data.Digest);
                }
                setCustomerDigestData(myObject);
            }))
    }

    for (let number = 0; number < Math.floor(customerData && customerData.length / 8); number++) {
        totalPageIndex.push(
            <Pagination.Item key={number} id={number} active={number === activeIndex} onClick={handlePageClick}>
            {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        axios.get('https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0')
        .then((response) => {
            setCustomerData(response.data);
        });
    },[])

    useEffect(() => {
        let arry = customerData.slice(pageIndex * 8, pageIndex * 8 + 8).map(itema => (itema.name.first + itema.name.last));
        setCustomerNameData(arry);

    },[customerData, pageIndex])

    useEffect(() => {
        fetchDigetNames(customerNameData);

    },[customerNameData])

    useEffect(() => {

    },[customerDigestData])
    
    return(
        <Container>
            <Table id="tableId" bordered>
                <thead>
                    <tr>
                    {tableHeader.map((item) => (
                        <th>{item}</th> 
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {customerData && customerData.slice(pageIndex * 8, pageIndex * 8 + 8).map((item, i) => (
                        <tr key={i} onDoubleClick={item.isActive && handleClick}>
                           <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.name.first}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.name.last}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.company}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{splitAddress(item.address, "City")}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{splitAddress(item.address, "State")}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{customerDigestData[i]}</td>
                            <td>
                                <ToggleButtonGroup type="radio" id={`user-${item.name.first}-isActive`} 
                                name={`user-${item.name.first}-isActive`} defaultValue={item.isActive ? 1 : 2}>
                                    <ToggleButton id="tbg-btn-1" value={1} variant="secondary">
                                        Active
                                    </ToggleButton>
                                    <ToggleButton id="tbg-btn-2" value={2} variant="secondary">
                                        Inactive
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
            <Pagination>{totalPageIndex}</Pagination>
        </Container>
    )
}
export default CustomerList