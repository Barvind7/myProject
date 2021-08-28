import { Container, Table, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useHistory } from "react-router";
import customerData from '../MockData/customerDetails.json';
import './Component.css';

const CustomerList =() =>{
    
    let history = useHistory();
    const tableHeader = ["First Name", "Last Name", "Company", "City", "State", "SetIsActive"];

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
        console.log(customerDetail); 
        history.push({
            pathname: "/customerDetails",
            state: {
                customerDetail: customerDetail
            }
        })   
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
                    {customerData.map((item, i) => (
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
        </Container>
    )
}
export default CustomerList