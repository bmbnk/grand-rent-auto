import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export const GeneralInfoForm = () => {
    const [birthday, setBirthday] = useState("");

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">General information</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your first name" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Also your last name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-3">
                            <Form.Group id="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <Datetime
                                    timeFormat={false}
                                    onChange={setBirthday}
                                    renderInput={(props, openCalendar) => (
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                                                placeholder="mm/dd/yyyy"
                                                onFocus={openCalendar}
                                                onChange={() => {
                                                }} />
                                        </InputGroup>
                                    )} />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="0">
                                    <option value="0">Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="name@company.com" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control required type="number" placeholder="+12-345 678 910" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h5 className="my-4">Address</h5>
                    <Row>
                        <Col sm={9} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your home address" />
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label>Number</Form.Label>
                                <Form.Control required type="number" placeholder="No." />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control required type="text" placeholder="City" />
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Select state</Form.Label>
                                <Form.Select id="state" defaultValue="0">
                                    <option value="0">State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control required type="tel" placeholder="ZIP" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button variant="primary" type="submit">Save All</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};


export const AddCarForm = ({ formData }) => {
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">General information</h5>
                <Form>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group id="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control required type="text" placeholder="Enter car's brand" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="model">
                                <Form.Label>Model</Form.Label>
                                <Form.Control required type="text" placeholder="Enter car's model" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="seatingCapacity">
                                <Form.Label>Seating Capacity</Form.Label>
                                <Form.Control required type="number" placeholder="No. of seats" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group id="engineCapacity">
                                <Form.Label>Engine Capacity</Form.Label>
                                <Form.Control required type="number" placeholder="e.g. 1.9 l" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="mileage">
                                <Form.Label>Mileage</Form.Label>
                                <Form.Control required type="number" placeholder="e.g. 250000 km" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Select car's engine type</Form.Label>
                                <Form.Select id="engineType" defaultValue="petrol">
                                    <option value="petrol">Petrol</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="electric">Electric</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Select car's class</Form.Label>
                                <Form.Select id="carClass" defaultValue="0">
                                    <option value="0">Economic</option>
                                    <option value="P">Premium</option>
                                    <option value="F">Family</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="price">
                                <Form.Label>Price per day</Form.Label>
                                <Form.Control required type="number" placeholder="e.g. 120 zł" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <h5 className="mb-4">Additional information</h5>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control required type="text" placeholder="Enter notes here" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Add photos</Form.Label>
                                <Form.Control required type="file"/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card >
    );
};

export const AddCustomerForm = () => {
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Personal data</h5>
                <Form>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter first name" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter last name" />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group id="eMail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control required type="text" placeholder="Enter e-mail" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group id="phoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required type="text" placeholder="e.g. 123456789" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card >
    );
};