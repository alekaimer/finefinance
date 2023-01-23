import { StyleSheet, Text } from "react-native";

type Props = {
  title: string;
};

export function Welcome({ title }: Props) {
  return <Text style={styles.text}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#5d5d58",
  },
});