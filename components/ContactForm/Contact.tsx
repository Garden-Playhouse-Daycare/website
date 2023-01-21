import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  MantineTheme,
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import bg from "./bg.svg";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import Router from "next/router";
import { IconX, IconCheck } from "@tabler/icons";

const useStyles = createStyles((theme: MantineTheme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,
      marginLeft: "7.5%",
      marginRight: "7.5%",

      [BREAKPOINT]: {
        flexDirection: "column",
        marginLeft: theme.spacing.md,
        margin: theme.spacing.md,
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function Contact() {
  const { classes } = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Paper radius="lg" mb="xl">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text
            size="lg"
            weight={700}
            className={classes.title}
            sx={{ color: "#fff" }}
          >
            Contact information
          </Text>

          <ContactIconsList variant="white" />
        </div>

        <form
          className={classes.form}
          onSubmit={async (event) => {
            event.preventDefault();

            const data = {
              subject: subject,
              message: message,
              email: email,
              name: name,
              phone: phone,
            };

            const response = await fetch("/api/sendMessage", {
              method: "POST",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (response.status === 200) {
              showNotification({
                title: "Message sent",
                message: "Your message was successfully sent.",
                icon: <IconCheck />,
                color: "green",
                autoClose: 2000,
              });
            } else {
              console.log(response);
              showNotification({
                title: "Failure",
                message:
                  "Your message couldn't be sent due to an internal error.",
                icon: <IconX />,
                color: "red",
                autoClose: 2500,
              });
            }

            setEmail("");
            setMessage("");
            setName("");
            setSubject("");
            setPhone("");
            Router.replace("/");
          }}
          method="post"
        >
          <Text size="lg" weight={700} className={classes.title}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <TextInput
                label="Your name"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextInput
                label="Your email"
                placeholder="hello@gmail.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Your phone number"
                placeholder="999-999-9999"
                required
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              label="Subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={3}
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />

            <Group position="right" mt="md">
              <Button type="submit" className={classes.control}>
                Send message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
