import React from "react";
import {
  Identifier as Id,
  Request as Req,
  Response as Res,
  Base as Server,
} from "@liftedinit/many-js/dist/v2";
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
  const server = new Server(url);
  const res = await server.sendEncoded(Buffer.from(hex, "hex"));
  return Res.fromBuffer(res);
};

interface RequestProps {
  url: string;
  id: Id;
  req?: Req;
  setRes: (res: Res) => void;
}

function Request({ url, id, req, setRes }: RequestProps) {
  const [hex, setHex] = React.useState("");
  const [json, setJson] = React.useState("");

  React.useEffect(() => {
    async function reqToHex(req: Req) {
      const hexReq = req.toBuffer(id).toString();
      setHex(hexReq);
      // const cose = await msg?.toCoseMessage(id);
      // setHex(cose.toCborData().toString("hex"));
    }
    req && reqToHex(req);
    // msg && convertMsg(msg);
  }, [id, req]);

  // React.useEffect(() => {
  //   function hexToJson(hex: string) {
  //     const cose = Msg.fromCborData(Buffer.from(hex, "hex"));
  //     setJson(cose.toString());
  //   }
  //   hex && hexToJson(hex);
  // }, [hex]);

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
              defaultValue={req && req.toBuffer().toString()}
              onChange={(e) => setHex(e.target.value)}
            />
          </TabPanel>
          <TabPanel>
            <pre style={{ whiteSpace: "pre-wrap" }}>{req && req.content}</pre>
          </TabPanel>
          <br />
          <Button mt={6} onClick={async () => setRes(await sendReq(url, hex))}>
            Send
          </Button>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default Request;
