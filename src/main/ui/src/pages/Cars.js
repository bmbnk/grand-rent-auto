import React, { useState, useRef, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheck, faEllipsisH, faCog, faHome, faSearch, faPlus, faEye, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, DropdownButton, Modal, Pagination, Card, Nav } from '@themesberg/react-bootstrap';
import Datetime from "react-datetime";

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import axios from 'axios';

import BootstrapTable from "react-bootstrap-table-next";

const { SearchBar } = Search;
const Url = "http://localhost:8080/gra-service-1.0-SNAPSHOT/api/";

function prepareToken() {
    const str = localStorage.getItem('jwt')
    return str?.slice(8,175)
}

const token = prepareToken().replace(/\"/g, "");

let config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

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
            },
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.carId}</p></React.Fragment>
            }
        }, {
            dataField: 'carClass',
            text: 'Class',
            sort: true,
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.carClass}</p></React.Fragment>
            }
        }, {
            dataField: 'brand',
            text: 'Brand',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.brand}</p></React.Fragment>
            }
        }, {
            dataField: 'model',
            text: 'Model',
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.model}</p></React.Fragment>
            }
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
            sort: true,
            formatter: (cellContent, row) => {
                return <React.Fragment> <p> {row.engineType}</p></React.Fragment>
            }
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
            formatExtraData: { setShowDelete: this.props.openDelete, setShowRent: this.props.openRent, setShowDetails: this.props.openDetails, setShowEdit: this.props.openEdit },
            formatter: (cellContent, row, rowIndex, extraDataJson) => {
                const carUuid = row.carId;

                return (
                    <React.Fragment>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm">
                                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => extraDataJson.setShowRent(carUuid)}>
                                    <FontAwesomeIcon icon={faCar} className="me-2" /> Rent car
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDetails(carUuid)}>
                                    <FontAwesomeIcon icon={faEye} className="me-2" /> View car
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowEdit(carUuid)}>
                                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit car
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => extraDataJson.setShowDelete(carUuid)} className="text-danger">
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
        this.updateTable()
    }

    updateTable() {
        console.log(config)
        axios.get(Url + 'cars', '', config)
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
                    <ToolkitProvider
                        keyField="id"
                        data={this.state.cars}
                        columns={this.state.columns}
                        search
                    >
                        {
                            props => (
                                <div>
                                    <div className="table-settings mb-4">
                                        <Row className="justify-content-between align-items-center">
                                            <Col xs={8} md={6} lg={3} xl={4}>
                                                <SearchBar {...props.searchProps} />
                                            </Col>
                                        </Row>
                                    </div>
                                    <BootstrapTable {...props.baseProps} hover className="user-table align-items-center" keyField='carId' data={this.state.cars} columns={this.state.columns} bordered={false} rowStyle={{ textTransform: 'capitalize' }} />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Card.Body>
            </Card >
        )
    }
};

