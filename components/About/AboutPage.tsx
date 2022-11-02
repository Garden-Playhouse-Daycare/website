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
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import img from "./Play.webp";
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
}));

export function AboutPage() {
  const { classes } = useStyles();
  const matches = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  return (
    <div>
      <Container>
        {mobileMatch ? (
          <Image
            src={img}
            alt="An image of the daycare and preschool showing the play area"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "90%",
              height: "auto",
              borderRadius: "1em",
              marginBottom: "2em",
            }}
            priority
          />
        ) : (
          <Image
            src={img}
            alt="An image of the daycare and preschool showing the play area"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "50%",
              height: "auto",
              borderRadius: "1em",
            }}
            priority
          />
        )}
          <Spoiler
            maxHeight={120}
            showLabel="Read more"
            hideLabel="Collapse Content"
            style={{ "textAlign": "center"}}
          >
            <Text color="dimmed" align="left">
              Garden playhouse is a Waldorf inspired licensed family child
              care/day care/preschool located near Fremont BART. Our mission is
              to foster creativity and imagination among children by
              storytelling, providing natural and handmade toys and practical
              life activities in a safe and nurturing environment which helps in
              whole child development. Owner/Director: Sarika Rathi I have been
              a lifelong learner, and I am passionate about creating a nurturing
              educational environment for your child. I focus on educating the
              whole child – mind, heart and hands – through interactive and
              imaginative play and activities. After completing my PhD I spent
              several years in academics and corporate jobs, but I realized what
              I was truly passionate about was inspiring the love of education
              in children – thus started Garden Playhouse Daycare! I look
              forward to meeting you and your child!
            </Text>
          </Spoiler>
      </Container>
    </div>
  );
}
