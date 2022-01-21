import { Page, Layout, Card } from "@shopify/polaris";
import TabsHeader from "../components/header"

const Index = () => (
  <Page>
    <Layout>
      <Layout.Section>
        <Card>
          <TabsHeader/>
          <p>View a summary of your online store’s performance.</p>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Index;
