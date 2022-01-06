import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation, Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCog,
    faCar,
    faUser,
    faUsers,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Navbar, Accordion } from '@themesberg/react-bootstrap';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";

function logout() {
    localStorage.removeItem('jwt')
    window.location.reload();
}

export default (props = {}) => {
    const location = useLocation();
    const { pathname } = location;
    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";

    const onCollapse = () => setShow(!show);

    const CollapsableNavItem = (props) => {
        const { eventKey, title, icon, children = null } = props;
        const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

        return (
            <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
                <Accordion.Item eventKey={eventKey}>
                    <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
                        <span>
                            <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
                            <span className="sidebar-text">{title}</span>
                        </span>
                    </Accordion.Button>
                    <Accordion.Body className="multi-level">
                        <Nav className="flex-column">
                            {children}
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }

    const NavItem = (props) => {
        const {
            title,
            link,
            external,
            target,
            icon,
            image,
            badgeText,
            badgeBg = "secondary",
            badgeColor = "primary"
        } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";
        const linkProps = external ? { href: link } : { as: Link, to: link };

        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link {...linkProps} target={target} className={classNames}>
                    <span>
                        {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
                        {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

                        <span className="sidebar-text">{title}</span>
                    </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor}
                            className="badge-md notification-count ms-2">{badgeText}</Badge>
                    ) : null}
                </Nav.Link>
            </Nav.Item>
        );
    };

    return (
        <>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
                    <Image src={ReactHero} className="navbar-brand-light" />
                </Navbar.Brand>
                <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
            </Navbar>
            <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div className="sidebar-inner px-4 pt-3">
                        <Nav className="flex-column pt-3 pt-md-0">
                            <NavItem title="Grand Rent Auto" link={Routes.DashboardOverview.path} image={ReactHero} />
                            <NavItem title="Cars" icon={faCar} link={Routes.Cars.path} />
                            <NavItem title="Rentals" icon={faFile} link={Routes.Rentals.path} />
                            <NavItem title="Customers" icon={faUser} link={Routes.Customers.path} />
                            <NavItem title="Employees" icon={faUsers} link={Routes.Employees.path} />
                            <NavItem title="Settings" icon={faCog} link={Routes.Settings.path} />

                        </Nav>
                        <Nav className="upgrade-to-pro flex-column pt-3 pt-md-0">
                            {/* <NavItem title="Logout" icon={faSignOutAlt} link={logout()}/> */}
                            <Button onClick={() => logout()}>Logout</Button>
                        </Nav>
                    </div>
                </SimpleBar>
            </CSSTransition>
        </>
    );
};