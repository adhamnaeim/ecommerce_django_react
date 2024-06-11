import React from 'react'
import { Link, useParams, } from 'react-router-dom'
import { Row,Col,Image, ListGroup, Button, Card, } from 'react-bootstrap'

import Rating from '../components/Rating'
import products from '../products'

function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id)
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
      <Row>
        <Col md={6}>
          <ListGroup variant='flush'>

          <Image src={product.image} alt={product.name} fluid/>
          <ListGroup.Item>
                {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}> 
          <ListGroup variant='flush'>

          <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews}`} color={''}/>
            </ListGroup.Item>

            <ListGroup.Item>
              ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              {product.description}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={2}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'in stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to cart</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default ProductScreen
