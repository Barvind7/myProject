import './Component.css';
import customerData from '../MockData/customerDetails.json';

const Header =() =>{
    
    const count = customerData.filter((obj) => obj.isActive === true).length;

    return(
        <div className="header-wrapper">
            <div>User Management</div>
            <div>{`Number of Active Users:${count}`}</div>
        </div>
    )
}
export default Header