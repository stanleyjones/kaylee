import React from "react";
import {
  Identifier as Id,
  Anonymous,
  KeyPair,
} from "@liftedinit/many-js/dist/v2";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@liftedinit/ui";

interface IdentityProps {
  setId: (id: Id) => void;
}

function Identity({ setId }: IdentityProps) {
  const [mnemonic, setMnemonic] = React.useState(KeyPair.getMnemonic());
  const [textarea, setTextarea] = React.useState("");
  return (
    <Box bg="white" p={6}>
      <Heading>Identity</Heading>
      <Tabs>
        <TabList>
          <Tab onClick={() => setId(new Anonymous())}>Anonymous</Tab>
          <Tab onClick={() => setMnemonic(KeyPair.getMnemonic())}>Random</Tab>
          <Tab>Seed Words</Tab>
          <Tab>Import PEM</Tab>
        </TabList>

        <TabPanels>
          <TabPanel />
          <TabPanel>
            <FormControl>
              <FormLabel m={0} htmlFor="mnemonic">
                Seed Words
              </FormLabel>
              <Textarea
                id="mnemonic"
                isReadOnly
                value={mnemonic}
                onChange={(e) => setTextarea(e.target.value)}
              />
            </FormControl>
            <Button
              mt={6}
              onClick={() => setId(KeyPair.fromMnemonic(mnemonic))}
            >
              Import
            </Button>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel m={0} htmlFor="mnemonic">
                Seed Words
              </FormLabel>
              <Textarea
                id="mnemonic"
                onChange={(e) => setTextarea(e.target.value)}
              />
            </FormControl>
            <Button
              mt={6}
              onClick={() => setId(KeyPair.fromMnemonic(textarea))}
            >
              Import
            </Button>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel m={0} htmlFor="pem">
                PEM File
              </FormLabel>
              <Textarea
                id="pem"
                onChange={(e) => setTextarea(e.target.value)}
              />
            </FormControl>
            <Button mt={6} onClick={() => setId(KeyPair.fromPem(textarea))}>
              Import
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Identity;
