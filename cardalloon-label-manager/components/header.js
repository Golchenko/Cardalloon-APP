import React, { useState, useCallback } from "react";
import { Card, Tabs } from "@shopify/polaris";

function TabsHeader() {
    const [selected, setSelected] = useState(0);
  
    const handleTabChange = useCallback(
      (selectedTabIndex) => setSelected(selectedTabIndex),
      [],
    );
  
    const tabs = [
      {
        id: 'all-orders-1',
        content: 'All',
        accessibilityLabel: 'All orders',
        panelID: 'all-orders-content-content-1',
      },
      {
        id: 'Unsent-orders-1',
        content: 'Unsent',
        panelID: 'unsent-orders-content-1',
      },
      {
        id: 'sent-orders-1',
        content: 'Sent',
        panelID: 'sent-orders-content-1',
      },
    ];
  
    return (
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            <p>Tab {selected} selected</p>
          </Card.Section>
        </Tabs>
    );
  }

export default TabsHeader;