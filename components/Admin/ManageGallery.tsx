import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  Loader,
  Button,
  Group,
  ActionIcon,
  Drawer,
  useMantineTheme,
  Modal,
  Alert,
  Center,
  Paper,
  Stack,
  Title,
  Box,
  TextInput,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../lib/database.types";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { IconEdit, IconInfoCircle, IconCirclePlus, IconCheck } from "@tabler/icons";
import { DropzoneButton } from "./Dropzone";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { AddDropzone } from "./AddDropzone";
import { Gallery } from "../Gallery";
import { showNotification } from "@mantine/notifications";

type Gallery = Database["public"]["Tables"]["gallery"]["Row"];

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.013)",
      boxShadow: theme.shadows.md,
      backgroundColor: "#F8F9FA",
    },
  },

  addCard: {
    backgroundColor: theme.colors.teal[theme.fn.primaryShade()],
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows.md,
      backgroundColor: theme.colors.teal[theme.fn.primaryShade() - 1],
    },
  },

  add: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    transition: "box-shadow 150ms ease, transform 100ms ease",
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 35,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "center",
    },
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
  galleryData: Gallery[] | [];
}

export function ManageGallery(props: Props) {
  const { classes } = useStyles();
  const supabase = useSupabaseClient<Database>();
  const [opened, setOpened] = useState<any>(false);
  const theme = useMantineTheme();
  const [alt, setAlt] = useState("");
  const [images, setImages] = useState<string | undefined>();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [modalOpened, setModalOpened] = useState<any>(false);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [closed, setClosed] = useState(false);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  if (props.galleryData.length > 0) {
    const cards = props.galleryData.map((image, index) => (
      <Card
        key={image.id}
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
              setOpened(image);
              setImages(image.image);
              setAlt(image.alt!);
            }}
          >
            Edit
          </Button>
        </Group>
        <div style={{ position: "relative", aspectRatio: "1920 / 1080" }}>
          <Image
            src={image.image!}
            priority
            alt={image.alt ?? "An image depicting a holiday"}
            height="0"
            width="0"
            sizes={!mobile ? "15vw" : "35vw"}
            style={{
              width: "100%",
              height: 250,
              objectFit: "contain",
            }}
          />
        </div>
      </Card>
    ));

    return (
      <Container py="xl">
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Tip"
          color="teal"
          mb="xl"
          withCloseButton
          hidden={closed}
          onClose={() => setClosed(true)}
          closeButtonLabel="Close tip"
        >
          All of these images will be merged together in a carousel on the home
          page
        </Alert>
        <Center>
          <Button
            mb="lg"
            size="md"
            leftIcon={<IconCirclePlus />}
            onClick={() => {
              setOpened(true);
              setAdd(true);
            }}
          >
            Add new image
          </Button>
        </Center>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
        <Drawer
          opened={opened}
          overlayColor={theme.colors.gray[2]}
          overlayOpacity={0.1}
          onClose={() => {
            setOpened(false);
            setImages(undefined);
            if (add) setAdd(false);
          }}
          title={!add ? "Edit Image" : "Add Image"}
          padding="md"
          size="xl"
          position="right"
          styles={(theme) => ({
            drawer: {
              display: "flex",
              flexDirection: "column",
              height: "100%",

              "& > :nth-of-type(2)": {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0, // all of these styles is to have a scroll wheel inside the drawer
              },
            },
          })}
        >
          {/* The box component is for scrolling on drawer. PX is to add padding on to the content, the MX is to offset the padding on the actual drawer (title component and other meta-drawer components) */}
          <Box sx={{ flexGrow: 1, overflow: "auto" }} px="xl" mx={-16}>
            {!add ? (
              <Modal
                opened={modalOpened}
                onClose={() => {
                  setModalOpened(false);
                }}
                title="Edit this image"
              >
                <div
                  style={{ position: "relative", aspectRatio: "1920 / 1080" }}
                >
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
                  setOpened={setOpened}
                />
              </Modal>
            ) : (
              <AddDropzone setOpened={setOpened} update={false} />
            )}

            {!add && (
              <>
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
                  <Carousel.Slide>
                    <ActionIcon
                      color="teal"
                      style={{
                        position: "absolute",
                        left: "90%",
                        top: "0%",
                        zIndex: 5,
                      }}
                      onClick={() => setModalOpened(images)}
                      variant="filled"
                      size="lg"
                    >
                      <IconEdit size={23} />
                    </ActionIcon>
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1920 / 1080",
                      }}
                    >
                      <Image
                        src={images!}
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
                </Carousel>
                <TextInput
                  mt="xl"
                  description="This alternative text will be read to screen readers and it will describe the images. This can be used to facilitate with SEO."
                  placeholder="Write a short summary of what the images are displaying"
                  label="Alternative Text"
                  withAsterisk
                  value={alt}
                  onChange={(e) => setAlt(e.currentTarget.value)}
                />
                <Button
                  mt="xl"
                  size="md"
                  disabled={loading}
                  loading={loading}
                  onClick={async () => {
                    setLoading(true);

                    const { data: selectData } = await supabase
                      .from("gallery")
                      .select()
                      .eq("image", images)
                      .single();

                    const { data, error } = await supabase
                      .from("gallery")
                      .update({
                        id: selectData?.id,
                        alt: alt,
                      });

                    if (error) console.log(error);

                    setLoading(false);
                    setOpened(false);

                    showNotification({
                      title: "Update Added",
                      message: "Your update was successfully created.",
                      icon: <IconCheck />,
                      color: "green",
                      autoClose: 2000,
                    });
                  }}
                >
                  Update Alternative Text
                </Button>
              </>
            )}
          </Box>
        </Drawer>
      </Container>
    );
  } else {
    return <Loader variant="dots" />;
  }
}
