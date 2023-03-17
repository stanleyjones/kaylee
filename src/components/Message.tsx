import React from "react";
import { Identifier as Id, Request as Req } from "@liftedinit/many-js";
import { Box, Button, Heading } from "@liftedinit/ui";
import Field from "./Field";

const makeReq = (form: ReqForm) => {
  return Req.fromObject({
    from: form.from,
    to: form.to.length ? form.to : undefined,
    method: form.method,
    data: form.data.length
      ? form.data.slice(0, 2) === "[["
        ? new Map(JSON.parse(form.data))
        : JSON.parse(form.data)
      : undefined,
  });
};

interface ReqForm {
  to: string;
  from: string;
  method: string;
  data: string;
  timestamp: number;
}

const initialForm = {
  to: "",
  from: "",
  method: "",
  data: "",
  timestamp: Date.now(),
};

interface MessageProps {
  id: Id;
  setReq: (req: Req) => void;
}

function Message({ id, setReq }: MessageProps) {
  const [form, setForm] = React.useState<ReqForm>(initialForm);

  // @HACK: Keep this line for now. The Buffer polyfill has a strange behavior.
  // id.publicKey = Buffer.from(id.publicKey);

  React.useEffect(() => {
    setForm((form) => ({ ...form, from: id.toString() }));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box bg="white" p={6}>
      <Heading>Message</Heading>
      <Field name="from" label="From" isReadOnly value={form.from} />
      <Field name="to" label="To" placeholder="00" onChange={handleChange} />
      <Field name="method" label="Method" isRequired onChange={handleChange} />
      <Field name="data" label="Data" onChange={handleChange} />
      <Field
        name="timestamp"
        label="Timestamp"
        placeholder="Automatic"
        onChange={handleChange}
      />
      <Button mt={6} onClick={async () => setReq(makeReq(form))}>
        Generate
      </Button>
    </Box>
  );
}

export default Message;
