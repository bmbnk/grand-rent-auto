import React, { useState, useRef, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHome, faKey, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Breadcrumb, Dropdown, Modal, Card, } from '@themesberg/react-bootstrap';

import axios from 'axios';

import BootstrapTable from "react-bootstrap-table-next";

export class RentalsTableBoot extends Component {
    state = {
        rentals: [],
        columns: [{
            dataField: 'rent_id',
            text: 'ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.rent_id}</p></React.Fragment>
            }
        }, {
            dataField: 'car_id',
            text: 'Car\'s ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.car_id}</p></React.Fragment>
            }
        }, {
            dataField: 'employee_id',
            text: 'Employee\'s ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.employee_id}</p></React.Fragment>
            }
        }, {
            dataField: 'customer_id',
            text: 'Customer\'s ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.customer_id}</p></React.Fragment>
            }
        }, {
            dataField: 'start_date',
            text: 'Rental date',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.start_date}</p></React.Fragment>
            }
        }, {
            dataField: 'end_date',
            text: 'Finish date',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.end_date}</p></React.Fragment>
            }
        }, {
            dataField: 'archived',
            text: 'Finished',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.archived}</p></React.Fragment>
            }
        }, {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            formatExtraData: { setShowDetails: this.props.openDetails, setShowFinish: this.props.openFinish },
            formatter: (cellContent, row, rowIndex, extraDataJson) => {
                const rentalUuid = row.rent_id;

                return (
                    <React.Fragment>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm">
                                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDetails(rentalUuid)}>
                                    <FontAwesomeIcon icon={faEye} className="me-2" /> View rental details
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowFinish(rentalUuid)}>
                                    <FontAwesomeIcon icon={faKey} className="me-2" /> Finish rental
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </React.Fragment>
                )
            }
        }]
    }

    componentDidMount() {
        this.updateTable()
    }

    updateTable() {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers')
            .then(response => {
                this.setState({
                    rentals: response.data
                });
            });
    }

    render() {
        return (
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="px-4">
                    <BootstrapTable hover className="user-table align-items-center" keyField='rent_id' data={this.state.rentals} columns={this.state.columns} bordered={false} />
                </Card.Body>
            </Card>
        )
    }
};

export default () => {
    const [showDetails, setShowDetails] = useState(false);
    const [showFinish, setShowFinish] = useState(false);
    const [uuid, setUuid] = useState(null);
    const [rentalInfo, setRentalInfo] = useState(null);
    const refTable = useRef(null);
    const handleClose = () => setShowDetails(false) & setShowFinish(false);

    const handleFinish = (event) => {
        event.preventDefault()

        fetch('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/' + uuid, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: event.target[0].value,
                lastName: event.target[1].value,
                eMail: event.target[2].value,
                phoneNumber: event.target[3].value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => { if (refTable.current) refTable.current.updateTable() })
        handleClose();
    }

    function getRental(uuid) {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/' + uuid)
            .then((response) => {
                setRentalInfo(response.data);
            })
    }

    return (
        <>
            {/*Show rental's details - modal*/}

            <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Customer Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>ID: {rentalInfo?.customerId || ""}</p>
                    <p>First name: {rentalInfo?.firstName || ""}</p>
                    <p>Last name: {rentalInfo?.lastName || ""}</p>
                    <p>E-mail: {rentalInfo?.eMail || ""}</p>
                    <p>Phone number: {rentalInfo?.phoneNumber || ""}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Finish rental - modal*/}

            <Modal as={Modal.Dialog}
                size="lg"
                centered
                show={showFinish}
                onHide={handleClose}
                onSubmit={handleFinish}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Edit this customer</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Personal data of {uuid}</h5>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control required type="text" placeholder={rentalInfo?.firstName || "Enter first name"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control required type="text" placeholder={rentalInfo?.lastName || "Enter last name"} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="eMail">
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control required type="text" placeholder={rentalInfo?.eMail || "Enter e-mail"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phoneNumber">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control required type="text" placeholder={rentalInfo?.phoneNumber || "e.g. 123456789"} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant="secondary" type="submit">
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
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item active>Rentals</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Rentals</h4>
                    <p className="mb-0">Active and archived rentals. </p>
                </div>
            </div>
            <RentalsTableBoot openFinish={(uuid) => { setShowFinish(true); setUuid(uuid); getRental(uuid) }} openDetails={(uuid) => { setShowDetails(true); setUuid(uuid); getRental(uuid) }} ref={refTable} />
        </>
    )
}
