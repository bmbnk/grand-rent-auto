import React, { useState } from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Toast } from '@themesberg/react-bootstrap';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import BgImage from "../assets/img/illustrations/signin.svg";

function notify() {
    toast.warning("Something went wrong, try again later!");
}

async function loginUser(credentials) {
    return fetch('http://localhost:8080/gra-service-1.0-SNAPSHOT/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setJwt }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const jwt = await loginUser({
            email,
            password
        });
        setJwt(jwt);
    }
    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Sign into Grand Rent Auto</h3>
                                </div>
                                <Form className="mt-4" onSubmit={handleSubmit}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Your Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus required type="email" onChange={e => setEmail(e.target.value)}
                                                placeholder="example@company.com" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Your Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control required type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100" onClick={() => notify()}>
                                        Sign in
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </section>
        </main>
    );
}

Login.propTypes = {
    setJwt: PropTypes.func.isRequired
}
