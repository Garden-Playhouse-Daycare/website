import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineColorScheme,
  Spoiler,
  Center,
  Grid,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import newImg from "./about.jpg"; // Replace with your new image
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 5,
    paddingBottom: theme.spacing.xl * 4,
    [theme.fn.smallerThan("xs")]: {
      paddingTop: theme.spacing.md * 5.5,
      paddingBottom: theme.spacing.sm * 4,
    },
  },

  content: {
    maxWidth: 380,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 40,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    marginLeft: 100,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  sideImage: {
    borderRadius: "1em",
    width: "100%",
    height: "auto",
  },

  textSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export function AboutPage() {
  const { classes } = useStyles();
  const matches = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <Container size="lg" py="xl">
        <Grid align="flex-start" gutter="xs">
          
          {/* Image Column */}
          <Grid.Col md={5} order={mobileMatch ? 2 : 1}>
            <Image
              src={newImg}
              alt="Garden Playhouse daycare and preschool"
              className={classes.sideImage}
              style={{
                maxWidth: "80%",
                height: "auto",
                borderRadius: "1em",
              }}
              priority
            />
          </Grid.Col>
          {/* Text Column */}
          <Grid.Col md={7} order={mobileMatch ? 1 : 2}>
            <div className={classes.textSection}>
              <Text color="dimmed" size="lg" mb="md">
                Garden playhouse is a Waldorf inspired licensed family child
                care/day care/preschool located near Fremont BART. Our mission
                is to foster creativity and imagination among children by
                storytelling, providing natural and handmade toys and practical
                life activities in a safe and nurturing environment which helps
                in whole child development. I have been a lifelong learner, and
                I am passionate about creating a nurturing educational
                environment for your child. I focus on educating the whole child
                – mind, heart and hands – through interactive and imaginative
                play and activities. After completing my PhD I spent several
                years in academics and corporate jobs, but I realized what I was
                truly passionate about was inspiring the love of education in
                children – thus started Garden Playhouse Daycare! I look forward
                to meeting you and your child!
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
