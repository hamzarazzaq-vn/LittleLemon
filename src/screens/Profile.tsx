import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileProps {
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFirstName = await AsyncStorage.getItem('firstName');
        const savedEmail = await AsyncStorage.getItem('email');
        if (savedFirstName) setFirstName(savedFirstName);
        if (savedEmail) setEmail(savedEmail);
      } catch {
        Alert.alert('Error', 'Failed to load data');
      }
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Onboarding');
    } catch {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{firstName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#EDEFEE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#495E57',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#495E57',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;