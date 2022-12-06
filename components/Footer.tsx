import { createStyles, Container, Group, Anchor } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "auto",
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
  top?: number;
}

export function Footer({ links, top }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link href={link.link} key={link.label} legacyBehavior scroll={link.link != "/#contact" ? true : false}>
      <Anchor color="dimmed" size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link href="/">
          <MantineLogo size={28} />
        </Link>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
