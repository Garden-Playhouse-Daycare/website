import {
  useMantineTheme,
  Container,
  Title,
  Paper,
  TextInput,
  Button,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../lib/database.types";
import { IconX, IconCheck } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { Footer } from "../Footer";

const Login = () => {
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery("(max-width: 565px)");
  const [email, setEmail] = useState("");
  const supabase = useSupabaseClient<Database>();
  const [disable, setDisable] = useState(false);

  return (
    <>
      <Container
        size={420}
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(20%)",
        }}
      >
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
          mt="5%"
        >
          Admin Login
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          If you&apos;re an admin of this site, login by a magic link.
        </Text>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const { data: selectData, error: selectError } = await supabase
                .from("users")
                .select()
                .eq("email", email);

              if (!selectError) {
                if (selectData.length > 0) {
                  const { data, error } = await supabase.auth.signInWithOtp({
                    email: email,
                    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/admin` },
                  });
                  if (
                    error?.message ===
                    "For security purposes, you can only request this once every 60 seconds"
                  ) {
                    showNotification({
                      autoClose: 5000,
                      title: "Authentication Error",
                      message:
                        "For security purposes, you may only request this once every 60 seconds.",
                      color: "red",
                      icon: <IconX />,
                      loading: false,
                    });

                    setDisable(true);
                  } else {
                    showNotification({
                      autoClose: false,
                      title: "Check your email",
                      message:
                        "Check your email for a magic link to login to the admin center",
                      color: "teal",
                      icon: <IconCheck />,
                      loading: false,
                    });

                    setDisable(true);
                  }
                } else {
                  showNotification({
                    autoClose: 5000,
                    title: "Email not found",
                    message:
                      "You have not been added as a admin of this site. If this seems like an error, please contact the site's owner",
                    color: "red",
                    icon: <IconX />,
                    loading: false,
                  });
                }
              } else {
                console.log(selectError);
              }
            }}
          >
            <TextInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disable}
            />
            <Button fullWidth mt="xl" type="submit" disabled={disable}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer
        links={[
          {
            link: "/#contact",
            label: "Contact",
          },
          {
            link: "/blog",
            label: "Blog",
          },
          {
            link: "/admin",
            label: "Admin",
          },
        ]}
      />
    </>
  );
};

export default Login;
