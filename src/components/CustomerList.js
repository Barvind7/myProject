import React, {useState} from 'react';
import { Container, Table, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useHistory } from "react-router";
import Pagination from 'react-bootstrap/Pagination';
import customerData from '../MockData/customerDetails.json';
import './Component.css';

const CustomerList =() =>{
    
    let totalPageIndex = [];
    let history = useHistory();
    const tableHeader = ["First Name", "Last Name", "Company", "City", "State", "SetIsActive"];
    const [pageIndex, setPageIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

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
        console.log(customerParsedData);
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

    for (let number = 0; number < Math.floor(customerData.length / 8); number++) {
        totalPageIndex.push(
            <Pagination.Item key={number} id={number} active={number === activeIndex} onClick={handlePageClick}>
            {number}
            </Pagination.Item>,
        );
    }
    
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
                    {customerData.slice(pageIndex * 8, pageIndex * 8 + 8).map((item, i) => (
                        <tr key={i} onDoubleClick={item.isActive && handleClick}>
                           <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.name.first}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.name.last}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{item.company}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{splitAddress(item.address, "City")}</td>
                            <td className={!item.isActive && "inactive-row"} data-item={JSON.stringify(item)}>{splitAddress(item.address, "State")}</td>
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