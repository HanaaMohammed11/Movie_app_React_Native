import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { toggle } from '../store/slices/favSlice';

const Now = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const api_key = '0a227c8ceb0c37b09abcb3f32e4a8f8f';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
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
              style={styles.favButton}
              onPress={() => {
                dispatch(toggle(item));
                console.log("pressed");
              }}
            >
              <Text style={styles.favButtonText}>Add to fav</Text>
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
  favButton: {
    backgroundColor: '#982B1C',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  favButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Now;
