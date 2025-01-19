import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { getUsers } from './src/services/firebase'; // Assurez-vous du bon chemin

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHomePage, setIsHomePage] = useState(true); // État pour basculer entre la page d'accueil et la page des utilisateurs

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(Object.values(usersData)); // Transformer l'objet en tableau
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isHomePage) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur l'application</Text>
        <Button
          title="Voir la liste des utilisateurs"
          onPress={() => {
            setIsHomePage(false); // Passer à la page des utilisateurs
            fetchUsers(); // Charger les utilisateurs
          }}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des utilisateurs :</Text>
      {users.map((user, index) => (
        <View key={index} style={styles.userCard}>
          <Text style={styles.userEmail}>Email: {user.email}</Text>
          <Text style={styles.userName}>Name: {user.name}</Text>
        </View>
      ))}
      <Button
        title="Retour à l'accueil"
        onPress={() => setIsHomePage(true)} // Retour à la page d'accueil
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
