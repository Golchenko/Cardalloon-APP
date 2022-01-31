import { Page, Layout, Card } from "@shopify/polaris";
import HeaderTabs from "../components/tabs";
import SearchBar from "../components/search-bar";
import Order from "../components/orders";
import OrdersPagination from "../components/pagination";
import ShopContext from "../components/resourceList";


const Index = () => (
  <Page fullWidth>
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
