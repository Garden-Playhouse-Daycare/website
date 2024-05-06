import {
  createStyles,
  Container,
  Group,
  Anchor,
  Stack,
  Text,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";

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
    marginBottom: theme.spacing.xs / 2.8,
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
    <Link
      href={link.link}
      key={link.label}
      legacyBehavior
      scroll={link.link != "/#contact" ? true : false}
    >
      <Anchor color="dimmed" size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>
          <Link href="/" aria-label="Garden Playhouse Daycare's Logo">
            <Logo height={37} />
          </Link>
          <Link
            href="https://www.yelp.com/biz/garden-playhouse-daycare-fremont?osq=Garden+Playhouse+Daycare"
            target="_blank"
            aria-label="Garden Playhouse Daycare's Yelp Link"
          >
            <Image src="/yelp.svg" alt="Yelp Logo" width="35" height="35" />
          </Link>
          <Link
            href="https://www.google.com/search?q=garden+playhouse+daycare&oq=garden+playhouse&aqs=chrome.0.69i59l3j69i60l2j69i61.2548j0j1&sourceid=chrome&ie=UTF-8#ip=1"
            target="_blank"
            aria-label="Garden Playhouse Daycare's Yelp Link"
          >
            <Image src="/google.svg" alt="Google Logo" width="35" height="35" />
          </Link>
        </Group>
        <Group className={classes.links}>
          {items}
          <Text color="dimmed" size="sm">
          LiC: 013422277
          </Text>
        </Group>
      </Container>
    </div>
  );
}
