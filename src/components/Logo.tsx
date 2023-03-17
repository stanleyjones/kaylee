import { logoSvg, Image, Stack, Heading } from "@liftedinit/ui";

function Logo() {
  return (
    <Stack direction="row">
      <Image src={logoSvg} h="67px" mr={3} alt="Lifted Logo" />
      <Heading lineHeight="67px" size="md" fontWeight="normal">
        Kaylee
      </Heading>
    </Stack>
  );
}
export default Logo;
