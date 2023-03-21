import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { BaseService, BaseStatus } from "@liftedinit/many-js";
import {
  Badge,
  Box,
  Button,
  CheckIcon,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@liftedinit/ui";
import { AppState } from "./App";
import { BaseService, BaseStatus } from "@liftedinit/many-js";

interface ServerProps {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
}

function Server({ state, setState }: ServerProps) {
  const [url, setUrl] = useState("localhost");
  const [status, setStatus] = useState<BaseStatus>();

  useEffect(() => {
    async function connect() {
      try {
        const server = new BaseService(url);
        const baseStatus = await server.status();
        console.log(baseStatus);
        setStatus(baseStatus);
      } catch (e) {
        console.error(e);
      }
    }
    connect();
  }, [url]);

  // const [input, setInput] = React.useState(url);
  // const [status, setStatus] = React.useState<BaseStatus | undefined>(undefined);
  // const [endpoints, setEndpoints] = React.useState<string[]>([]);
  // React.useEffect(() => {
  //   async function connect() {
  //     try {
  // const server = new BaseService(url);
  // console.log(server);
  // const status = await server.status();
  // console.log(status);
  // const { endpoints } = await server.endpoints();
  // setStatus(status);
  // setEndpoints(endpoints);
  // } catch {
  // setStatus(undefined);
  // }
  // }
  //   connect();
  // }, [url]);
  return (
    <Box bg="white" p={6}>
      <Heading>Server</Heading>
      <FormControl>
        <Flex>
          <FormLabel w="200px" htmlFor="url">
            URL
          </FormLabel>
          <Input
            id="url"
            type="url"
            defaultValue={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Flex>
      </FormControl>
      <Button mt={6}>Connect</Button>
      {status && (
        <Flex mt={6} gap={6}>
          <CheckIcon color="green" />
          <Text>
            Connected to <b>{status.serverName}</b>
          </Text>
        </Flex>
      )}
    </Box>
  );
  // return (
  //   <Box bg="white" p={6}>
  //     <Heading>Server</Heading>
  //     <FormControl>
  //       <Flex>
  //         <FormLabel w="200px" htmlFor="url">
  //           URL
  //         </FormLabel>
  //         <Input
  //           id="url"
  //           type="url"
  //           defaultValue={url}
  //           onChange={(e) => setInput(e.target.value)}
  //         />
  //       </Flex>
  //     </FormControl>
  //     <Button mt={6} onClick={() => setUrl(input)}>
  //       Connect
  //     </Button>
  //     {status && (
  //       <Flex mt={6} gap={6}>
  //         <CheckIcon color="green" />
  //         <Box>
  //           <Text>
  //             Connected to <b>{status.serverName}</b>
  //           </Text>
  //           <code>{status.address}</code>
  //           <Box>
  //             {endpoints.map((end) => (
  //               <Badge key={end} mr={1} variant="outline">
  //                 {end}
  //               </Badge>
  //             ))}
  //           </Box>
  //         </Box>
  //       </Flex>
  //     )}
  //   </Box>
  // );
}

export default Server;
