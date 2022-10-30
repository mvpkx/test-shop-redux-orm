import React from 'react';
import Layout from '../components/common/layout/layout';
import Orders from '../components/orders/orders';

export default function OrdersPage(): JSX.Element {
  return (
    <Layout>
      <Orders />
    </Layout>
  );
}
