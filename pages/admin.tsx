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

interface Props {
  session: Session | null;
}

export default function Admin() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      setSession(data);
    };

    fetchSession();
  });

  if (session == undefined) {
    return (
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
    );
  } else if (session.session == null) {
    return (
      <>
        <HeaderResponsive />
        <Login />
      </>
    );
  } else {
    return <Dashboard />;
  }
}
