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
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../lib/database.types";
import { FileObject } from "../lib/FileObject";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

type Updates = Database["public"]["Tables"]["updates"]["Row"];
type Gallery = Database["public"]["Tables"]["gallery"]["Row"];

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
}));

interface Props {
  updateData: Gallery[] | [];
}

const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

export function ArticlesCardsGrid(props: Props) {
  const { classes } = useStyles();
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(false);

  // TODO use this code in admin center
  // const addDataToDB = async () => {
  //   if (props.updateData) {
  //     for (const article of props.updateData) {
  //       const year = article.date?.split("-")[0];
  //       const { data } = await supabase.storage
  //         .from("updates")
  //         .list(`${year}${article.tag}`);

  //       const imageList: string[] = [];

  //       for (const image of data!) {
  //         const { data } = supabase.storage
  //           .from("updates")
  //           .getPublicUrl(`${year}${article.tag}/${image.name}`);

  //         const publicUrl = data.publicUrl;

  //         imageList.indexOf(publicUrl) === -1 && imageList.push(publicUrl);
  //       }

  //       const { data: insertData, error } = await supabase
  //         .from("updates")
  //         .update({ image: imageList, alt: "Sample Alt" })
  //         .eq("id", article.id);
  //       if (error) console.log(error);
  //     }
  //   }
  // };

  if (props.updateData.length > 0) {
    // const cards = props.updateData.map((article) => (
    //   <Card key={article.id} p="md" radius="md" className={classes.card}>
    //     <AspectRatio ratio={1920 / 1080}>
    //       <Card.Section>
    //         <Carousel
    //           withIndicators
    //           classNames={{
    //             root: classes.carousel,
    //             controls: classes.carouselControls,
    //             indicator: classes.carouselIndicator,
    //           }}
    //           styles={{
    //             control: {
    //               "&[data-inactive]": {
    //                 opacity: 0,
    //                 cursor: "default",
    //               },
    //             },
    //           }}
    //         >
    //           {article.image?.map((rowImage) => (
    //             <Carousel.Slide key={Math.random()}>
    //               <Center>
    //                 <MantineImage
    //                   src={rowImage}
    //                   height={220}
    //                   alt={
    //                     article.alt ??
    //                     "An image depicting crafts and an holiday"
    //                   }
    //                   radius="md"
    //                 />
    //               </Center>
    //             </Carousel.Slide>
    //           ))}
    //         </Carousel>
    //       </Card.Section>
    //     </AspectRatio>
    //     <Text
    //       color="dimmed"
    //       size="xs"
    //       transform="uppercase"
    //       weight={700}
    //       mt="md"
    //     >
    //       {article.date}
    //     </Text>
    //     <Text mt={5}>{article.desc}</Text>
    //   </Card>
    // ));

    // const cards = (
    //   <Card p="md" radius="md" className={classes.card}>
    //     <Card.Section>
    //       <Carousel
    //         withIndicators
    //         loop
    //         classNames={{
    //           root: classes.carousel,
    //           controls: classes.carouselControls,
    //           indicator: classes.carouselIndicator,
    //         }}
    //         styles={{
    //           control: {
    //             "&[data-inactive]": {
    //               opacity: 0,
    //               cursor: "default",
    //             },
    //           },
    //         }}
    //       >
    //         {props.updateData.map((img) => (
    //           <Carousel.Slide key={img.id}>
    //             <Center>
    //               <MantineImage
    //                 src={img.image}
    //                 height={220}
    //                 alt={"An image depicting crafts and an holiday"}
    //                 radius="md"
    //               />
    //             </Center>
    //           </Carousel.Slide>
    //         ))}
    //       </Carousel>
    //     </Card.Section>
    //   </Card>
    // );

    const newImages = images.map((img) => (
      <Carousel.Slide key={img}>
        <Center>
          <MantineImage
            src={img}
            height={220}
            alt={"An image depicting crafts and an holiday"}
            radius="md"
          />
        </Center>
      </Carousel.Slide>
    ));

    const cards = props.updateData.map((article) => (
      <Card key={article.id} p="md" radius="md" className={classes.card}>
        <Card.Section>
          <Carousel
            loop
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
            {newImages}
          </Carousel>
        </Card.Section>
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
    return <Loader variant="dots" />;
  }
}
