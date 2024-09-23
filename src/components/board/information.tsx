import { Heading, Text } from "@components/typography";
import { Flex } from "@components/layout";
import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  text: ReactNode;
};

export function Information(props: Props) {
  const { title, text } = props;
  return (
    <Flex direction="column" align="center">
      <Heading as="h4" size="lg">
        {title}
      </Heading>
      <Text>{text}</Text>
    </Flex>
  );
}
