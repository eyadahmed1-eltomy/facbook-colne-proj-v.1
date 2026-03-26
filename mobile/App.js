import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Navbar Area Placeholder */}
      <View style={styles.header}>
        <Text style={styles.brand}>Velora</Text>
        <View style={styles.headerIcons}>
          <View style={styles.iconPlaceholder}></View>
          <View style={styles.iconPlaceholder}></View>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.glassCard}>
          <Text style={styles.welcomeTitle}>Welcome to Velora Mobile</Text>
          <Text style={styles.welcomeText}>The premium social experience on your device.</Text>
        </View>

        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.avatar}></View>
            <View>
              <Text style={styles.postAuthor}>Alex Velorum</Text>
              <Text style={styles.postTime}>2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.postContent}>
            Just set up the mobile version of Velora! Combining premium design with native performance. ✨📱
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 92, 231, 0.2)',
  },
  brand: {
    color: '#6c5ce7',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(26, 31, 74, 0.6)',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  glassCard: {
    backgroundColor: 'rgba(26, 31, 74, 0.6)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.2)',
  },
  welcomeTitle: {
    color: '#f0f0f5',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomeText: {
    color: '#a0a3bd',
    fontSize: 16,
    lineHeight: 24,
  },
  postCard: {
    backgroundColor: 'rgba(26, 31, 74, 0.6)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.2)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1a1f4a',
    marginRight: 15,
  },
  postAuthor: {
    color: '#f0f0f5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    color: '#a0a3bd',
    fontSize: 13,
    marginTop: 2,
  },
  postContent: {
    color: '#f0f0f5',
    fontSize: 16,
    lineHeight: 24,
  }
});
