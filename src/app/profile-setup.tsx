import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ProfileSetup() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const pickProfilePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos so you can choose a profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    const trimmedDisplayName = displayName.trim();
    const trimmedAge = age.trim();
    const trimmedLocation = location.trim();
    const trimmedBio = bio.trim();
    const trimmedInterests = interests.trim();
    const trimmedLookingFor = lookingFor.trim();

    if (!trimmedDisplayName) {
      Alert.alert('Missing Information', 'Please enter your display name.');
      return;
    }

    if (!trimmedAge) {
      Alert.alert('Missing Information', 'Please enter your age.');
      return;
    }

    const numericAge = Number(trimmedAge);

    if (Number.isNaN(numericAge)) {
      Alert.alert('Invalid Age', 'Please enter a valid age.');
      return;
    }

    if (numericAge < 18) {
      Alert.alert(
        'Age Requirement',
        'You must be 18 or older to use this app.'
      );
      return;
    }

    if (numericAge > 100) {
      Alert.alert('Invalid Age', 'Please enter a valid age.');
      return;
    }

    if (!trimmedLocation) {
      Alert.alert('Missing Information', 'Please enter your location.');
      return;
    }

    if (!trimmedBio) {
      Alert.alert('Missing Information', 'Please tell us a little about yourself.');
      return;
    }

    if (!trimmedLookingFor) {
      Alert.alert(
        'Missing Information',
        'Please tell us what you are looking for.'
      );
      return;
    }

  router.push({
  pathname: '/home',
  params: {
    profilePhoto: profilePhoto ?? '',
    displayName: trimmedDisplayName,
    age: trimmedAge,
    location: trimmedLocation,
    bio: trimmedBio,
    interests: trimmedInterests,
    lookingFor: trimmedLookingFor,
  },
});

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Set Up Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell people a little about yourself so they can get to know you.
          </Text>
        </View>

        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <Text style={styles.label}>Profile Photo</Text>

          <TouchableOpacity
            style={styles.photoContainer}
            onPress={pickProfilePhoto}
            activeOpacity={0.8}
          >
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <>
                <Text style={styles.photoIcon}>📷</Text>
                <Text style={styles.photoText}>Add Profile Photo</Text>
                <Text style={styles.photoHint}>
                  Choose a photo from your phone
                </Text>
              </>
            )}
          </TouchableOpacity>

          {profilePhoto && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={pickProfilePhoto}
            >
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Display Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Display Name</Text>

          <TextInput
            style={styles.input}
            placeholder="What should people call you?"
            placeholderTextColor="#999"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
        </View>

        {/* Age */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>

        {/* Location */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Accra, Kumasi, Tema"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
            autoCapitalize="words"
          />
        </View>

        {/* About You */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>About You</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell people a little about yourself..."
            placeholderTextColor="#999"
            value={bio}
            onChangeText={setBio}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />

          <Text style={styles.characterCount}>
            {bio.length}/500
          </Text>
        </View>

        {/* Interests */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Interests</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Music, football, cooking, movies"
            placeholderTextColor="#999"
            value={interests}
            onChangeText={setInterests}
          />

          <Text style={styles.hint}>
            Optional
          </Text>
        </View>

        {/* Looking For */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>What Are You Looking For?</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us what kind of connection you are looking for..."
            placeholderTextColor="#999"
            value={lookingFor}
            onChangeText={setLookingFor}
            multiline
            textAlignVertical="top"
            maxLength={300}
          />

          <Text style={styles.characterCount}>
            {lookingFor.length}/300
          </Text>
        </View>

        {/* Continue */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>

        <Text style={styles.ageNotice}>
          You must be 18 or older to use this app.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },

  container: {
    padding: 24,
    paddingBottom: 50,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: '600',
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },

  photoSection: {
    alignItems: 'center',
    marginBottom: 28,
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  photoContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E91E63',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  photoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  photoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },

  photoHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  changePhotoButton: {
    marginTop: 10,
  },

  changePhotoText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },

  fieldContainer: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
  },

  textArea: {
    minHeight: 110,
  },

  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },

  characterCount: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },

  continueButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  ageNotice: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 25,
  },
});