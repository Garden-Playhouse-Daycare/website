import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  useMantineTheme,
  Loader,
  Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import img from "../public/Admin.webp";
import { Session } from "@supabase/supabase-js";
import Login from "../components/Admin/Login";
import Dashboard from "../components/Admin/Dashboard";
import { HeaderResponsive } from "../components/HeaderResponsive";
import { useRouter } from "next/router";
import { Database } from "../lib/database.types";
import { GetServerSidePropsContext } from "next";
import { DataProps } from "../lib/DataProps";
import Head from "next/head";

interface Props {
  session: Session | null;
}

export default function Admin({
  updateData,
  reviewData,
  galleryData,
}: DataProps) {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      setSession(data);
    };

    fetchSession();
  }, [supabase.auth]);

  if (session == undefined) {
    return (
      <>
        <Head>
          <title>Garden Playhouse Daycare - Admin</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={{ height: "100vh" }}>
          <div
            style={{
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Center>
              <Loader variant="dots" size="xl" />
            </Center>
          </div>
        </div>
      </>
    );
  } else if (session.session == null) {
    return (
      <>
        <Head>
          <title>Garden Playhouse Daycare - Admin Login</title>
          <meta name="robots" content="noindex" />
        </Head>
        <HeaderResponsive />
        <Login />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Garden Playhouse Daycare - Admin Login</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Dashboard
          updateData={updateData}
          reviewData={reviewData}
          galleryData={galleryData}
        />
      </>
    );
  }
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx);

  const { data: updateData } = await supabase
    .from("updates")
    .select()
    .order("date", { ascending: false });

  const { data: reviewData } = await supabase.from("reviews").select();

  const { data: galleryData } = await supabase.from("gallery").select().order("created", { ascending: false })

  return {
    props: {
      updateData: updateData ?? [],
      reviewData: reviewData ?? [],
      galleryData: galleryData ?? [],
    },
  };
};
