import { Link, router } from "expo-router";
import React, { useState } from "react";
import axios from "axios";
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

const Register = () => {
    const [fullname, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onRegister = async () => {
        // Clear previous errors
        setError("");

        // Validation logic
        if (!fullname.trim()) {
            setError("Name is required");
            return;
        }
        if (!username.trim()) {
            setError("Username is required");
            return;
        }
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            // API call to register the user
            const response = await axios.post("http://localhost:8000/api/v1/user/register", {
                fullname,
                username,
                email,
                password,
            });

            console.log("Response from server:", response.data);

            // Handle success or failure based on the response
            if (response.status === 200) {
                router.navigate('/')
                setError("Registration successful!");
            } else {
                setError(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error during registration:", error);

            // Handle Axios error response
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;

                if (status === 400) {
                    setError(data.message || "Bad Request: Invalid input.");
                } else {
                    setError(data.message || "Registration failed. Please try again.");
                }
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
                }}
                style={styles.logo}
            />

            {/* Name Input */}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={setName}
                value={fullname}
                autoCapitalize="words"
                autoCorrect={false}
            />

            {/* Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaaaaa"
                onChangeText={setUsername}
                value={username}
                autoCapitalize="words"
                autoCorrect={false}
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

            {/* error message */}
            {error && <Text style={{ color: "red" }}>{error}</Text>}

            {/* Sign Up Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onRegister();
                }}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Bottom Text */}
            <Text style={styles.footerText}>
                Already have an account?{" "}
                <Link href="/" style={styles.link}>
                    Sign In
                </Link>
            </Text>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
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
        marginVertical: 10,
    },
});
