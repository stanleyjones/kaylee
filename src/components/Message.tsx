import React from "react";
import { Identifier as Id, Request as Req } from "@liftedinit/many-js/dist/v2";
import { Box, Button, Heading } from "@liftedinit/ui";
import Field from "./Field";

// function makeMessage(form: MessageForm) {
//   return Msg.fromObject({
//     from: Address.fromString(form.from),
//     to: form.to.length ? Address.fromString(form.to) : undefined,
//     method: form.method,
//     data: form.data.length
//       ? form.data.slice(0, 2) === "[["
//         ? new Map(JSON.parse(form.data))
//         : JSON.parse(form.data)
//       : undefined,
//   });
// }

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
  version: "",
};

interface MessageProps {
  id: Id;
  setReq: (req: Req) => void;
}

function Message({ id, setReq }: MessageProps) {
  const [form, setForm] = React.useState<ReqForm>(initialForm);

  // React.useEffect(() => {
  //   const address = new Address(
  //     id ? Buffer.from(id.publicKey) : undefined
  //   ).toString();
  //   setForm((f) => ({ ...f, from: address }));
  // }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box bg="white" p={6}>
      <pre>{JSON.stringify(id.publicKey)}</pre>
      <pre>{JSON.stringify(Buffer.from(id.publicKey))}</pre>
      <Heading>Message</Heading>
      <Field name="from" label="From" isReadOnly value={id.toString()} />
      <Field name="to" label="To" placeholder="00" onChange={handleChange} />
      <Field name="method" label="Method" isRequired onChange={handleChange} />
      <Field name="data" label="Data" onChange={handleChange} />
      <Field
        name="timestamp"
        label="Timestamp"
        placeholder="Automatic"
        onChange={handleChange}
      />
      <Button mt={6} onClick={async () => setReq(Req.fromObject(form))}>
        Generate
      </Button>
    </Box>
  );
}

export default Message;
