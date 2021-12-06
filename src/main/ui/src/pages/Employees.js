import React, { useState, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHome, faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Breadcrumb, Dropdown, Modal, Card, } from '@themesberg/react-bootstrap';

import axios from 'axios';

import BootstrapTable from "react-bootstrap-table-next";

export class EmployeesTableBoot extends Component {
    state = {
        employees: [],
        columns: [{
            dataField: 'employeesId',
            text: 'ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.employeesId}</p></React.Fragment>
            }
        }, {
            dataField: 'firstName',
            text: 'First name',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.firstName}</p></React.Fragment>
            }
        }, {
            dataField: 'lastName',
            text: 'Last name',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.lastName}</p></React.Fragment>
            }
        }, {
            dataField: 'login',
            text: 'Login',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.login}</p></React.Fragment>
            }
        }, {
            dataField: 'password',
            text: 'Password',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.password}</p></React.Fragment>
            }
        }, {
            dataField: 'eMail',
            text: 'E-mail',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.eMail}</p></React.Fragment>
            }
        }, {
            dataField: 'phoneNumber',
            text: 'Phone number',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.phoneNumber}</p></React.Fragment>
            }
        }, {
            dataField: 'isAdmin',
            text: 'AdminEmployee',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.isAdmin}</p></React.Fragment>
            }
        }, {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            formatExtraData: { setShowDelete: this.props.openDelete, setShowDetails: this.props.openDetails, setShowEdit: this.props.openEdit },
            formatter: (cellContent, row, rowIndex, extraDataJson) => {
                const employeeUuid = row.employeesId;

                return (
                    <React.Fragment>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm">
                                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDetails(employeeUuid)}>
                                    <FontAwesomeIcon icon={faEye} className="me-2" /> View employee
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowEdit(employeeUuid)}>
                                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit employee
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDelete(employeeUuid)} className="text-danger">
                                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </React.Fragment>
                )
            }
        }]
    }

    componentDidMount() {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/employees')
            .then(response => {
                this.setState({
                    employees: response.data
                });
            });
    }

    render() {
        return (
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="px-4">
                    <BootstrapTable hover className="user-table align-items-center" keyField='employeesId' data={this.state.employees} columns={this.state.columns} bordered={false} />
                </Card.Body>
            </Card>
        )
    }
};

export default () => {
    const [showDefault, setShowDefault] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [uuid, setUuid] = useState(null);
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const handleClose = () => setShowDefault(false) & setShowDelete(false) & setShowDetails(false) & setShowEdit(false);

    const handleAdd = (event) => {
        event.preventDefault()

        fetch('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/employees', {
            method: 'POST',
            body: JSON.stringify({
                firstName: event.target[0].value,
                lastName: event.target[1].value,
                login: event.target[2].value,
                password: event.target[3].value,
                eMail: event.target[4].value,
                phoneNumber: event.target[5].value, 
                isAdmin: 'true'
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        handleClose();
        window.location.reload(false);
    }

    const handleEdit = (event) => {
        event.preventDefault()

        fetch('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/employees/' + uuid, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: event.target[0].value,
                lastName: event.target[1].value,
                login: event.target[2].value,
                password: event.target[3].value,
                eMail: event.target[4].value,
                phoneNumber: event.target[5].value, 
                isAdmin: 'true'
        }),
            headers: { 'Content-Type': 'application/json' },
        })

        // handleClose();
        // window.location.reload(false);
    }

    function deleteEmployee(uuid) {
        axios.delete('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/employees/' + uuid)
        handleClose();
        window.location.reload(false);
    }

    function getEmployee(uuid) {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/employees/' + uuid)
            .then((response) => {
                setEmployeeInfo(response.data);
            })
    }

    return (
        <>
            {/*Adding a new employee - modal*/}

            <Modal
                size="lg"
                centered
                show={showDefault}
                onHide={handleClose}
                onSubmit={handleAdd}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Add a new employee</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Personal data</h5>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter first name" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter last name" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="login">
                                            <Form.Label>Login</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter login" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter password" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="eMail">
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter e-mail" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phoneNumber">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control required type="text" placeholder="e.g. 123456789" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="isAdmin">
                                            <Form.Label>Is admin</Form.Label>
                                            <Form.Control required type="text" placeholder="Admin employee?" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant="secondary" type="submit">
                                        Add
                                    </Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Delete an employee - modal*/}

            <Modal as={Modal.Dialog} centered show={showDelete} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Delete employee</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this employee?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteEmployee(uuid)}>
                        Delete
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Show employee's details - modal*/}

            <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Employee Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                        <p>ID: {employeeInfo?.employeesId || ""}</p>
                        <p>First name: {employeeInfo?.firstName || ""}</p>
                        <p>Last name: {employeeInfo?.lastName || ""}</p>
                        <p>Login: {employeeInfo?.login || ""}</p>
                        <p>Password: {employeeInfo?.password || ""}</p>
                        <p>E-mail: {employeeInfo?.eMail || ""}</p>
                        <p>Phone number: {employeeInfo?.phoneNumber || ""}</p>
                        <p>Is admin? {employeeInfo?.isAdmin || ""}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Edit employee's details - modal*/}

            <Modal as={Modal.Dialog}
                size="lg"
                centered
                show={showEdit}
                onHide={handleClose}
                onSubmit={handleEdit}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Edit this employee</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
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
                                            <Form.Control required type="float" placeholder="e.g. 1.9 l" />
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
                                            <Form.Select id="carClass" defaultValue="economic">
                                                <option value="economic">Economic</option>
                                                <option value="premium">Premium</option>
                                                <option value="family">Family</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="price">
                                            <Form.Label>Price per day</Form.Label>
                                            <Form.Control required type="number" placeholder="e.g. 120 zł" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Select car's status</Form.Label>
                                            <Form.Select id="carClass" defaultValue="economic">
                                                <option value="available">Available</option>
                                                <option value="rented">Rented</option>
                                                <option value="renovation">Renovation</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="mb-4">Additional information (optional)</h5>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control type="text" placeholder="Enter notes here" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Add photos</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant="secondary" type="submit" onClick={(uuid) => { handleEdit(); setUuid(uuid) }}>
                                        Edit
                                    </Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" >
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item href="/#"><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item active>Employees</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Employees</h4>
                    <p className="mb-0">Your company's employees. </p>
                </div>
                <Button variant="primary" className="m-1" onClick={() => setShowDefault(true)}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>New</span>
                </Button>
            </div>
            <EmployeesTableBoot openDelete={(uuid) => { setShowDelete(true); setUuid(uuid) }} openEdit={(uuid) => { setShowEdit(true); setUuid(uuid) }} openDetails={(uuid) => { setShowDetails(true); setUuid(uuid); getEmployee(uuid) }} />
        </>
    )
}
