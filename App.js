import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        console.log(data);
        setContact(data);
      }
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.phoneNumbers[0].number}</Text>
          </View>
        )}
        data={contact}
      />
      <Button title="Get contact" onPress={getContacts}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
