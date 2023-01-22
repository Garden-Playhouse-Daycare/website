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
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="garden playhouse daycare, childcare near me, home daycare, fremont daycare, preschools near me, pre-schools in fremont california, garden playhouse, daycare, pre-school, preschool, daycare in Fremont California, daycare near me, garden playhouse, garden daycare, daycare, "
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="The perfect daycare for your toddler ran in Fremont, California."
          key="desc"
        />
        <meta property="og:title" content="Garden Playhouse Daycare" />
        <meta
          property="og:description"
          content="The perfect daycare ran in Fremont, California"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-G3ESBG7F9V"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-G3ESBG7F9V');`}
      </Script>

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
              {router.pathname != "/admin" && (
                <Footer
                  links={[
                    {
                      link: "/#contact",
                      label: "Contact",
                    },
                    {
                      link: "/admin",
                      label: "Admin",
                    },
                  ]}
                />
              )}
              <Analytics />
            </div>
          </NotificationsProvider>
        </MantineProvider>
      </SessionContextProvider>
    </>
  );
}
