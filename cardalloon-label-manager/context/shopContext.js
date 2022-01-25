import React, { Component } from 'react';

const ShopContext = React.createContext();

let domain = 'cardalloon-test.myshopify.com';
let accessToken = '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';

class ShopProvider extends Component {

  state = {
    order: {},
    orders: []
  }; 

  fetchAllOrders = async () => {



    this.setState({ orders: orders });
  };

  render() {

    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllOrders: this.fetchAllOrders
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export { ShopContext };
export default ShopProvider;



