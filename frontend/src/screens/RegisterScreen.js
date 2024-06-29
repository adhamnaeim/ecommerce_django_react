import React, {useEffect, useState} from 'react'
import { Link, useParams,useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
        navigate(redirect)
        }
    },[navigate,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('passwords do not match!')
        }else{
            dispatch(register(name,email,password))
        }
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message  && 
            <Message variant='danger'>{message}</Message>}
            {error  && 
            <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='enter email' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control required type='password' placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                have an account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>login here!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
    }

export default RegisterScreen
