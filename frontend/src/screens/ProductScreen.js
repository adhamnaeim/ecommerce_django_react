import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Fetching product details from Redux store
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{`Error: ${error}`}</Message>
      ) : (
        product && (
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <Image src={product.image} alt={product.name} fluid />
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                    color={''}
                  />
                </ListGroup.Item>

                <ListGroup.Item>${product.price}</ListGroup.Item>

                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={2}>
              <Card>
                <ListGroup variant="flush">
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
                        <strong>
                          {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </div>
  );
}

export default ProductScreen;
