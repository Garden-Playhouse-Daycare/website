import {
  AppShell,
  Aside,
  Burger,
  Code,
  Group,
  Header,
  MediaQuery,
  Text,
  createStyles,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { SimpleNavbar } from "./SimpleNavbar";
import { useState } from "react";
import { MantineLogo } from "@mantine/ds";
import { useMediaQuery } from "@mantine/hooks";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const useStyles = createStyles((theme) => ({
  headerContainer: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    paddingTop: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  logo: {
    marginTop: theme.spacing.sm,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: theme.spacing.sm / 7,
    },
  },
}));

const Dashboard = () => {
  const [opened, setOpened] = useState(false);
  const currentDate = new Date();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <AppShell
      padding="md"
      navbar={<SimpleNavbar opened={opened} setOpened={setOpened} />}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header
          height={{ base: 50, md: 50 }}
          className={classes.headerContainer}
          withBorder={mobileMatch}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
                color="white"
              />
            </MediaQuery>
            <MantineLogo size={28} className={classes.logo} inverted />
          </div>
        </Header>
      }
    >
      <div>hi</div>
    </AppShell>
  );
};

export default Dashboard;
