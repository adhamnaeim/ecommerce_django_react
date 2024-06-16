import React, { useState,useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error,loading,products} = productList

  useEffect(()=> {
    dispatch(listProducts())
    

  },[dispatch])

  return (
    <div>
      <h1>Latest products</h1>
      {loading ? <h2>Loading...</h2> 
        : error ? <h2>error: {error}</h2> 
        : <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* <h3>{product.name}</h3> */}
                    <Product product={product}/>
                </Col>
            ))}
          </Row>
      }
    </div>
  )
}

export default HomeScreen
