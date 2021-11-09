import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal } from '@themesberg/react-bootstrap';

import { CarsTable } from "../components/Tables";
import { AddCarForm } from "../components/Forms";

export default () => {

    const [showDefault, setShowDefault] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const handleClose = () => setShowDefault(false) & setShowDelete(false) & setShowDetails(false);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
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

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" />
                        </InputGroup>
                    </Col>
                    <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon
                                        icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>

            <CarsTable deleteF={setShowDelete} detailsF={setShowDetails} />
        </>
    );
};
