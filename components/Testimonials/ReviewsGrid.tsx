import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
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
  console.log(props.data);

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
    </Container>
  );
}
