import { Col, Row, Form, Image, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useLocation } from "react-router";
import './Component.css';

const CustomerDetails =() =>{

    let location = useLocation();
    let customerDetail;
    let val = {name:"", age:""};
    if(location.state){
        customerDetail = JSON.parse(location.state.customerDetail);
    }

    return(
        <Form className="form-padding">
            <Row className="mb-3">
                <Form.Group className="mb-3 padding-img">
                    <Image src={customerDetail.picture} className="image-profile" thumbnail/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly value={customerDetail.name.last + ', ' + customerDetail.name.first}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Age</Form.Label>
                <Form.Control readOnly value={customerDetail.age}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>EyeColor</Form.Label>
                <Form.Control readOnly value={customerDetail.eyeColor}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Company</Form.Label>
                <Form.Control readOnly value={customerDetail.company}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Balance</Form.Label>
                <Form.Control readOnly value={customerDetail.balance}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Address</Form.Label>
                <Form.Control readOnly as="textarea" value={customerDetail.address}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>About</Form.Label>
                <Form.Control readOnly as="textarea" value={customerDetail.about}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Email</Form.Label>
                <Form.Control readOnly type="email" value={customerDetail.email}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>PhoneNumber</Form.Label>
                <Form.Control readOnly value={customerDetail.phone}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Registered</Form.Label>
                <Form.Control readOnly value={customerDetail.registered}/>
                </Form.Group>
            </Row>

            <Row className="align-center">
                <ToggleButtonGroup type="radio" id={`user-isActive`}
                            name={`user-isActive`} defaultValue={customerDetail.isActive ? 2 : 1}>
                    <ToggleButton id="tbg-btn-1" value={1} variant="secondary">
                        Active
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={2} variant="secondary">
                        Inactive
                    </ToggleButton>
                </ToggleButtonGroup>
            </Row>
        </Form>
    )
}
export default CustomerDetails