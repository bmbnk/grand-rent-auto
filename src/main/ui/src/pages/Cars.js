import React, { useState, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal, Pagination, Card, Nav } from '@themesberg/react-bootstrap';

import axios from 'axios';

import { CarsTable } from "../components/Tables";
import { AddCarForm } from "../components/Forms";
import BootstrapTable from "react-bootstrap-table-next";

import data from '../data/cars'

export class CarsTableBoot extends Component {
    state = {
        cars: [],
        columns: [{
            dataField: 'carId',
            text: 'ID'
        }, {
            dataField: 'carClass',
            text: 'Class'
        }, {
            dataField: 'brand',
            text: 'Brand'
        }, {
            dataField: 'model',
            text: 'Model'
        }, {
            dataField: 'seatingCapacity',
            text: 'Seating Capacity'
        }, {
            dataField: 'engineCapacity',
            text: 'Engine Capacity'
        }, {
            dataField: 'engineType',
            text: 'Engine Type'
        }, {
            dataField: 'mileage',
            text: 'Mileage',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            }
        }, {
            dataField: 'price',
            text: 'Car Price',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            }
        }, {
            dataField: 'status',
            text: 'Status',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            }
        }]
    }

    componentDidMount() {
        axios.get('http://localhost:8080/carsReturn.json')
            .then(response => {
                this.setState({
                    cars: response.data
                });
            });
    }

    render() {
        return (
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="px-4">
                    <BootstrapTable hover className="user-table align-items-center" keyField='carId' data={data} columns={this.state.columns} bordered={false} />
                </Card.Body>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev>
                                Previous
                            </Pagination.Prev>
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Item>4</Pagination.Item>
                            <Pagination.Item>5</Pagination.Item>
                            <Pagination.Next>
                                Next
                            </Pagination.Next>
                        </Pagination>
                    </Nav>
                    <small className="fw-bold">
                        Showing <b>5</b> out of <b>25</b> entries
                    </small>
                </Card.Footer>
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
            {/*Adding a new car - modal*/}

            <Modal
                size="lg"
                centered
                show={showDefault}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Add a new car</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <AddCarForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Add
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Delete a car - modal*/}

            <Modal as={Modal.Dialog} centered show={showDelete} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Delete car</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this car?</p>
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

            {/*Show car's details - modal*/}

            <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Car Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p>Define details here</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Rent
                    </Button>
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
                        <Breadcrumb.Item active>Cars</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Cars</h4>
                    <p className="mb-0">Your company's cars. </p>
                </div>
                <Button variant="primary" className="m-1" onClick={() => setShowDefault(true)}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>New</span>
                </Button>
            </div>
            <CarsTableBoot />
        </>
    )
    //     

    //     return (
    //         <>
    //             <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    //                 <div className="d-block mb-4 mb-md-0">
    //                     <Breadcrumb className="d-none d-md-inline-block"
    //                         listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
    //                         <Breadcrumb.Item href="/#"><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
    //                         <Breadcrumb.Item active>Cars</Breadcrumb.Item>
    //                     </Breadcrumb>
    //                     <h4>Cars</h4>
    //                     <p className="mb-0">Your company's cars. </p>
    //                 </div>
    //                 <Button variant="primary" className="m-1" onClick={() => setShowDefault(true)}>
    //                     <FontAwesomeIcon icon={faPlus} className="me-2" />
    //                     <span>New</span>
    //                 </Button>
    //             </div>

    //             {/*Adding a new car - modal*/}

    //             <Modal
    //                 size="lg"
    //                 centered
    //                 show={showDefault}
    //                 onHide={handleClose}
    //             >
    //                 <Modal.Header>
    //                     <Modal.Title className="h6">Add a new car</Modal.Title>
    //                     <Button variant="close" aria-label="Close" onClick={handleClose} />
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <AddCarForm />
    //                 </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="secondary" onClick={handleClose}>
    //                         Add
    //                     </Button>
    //                     <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
    //                         Cancel
    //                     </Button>
    //                 </Modal.Footer>
    //             </Modal>

    //             {/*Delete a car - modal*/}

    //             <Modal as={Modal.Dialog} centered show={showDelete} onHide={handleClose}>
    //                 <Modal.Header>
    //                     <Modal.Title className="h6">Delete car</Modal.Title>
    //                     <Button variant="close" aria-label="Close" onClick={handleClose} />
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <p>Are you sure you want to delete this car?</p>
    //                 </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="danger" onClick={handleClose}>
    //                         Delete
    //                     </Button>
    //                     <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
    //                         Cancel
    //                     </Button>
    //                 </Modal.Footer>
    //             </Modal>

    //             {/*Show car's details - modal*/}

    //             <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
    //                 <Modal.Header>
    //                     <Modal.Title className="h6">Car Details</Modal.Title>
    //                     <Button variant="close" aria-label="Close" onClick={handleClose} />
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <p>Define details here</p>
    //                 </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="warning" onClick={handleClose}>
    //                         Rent
    //                     </Button>
    //                     <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
    //                         Close
    //                     </Button>
    //                 </Modal.Footer>
    //             </Modal>

    //             <div className="table-settings mb-4">
    //                 <Row className="justify-content-between align-items-center">
    //                     <Col xs={8} md={6} lg={3} xl={4}>
    //                         <InputGroup>
    //                             <InputGroup.Text>
    //                                 <FontAwesomeIcon icon={faSearch} />
    //                             </InputGroup.Text>
    //                             <Form.Control type="text" placeholder="Search" />
    //                         </InputGroup>
    //                     </Col>
    //                     <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
    //                         <Dropdown as={ButtonGroup}>
    //                             <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
    //                                 <span className="icon icon-sm icon-gray">
    //                                     <FontAwesomeIcon icon={faCog} />
    //                                 </span>
    //                             </Dropdown.Toggle>
    //                             <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
    //                                 <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
    //                                 <Dropdown.Item className="d-flex fw-bold">
    //                                     10 <span className="icon icon-small ms-auto"><FontAwesomeIcon
    //                                         icon={faCheck} /></span>
    //                                 </Dropdown.Item>
    //                                 <Dropdown.Item className="fw-bold">20</Dropdown.Item>
    //                                 <Dropdown.Item className="fw-bold">30</Dropdown.Item>
    //                             </Dropdown.Menu>
    //                         </Dropdown>
    //                     </Col>
    //                 </Row>
    //             </div>

    //             <CarsTableBoot />

    //            {/* <CarsTable deleteF={setShowDelete} detailsF={setShowDetails} /> */}
    //         </>
    //     );
};
