import { Page, Layout, Card } from "@shopify/polaris";
import HeaderTabs from "../components/tabs";
import SearchBar from "../components/search-bar";
import Order from "../components/orders";
import OrdersPagination from "../components/pagination";

// const Index = () => (
//   <Page fullWidth>
//     <Layout>
//       <Layout.Section>
//         <Card>
//           <HeaderTabs />
//           <SearchBar />
//           <Order />
//           <OrdersPagination />
//         </Card>
//       </Layout.Section>
//     </Layout>
//   </Page>
// );

//////////////////////////////

import React, { useEffect, useState } from "react";
import {
  Heading,
  Button,
  CalloutCard,
  DataTable,
  Link,
  ResourceList,
  ResourceItem,
  Thumbnail,
  TextStyle,
  Loading,
  Frame,
  Form,
  FormLayout,
  Checkbox,
  Autocomplete,
  TextField,
  Subheading,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

const DEFAULT_APP_STATES = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const getAppSettings = () => {
  const app = useAppBridge();
  const [appState, setAppState] = useState({
    status: DEFAULT_APP_STATES.PENDING,
    message: DEFAULT_APP_STATES.PENDING,
  });

  const [shopOrders, setshopOrders] = useState("");

  useEffect(() => {
    getTestEndpoint();
  }, []);

  const getTestEndpoint = async () => {
    setAppState(DEFAULT_APP_STATES.PENDING);

    try {
      const token = await getSessionToken(app);

      const res = await fetch("/test-endpoint", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await res.json();

      console.log("RESPONSE DATA : TEST END-POINT: GET :: ", responseData);

      setshopOrders({
        orders: responseData.data.orders.orders,
      });

      setAppState(DEFAULT_APP_STATES.SUCCESS);
    } catch (err) {
      console.log(err);
      setAppState(DEFAULT_APP_STATES.ERROR);
    }
  };

  return {
    appState,
    shopOrders,
    setAppState,
    getTestEndpoint,
  };
};

const AppLoading = (props) => {
  return (
    <Page>
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    </Page>
  );
};

const AppError = (props) => {
  return (
    <Page singleColumn title="Cardalloon | Something's Gone Wrong">
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    </Page>
  );
};


const RegisteredMerchant = (props) => {
  const rows = props.shopOrders.orders.map((order, index) => {
    return [
      index + 1,
      order.name,
      order.status,
      new Date(order.created_at).toUTCString(),
      new Date(order.updated_at).toUTCString(),
    ];
  });

  return (
    <Page
      singleColumn
    >
      <Heading>ALL orders</Heading>

      <hr />
      <Card>
        <DataTable
          columnContentTypes={["numeric", "text", "text", "numeric", "numeric"]}
          headings={["ID", "Product", "Status", "Created At", "Updated At"]}
          rows={rows}
        />
      </Card>
    </Page>
  );
};

const MyApp = (props) => {

  return (
    <RegisteredMerchant
      merchantDetails={props.merchantDetails}
      shopOrders={props.shopOrders}
    />
  );
};

const Index = () => {
  const {
    appState,
    shopOrders,
  } = getAppSettings();


  const renderMyApp = () => {
    switch (appState) {
      case DEFAULT_APP_STATES.PENDING:
        return <AppLoading />;

      case DEFAULT_APP_STATES.ERROR:
        return <AppError />;

      case DEFAULT_APP_STATES.SUCCESS:
        return <MyApp shopOrders={shopOrders} />;

      default:
        return <AppLoading />;
    }
  };

  return <div>{renderMyApp()}</div>;
};

export default Index;
