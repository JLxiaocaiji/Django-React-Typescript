import { Module } from 'module'
import React, { memo, useState, useEffect } from 'react'
import { Modal, Col, Form, Button, Row, Image } from 'react-bootstrap'

// 添加这个作为传递参数
interface Params {
    show: boolean;
    setModalShow: Function
}

// 注意有 show 有 {}
function EmployeeModal({ show, setModalShow }: Params) {


    const pic = '1.jpeg'
    const [photoName, setPhotoName] = useState(pic)


    const refreshList = () => {
        fetch('http://127.0.0.1:8000/department/')
            .then(response => response.json())
            .then(data => { setDeps(data) })
    }
    useEffect(refreshList, [])

    const submit = (e: any) => {
        // 要与数据库中一致
        const EmployeeId: number = 2;
        const EmployeeName: string = e.target.EmployeeName.value;
        const Department: string = e.target.Department.value;
        const DateOfJoining: string = e.target.DateOfJoining.value;
        // 这里出错
        const PhotoFileName: string = photoName;


        e.preventDefault()
        fetch('http://127.0.0.1:8000/employee/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                // 注意要有 {}
                { EmployeeId, EmployeeName, Department, PhotoFileName, DateOfJoining }
            )
        }).then(res => (res.json()))
            .then(result => alert(result))
            .catch(error => console.log(error))
    }

    const onHide = (e: any) => {
        e.preventDefault()
        setModalShow(false)
    }

    type dev = {
        DepartmentId: number,
        DepartmentName: string,
    }

    const [deps, setDeps] = useState<dev[]>([{
        DepartmentId: 0,
        DepartmentName: 'qwe',
    }])

    const handleFileSelected = (e: any) => {
        e.preventDefault()
        // setFileName(e.target.files[0].name)
        const formatData = new FormData()
        formatData.append(
            'myFile',
            e.target.files[0],
            e.target.files[0].name
        )
        fetch('http://127.0.0.1:8000/Employee/SaveFile', {
            method: 'POST',
            body: formatData,
        }).then(res => res.json())
            .then(result => {
                // 会产生另一个 photo
                console.log(result)
                setPhotoName(result)
            }).catch(error => console.log(error))
    }

    return (
        <div className='mt-5 d-flex justify-content-left' >

            <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={show}>
                <Modal.Header >
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={submit}>
                                <Form.Group controlId='EmployeeName'>
                                    <Form.Label>EmployeeName</Form.Label>
                                    <Form.Control type='text' name='EmployeeName' required
                                        placeholder='EmployeeName' />
                                </Form.Group>

                                <Form.Group controlId='Department'>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control as='select'>
                                        {
                                            deps.map(dep =>
                                                <option key={dep.DepartmentId}>
                                                    {dep.DepartmentName}
                                                </option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='DateOfJoining'>
                                    <Form.Label>DateOfJoining</Form.Label>
                                    <Form.Control type='date'
                                        name='DateOfJoining'
                                        required
                                        placeholder='DateOfJoining'
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Add Employee
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col sm={6}>
                            <Image width='200px' height='200px'
                                src={'http://127.0.0.1:8000/media/' + photoName} />
                            <input onChange={handleFileSelected} type='File' />
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default memo(EmployeeModal)