import { Global, MantineTheme } from "@mantine/core";
import { NextPage } from "next";

const CustomGlobalStyles: NextPage = () => {
  return (
    <Global
      styles={(theme: MantineTheme) => ({
        body: {
          margin: theme.spacing.sm,
        },
      })}
    />
  );
};

export default CustomGlobalStyles;
