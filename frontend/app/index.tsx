import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

const Index = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
        }}
        style={styles.logo}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Sign In clicked");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Bottom Text */}
      <Text style={styles.footerText}>
        New to Netflix?{" "}
        <Link href="/Components/Register/Register" style={styles.link}>Sign Up</Link>
      </Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    height: height,
    // flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Space below the logo
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#E50914",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
  link: {
    color: "#E50914",
    marginVertical: 10
  },
});
