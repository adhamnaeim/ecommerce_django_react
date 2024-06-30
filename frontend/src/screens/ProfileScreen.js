import React, {useEffect, useState} from 'react'
import { Link, useParams,useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

function ProfileScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()


    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo){
        navigate(`/login`)
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,navigate,userInfo,user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('passwords do not match!')
        }else{
            console.log('updating')
        }
    }

  return (
    <Row>
        <Col md={3}>
        <h2>My Profile</h2>
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
                    <Form.Control type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                update
                </Button>
            </Form>
        </Col>
        <Col Col md={9}>
            <h2>My orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen
