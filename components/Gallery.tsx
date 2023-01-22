import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../lib/database.types";
import Image from "next/image";
import { useState, useRef } from "react";

type Gallery = Database["public"]["Tables"]["gallery"]["Row"];

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card(image: Gallery) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" className={classes.card}>
      <Image
        src={image.image}
        alt={image.alt}
        height="0"
        width="0"
        sizes="25vw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 16,
        }}
      />
    </Paper>
  );
}

interface Props {
  data: Gallery[] | [];
}

export function Gallery(props: Props) {
  const theme = useMantineTheme();
  const supabase = useSupabaseClient();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const TRANSITION_DURATION = 200;
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = props.data.map((row) => (
    <Carousel.Slide key={row.id}>
      <Card {...row} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      slideGap="xs"
      plugins={[autoplay.current]}
      getEmblaApi={setEmbla}
      align="start"
      loop
      slidesToScroll={1}
      mx={!mobile ? "25%" : "3%"}
    >
      {slides}
    </Carousel>
  );
}
