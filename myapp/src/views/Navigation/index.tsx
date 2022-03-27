import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';



function Navigation() {
    return (
        <Navbar bg='dark' expand='lg'>
            {/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
            <Navbar.Collapse id='basic-navbar-nav' />
            <Nav >
                <NavLink className=' p-2 bg-dark text-white justify-content-left' to='/'>
                    Home
                </NavLink>
                <NavLink className='d-inline p-2 bg-dark text-white' to='/department'>
                    Department
                </NavLink>
                <NavLink className='d-inline p-2 bg-dark text-white' to='/employee'>
                    Employee
                </NavLink>
            </Nav>

        </Navbar>
    )
}

export default memo(Navigation)