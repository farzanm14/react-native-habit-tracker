import Container from "@/components/base/Container";
import MyText from "@/components/base/Text";
import R from "@/constants";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container style={styles.container}>
        <MyText variant="title">This screen does not exist.</MyText>
        <Link href="/" style={styles.link}>
          <MyText>Go to home screen!</MyText>
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: R.dimensions.v10,
    paddingVertical: R.dimensions.v10,
  },
});
