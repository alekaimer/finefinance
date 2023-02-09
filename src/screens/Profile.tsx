import React from "react";
import { View, TextInput, Button, Text } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="title">
        Profile
      </Text>

      <TextInput testID="input-name" placeholder="Nome" />

      <TextInput testID="input-surname" placeholder="Sobrenome" />

      <Button
        testID="button"
        title="Salvar"
        onPress={() => {
          console.log("Clicou");
        }}
        accessibilityLabel="Salvari"
      />
    </View>
  );
}
