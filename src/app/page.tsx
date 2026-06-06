import { Button, Flex, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" className="min-h-screen">
      <Heading size="8">Trabalho Final TEES</Heading>
      <Text size="4" color="gray">
        Projeto Next.js com TypeScript e Radix UI
      </Text>
      <Flex gap="3">
        <Button size="3">Começar</Button>
        <Button size="3" variant="outline">Saiba mais</Button>
      </Flex>
    </Flex>
  );
}
