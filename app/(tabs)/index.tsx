import Container from "@/components/base/Container";
import StreakCard from "@/components/features/dashboard/StreakCard";
import TodayStatusCard from "@/components/features/dashboard/TodaysStatusCard";

export default function DashboardScreen() {
  return (
    <Container withBottomTab>
      <TodayStatusCard />
      <StreakCard />
    </Container>
  );
}
