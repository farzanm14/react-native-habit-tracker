import Container from "@/components/base/Container";
import MyText from "@/components/base/Text";
import { StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <Container withBottomTab style={styles.container}>
      <MyText>DashboardScreen</MyText>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
});
