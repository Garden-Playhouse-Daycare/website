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
  useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeaderResponsive } from "../components/HeaderResponsive";
import { ArticlesCardsGrid } from "../components/ArticleCardsGrid";
import { ReviewsGrid } from "../components/Testimonials/ReviewsGrid";
import { AboutPage } from "../components/About/AboutPage";
import { Gallery } from "../components/Gallery";

export default function Home() {
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

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

      <Title mt={90} align="center" weight={800}>
        Recent Updates
      </Title>
      <ArticlesCardsGrid />
      <Title mt={90} mb="xl" align="center" weight={800}>
        Testimonials
      </Title>
      <ReviewsGrid />
      <Title mt={90} mb="xl" align="center" weight={800}>
        About Us
      </Title>
      <AboutPage />
      <Title mt={90} mb="xl" align="center" weight={800}>
        Gallery
      </Title>
      <Gallery />
      <Title mt={90} mb="xl" align="center" weight={800}>
        Contact Us
      </Title>
      <Center mx="xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.6875863246482!2d-121.97052370000002!3d37.5624237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc08b2b3a4f33%3A0x64205c0be4fdf63c!2sGarden%20Playhouse%20Daycare!5e0!3m2!1sen!2sus!4v1667435303590!5m2!1sen!2sus"
          width={!mobileMatch ? "70%" : "100%"}
          height={!mobileMatch ? 500 : 400}
          style={{ border: 0, borderRadius: "2%", display: "block" }}
          allowFullScreen={undefined}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Center>
    </>
  );
}
