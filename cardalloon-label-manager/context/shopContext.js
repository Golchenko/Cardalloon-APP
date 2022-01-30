import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Icon, Page, Frame, Loading } from "@shopify/polaris";
import {
  EditMajor,
  LinkMinor,
  ImportMinor,
  PauseMinor,
} from "@shopify/polaris-icons";

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

  const [shopOrders, GetShopOrders] = useState("");

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

      GetShopOrders({
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

const FetchAllOrders = (props) => {
  const rows = props.shopOrders.orders.map((order) => {
    return [order.name];
  });

  return (
    <div className="order-list">
      {rows.map((row) => (
        <div className="Polaris-Card">
          <div className="order-item__title">
            <span>Order {row}</span>
          </div>
          <div className="order-item__image">
            <img
              alt=""
              width="100%"
              height="100%"
              src="https://imgur.com/QyH9I9n.png"
            ></img>
          </div>
          <div className="order-item__buttons card-buttons">
            <div className="card-buttons__button" onClick={console.log("menuAction")}>
              <Icon source={EditMajor} color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon source={ImportMinor} color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon source={LinkMinor} color="base" />
            </div>
            <div className="card-buttons__button">
              <Icon source={PauseMinor} color="base" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MyApp = (props) => {
  return (
    <FetchAllOrders
      merchantDetails={props.merchantDetails}
      shopOrders={props.shopOrders}
    />
  );
};

const ShopContext = () => {
  const { appState, shopOrders } = getAppSettings();

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

export default ShopContext;
