import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  AspectRatio,
  Loader,
  Center,
  Paper,
  Image as MantineImage,
} from "@mantine/core";
import { Database } from "../lib/database.types";
import { Carousel } from "@mantine/carousel";

type Updates = Database["public"]["Tables"]["updates"]["Row"];

const useStyles = createStyles((theme, _params, getRef) => ({
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

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  newCard: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 6,
      width: 6,
      position: "relative",
      bottom: "10px",

      "&[data-active]": {
        width: 20,
      },
    },
  },
}));

interface Props {
  updateData: Updates[] | [];
}

export function ArticlesCardsGrid(props: Props) {
  const { classes } = useStyles();

  if (props.updateData.length > 0) {
    const cards = props.updateData.map((article) => (
      <Card key={article.id} p="md" radius="md" className={classes.card}>
        <AspectRatio ratio={1920 / 1080}>
          <Card.Section>
            <Carousel
              withIndicators
              classNames={{
                root: classes.carousel,
                controls: classes.carouselControls,
                indicator: classes.carouselIndicator,
              }}
              styles={{
                control: {
                  "&[data-inactive]": {
                    opacity: 0,
                    cursor: "default",
                  },
                },
              }}
            >
              {article.image?.map((rowImage) => (
                <Carousel.Slide key={Math.random()}>
                  <Center>
                    <MantineImage
                      src={rowImage}
                      height={220}
                      alt={
                        article.alt ??
                        "An image depicting crafts and an holiday"
                      }
                      radius="md"
                    />
                  </Center>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>
        </AspectRatio>
        <Text
          color="dimmed"
          size="xs"
          transform="uppercase"
          weight={700}
          mt="md"
        >
          {article.date}
        </Text>
        <Text mt={5}>{article.desc}</Text>
      </Card>
    ));

    return (
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    );
  } else {
    return <Loader variant="dots" />;
  }
}
