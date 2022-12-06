import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/global.css";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { Footer } from "../components/Footer";
import { HeaderResponsive } from "../components/HeaderResponsive";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
            primaryColor: "teal",
          }}
        >
          <NotificationsProvider>
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Component {...pageProps} />
              {router.pathname != "/admin" && <Footer
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
              />}
            </div>
          </NotificationsProvider>
        </MantineProvider>
      </SessionContextProvider>
    </>
  );
}
