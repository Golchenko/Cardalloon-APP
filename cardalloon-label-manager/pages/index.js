import { Page, Layout, Card } from "@shopify/polaris";
import HeaderTabs from "../components/tabs"
import SearchBar from "../components/search-bar"

const Index = () => (
  <Page fullWidth>
    <Layout>
      <Layout.Section>
        <Card>
          <HeaderTabs />
          <SearchBar />
          
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Index;
