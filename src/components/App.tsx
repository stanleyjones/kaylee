import React from "react";
import {
  Request as Req,
  Identifier as Id,
  Anonymous,
} from "@liftedinit/many-js";

import Logo from "./Logo";
import Server from "./Server";
import Identifier from "./Identifier";
import Message from "./Message";
import Request from "./Request";
import Response from "./Response";

import { Container, Stack } from "@liftedinit/ui";

function App() {
  const [url, setUrl] = React.useState("http://localhost:8000");
  const [id, setId] = React.useState<Id>(new Anonymous());
  const [req, setReq] = React.useState<Req | undefined>();
  const [enc, setEnc] = React.useState<Uint8Array | undefined>();

  return (
    <Container>
      <Logo />
      <Stack gap={6}>
        <Server url={url} setUrl={setUrl} />
        <Identifier setId={setId} />
        <Message id={id} setReq={setReq} />
        <Request url={url} id={id} req={req} setEnc={setEnc} />
        <Response enc={enc} />
      </Stack>
    </Container>
  );
}

export default App;
