import { useRef, useState } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconTrashX,
} from "@tabler/icons";
import { useHover } from "@mantine/hooks";
import trashImg from "./trash-x.svg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
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
    "&:hover": {
    },
  },
}));

export function DropzoneButton() {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [hover, setHover] = useState<number[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={!hover.includes(index) ? imageUrl : trashImg.src}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt="Image"
        radius="md"
        onMouseEnter={() => setHover([...hover, index])}
        onMouseLeave={() => {
          const newHover = hover.filter((id) => id !== index);
          setHover(newHover);
        }}
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
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop images here to replace the current update
              images. We can accept only <i>.jpg</i> or <i>.png</i> files that
              are less than 10mb in size.
            </Text>
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          mb="xl"
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
      </div>
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </>
  );
}
