import { useRouter } from "expo-router"; // Import useRouter from expo-router
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Video from "react-native-video"; // Import the Video component

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1MDA0YmY1NDBjMDNkODUwNDkxY2U1YzczMDJhZCIsIm5iZiI6MTczNjc5NjM0OC41MzQwMDAyLCJzdWIiOiI2Nzg1NjhiYzA2OTBhYzA2ZTc3YjhjM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G2SXkrv3hFfAmkO14kUKx3C7yb03k_puPETyF3pmD9E",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error(err));
  }, []);

  const featured = {
    id: 1,
    title: "The Witcher",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  };

  return (
    console.log(movies),
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
          }}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* Featured Content */}
      {featured && (
        <View style={styles.featured}>
          <Video
            source={{ uri: featured.videoUrl }}
            style={styles.featuredVideo}
            controls={true}
            resizeMode="cover"
            repeat
            volume={3}
            onError={(error) => console.error("Video Error: ", error)}
          />
        </View>
      )}

      {/* Popular Movies */}
      <View style={styles.container}>
        <Text style={styles.title}>Popular Movies</Text>
        <ScrollView>
          <View style={styles.moviesContainer}>
            {movies.map((movie: any) => (
              <TouchableOpacity
                key={movie.id}
                style={styles.movieItem}
                onPress={() =>
                  router.push({
                    pathname: "/Components/Home/MovieDetailScreen",
                    params: { movie: JSON.stringify(movie) }, // Pass movie data as a parameter
                  })
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 25,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  featured: {
    width: "100%",
    height: height * 0.3,
    justifyContent: "flex-end",
  },
  featuredVideo: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  movieItem: {
    width: width * 0.45,
    marginBottom: 15,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
});
