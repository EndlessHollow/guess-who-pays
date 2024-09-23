import { Grid } from "@components/layout";
import { Avatar } from "@components/avatar";
import { Heading, Text } from "@components/typography";
import { Bot } from "lucide-react";
import { Divider } from "@components/divider";
import { List } from "@components/list";
import { Card } from "@components/card";
import { Information } from "./information";
import { useAppState } from "@/contexts/use-app-state";

export function ScoreBoard() {
  const { people } = useAppState();

  return (
    <Card>
      <Grid gap="4">
        <Grid>
          <Heading size="2xl">Scoreboard</Heading>
          <Text>Show roll and state for each person</Text>
        </Grid>
        <List.Root className="grid lg:grid-cols-2 lg:gap-x-8">
          {people.map((person) => {
            return (
              <div key={person.id}>
                <Divider />
                <List.Item>
                  <Grid
                    gap="4"
                    rows="2"
                    columns="2"
                    justify="center"
                    align="start"
                    className="lg:grid-rows-1 lg:grid-cols-4"
                  >
                    <Avatar className="place-self-center">
                      <Bot />
                    </Avatar>
                    <Information title="Name" text={person.name} />
                    <Information title="Roll" text={person.roll || "-"} />
                    <Information title="State" text={person.state} />
                  </Grid>
                </List.Item>
              </div>
            );
          })}
        </List.Root>
      </Grid>
    </Card>
  );
}
