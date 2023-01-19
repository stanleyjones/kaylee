import React from "react";
import {
  Identifier as Id,
  Request as Req,
  BaseService,
} from "@liftedinit/many-js";
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@liftedinit/ui";

const sendReq = async (url: string, hex: string) => {
  const server = new BaseService(url);
  return await server.sendEncoded(Buffer.from(hex, "hex"));
};

interface RequestProps {
  url: string;
  id: Id;
  req?: Req;
  setEnc: (enc: Buffer) => void;
}

function Request({ url, id, req, setEnc }: RequestProps) {
  const [hex, setHex] = React.useState("");
  const [json, setJson] = React.useState("");

  React.useEffect(() => {
    async function reqToHex(req: Req) {
      const hexReq = (await req.toBuffer(id)).toString("hex");
      setHex(hexReq);
    }
    req && reqToHex(req);
  }, [id, req]);

  React.useEffect(() => {
    function hexToJson(hex: string) {
      const req = Req.fromBuffer(Buffer.from(hex, "hex"));
      setJson(JSON.stringify(req.toJSON(), null, 2));
    }
    hex && hexToJson(hex);
  }, [hex]);

  return (
    <Box bg="white" p={6}>
      <Heading>Request</Heading>
      <Tabs>
        <TabList>
          <Tab>Encoded (CBOR)</Tab>
          <Tab>Decoded (JSON)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Textarea
              name="hex"
              h={300}
              defaultValue={hex}
              onChange={(e) => setHex(e.target.value)}
            />
          </TabPanel>
          <TabPanel>
            <pre style={{ whiteSpace: "pre-wrap" }}>{json}</pre>
          </TabPanel>
          <br />
          <Button mt={6} onClick={async () => setEnc(await sendReq(url, hex))}>
            Send
          </Button>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default Request;
