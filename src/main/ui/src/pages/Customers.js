import React, { useState, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisH, faCog, faHome, faSearch, faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal, Pagination, Card, Nav } from '@themesberg/react-bootstrap';

import axios from 'axios';

import { AddCustomerForm } from "../components/Forms";
import BootstrapTable from "react-bootstrap-table-next";

export class CustomersTableBoot extends Component {
    state = {
        customers: [],
        columns: [{
            dataField: 'customerId',
            text: 'ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.customerId}</p></React.Fragment>
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
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            formatExtraData: { setShowDelete: this.props.openDelete, setShowDetails: this.props.openDetails, setShowEdit: this.props.openEdit },
            formatter: (cellContent, row, rowIndex, extraDataJson) => {
                const customerUuid = row.customerId;

                return (
                    <React.Fragment>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm">
                                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDetails(customerUuid)}>
                                    <FontAwesomeIcon icon={faEye} className="me-2" /> View customer
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowEdit(customerUuid)}>
                                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit customer
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDelete(customerUuid)} className="text-danger">
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
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers')
            .then(response => {
                this.setState({
                    customers: response.data
                });
            });
    }

    render() {
        return (
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="px-4">
                    <BootstrapTable hover className="user-table align-items-center" keyField='customerId' data={this.state.customers} columns={this.state.columns} bordered={false} />
                </Card.Body>
            </Card>
        )
    }
};

export default () => {
    const [showDefault, setShowDefault] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const handleClose = () => setShowDefault(false) & setShowDelete(false) & setShowDetails(false);

    return (
        <>
            {/*Adding a new customer - modal*/}

            <Modal
                size="lg"
                centered
                show={showDefault}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Add a new customer</Modal.Title>
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

            {/*Delete a customer - modal*/}

            <Modal as={Modal.Dialog} centered show={showDelete} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Delete customer</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this customer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Show customer's details - modal*/}

            <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Customer Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>Define details here</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" >
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item href="/#"><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item active>Customers</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Customers</h4>
                    <p className="mb-0">Your company's customers. </p>
                </div>
                <Button variant="primary" className="m-1" onClick={() => setShowDefault(true)}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>New</span>
                </Button>
            </div>
            <CustomersTableBoot />
        </>
    )
}
