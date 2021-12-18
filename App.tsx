import faker from 'faker';
import { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type DataItem = {
  key: string;
  title: string;
  description: string;
  image: string;
};

function generateTenItems(): DataItem[] {
  return new Array(10).fill(undefined).map(() => ({
    key: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    image: `${faker.image.imageUrl()}?random=${Math.random()}`,
  }));
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <List />
      </View>
    </SafeAreaProvider>
  );
}

function List() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(generateTenItems());

  const loadMore = useCallback(() => {
    setTimeout(() => {
      setData([...data, ...generateTenItems()]);
    }, 500);
  }, [data]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      onEndReached={loadMore}
    />
  );
}

function Item({ item }: { item: DataItem }) {
  return (
    <View style={styles.item}>
      <Image style={styles.itemImage} source={{ uri: item.image }} />
      <View style={styles.itemTexts}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemTexts: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemDescription: {},
});
