import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../store/slices/favSlice';

export const api_key = '0a227c8ceb0c37b09abcb3f32e4a8f8f';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.fav.value);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = searchValue
    ? movies.filter(movie =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : movies;

  const handleAddToFav = (movie) => {
    dispatch(toggle(movie));
    Alert.alert("Added to Favorites", "Movie added to favorites successfully.");
  };

  return (
    <View style={styles.con}>
      <TextInput
        placeholder='Search'
        style={styles.search}
        placeholderTextColor={'white'}
        selectionColor={'pink'}
        onChangeText={text => setSearchValue(text)}
        value={searchValue}
      />
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', { movie: item })
            }
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
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
              style={styles.detailsButton}
              onPress={() => navigation.navigate('Details', { movie: item })}  
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.favButton,
                fav.some(favItem => favItem.id === item.id) && styles.favButtonActive
              ]}
              onPress={() => handleAddToFav(item)}
            >
              <Text style={styles.favButtonText}>Add to fav</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    backgroundColor: 'black',
    flex: 1,
  },
  search: {
    backgroundColor: '#3C3D37',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 10,
  },
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
  rating: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },
  detailsButton: {
    backgroundColor: '#982B1C',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  detailsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
  favButtonActive: {
    backgroundColor: '#f97316',
  },
});

export default Home;
