import { Dispatch, SetStateAction, useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
  IconEdit,
  IconStars,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconPhotoEdit,
  IconHome,
  IconLogout,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      height: "calc(100% - 50px)",
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: "", label: "Manage updates", icon: IconEdit },
  { link: "", label: "Manage gallery", icon: IconPhotoEdit },
  { link: "", label: "Manage testimonials", icon: IconStars },
];

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

export function SimpleNavbar(props: Props) {
  const { classes, cx } = useStyles();
  
  const currentDate = new Date();

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === props.active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        props.setActive(item.label);
        props.setOpened(false);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={700}
      width={{ sm: 300 }}
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconHome className={classes.linkIcon} stroke={1.5} />
          <span>Go back home</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
