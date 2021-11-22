import React, { useState, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal, Pagination, Card, Nav } from '@themesberg/react-bootstrap';

import axios from 'axios';

import { AddCarForm } from "../components/Forms";
import BootstrapTable from "react-bootstrap-table-next";

export class CarsTableBoot extends Component {
    state = {
        cars: [],
        columns: [{
            dataField: 'carId',
            text: 'ID',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            }
        }, {
            dataField: 'carClass',
            text: 'Class',
            formatter: (cellContent, row) => {
                if (row.carClass === 'p') {
                    return <p>Premium</p>
                } else if (row.carClass === 'e') {
                    return <p>Economic</p>
                } else if (row.carClass === 'f') {
                    return <p>Family</p>
                }
            }
        }, {
            dataField: 'brand',
            text: 'Brand'
        }, {
            dataField: 'model',
            text: 'Model'
        }, {
            dataField: 'seatingCapacity',
            text: 'Seating Capacity',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p style={{ textTransform: 'lowercase' }}> {row.seatingCapacity} persons</p> </React.Fragment >
            }
        }, {
            dataField: 'engineCapacity',
            text: 'Engine Capacity',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p style={{ textTransform: 'lowercase' }}> {parseFloat(row.engineCapacity).toFixed(1)} l</p></React.Fragment>
            }
        }, {
            dataField: 'engineType',
            text: 'Engine Type',
            sort: true
        }, {
            dataField: 'mileage',
            text: 'Mileage',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p style={{ textTransform: 'lowercase' }}> {row.mileage} km</p></React.Fragment>
            }
        }, {
            dataField: 'pricePerDay',
            text: 'Car Price',
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b;
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p style={{ textTransform: 'lowercase' }}> {row.pricePerDay} zł / day</p></React.Fragment>
            }
        }, {
            dataField: 'status',
            text: 'Status',
            sort: true,
            formatter: (cellContent, row) => {
                if (row.status == 'available') {
                    return <p style={{ color: 'green' }}>Available</p>
                } else if (row.status == 'rented') {
                    return <p style={{ color: 'gray' }}>Rented</p>
                } else if (row.status == 'renovation') {
                    return <p style={{ color: 'red' }}>Renovation</p>
                }
            }
        }, {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            // formatter: (cellContent, row, rowIndex, extraDataJson) => {
            //     const parsedExtraData = JSON.parse(extraDataJson);
            //     const carUuid = row.carId;
            //     const cars = parsedExtraData.cars;
            //     var dataIndex = cars.findIndex(cars => cars.carId === carUuid);

            //     return (
            //         <Dropdown
            //             onDropdownItemClick={(action) => {
            //                 switch (action) {
            //                     case 'RENT_CAR':
            //                         break;
            //                     case 'VIEW_CAR':
            //                         break;
            //                     case 'EDIT_CAR':
            //                         break;
            //                     case 'DELETE_CAR':
            //                         break;
            //                     default:
            //                         return;
            //                 }
            //             }}
            //         />
            //     )
            // }
        }]
    }

    componentDidMount() {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars')
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
                    <BootstrapTable hover className="user-table align-items-center" keyField='carId' data={this.state.cars} columns={this.state.columns} bordered={false} rowStyle={{ textTransform: 'capitalize' }} />
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
}