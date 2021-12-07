import React from "react";
import omni from "../omni";
import { handleForm, getFormValue } from "../utils";

import Section from "./Section";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import Tabs from "./Tabs";
import Tab from "./Tab";

const sendRequest = async (form: HTMLFormElement) => {
  const hex = getFormValue(form, "hex");
  const url = getFormValue(form, "url");
  const response = await omni.server.sendHex(url, hex);
  const reply = await omni.message.receiveResponse(response);
  // @TODO: Verify response
  return reply;
};

interface RequestProps {
  req: string;
  setRes: (res: string) => void;
}

function Request({ req, setRes }: RequestProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Section title="Request">
      <ButtonGroup tab={activeTab} setTab={setActiveTab}>
        <Button label="Encoded (CBOR)" />
        <Button label="Decoded (JSON)" />
      </ButtonGroup>

      <form onSubmit={handleForm(sendRequest, setRes)}>
        <Tabs tab={activeTab}>
          <Tab>
            <textarea
              style={{ height: "15em" }}
              name="hex"
              defaultValue={req}
            />
          </Tab>
          <Tab>
            <pre style={{ overflowWrap: "anywhere" }}>
              {omni.message.decodeHex(req)}
            </pre>
          </Tab>
        </Tabs>
        <label>
          URL
          <input name="url" defaultValue="http://localhost:8000" />
        </label>
        <br />
        <button>Send</button>
      </form>
    </Section>
  );
}
export default Request;
