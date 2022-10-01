import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';
import { useSelector } from 'react-redux';
import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter(
    (meal) => favoriteMealIds.includes(meal.id),
    // favoriteMealsCtx.ids.includes(meal.id),
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet!</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
