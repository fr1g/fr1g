import { StyleSheet, Text, View } from 'react-native';
import UnitsField from './components/UnitsField'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Rough Hit The Rats Game.
      </Text>
      <View>
        <UnitsField />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
