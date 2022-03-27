import React, { memo, useEffect, useState } from 'react'
import { Modal, Col, Form, Button, Row, Table, ButtonToolbar } from 'react-bootstrap'
import DepModal from '../DepModal'
import EditDepModal from '../EditDepModal'



function Department() {
    const [modalShow, setModalShow] = useState(false)
    const [editmodalShow, setEditModalShow] = useState(false)
    const [DepartmentId, setDepartmentId] = useState(0)
    const [DepartmentName, setDepartmentName] = useState('')

    type dev = {
        DepartmentId: number,
        DepartmentName: string
    }

    // ***
    const [deps, setDeps] = useState<dev[]>([{
        DepartmentId: 0,
        DepartmentName: '',
    }])

    const sendMessage = (DepartmentId: number, DepartmentName: string) => {
        setEditModalShow(true)
        setDepartmentId(DepartmentId)
        setDepartmentName(DepartmentName)
    }

    const refreshList = () => {
        fetch('http://127.0.0.1:8000/department/')
            .then(response => response.json())
            .then(data => { setDeps(data) })
    }

    const deleteItem = (DepartmentId: number) => {
        if (window.confirm('Are you sure')) {
            fetch('http://127.0.0.1:8000/department/' + DepartmentId, {
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
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep =>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            {/* <td>Edit / Delete</td> */}

                            {/* Warning: validateDOMNesting(...): <div> cannot appear as a child of <tr>. */}
                            <ButtonToolbar>
                                <Button variant='info' className='mr-2'
                                    onClick={() => sendMessage(
                                        dep.DepartmentId,
                                        dep.DepartmentName)}>
                                    EditDepartment
                                </Button>

                                <Button variant='danger' className='mr-3 '
                                    onClick={() => deleteItem(
                                        dep.DepartmentId)}>
                                    Delete
                                </Button>
                            </ButtonToolbar>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                    onClick={() => setModalShow(true)}>
                    Add Department
                </Button>
            </ButtonToolbar>

            {/* <ButtonToolbar>
                <Button variant='primary'
                    onClick={() => setEditModalShow(true)}>
                    Edit Department
                </Button>
            </ButtonToolbar> */}

            {/* 把值和方法都传过去 */}
            <DepModal show={modalShow} setModalShow={setModalShow} />
            <EditDepModal show={editmodalShow}
                departmentId={DepartmentId}
                departmentName={DepartmentName}
                setModalShow={setEditModalShow} />


        </div>
    )
}

export default memo(Department)