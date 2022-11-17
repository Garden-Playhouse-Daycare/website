import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  AspectRatio,
  Image,
  Loader,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../lib/database.types";
import { FileObject } from "../lib/FileObject";
import { Carousel } from "@mantine/carousel";
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

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

interface Props {
  updateData: Updates[] | null;
}

// const images = [
//   "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
//   "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
//   "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
//   "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
//   "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
// ];

export function ArticlesCardsGrid(props: Props) {
  const { classes } = useStyles();
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // each one is null so just return null direct
    const fetchImagesFromDB = async (image: boolean) => {
      if (props.updateData) {
        let result = props.updateData.map((row) => row.id);

        if (image) {
          const { data, error } = await supabase
            .from("updates")
            .select("image")
            .in("id", result);
          if (error) console.log(error);

          const notNull = data?.filter((row) => row.image);
          if (notNull && notNull.length != 0) {
            return data;
          } else {
            return null;
          }
        } else {
          const { data, error } = await supabase
            .from("updates")
            .select("image")
            .in("id", result);
          if (error) console.log(error);
          return data;
        }
      }
    };

    // use this code in admin center
    const addDataToDB = async () => {
      if (props.updateData) {
        for (const article of props.updateData) {
          const year = article.date?.split("-")[0];
          const { data } = await supabase.storage
            .from("updates")
            .list(`${year}${article.tag}`);

          const imageList: string[] = [];

          for (const image of data!) {
            const { data } = supabase.storage
              .from("updates")
              .getPublicUrl(`${year}${article.tag}/${image.name}`);

            const publicUrl = data.publicUrl;

            imageList.indexOf(publicUrl) === -1 && imageList.push(publicUrl);
          }

          const { data: insertData, error } = await supabase
            .from("updates")
            .update({ image: imageList, alt: "Sample Alt" })
            .eq("id", article.id);
          if (error) console.log(error);
        }
      }
    };

    const fetchImages = async () => {
      const data = await fetchImagesFromDB(true);

      if (data) setLoading(false);
      // if (!data) {
      //   console.log("Didn't find data in database. Re-adding data...");
      //   await addDataToDB();
      //   const images = await fetchImagesFromDB(false);
      //   setLoading(false);
      // } else {
      //   console.log("Data found!");
      //   setLoading(false);
      // }

      // TODO Add carousel to images with array
    };

    //fetchImages();
  }, [supabase, props.updateData]);

  if (props.updateData != null) {
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
            >
              {!loading ? (
                article.image?.map((rowImage) => (
                  <Carousel.Slide key={Math.random()}>
                    <Image
                      src={rowImage}
                      height={220}
                      alt="Image"
                    />
                  </Carousel.Slide>
                ))
              ) : (
                <Loader />
              )}
            </Carousel>
          </Card.Section>
          {/* <Image src={article.image} alt="something" /> */}
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
