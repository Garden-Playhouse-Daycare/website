import { AppShell } from "@mantine/core";
import { SimpleNavbar } from "./SimpleNavbar";

const Dashboard = () => {
  return (
    <AppShell padding="md" navbar={<SimpleNavbar />}>
      <div>hi</div>
    </AppShell>
  );
};

export default Dashboard;
