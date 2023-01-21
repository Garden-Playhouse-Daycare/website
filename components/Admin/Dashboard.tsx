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
import { DataProps } from "../../lib/DataProps";
import { ManageUpdates } from "./ManageUpdates";
import { ManageGallery } from "./ManageGallery";

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
const Dashboard = (props: DataProps) => {
  const [opened, setOpened] = useState(false);
  const links = ["Manage updates", "Manage gallery"]
  const [active, setActive] = useState(links[0]);
  const currentDate = new Date();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <AppShell
      padding="md"
      navbar={<SimpleNavbar opened={opened} setOpened={setOpened} active={active} setActive={setActive} />}
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
      {active == links[0] && <ManageUpdates updateData={props.updateData} />}
      {active == links[1] && <ManageGallery galleryData={props.galleryData} />}
    </AppShell>
  );
};

export default Dashboard;
