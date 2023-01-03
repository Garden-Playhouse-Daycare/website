import { Dispatch, useRef, useState } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  Image,
  SimpleGrid,
  Center,
  Container,
  Card,
  Paper,
  TextInput,
  Autocomplete,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
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
type UpdateTags = Database["public"]["Tables"]["update_tags"]["Row"];

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
  updateTags: UpdateTags[] | [];
}

export function AddDropzone(props: Props) {
  const { classes, theme, cx } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [alt, setAlt] = useState("");
  const [tag, setTag] = useState();
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
            const newArray = files.filter((val) => file != val);
            setFiles(newArray);
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
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop images here to add images to the update. We
              can accept only <i>.jpg</i> or <i>.png</i> files that are less
              than 10mb in size.
            </Text>
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
      </div>
      {previews.length > 0 && (
        <Paper px="sm" py="xs" withBorder radius="md">
          {previews}
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
      <TextInput
        placeholder="Write a caption for this update"
        mt="md"
        label="Description"
        withAsterisk
        value={desc}
        onChange={(e) => setDesc(e.currentTarget.value)}
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
      <Autocomplete
        mt="md"
        description="You may need to scroll down to find all tags"
        placeholder="Choose a tag which describes this update"
        label="Update Tag"
        withAsterisk
        maxDropdownHeight={200}
        limit={30}
        data={props.updateTags.map((tag) => {
          return { value: tag.tags };
        })}
      />

      <Button
        mt="xl"
        size="md"
        disabled={files.length === 0 || !desc || !alt || !tag || loading}
        loading={loading}
        onClick={async () => {
          setLoading(true);

        


          setLoading(false);
        }}
      >
        Add Update
      </Button>
    </>
  );
}
