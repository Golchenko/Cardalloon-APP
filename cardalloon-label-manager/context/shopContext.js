import React, { Component } from 'react';

const ShopContext = React.createContext();

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



