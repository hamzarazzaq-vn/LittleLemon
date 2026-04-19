import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from 'react-native';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        setMenuData(data.menu);
      } catch {
        Alert.alert('Error', 'Failed to fetch menu data');
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = useMemo(() => {
    let filtered = menuData;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }, [menuData, selectedCategory, searchText]);

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.categoryTextSelected
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>{item.price}</Text>
        <Text style={styles.menuDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Little Lemon</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroDescription}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search menu..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Order for Delivery!</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Menu List */}
      <View style={styles.menuSection}>
        <FlatList
          data={filteredMenu}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEFEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
  },
  profileIcon: {
    fontSize: 24,
  },
  hero: {
    backgroundColor: '#495E57',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 15,
  },
  heroDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    lineHeight: 24,
  },
  searchBar: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 15,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#EDEFEE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#495E57',
  },
  categoryItemSelected: {
    backgroundColor: '#495E57',
  },
  categoryText: {
    fontSize: 16,
    color: '#495E57',
  },
  categoryTextSelected: {
    color: '#F4CE14',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 16,
    color: '#F4CE14',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: '#495E57',
    lineHeight: 20,
  },
});

export default Home;