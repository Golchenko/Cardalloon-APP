import React, { useCallback, useState } from "react";
import { Modal, TextField, RangeSlider } from "@shopify/polaris";

export default function ModalWindow({open, onCloseHandler}) {
  const [active, setActive] = useState(true);

  const modalClick = useCallback(() => setActive(!active), [active]);

  const [value, setValue] = useState(
    "Billing address or credit card's address wasn't available"
  );

  const InputChange = useCallback((newValue) => setValue(newValue), []);
  const [rangeValue, setRangeValue] = useState(32);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    []
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseHandler}

        title="Edit message"
        primaryAction={{
          content: "Save",
          onAction: modalClick,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: onCloseHandler,
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Message"
            value={value}
            onChange={InputChange}
            multiline={4}
            autoComplete="off"
          />
        </Modal.Section>
        <Modal.Section>
          <RangeSlider
            label="Font size:"
            value={rangeValue}
            onChange={handleRangeSliderChange}
            output
          />
        </Modal.Section>
      </Modal>
    </div>
  );
}
