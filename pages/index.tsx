import Head from "next/head";
import { HeroText } from "../components/HeroSection/HeroText";
import Image from "next/image";
import MainImg from "../public/MainImg.webp";
import {
  Title,
  createStyles,
  MantineTheme,
  Container,
  Center,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeaderResponsive } from "../components/HeaderResponsive";
import { ArticlesCardsGrid } from "../components/ArticleCardsGrid";
import { ReviewsGrid } from "../components/Testimonials/ReviewsGrid";
import { AboutPage } from "../components/About/AboutPage";
import { Gallery } from "../components/Gallery";
import { Contact } from "../components/ContactForm/Contact";
import { Database } from "../lib/database.types";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Router from "next/router";
import { Footer } from "../components/Footer";
import { DataProps } from "../lib/DataProps";

export default function Home({ updateData, reviewData, galleryData }: DataProps) {
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const supabase = useSupabaseClient();

  return (
    <>
      <HeaderResponsive />
      {mobileMatch && (
        <Image
          src={MainImg}
          alt="An image of the daycare and preschool showing the play area"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "90%",
            width: `${1080 / 1.25}px`,
            height: "auto",
            borderRadius: "1em",
            marginBottom: "2em",
          }}
          priority
        />
      )}
      <HeroText />
      {!mobileMatch && (
        <Image
          src={MainImg}
          alt="An image of the daycare and preschool showing the play area"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "80%",
            width: `${1080 / 1.25}px`,
            height: "auto",
            borderRadius: "1em",
          }}
          priority
        />
      )}

      <Title
        mt={!mobileMatch ? 70 : 10}
        align="center"
        weight={800}
        style={{ position: "relative" }}
      >
        Recent Updates
        <span
          id="updates"
          style={{ position: "absolute", top: "-60px", visibility: "hidden" }}
        />
      </Title>
      <ArticlesCardsGrid updateData={updateData} />
      <Title
        mt={!mobileMatch ? 50 : 25}
        mb="md"
        align="center"
        weight={800}
        style={{ position: "relative" }}
      >
        Testimonials
        <span
          id="testimonials"
          style={{ position: "absolute", top: "-60px", visibility: "hidden" }}
        />
      </Title>
      <ReviewsGrid data={reviewData} />
      <Title
        mt={!mobileMatch ? 50 : 60}
        mb="xl"
        align="center"
        weight={800}
        style={{ position: "relative" }}
      >
        About Us
        <span
          id="about"
          style={{ position: "absolute", top: "-60px", visibility: "hidden" }}
        />
      </Title>
      <AboutPage />
      <Title
        mt={!mobileMatch ? 80 : 70}
        mb="xl"
        align="center"
        weight={800}
        style={{ position: "relative" }}
      >
        Gallery
        <span
          id="gallery"
          style={{ position: "absolute", top: "-60px", visibility: "hidden" }}
        />
      </Title>
      <Gallery data={galleryData} />
      <Title
        mt={!mobileMatch ? 90 : 90}
        mb="xl"
        align="center"
        weight={800}
        style={{ position: "relative" }}
      >
        Contact Us
        <span
          id="contact"
          style={{ position: "absolute", top: "-60px", visibility: "hidden" }}
        />
      </Title>
      <Center mx="xl" mb={40}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.6875863246482!2d-121.97052370000002!3d37.5624237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc08b2b3a4f33%3A0x64205c0be4fdf63c!2sGarden%20Playhouse%20Daycare!5e0!3m2!1sen!2sus!4v1667435303590!5m2!1sen!2sus"
          width={!mobileMatch ? "70%" : "100%"}
          height={!mobileMatch ? 500 : 400}
          style={{ border: 0, borderRadius: "2%" }}
          allowFullScreen={undefined}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Center>
      <Contact />
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx);

  const { data: updateData } = await supabase
    .from("updates")
    .select()
    .order("date", { ascending: false })
    .limit(4);

  const { data: reviewData } = await supabase.from("reviews").select();

  const { data: galleryData } = await supabase.from("gallery").select();

  return {
    props: {
      updateData: updateData ?? [],
      reviewData: reviewData ?? [],
      galleryData: galleryData ?? [],
    },
  };
};
