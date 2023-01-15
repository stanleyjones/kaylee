import React from "react";
import {
  Request as Req,
  Response as Res,
  Identifier as Id,
  Anonymous,
} from "@liftedinit/many-js/dist/v2";

import Logo from "./Logo";
import Network from "./Network";
import Identity from "./Identity";
import Message from "./Message";
import Request from "./Request";
import Response from "./Response";

import { Container, Stack } from "@liftedinit/ui";

function App() {
  const [url, setUrl] = React.useState("http://localhost:8000");
  const [id, setId] = React.useState<Id>(new Anonymous());
  const [req, setReq] = React.useState<Req | undefined>();
  const [res, setRes] = React.useState<Res | undefined>();

  return (
    <Container>
      <Logo />
      <Stack gap={6}>
        <Network url={url} setUrl={setUrl} />
        <Identity setId={setId} />
        <Message id={id} setReq={setReq} />
        <Request url={url} id={id} req={req} setRes={setRes} />
        <Response res={res} />
      </Stack>
    </Container>
  );
}

export default App;
