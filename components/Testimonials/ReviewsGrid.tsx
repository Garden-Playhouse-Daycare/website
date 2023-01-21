import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Button,
  Group,
} from "@mantine/core";
import { randomInt } from "crypto";
import { Review } from "./Review";
import { Database } from "../../lib/database.types";

type Reviews = Database["public"]["Tables"]["reviews"]["Row"];

const mockdata = [1, 2, 3, 4];

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

interface Props {
  data: Reviews[] | [];
}

export function ReviewsGrid(props: Props) {
  const { classes } = useStyles();

  const cards = props.data.map((review) => (
    <Review
      key={review.id}
      postedAt={review.date!.toString()}
      body={`<p>${review.desc}</p>`}
      author={{
        name: review.name!,
        image: review.profile!,
      }}
    />
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
      <Group position="center" mt="xl">
        <Button
          size="lg"
          component="a"
          target="_blank"
          href="https://www.google.com/search?q=garden+playhouse+daycare&oq=garden+playhouse+&aqs=chrome.0.69i59j69i57j69i59l2j69i60j69i61j69i60.4004j0j1&sourceid=chrome&ie=UTF-8#lrd=0x808fc08b2b3a4f33:0x64205c0be4fdf63c,1,,,,"
        >
          See more reviews
        </Button>
      </Group>
    </Container>
  );
}
