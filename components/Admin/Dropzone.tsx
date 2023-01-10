import { Dispatch, useRef, useState } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  Image,
  SimpleGrid,
  Center,
} from "@mantine/core";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconTrashX,
} from "@tabler/icons";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../lib/database.types";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
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

  image: {
    "&:hover": {},
  },
}));

interface Props {
  id: number;
  setModalOpened: Dispatch<any>;
  setOpened: Dispatch<any>;
  originalImage: string;
}

export function DropzoneButton(props: Props) {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt="Image"
        radius="md"
        width={mobileMatch ? "55%" : "50%"}
        className={classes.image}
        withPlaceholder
      />
    );
  });

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(file) => setFiles([...files, ...file])}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
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
              <Dropzone.Idle>Upload images</Dropzone.Idle>
            </Text>
            {previews.length === 0 ? (
              <Text align="center" size="sm" mt="xs" color="dimmed">
                Drag&apos;n&apos;drop images here to replace the current update
                image. We can accept only <i>.jpg</i> or <i>.png</i> files that
                are less than 10mb in size.
              </Text>
            ) : (
              previews[0]
            )}
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
          disabled={previews.length > 0}
        >
          Select files
        </Button>
      </div>
      <Group position="apart">
        <Button
          mt="lg"
          size="sm"
          disabled={loading}
          variant="outline"
          color="red"
          onClick={() => {
            setFiles([]);
            props.setModalOpened(false);
          }}
        >
          Cancel
        </Button>
        <Button
          mt="lg"
          size="sm"
          disabled={previews.length === 0 || loading}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const { data: article } = await supabase
              .from("updates")
              .select()
              .eq("id", props.id)
              .single();

            const { data: newImg } = await supabase.storage
              .from("updates")
              .update(
                `${article?.tag}/${decodeURIComponent(
                  props.originalImage.split("/")[
                    props.originalImage.split("/").length - 1
                  ]
                )}`,
                files[0],
                {
                  cacheControl: "31536000",
                }
              );

            const updateTime = new Date(Date.now()).toISOString();

            let newImages = article?.image!;

            if (article?.image?.includes(props.originalImage)) {
              const index = article.image.indexOf(props.originalImage);
              newImages[index] =
                "https://ouuvrfmbebexnjriyvmt.supabase.co/storage/v1/object/public/updates/" +
                newImg?.path! +
                `?t=${updateTime}`;
            }

            const { data: imgUrl } = await supabase
              .from("updates")
              .update({ image: newImages, updated_at: updateTime })
              .eq("id", props.id);

            router.replace(router.asPath);

            props.setModalOpened(false);
            props.setOpened(false);
          }}
        >
          Save Changes
        </Button>
      </Group>
    </>
  );
}
