import React, { memo, useEffect, useState } from 'react'
import { Modal, Col, Form, Button, Row, Table, ButtonToolbar } from 'react-bootstrap'
import EmployeeModal from '../EmployeeModal'
import EditEmployeeModal from '../EditEmployeeModal'



function Employee() {
    const [modalShow, setModalShow] = useState(false)
    const [editmodalShow, setEditModalShow] = useState(false)
    const [EmployeeId, setEmployeeId] = useState(0)
    const [EmployeeName, setEmployeeName] = useState('')

    const [DepartmentId, setDepartmentId] = useState(0)
    const [Department, setDepartmentName] = useState('')
    const [PhotoFileName, setPhotoName] = useState('')
    const [DateOfJoining, setPhotoData] = useState('')

    type dev = {
        EmployeeId: number,
        EmployeeName: string,
        DepartmentId: number,
        Department: string,
        PhotoFileName: string;
        DateOfJoining: string;
    }

    // ***
    const [deps, setDeps] = useState<dev[]>([{
        EmployeeId: 0,
        EmployeeName: '',
        DepartmentId: 0,
        Department: '',
        PhotoFileName: '',
        DateOfJoining: '',
    }])

    const editMessage = (EmployeeId: number, EmployeeName: string,
        Department: string,
        PhotoFileName: string,
        DateOfJoining: string,
    ) => {
        setEditModalShow(true)
        setEmployeeId(EmployeeId)
        setEmployeeName(EmployeeName)

        setDepartmentId(DepartmentId)
        setDepartmentName(Department)
        setPhotoName(PhotoFileName)
        setPhotoData(DateOfJoining)
    }

    const refreshList = () => {
        fetch('http://127.0.0.1:8000/employee/')
            .then(response => response.json())
            .then(data => { setDeps(data) })
    }

    const deleteItem = (EmployeeId: number) => {
        if (window.confirm('Are you sure')) {
            fetch('http://127.0.0.1:8000/employee/' + EmployeeId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'applicaton/json',
                    'Content-Type': 'application/json'
                }
            })

        }
    }
    useEffect(refreshList, [])
    console.log(deps)
    return (
        <div >
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        {/* <th>DepartmentId</th> */}
                        <th>Department</th>
                        <th>PhotoFileName</th>
                        <th>DateOfJoining</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep =>
                        <tr key={dep.EmployeeId}>
                            <td>{dep.EmployeeId}</td>
                            <td>{dep.EmployeeName}</td>
                            {/* <td>{dep.DepartmentId}</td> */}
                            <td>{dep.Department}</td>
                            <td>{dep.PhotoFileName}</td>
                            <td>{dep.DateOfJoining}</td>

                            {/* <td>Edit / Delete</td> */}

                            {/* Warning: validateDOMNesting(...): <div> cannot appear as a child of <tr>. */}
                            <ButtonToolbar>
                                <Button variant='info' className='mr-2'
                                    onClick={() => editMessage(
                                        dep.EmployeeId,
                                        dep.EmployeeName,
                                        // dep.DepartmentId,
                                        dep.Department,
                                        dep.PhotoFileName,
                                        dep.DateOfJoining
                                    )}>
                                    EditEmployee
                                </Button>

                                <Button variant='danger' className='mr-3 '
                                    onClick={() => deleteItem(
                                        dep.EmployeeId)}>
                                    Delete
                                </Button>
                            </ButtonToolbar>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                    onClick={() => setModalShow(true)}>
                    Add Employee
                </Button>
            </ButtonToolbar>

            {/* 把值和方法都传过去 */}
            <EmployeeModal show={modalShow} setModalShow={setModalShow} />
            <EditEmployeeModal show={editmodalShow}
                employeeId={EmployeeId}
                employeeName={EmployeeName}
                setModalShow={setEditModalShow}
                // departmentId={DepartmentId}
                departmentName={Department}
                photoName={PhotoFileName}
                date={DateOfJoining}
            />
        </div>
    )
}

export default memo(Employee)