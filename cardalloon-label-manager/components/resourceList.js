import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Icon, Page, Frame, Loading } from "@shopify/polaris";
import { EditMajor, LinkMinor, ImportMinor, PauseMinor, } from "@shopify/polaris-icons";
import ModalWindow from "./modal"

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

  const [shopOrders, setShopOrders] = useState("");

  useEffect(() => {
    getCurrentSession();
  }, []);

  const getCurrentSession = async () => {
    setAppState(DEFAULT_APP_STATES.PENDING);

    try {
      const token = await getSessionToken(app);

      const res = await fetch("/test-endpoint", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await res.json();

      console.log("RESPONSE DATA : ", responseData.data.orders.body.data.orders.edges);

      setShopOrders({
        orders: responseData.data.orders.body.data.orders,
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
    getCurrentSession,
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
      </div>
    </Page>
  );
};

const RenderOrders = (props) => {
  const orderIds = props.shopOrders.orders.map((order) => {
    return [order];
  });

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ModalWindow
        open={showModal}
        onCloseHandler={() => setShowModal(false)}
      />
      <div className="order-list">
        {orderIds.map((id) => (
          <div className="Polaris-Card">
            <div className="order-item__title">
              <span>Order {id}</span>
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
              <div className="card-buttons__button" onClick={() => setShowModal(true)}>
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
    </>

  );
};

const MyApp = (props) => {
  return (
    <RenderOrders
      shopOrders={props.shopOrders}
    />
  );
};

const AppMain = () => {
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

export default AppMain;
