import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../lib/database.types";
import { FileObject } from "../lib/FileObject";
type Updates = Database["public"]["Tables"]["updates"]["Row"];

const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
  },
];

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
  updateData: Updates[] | null;
}

export function ArticlesCardsGrid(props: Props) {
  const { classes } = useStyles();
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {

    const fetchImages = async () => {
      const imagesList: any[] = [];
      if (props.updateData) {
        for (const article of props.updateData) {
          const year = article.date?.split("-")[0];
          const { data } = await supabase.storage
            .from("updates")
            .list(`${year}${article.tag}`);

          const tempImgList: any[] = [];

          for (const image of data!) {
            const { data: updateImages } = await supabase.storage
              .from("updates")
              .download(`${year}${article.tag}/${image.name}`);

            tempImgList.indexOf(updateImages) === -1 && tempImgList.push(updateImages);
          }

          if (tempImgList) {
            const imagesTagged = [...tempImgList, `${year}${article.tag}`];
            imagesList.indexOf(imagesTagged) === -1 && imagesList.push(imagesTagged);
          }
        }

        console.log(imagesList);
      }
    };

    fetchImages();
  }, [supabase, props.updateData]);

  if (props.updateData != null) {
    const cards = props.updateData.map((article) => (
      <Card
        key={article.id}
        p="md"
        radius="md"
        component="a"
        href="#"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} alt="something" />
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
    return (
      <Container py="xl">
        <Text>No data</Text>
      </Container>
    );
  }
}
