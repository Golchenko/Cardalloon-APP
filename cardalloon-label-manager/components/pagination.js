import React from 'react';
import {Pagination} from '@shopify/polaris';

export default class OrdersPagination extends React.Component {
  render() {
    return (
      <Pagination
  hasPrevious
  onPrevious={() => {
    console.log('Previous');
  }}
  hasNext
  onNext={() => {
    console.log('Next');
  }}
/>
    );
  }
}