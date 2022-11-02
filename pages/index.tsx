import Head from "next/head";
import { HeroText } from "../components/HeroSection/HeroText";
import Image from "next/image";
import MainImg from "../public/MainImg.webp";
import { Title, createStyles, MantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeaderResponsive } from "../components/HeaderResponsive";
import { ArticlesCardsGrid } from "../components/ArticleCardsGrid";
import { ReviewsGrid } from "../components/Testimonials/ReviewsGrid";
import { AboutPage } from "../components/About/AboutPage";

export default function Home() {
  const mobileMatch = useMediaQuery("(max-width: 565px)");

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
    </>
  );
}
