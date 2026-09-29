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

export default function ProfileDetails() {
  const {
    name,
    age,
    location,
    bio,
    interests,
    lookingFor,
  } = useLocalSearchParams<{
    name?: string;
    age?: string;
    location?: string;
    bio?: string;
    interests?: string;
    lookingFor?: string;
  }>();

  const interestList = interests
    ? interests.split(',').map((interest) => interest.trim())
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* Profile Photo */}
          <View style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.profileLetter}>
                {name ? name.charAt(0).toUpperCase() : '?'}
              </Text>

              <Text style={styles.photoText}>
                Photo Coming Soon
              </Text>
            </View>
          </View>

          {/* Name */}
          <View style={styles.profileContent}>

            <Text style={styles.name}>
              {name || 'Unknown'}
              {age ? `, ${age}` : ''}
            </Text>

            {location ? (
              <Text style={styles.location}>
                📍 {location}
              </Text>
            ) : null}

            {/* About */}
            {bio ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  About
                </Text>

                <Text style={styles.sectionText}>
                  {bio}
                </Text>
              </View>
            ) : null}

            {/* Interests */}
            {interestList.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Interests
                </Text>

                <View style={styles.interestsContainer}>
                  {interestList.map((interest) => (
                    <View
                      key={interest}
                      style={styles.interestTag}
                    >
                      <Text style={styles.interestText}>
                        {interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            {/* Looking For */}
            {lookingFor ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Looking For
                </Text>

                <Text style={styles.sectionText}>
                  {lookingFor}
                </Text>
              </View>
            ) : null}

            {/* Bottom Action */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => router.back()}
            >
              <Text style={styles.likeButtonText}>
                ❤️ Like {name || 'Profile'}
              </Text>
            </TouchableOpacity>

          </View>

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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 38,
    color: '#333333',
    lineHeight: 38,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  photoContainer: {
    width: '100%',
    height: 360,
    backgroundColor: '#F4DDE5',
  },

  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileLetter: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#E91E63',
  },

  photoText: {
    fontSize: 16,
    color: '#777777',
    marginTop: 10,
  },

  profileContent: {
    padding: 22,
  },

  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222222',
  },

  location: {
    fontSize: 16,
    color: '#666666',
    marginTop: 7,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 9,
  },

  sectionText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
  },

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  interestTag: {
    backgroundColor: '#FFF0F4',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  interestText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },

  likeButton: {
    marginTop: 30,
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  likeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});