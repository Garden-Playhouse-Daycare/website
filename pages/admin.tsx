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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Admin() {
  const theme = useMantineTheme();
  const mobileMatch = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Container
      size={420}
      mt={90}
      mb={!mobileMatch ? 200 : 180}
    >
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Admin Login
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        If you&apos;re an admin of this site, login by a magic link.</Text>

      <Paper withBorder shadow="md" p={30} mt={20} radius="md">
        <TextInput label="Email" placeholder="you@example.com" required />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
