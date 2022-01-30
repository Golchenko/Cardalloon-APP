import { Page, Layout, Card } from "@shopify/polaris";
import HeaderTabs from "../components/tabs";
import SearchBar from "../components/search-bar";
import Order from "../components/orders";
import OrdersPagination from "../components/pagination";
import ShopContext from "../context/shopContext";
import ModalWindow from "../components/modal"

const Index = () => (
  <Page fullWidth>
    <ModalWindow />
    <Layout>
      <Layout.Section>
        <Card>
          <HeaderTabs />
          <SearchBar />
            <ShopContext />
          <OrdersPagination />
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Index;
