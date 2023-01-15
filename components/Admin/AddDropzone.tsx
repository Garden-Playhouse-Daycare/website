import { Dispatch, useRef, useState } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  Image,
  Paper,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconCheck,
  IconDownload,
  IconTrashX,
} from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../lib/database.types";
import randomWords from "random-words";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 40,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 40,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

interface Props {
  setOpened: Dispatch<any>;
  update: boolean;
}

export function AddDropzone(props: Props) {
  const { classes, theme, cx } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [alt, setAlt] = useState("");
  const [date, setDate] = useState<any>(new Date());
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Group key={index} grow>
        <Image
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt="Image"
          width={mobileMatch ? "55%" : "50%"}
          withPlaceholder
          mb="xl"
        />
        <Button
          leftIcon={<IconTrashX />}
          color="red"
          variant="outline"
          onClick={() => {
            if (!props.update && files.length > 0) {
              setFiles([]);
            } else {
              const newArray = files.filter((val) => file != val);
              setFiles(newArray);
            }
          }}
        >
          Remove Image
        </Button>
      </Group>
    );
  });

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          disabled={!props.update && files.length > 0}
          openRef={openRef}
          onDrop={(file) => setFiles([...files, ...file])}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]}
          maxSize={10 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align="center" weight={700} size="lg" mt="xl">
              <Dropzone.Accept>Drop images here</Dropzone.Accept>
              <Dropzone.Reject>Invalid File Type</Dropzone.Reject>
              <Dropzone.Idle>
                {!props.update && files.length > 0
                  ? "You can only upload one image"
                  : "Upload images"}
              </Dropzone.Idle>
            </Text>

            {!props.update && files.length > 0 ? (
              <Text align="center" size="sm" mt="xs" color="dimmed">
                Delete the image in order to upload another image. You may only
                upload one image for the gallery at a time.
              </Text>
            ) : (
              <Text align="center" size="sm" mt="xs" color="dimmed">
                Drag&apos;n&apos;drop images here to add images to the update.
                We can accept only <i>.jpg</i> or <i>.png</i> files that are
                less than 10mb in size.
              </Text>
            )}
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          disabled={!props.update && files.length > 0}
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
      </div>
      {previews.length > 0 && (
        <Paper px="sm" py="xs" withBorder radius="md">
          {props.update ? previews : previews[0]}
        </Paper>
      )}
      <TextInput
        description="This alternative text will be read to screen readers and it will describe the images. This can be used to facilitate with SEO."
        placeholder="Write a short summary of what the images are displaying"
        label="Alternative Text"
        withAsterisk
        value={alt}
        onChange={(e) => setAlt(e.currentTarget.value)}
      />
      {props.update && (
        <TextInput
          placeholder="Write a caption for this update"
          mt="md"
          label="Description"
          withAsterisk
          value={desc}
          onChange={(e) => setDesc(e.currentTarget.value)}
        />
      )}
      {props.update && (
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
      )}

      {props.update ? (
        <Button
          mt="xl"
          size="md"
          disabled={
            files.length === 0 || desc.length == 0 || alt.length == 0 || loading
          }
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const updateDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            const updateTime: string = date.toISOString();
            const randomTag =
              Math.floor(Math.random() * 10000 + 1).toString() +
              randomWords({
                exactly: 1,
                wordsPerString: 3,
                separator: "",
                formatter: (word, index) => {
                  return word.slice(0, 1).toUpperCase().concat(word.slice(1));
                },
              })[0];

            let images: string[] = [];

            for (let i = 0; i < files.length; i++) {
              const { data, error } = await supabase.storage
                .from("updates")
                .upload(`${randomTag}/${files[i].name}`, files[i], {
                  cacheControl: "31536000",
                });

              if (!error && data.path) {
                images.push(
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/updates/${data.path}`
                );
              } else {
                console.log(error ?? "Success.");
              }
            }

            const { data, error } = await supabase.from("updates").insert([
              {
                date: updateDate,
                desc: desc,
                tag: randomTag,
                image: images,
                alt: alt,
                updated_at: updateTime,
              },
            ]);

            if (error) console.log(error);

            router.replace(router.asPath);

            setLoading(false);
            props.setOpened(false);

            showNotification({
              title: "Update Added",
              message: "Your update was successfully created.",
              icon: <IconCheck />,
              color: "green",
              autoClose: 2000,
            });
          }}
        >
          Add Update
        </Button>
      ) : (
        <Button
          mt="xl"
          size="md"
          disabled={alt.length == 0 || files.length == 0 || loading}
          loading={loading}
          onClick={async () => {
            setLoading(true);

            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from("gallery")
                .upload(`${files[0].name}`, files[0], {
                  cacheControl: "31536000",
                });

            if (!uploadError && uploadData!.path) {
              const images = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${uploadData.path}`;
              const { data, error } = await supabase.from("gallery").insert([
                {
                  image: images,
                  alt: alt,
                },
              ]);

              if (error) console.log(error);
            } else {
              console.log(uploadError ?? "Success");
            }

            
            setLoading(false);
            props.setOpened(false);
            
            router.replace(router.asPath);

            showNotification({
              title: "Image Added",
              message: "Your image was successfully created.",
              icon: <IconCheck />,
              color: "green",
              autoClose: 2000,
            });
          }}
        >
          Add Image
        </Button>
      )}
    </>
  );
}
