
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoArea}>
          <Text style={styles.heart}>♥</Text>
          <Text style={styles.appName}>Ghana Dating App</Text>
          <Text style={styles.tagline}>
            Meet people. Make connections. Find your match.
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.ageNotice}>
          You must be 18 or older to use this app.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  logoArea: {
    alignItems: 'center',
    marginTop: 100,
  },

  heart: {
    fontSize: 70,
    color: '#E91E63',
    marginBottom: 15,
  },

  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },

  tagline: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },

  buttons: {
    width: '100%',
    gap: 15,
  },

  primaryButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E91E63',
  },

  secondaryButtonText: {
    color: '#E91E63',
    fontSize: 17,
    fontWeight: 'bold',
  },

  ageNotice: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
});
