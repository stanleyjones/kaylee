import { Response as Res } from "@liftedinit/many-js/dist/v2";
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
  res?: Res;
}

function Response({ res }: ResponseProps) {
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
              value={res && res.toBuffer().toString()}
            />
          </TabPanel>
          <TabPanel>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {res && JSON.stringify(res.toObject())}
            </pre>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default Response;
