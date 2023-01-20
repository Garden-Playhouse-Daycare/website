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
  TextInput,
  Box,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../lib/database.types";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import {
  IconEdit,
  IconInfoCircle,
  IconCirclePlus,
  IconCheck,
} from "@tabler/icons";
import { DropzoneButton } from "./Dropzone";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { AddDropzone } from "./AddDropzone";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

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
  const [date, setDate] = useState<any>(undefined);
  const [alt, setAlt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [modalOpened, setModalOpened] = useState<any>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [closed, setClosed] = useState(false);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [updateData, setUpdateData] = useState(props.updateData);

  useEffect(() => {
    setUpdateData(props.updateData);
  }, [props.updateData]);

  if (updateData.length > 0) {
    const cards = updateData.map((article, index) => (
      <Card
        key={article.id}
        p="md"
        radius="md"
        className={classes.card}
        withBorder
        style={
          index < 4
            ? { borderColor: theme.colors.green[theme.fn.primaryShade()] }
            : undefined
        }
      >
        <Group position="apart">
          <span></span>
          <Button
            leftIcon={<IconEdit size={17} />}
            variant="subtle"
            onClick={(e) => {
              setAdd(false);
              setOpened(article);
              setTitle(article.desc);
              setDate(new Date(article.date));
              setImages(article.image);
              setAlt(article.alt);
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
            <Carousel.Slide key={img}>
              <div style={{ position: "relative", aspectRatio: "1920 / 1080" }}>
                <Image
                  src={img}
                  priority
                  alt={article.alt ?? "An image depicting a holiday"}
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
          Cards in green are the one shown to the user on the home page
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
            Add new update
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
            setImages([]);
            if (add) setAdd(false);
          }}
          title={!add ? "Edit Update" : "Add Update"}
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
              <>
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
                    update={true}
                  />
                </Modal>
                <Modal
                  opened={deleteModalOpened}
                  onClose={() => {
                    setDeleteModalOpened(false);
                  }}
                  title="Warning"
                >
                  <Text align="center">
                    Are you sure you want to delete this update? This action
                    cannot be reverted.
                  </Text>
                  <Group grow mt="xl">
                    <Button
                      variant="outline"
                      color="dark"
                      onClick={() => setDeleteModalOpened(false)}
                    >
                      No
                    </Button>
                    <Button
                      color="red"
                      loading={loading}
                      onClick={async () => {
                        setLoading(true);
                        const { data: selectData } = await supabase
                          .from("updates")
                          .select()
                          .eq("id", opened.id)
                          .single();

                        const images = selectData!.image.map(
                          (image) =>
                            image.split(
                              "https://ouuvrfmbebexnjriyvmt.supabase.co/storage/v1/object/public/updates/"
                            )[1]
                        );

                        const { data, error } = await supabase.storage
                          .from("updates")
                          .remove(images);

                        if (!error) {
                          const { data, error } = await supabase
                            .from("updates")
                            .delete()
                            .eq("id", opened.id);
                        }

                        setDeleteModalOpened(false);
                        setOpened(false);
                        setLoading(false);

                        router.replace(router.asPath);

                        showNotification({
                          title: "Deleted update",
                          message: "Your update was successfully deleted.",
                          icon: <IconCheck />,
                          color: "green",
                          autoClose: 2000,
                        });
                      }}
                    >
                      Yes
                    </Button>
                  </Group>
                </Modal>
              </>
            ) : (
              <AddDropzone setOpened={setOpened} update={true} />
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
                  {images?.map((img) => (
                    <Carousel.Slide key={img}>
                      <ActionIcon
                        color="teal"
                        style={{
                          position: "absolute",
                          left: "90%",
                          top: "0%",
                          zIndex: 5,
                        }}
                        onClick={() => setModalOpened(img)}
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
                <TextInput
                  description="This alternative text will be read to screen readers and it will describe the images. This can be used to facilitate with SEO."
                  placeholder="Write a short summary of what the images are displaying"
                  label="Alternative Text"
                  withAsterisk
                  value={alt}
                  onChange={(e) => setAlt(e.currentTarget.value)}
                />
                <TextInput
                  placeholder="Write a caption for this update"
                  mt="md"
                  label="Description"
                  withAsterisk
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <DatePicker
                  placeholder="Choose the date for this update"
                  mt="md"
                  label="Pick date"
                  withAsterisk
                  clearable={false}
                  value={date}
                  onChange={setDate}
                  weekendDays={[]}
                />
                <Group mt="xl" position="apart">
                  <Button
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => setDeleteModalOpened(true)}
                  >
                    Delete Update
                  </Button>
                  <Button
                    size="md"
                    disabled={title.length == 0 || alt.length == 0 || loading}
                    loading={loading}
                    onClick={async () => {
                      setLoading(true);

                      const updateDate = `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                      ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0"
                      )}`;

                      const updateTime: string = date.toISOString();

                      const { data, error } = await supabase
                        .from("updates")
                        .update({
                          id: opened.id,
                          date: updateDate,
                          desc: title,
                          alt: alt,
                          updated_at: updateTime,
                        });

                      if (error) console.log(error);

                      router.replace(router.asPath);

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
                    {add ? "Add Update" : "Edit Update"}
                  </Button>
                </Group>
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
