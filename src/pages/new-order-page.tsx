import React from 'react';
// import {useSelector} from 'react-redux';
// import {useNavigate} from 'react-router-dom';
import Layout from '../components/common/layout/layout';
import NewOrder from '../components/new-order/new-order';
// import {cartVariationCountSelector} from '../models/selectors';
// import {RootState} from '../types/redux-orm-extra-types';

export default function NewOrderPage(): JSX.Element {
  // const navigate = useNavigate();
  // const count = useSelector<RootState, any>(cartVariationCountSelector);

  // useEffect(() => {
  //   if (!count) {
  //     navigate('/cart');
  //   }
  // }, [count, navigate]);

  return (
    <Layout>
      <NewOrder />
    </Layout>
  );
}
