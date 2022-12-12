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
  Button,
  Group,
  ActionIcon,
  Drawer,
  useMantineTheme,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../lib/database.types";
import { FileObject } from "../../lib/FileObject";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { IconEdit } from "@tabler/icons";
import { DropzoneButton } from "./Dropzone";

type Updates = Database["public"]["Tables"]["updates"]["Row"];

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.013)",
      boxShadow: theme.shadows.md,
      backgroundColor: "#F8F9FA",
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

  drawerIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",
    position: "relative",
    bottom: "10px",

    "&[data-active]": {
      width: 16,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 6,
      width: 6,
      position: "relative",
      bottom: "0px",

      "&[data-active]": {
        width: 20,
      },
    },
  },
}));

interface Props {
  updateData: Updates[] | [];
}

export function ManageUpdates(props: Props) {
  const { classes } = useStyles();
  const supabase = useSupabaseClient<Database>();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [alt, setAlt] = useState("");
  const [images, setImages] = useState<string[]>([]);

  if (props.updateData.length > 0) {
    const cards = props.updateData.map((article, index) => (
      <>
        <Card key={article.id} p="md" radius="md" className={classes.card}>
          <Group position="apart">
            <span></span>
            <Button
              leftIcon={<IconEdit size={17} />}
              variant="subtle"
              onClick={(e) => {
                setOpened(true);
                setTitle(article.desc!);
                setDate(article.date!);
                setImages(article.image!);
                setAlt(article.alt!);
              }}
            >
              Edit
            </Button>
          </Group>
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
      </>
    ));

    return (
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Drawer
            opened={opened}
            overlayColor={theme.colors.gray[2]}
            overlayOpacity={0.1}
            onClose={() => setOpened(false)}
            title="Edit Update"
            padding="xl"
            size="xl"
            position="right"
          >
            <AspectRatio ratio={1920 / 1080}>
              <Carousel
                withIndicators
                classNames={{
                  root: classes.carousel,
                  controls: classes.carouselControls,
                  indicator: classes.drawerIndicator,
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
                {images.map((rowImage) => (
                  <Carousel.Slide key={Math.random()}>
                    <Center>
                      <MantineImage
                        src={rowImage}
                        height={220}
                        alt={alt ?? "An image depicting crafts and an holiday"}
                        radius="md"
                      />
                    </Center>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </AspectRatio>
            <DropzoneButton />
          </Drawer>
          {cards}
        </SimpleGrid>
      </Container>
    );
  } else {
    return <Loader variant="dots" />;
  }
}
