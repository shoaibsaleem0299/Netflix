import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const MovieDetailScreen = () => {
    const { movie }: any = useLocalSearchParams(); // Retrieve movie data
    const parsedMovie = JSON.parse(movie);

    const [videoKey, setVideoKey] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            const url = `https://api.themoviedb.org/3/movie/${parsedMovie.id}/videos?language=en-US`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1MDA0YmY1NDBjMDNkODUwNDkxY2U1YzczMDJhZCIsIm5iZiI6MTczNjc5NjM0OC41MzQwMDAyLCJzdWIiOiI2Nzg1NjhiYzA2OTBhYzA2ZTc3YjhjM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G2SXkrv3hFfAmkO14kUKx3C7yb03k_puPETyF3pmD9E",
                },
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                const trailer = data.results.find((v: any) => v.type === "Trailer"); // Look for a trailer                
                if (trailer) {
                    setVideoKey(trailer.key); // Extract YouTube video key
                }
            } catch (error) {
                console.error("Failed to fetch video:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [parsedMovie.id]);

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#E50914" style={styles.loading} />
            ) : videoKey ? (
                <View style={styles.videoContainer}>
                    <YoutubePlayer
                        height={200}
                        play={false}
                        videoId={videoKey}
                        webViewProps={{
                            allowsInlineMediaPlayback: true,
                        }}
                    />
                </View>
            ) : (
                <Text style={styles.noVideo}>No trailer available</Text>
            )}

            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${parsedMovie.backdrop_path}`,
                }}
                style={styles.backdrop}
            />
            <Text style={styles.title}>{parsedMovie.title}</Text>
            <Text style={styles.overview}>{parsedMovie.overview}</Text>
            <Text style={styles.info}>
                Release Date: {parsedMovie.release_date || "N/A"}
            </Text>
            <Text style={styles.info}>
                Rating: {parsedMovie.vote_average || "N/A"} / 10
            </Text>
        </ScrollView>
    );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 15,
    },
    videoContainer: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    loading: {
        marginTop: 20,
    },
    noVideo: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10,
    },
    backdrop: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    overview: {
        color: "#ccc",
        fontSize: 16,
        marginBottom: 15,
    },
    info: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
    },
});
