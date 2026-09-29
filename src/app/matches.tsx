import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function Matches() {
  const { matchedProfiles } = useLocalSearchParams<{
    matchedProfiles?: string;
  }>();

  let matches: {
    name: string;
    age: number;
    location: string;
    bio: string;
  }[] = [];

  if (matchedProfiles) {
    try {
      matches = JSON.parse(matchedProfiles);
    } catch (error) {
      matches = [];
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Matches</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Matches */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.matchesList}
        >
          <Text style={styles.title}>
            Your Matches ❤️
          </Text>

          <Text style={styles.subtitle}>
            People you have liked will appear here.
          </Text>

          {matches.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>
              </Text>

              <Text style={styles.emptyTitle}>
                No Matches Yet
              </Text>

              <Text style={styles.emptyText}>
                Start discovering people and tap Like when you find someone
                you're interested in.
              </Text>

              <TouchableOpacity
                style={styles.discoverButton}
                onPress={() => router.back()}
              >
                <Text style={styles.discoverButtonText}>
                  Discover People
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            matches.map((match, index) => (
              <TouchableOpacity
                key={`${match.name}-${index}`}
                style={styles.matchCard}
                onPress={() =>
                  router.push({
                    pathname: '/chat',
                    params: {
                      name: match.name,
                    },
                  })
                }
              >
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.profilePlaceholderText}>
                    {match.name.charAt(0)}
                  </Text>
                </View>

                <View style={styles.matchInfo}>
                  <Text style={styles.name}>
                    {match.name}, {match.age}
                  </Text>

                  <Text style={styles.location}>
                    {match.location}
                  </Text>

                  <Text style={styles.messageHint}>
                    Tap to start chatting
                  </Text>
                </View>

                <Text style={styles.arrow}>
                  ›
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },

  container: {
    flex: 1,
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  backButton: {
    width: 40,
  },

  backText: {
    fontSize: 30,
    color: '#E91E63',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },

  headerSpacer: {
    width: 40,
  },

  matchesList: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 20,
  },

  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  profilePlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  profilePlaceholderText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E91E63',
  },

  matchInfo: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 3,
  },

  location: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },

  messageHint: {
    fontSize: 13,
    color: '#E91E63',
  },

  arrow: {
    fontSize: 30,
    color: '#E91E63',
    marginLeft: 10,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 22,
  },

  discoverButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 25,
  },

  discoverButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});