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
  Button,
  Group,
  ActionIcon,
  Drawer,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../lib/database.types";
import { FileObject } from "../../lib/FileObject";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { IconEdit } from "@tabler/icons";
import { DropzoneButton } from "./Dropzone";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

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
      bottom: "20px",

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
  const [opened, setOpened] = useState<any>(false);
  const theme = useMantineTheme();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [alt, setAlt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [modalOpened, setModalOpened] = useState<any>(false);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  if (props.updateData.length > 0) {
    const cards = props.updateData.map((article, index) => (
      <>
        <Card
          key={article.id}
          p="md"
          radius="md"
          className={classes.card}
          withBorder
        >
          <Group position="apart">
            <span></span>
            <Button
              leftIcon={<IconEdit size={17} />}
              variant="subtle"
              onClick={() => {
                setOpened(article);
                setTitle(article.desc!);
                setDate(article.date!);
                setImages(article.image!);
                setAlt(article.alt!);
              }}
            >
              Edit
            </Button>
          </Group>
          <Carousel
            withIndicators
            styles={{
              control: {
                "&[data-inactive]": {
                  opacity: "20%",
                  cursor: "default",
                },
              },
            }}
          >
            {article.image?.map((img) => (
              <Carousel.Slide key={Math.random()}>
                <div
                  style={{ position: "relative", aspectRatio: "1920 / 1080" }}
                >
                  <Image
                    src={img}
                    alt={article.alt ?? "An image depicting a holiday"}
                    height="0"
                    width="0"
                    sizes={!mobile ? "10vw" : "35vw"}
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
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
            <Modal
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
              title="Introduce yourself!"
            >
              <div style={{ position: "relative", aspectRatio: "1920 / 1080" }}>
                <Image
                  src={modalOpened}
                  alt={alt ?? "An image depicting crafts and an holiday"}
                  height="0"
                  width="0"
                  sizes="15vw"
                  style={{
                    width: "100%",
                    height: 250,
                    objectFit: "contain",
                    borderRadius: 16,
                    marginBottom: 16,
                  }}
                />
              </div>
              <DropzoneButton
                id={opened.id}
                setModalOpened={setModalOpened}
                originalImage={modalOpened}
              />
            </Modal>
            <Carousel
              withIndicators
              styles={{
                control: {
                  "&[data-inactive]": {
                    opacity: "20%",
                    cursor: "default",
                  },
                },
              }}
            >
              {images?.map((img) => (
                <Carousel.Slide key={Math.random()}>
                  <ActionIcon
                    color="teal"
                    style={{
                      position: "absolute",
                      left: "90%",
                      top: "3%",
                      zIndex: 5,
                    }}
                    onClick={() => setModalOpened(img)}
                    variant="filled"
                    size="lg"
                  >
                    <IconEdit size={23} />
                  </ActionIcon>
                  <div
                    style={{ position: "relative", aspectRatio: "1920 / 1080" }}
                  >
                    <Image
                      src={img}
                      alt={alt ?? "An image depicting a holiday"}
                      height="0"
                      width="0"
                      sizes="15vw"
                      style={{
                        width: "100%",
                        height: 250,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Drawer>
          {cards}
        </SimpleGrid>
      </Container>
    );
  } else {
    return <Loader variant="dots" />;
  }
}
