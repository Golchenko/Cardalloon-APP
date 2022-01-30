import React, { useContext, useEffect } from 'react';
import { Icon } from '@shopify/polaris';
import { EditMajor } from '@shopify/polaris-icons';
import { LinkMinor } from '@shopify/polaris-icons';
import { ImportMinor } from '@shopify/polaris-icons';
import { PauseMinor } from '@shopify/polaris-icons';
// import { ShopContext } from '../context/shopContext'

// const Orders = () => {

//   const { fetchAllOrders, orders } = useContext(ShopContext)

//   useEffect(() => {
//       fetchAllOrders()
      
//   }, [])

//   if (!orders) return
//   <div>
//       Loading...
//   </div>

//   return (
//     <div className='order-list'>
//     <div className="Polaris-Card">
//       <div className="order-item__title">
//         <span>Order 30077</span>
//       </div>
//         <div className="order-item__image">
//           <img alt="" width="100%" height="100%" src="https://imgur.com/QyH9I9n.png"></img>
//         </div>
//       <div className="order-item__buttons card-buttons">
//         <div className="card-buttons__button">
//           <Icon
//             source={EditMajor}
//             color="base" />
//         </div>
//         <div className="card-buttons__button">
//           <Icon
//             source={ImportMinor}
//             color="base" />
//         </div>
//         <div className="card-buttons__button">
//           <Icon
//             source={LinkMinor}
//             color="base" />
//         </div>
//         <div className="card-buttons__button">
//           <Icon
//             source={PauseMinor}
//             color="base" />
//         </div>
//       </div>
//     </div>
//   </div>
//   )

// }

// export default Orders





export default class Order extends React.Component {
  render() { 
  <getOrders />
    return (
      <div className='order-list'>        
        <div className="Polaris-Card">
          <div className="order-item__title">
            <span>Order 30077</span>
          </div>
            <div className="order-item__image">
              <img alt="" width="100%" height="100%" src="https://imgur.com/QyH9I9n.png"></img>
            </div>
          <div className="order-item__buttons card-buttons">
            <div className="card-buttons__button">
              <Icon
                source={EditMajor}
                color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon
                source={ImportMinor}
                color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon
                source={LinkMinor}
                color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon
                source={PauseMinor}
                color="base" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}