import { Module } from 'module'
import React, { memo, useState } from 'react'
import { Modal, Col, Form, Button, Row } from 'react-bootstrap'

// 添加这个作为传递参数
interface Params {
    show: boolean;
    setModalShow: Function;
    departmentId: number;
    departmentName: string;
}




// 注意有 show 有 {}
function EditDepModal({ show, setModalShow, departmentId, departmentName }: Params) {
    // const [ifShow, setIfShow] = useState(show)


    const submit = (e: any) => {
        const DepartmentId: number = e.target.DepartmentId.value;
        const DepartmentName: (string | number)[] = e.target.DepartmentName.value;
        e.preventDefault()
        fetch('http://127.0.0.1:8000/department/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // 是 put 而不是 post ，需要完整的 departmentid 和 departmentname
                DepartmentId,
                DepartmentName
            })
        }).then(res => (res.json()))
            .then(result => alert(result))
            .catch(error => console.log(error))
    }

    const onHide = (e: any) => {
        e.preventDefault()
        setModalShow(false)
    }

    return (
        <div className='mt-5 d-flex justify-content-left' >

            <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={show}>
                <Modal.Header >
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Edit Department
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={submit}>
                                <Form.Group controlId='DepartmentId'>
                                    <Form.Label>DepartmentId</Form.Label>
                                    <Form.Control type='text' name='DepartmentId' required
                                        defaultValue={departmentId}
                                        placeholder='DepartmentId' />
                                </Form.Group>

                                <Form.Group controlId='DepartmentName'>
                                    <Form.Label>DepartmentName</Form.Label>
                                    <Form.Control type='text' name='DepartmentName' required
                                        defaultValue={departmentName}
                                        placeholder='DepartmentName' />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Confirm
                                    </Button>
                                </Form.Group>
                            </Form>
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

export default memo(EditDepModal)