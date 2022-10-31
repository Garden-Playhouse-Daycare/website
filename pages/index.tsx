import Head from "next/head";
import { HeroText } from "../components/HeroSection/HeroText";
import Image from "next/image";
import MainImg from "../public/MainImg.webp";
import { useMediaQuery } from "@mantine/hooks";
import { HeaderResponsive } from "../components/HeaderResponsive";

export default function Home() {
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  return (
    <>
      <HeaderResponsive />
      <HeroText />
      <Image
        src={MainImg}
        alt="An image of the daycare and preschool showing the play area"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: !mobileMatch ? "80%" : "90%",
          width: `${1080 / 1.25}px`,
          height: "auto",
          borderRadius: "1em",
        }}
      />
    </>
  );
}
