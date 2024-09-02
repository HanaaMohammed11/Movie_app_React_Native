import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../store/slices/favSlice";

const Fav = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const fav = useSelector((state) => state.fav.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setMovies(fav);
  }, [fav]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("MovieDetails", { movieId: item.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.cardText}>{item.original_language}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={24} color="gold" />
                <Text style={styles.rating}>{item.vote_average}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                dispatch(toggle(item));
                console.log("pressed");
              }}
            >
              <Text style={styles.removeButtonText}>Remove from fav</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginVertical: 15,
    width: 320,
    backgroundColor: '#7D0A0A',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImg: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
  },
  rating: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Fav;
