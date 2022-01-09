import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, Row, Card, Breadcrumb} from '@themesberg/react-bootstrap';
import {faHome} from '@fortawesome/free-solid-svg-icons';

export default () => {
    return (
        <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-md-0">
                <Breadcrumb className="d-none d-md-inline-block"
                            listProps={{className: "breadcrumb-dark breadcrumb-transparent"}}>
                    <Breadcrumb.Item href="/#"><FontAwesomeIcon icon={faHome}/></Breadcrumb.Item>
                </Breadcrumb>
                <h4>Dashboard</h4>
                <p className="mb-0">Portal's main dashboard. </p>
            </div>
        </div>
            <Row>
                <Col xs={12} className="p-3">
                    <Card>
                        <Card.Body>
                            <article>
                                <h1 className="h2" id="overview">Grand Rent Auto </h1>
                                <p className="fs-5 fw-light">Car rental support system</p>

                                <p>Welcome to Grand Rent Auto. </p>
                                <h2>
                                    Tabs
                                </h2>
                                <p>On the left side of the portal there are tabs that you can use to manage your rental company: </p>
                                <ul className="docs-list">
                                    <li>The Cars tab will take you to your cars list,</li>
                                    <li>You can use the Customers tab to manage customers, </li>
                                    <li>You can use the Employees tab to manage employees. </li>
                                </ul>
                                <p>We wish you a pleasant time using our portal. In case of any problems do not hesiteate to contact us at <a href="mailto:help@gra.com">help@gra.com</a> </p>
                            </article>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
