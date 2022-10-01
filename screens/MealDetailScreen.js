import { useContext, useLayoutEffect } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { MEALS } from '../data/dummy-data';

import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';

import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);
  console.log('favoriteMealsCtx', favoriteMealsCtx);

  const { mealId } = route.params;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    console.log('changeFavoriteStatusHandler: press');

    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />

      <Text style={styles.title}>{selectedMeal.title}</Text>

      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuter}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },

  image: {
    width: '100%',
    height: 200,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },

  detailText: {
    color: 'white',
  },

  listOuter: {
    alignItems: 'center',
  },

  listContainer: {
    width: '80%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
