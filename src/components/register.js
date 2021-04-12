import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { login } from "../utils"
import { useState } from 'react';
import {
    Redirect
} from "react-router-dom";

const StyledContainer = styled(Container)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`



const Register = () => {
    const [userLoggedIn, setLogin] = useState(false);
    const registerHandler = event => {
        event.preventDefault();
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value
        const name = event.target.elements.name.value
        const options = {
            method: 'POST',
            data: { email, password, name },
            url: 'http://localhost:3001/users',
        };
        axios(options)
            .then(res => {
                if (res.status === 201) {
                    login(res.data.token);
                    setLogin(true);
                }
            })
            .catch(err => console.log(err))
    }
    if (userLoggedIn)
        return (<Redirect
            to={{
                pathname: "/"
            }}
        />)
    else
        return (
            <StyledContainer>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={registerHandler}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" name="name" required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email" required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                        </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </StyledContainer>);

}

export default Register;