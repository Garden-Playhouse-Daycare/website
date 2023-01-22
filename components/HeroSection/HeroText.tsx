import { createStyles, Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingBottom: 50,

    "@media (max-width: 755px)": {
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "center",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "center",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

interface Props {
  title?: string;
  highlightedPart?: string;
  desc?: string;
  buttonText?: string;
}

export function HeroText(props: Props) {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: -300, top: 0 }} />
      <Dots className={classes.dots} style={{ left: -300, top: 0 }} />
      <Dots className={classes.dots} style={{ left: -300, top: 140 }} />
      <Dots className={classes.dots} style={{ right: -300, top: 60 }} />
      {/* <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} /> */}

      <div className={classes.inner}>
        <Title className={classes.title}>
          Garden Playhouse Day Care and Preschool
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Family Child Care in Fremont <br />
            Opening at 8:30 AM on Monday
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component="a"
            href="#contact"
            className={classes.control}
            size="lg"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </Container>
  );
}
