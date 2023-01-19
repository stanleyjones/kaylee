import React from "react";
import { Response as Res } from "@liftedinit/many-js";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  Heading,
  Textarea,
} from "@liftedinit/ui";

interface ResponseProps {
  enc?: Buffer;
}

const replacer = (key: any, value: unknown) => {
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  return value;
};

function Response({ enc }: ResponseProps) {
  const [res, setRes] = React.useState<Res | undefined>();

  React.useEffect(() => {
    if (enc) {
      setRes(Res.fromBuffer(enc));
    } else {
      setRes(undefined);
    }
  }, [enc]);

  return (
    <Box bg="white" p={6}>
      <Heading>Response</Heading>

      <Tabs>
        <TabList>
          <Tab>Encoded (CBOR)</Tab>
          <Tab>Decoded (JSON)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Textarea
              h={300}
              isReadOnly
              name="hex"
              value={enc && enc.toString("hex")}
            />
          </TabPanel>
          <TabPanel>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {res && JSON.stringify(res.toJSON(), replacer, 2)}
            </pre>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default Response;
