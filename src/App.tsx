/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import CartPage from './pages/cart-page';
import NewOrderPage from './pages/new-order-page';
import OrdersPage from './pages/orders-page';
import RecommendedPage from './pages/recommended-page';
import {useDispatch} from 'react-redux';
import {API} from './utils/constants';

function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${API}/api/Categories`)
      .then(resp => dispatch({type: 'LOAD_CATEGORIES', payload: resp.data}));
    axios
      .get(`${API}/api/Products`)
      .then(resp => dispatch({type: 'LOAD_PRODUCTS', payload: resp.data}));
    axios
      .get(`${API}/api/ProductImages`)
      .then(resp => dispatch({type: 'LOAD_IMAGES', payload: resp.data}));
    axios
      .get(`${API}/ProductVariations`)
      .then(resp => dispatch({type: 'LOAD_VARIATIONS', payload: resp.data}));
    axios
      .get(`${API}/ProductVariationProperties`)
      .then(resp => dispatch({type: 'LOAD_VARIATION_PROPERTIES', payload: resp.data}));
    axios
      .get(`${API}/ProductVariationPropertyValues`)
      .then(resp => dispatch({type: 'LOAD_VARIATION_PROPERTY_VALUES', payload: resp.data}));
    axios
      .get(`${API}/ProductVariationPropertyListValues`)
      .then(resp => dispatch({type: 'LOAD_VARIATION_PROPERTY_LIST_VALUES', payload: resp.data}));
    dispatch({type: 'CREATE_ORDER'});
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RecommendedPage />} />
      <Route path="/recommended" element={<RecommendedPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/new-order" element={<NewOrderPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
