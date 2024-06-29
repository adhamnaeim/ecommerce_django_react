import React, {useEffect, useState} from 'react'
import { Link, useParams,useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login} from '../actions/userActions'

function LoginScreen() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email,password))
  }

  return (
    <FormContainer>
      <h1>Login</h1>
      {error  && 
      <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value) }></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-3'>
          sign in
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          new customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>register here!</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