export default () => {
    const [showDefault, setShowDefault] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showRent, setShowRent] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [uuid, setUuid] = useState(null);
    const [carInfo, setCarInfo] = useState(null);
    const refTable = useRef(null);
    const handleClose = () => setShowDefault(false) & setShowDelete(false) & setShowDetails(false) & setShowEdit(false) & setShowRent(false);

    const handleAdd = (event) => {
        event.preventDefault()

        fetch(Url + 'cars', {
            method: 'POST',
            body: JSON.stringify({
                brand: event.target[0].value,
                carClass: event.target[6].value,
                engineCapacity: event.target[3].value,
                engineType: event.target[5].value,
                mileage: event.target[4].value,
                model: event.target[1].value,
                pricePerDay: event.target[7].value,
                seatingCapacity: event.target[2].value,
                status: 'available'
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => { if (refTable.current) refTable.current.updateTable() })

        handleClose();
    }

    const handleEdit = (event) => {
        event.preventDefault()

        fetch(Url + 'cars/' + uuid, {
            method: 'PUT',
            body: JSON.stringify({
                brand: event.target[0].value,
                carClass: event.target[6].value,
                engineCapacity: event.target[3].value,
                engineType: event.target[5].value,
                mileage: event.target[4].value,
                model: event.target[1].value,
                pricePerDay: event.target[7].value,
                seatingCapacity: event.target[2].value,
                status: event.target[8].value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => { if (refTable.current) refTable.current.updateTable() })

        handleClose();
    }

    const handleRent = (event) => {
        event.preventDefault()

        fetch(Url + 'cars/' + uuid, {
            method: 'PUT',
            body: JSON.stringify({
                brand: event.target[0].value,
                carClass: event.target[6].value,
                engineCapacity: event.target[3].value,
                engineType: event.target[5].value,
                mileage: event.target[4].value,
                model: event.target[1].value,
                pricePerDay: event.target[7].value,
                seatingCapacity: event.target[2].value,
                status: event.target[8].value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => { if (refTable.current) refTable.current.updateTable() })

        handleClose();
    }

    function deleteCar(uuid, url) {
        axios.delete(url + 'cars/' + uuid)
            .then(() => { if (refTable.current) refTable.current.updateTable() })

        handleClose();
    }

    function getCar(uuid) {
        axios.get('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars/' + uuid)
            .then((response) => {
                setCarInfo(response.data);
            })
    }

    return (
        <>
            {/*Renting a car - modal*/}

            <Modal
                size="lg"
                centered
                show={showRent}
                onHide={handleClose}
                onSubmit={handleRent}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Rent car</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Rental information</h5>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <p style={{ textTransform: 'capitalize' }}>Class: {carInfo?.carClass || ""}</p>
                                    <p>Brand: {carInfo?.brand || ""}</p>
                                    <p>Model: {carInfo?.model || ""}</p>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <p>Car price: {carInfo?.pricePerDay + ' zł / day' || ""}</p>
                                    <p>Photo: {carInfo?.photos || ""}</p>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Date from</Form.Label>
                                        <Form.Group className="mb-3">
                                            <Datetime
                                                timeFormat={false}
                                                closeOnSelect={false}
                                                renderInput={(props, openCalendar) => (
                                                    <InputGroup>
                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={""}
                                                            placeholder="mm/dd/yyyy"
                                                            onFocus={openCalendar}
                                                            onChange={() => { }} />
                                                    </InputGroup>
                                                )} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Date to</Form.Label>
                                        <Form.Group className="mb-3">
                                            <Datetime
                                                timeFormat={false}
                                                closeOnSelect={false}
                                                renderInput={(props, openCalendar) => (
                                                    <InputGroup>
                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={""}
                                                            placeholder="mm/dd/yyyy"
                                                            onFocus={openCalendar}
                                                            onChange={() => { }} />
                                                    </InputGroup>
                                                )} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Group className="mb-3">
                                            PICKER
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Final price</Form.Label>
                                        <p>100$</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant="warning" type="submit">
                                        Rent
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


            {/*Adding a new car - modal*/}

            <Modal
                size="lg"
                centered
                show={showDefault}
                onHide={handleClose}
                onSubmit={handleAdd}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Add a new car</Modal.Title>
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
                    <Button variant="danger" onClick={() => deleteCar(uuid, Url)}>
                        Delete
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Show car's details - modal */}

            <Modal as={Modal.Dialog} centered show={showDetails} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Car Details</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <p style={{ textTransform: 'capitalize' }}>Class: {carInfo?.carClass || ""}</p>
                    <p>Brand: {carInfo?.brand || ""}</p>
                    <p>Model: {carInfo?.model || ""}</p>
                    <p>Seating capacity: {carInfo?.seatingCapacity + ' persons' || ""}</p>
                    <p>Engine capacity: {carInfo?.engineCapacity + ' l' || ""}</p>
                    <p style={{ textTransform: 'capitalize' }}>Engine type: {carInfo?.engineType || ""}</p>
                    <p>Mileage: {carInfo?.mileage + ' km' || ""}</p>
                    <p>Car price: {carInfo?.pricePerDay + ' zł / day' || ""}</p>
                    <p style={{ textTransform: 'capitalize' }}> Status: {carInfo?.status || ""}</p>
                    <p>Notes: {carInfo?.notes || ""}</p>
                    <p>Photos: {carInfo?.photos || ""}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Edit car's details - modal*/}

            <Modal as={Modal.Dialog}
                size="lg"
                centered
                show={showEdit}
                onHide={handleClose}
                onSubmit={handleEdit}
            >
                <Modal.Header>
                    <Modal.Title className="h6">Edit this car</Modal.Title>
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
                                            <Form.Control required type="text" placeholder={carInfo?.brand || "Enter car's brand"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="model">
                                            <Form.Label>Model</Form.Label>
                                            <Form.Control required type="text" placeholder={carInfo?.model || "Enter car's model"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="seatingCapacity">
                                            <Form.Label>Seating Capacity</Form.Label>
                                            <Form.Control required type="number" placeholder={carInfo?.seatingCapacity || "No. of seats"} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="engineCapacity">
                                            <Form.Label>Engine Capacity</Form.Label>
                                            <Form.Control required type="float" placeholder={carInfo?.engineCapacity || "e.g. 1.9 l"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="mileage">
                                            <Form.Label>Mileage</Form.Label>
                                            <Form.Control required type="number" placeholder={carInfo?.mileage || "e.g. 250000 km"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Select car's engine type</Form.Label>
                                            <Form.Select id="engineType" defaultValue={carInfo?.engineType || "petrol"}>
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
                                            <Form.Select id="carClass" defaultValue={carInfo?.carClass || "economic"}>
                                                <option value="economic">Economic</option>
                                                <option value="premium">Premium</option>
                                                <option value="family">Family</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group id="price">
                                            <Form.Label>Price per day</Form.Label>
                                            <Form.Control required type="number" placeholder={carInfo?.pricePerDay || "e.g. 120 zł"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Select car's status</Form.Label>
                                            <Form.Select id="carClass" defaultValue={carInfo?.status || "available"}>
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
            <CarsTableBoot openDelete={(uuid) => { setShowDelete(true); setUuid(uuid) }} openRent={(uuid) => { setShowRent(true); setUuid(uuid); getCar(uuid) }} openEdit={(uuid) => { setShowEdit(true); setUuid(uuid); getCar(uuid) }} openDetails={(uuid) => { setShowDetails(true); setUuid(uuid); getCar(uuid) }} ref={refTable} />
        </>
    )
}