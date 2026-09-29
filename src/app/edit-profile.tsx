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
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfile() {
  const {
    profilePhoto: initialPhoto,
    displayName: initialName,
    age: initialAge,
    location: initialLocation,
    bio: initialBio,
    interests: initialInterests,
    lookingFor: initialLookingFor,
  } = useLocalSearchParams<{
    profilePhoto?: string;
    displayName?: string;
    age?: string;
    location?: string;
    bio?: string;
    interests?: string;
    lookingFor?: string;
  }>();

  const [profilePhoto, setProfilePhoto] = useState(
    initialPhoto || ''
  );

  const [displayName, setDisplayName] = useState(
    initialName || ''
  );

  const [age, setAge] = useState(
    initialAge || ''
  );

  const [location, setLocation] = useState(
    initialLocation || ''
  );

  const [bio, setBio] = useState(
    initialBio || ''
  );

  const [interests, setInterests] = useState(
    initialInterests || ''
  );

  const [lookingFor, setLookingFor] = useState(
    initialLookingFor || ''
  );

  const pickProfilePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos so you can change your profile picture.'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const trimmedName = displayName.trim();
    const trimmedAge = age.trim();
    const trimmedLocation = location.trim();
    const trimmedBio = bio.trim();
    const trimmedInterests = interests.trim();
    const trimmedLookingFor = lookingFor.trim();

    if (!trimmedName) {
      Alert.alert(
        'Missing Information',
        'Please enter your display name.'
      );
      return;
    }

    if (!trimmedAge) {
      Alert.alert(
        'Missing Information',
        'Please enter your age.'
      );
      return;
    }

    const numericAge = Number(trimmedAge);

    if (
      Number.isNaN(numericAge) ||
      numericAge < 18 ||
      numericAge > 100
    ) {
      Alert.alert(
        'Invalid Age',
        'Please enter a valid age between 18 and 100.'
      );
      return;
    }

    if (!trimmedLocation) {
      Alert.alert(
        'Missing Information',
        'Please enter your location.'
      );
      return;
    }

    if (!trimmedBio) {
      Alert.alert(
        'Missing Information',
        'Please tell us a little about yourself.'
      );
      return;
    }

    if (!trimmedLookingFor) {
      Alert.alert(
        'Missing Information',
        'Please tell us what you are looking for.'
      );
      return;
    }

    /*
     * Return to the existing Home screen and remove
     * the Edit Profile screen from the navigation stack.
     */
    router.dismissTo({
      pathname: '/home',
      params: {
        profilePhoto,
        displayName: trimmedName,
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
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#222"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit Profile
        </Text>

        <View style={styles.headerSpacer} />

      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* PROFILE PHOTO */}
        <View style={styles.photoSection}>

          <TouchableOpacity
            style={styles.photoContainer}
            onPress={pickProfilePhoto}
            activeOpacity={0.8}
          >
            {profilePhoto ? (
              <Image
                source={{
                  uri: profilePhoto,
                }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons
                  name="person-outline"
                  size={55}
                  color="#E91E63"
                />
              </View>
            )}

            <View style={styles.cameraButton}>
              <Ionicons
                name="camera"
                size={19}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickProfilePhoto}
            activeOpacity={0.7}
          >
            <Text style={styles.changePhotoText}>
              Change Profile Photo
            </Text>
          </TouchableOpacity>

        </View>

        {/* DISPLAY NAME */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Display Name
          </Text>

          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your display name"
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
        </View>

        {/* AGE */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Age
          </Text>

          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Your age"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>

        {/* LOCATION */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Location
          </Text>

          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Accra, Kumasi, Tema"
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
        </View>

        {/* ABOUT ME */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            About Me
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell people a little about yourself..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            maxLength={500}
          />

          <Text style={styles.characterCount}>
            {bio.length}/500
          </Text>
        </View>

        {/* INTERESTS */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Interests
          </Text>

          <TextInput
            style={styles.input}
            value={interests}
            onChangeText={setInterests}
            placeholder="e.g. Music, football, cooking"
            placeholderTextColor="#999"
          />

          <Text style={styles.optionalText}>
            Optional
          </Text>
        </View>

        {/* LOOKING FOR */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Looking For
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            value={lookingFor}
            onChangeText={setLookingFor}
            placeholder="Tell us what kind of connection you want..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            maxLength={300}
          />

          <Text style={styles.characterCount}>
            {lookingFor.length}/300
          </Text>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Ionicons
            name="checkmark"
            size={21}
            color="#FFFFFF"
          />

          <Text style={styles.saveButtonText}>
            Save Changes
          </Text>
        </TouchableOpacity>

        {/* CANCEL */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
  },

  headerSpacer: {
    width: 42,
  },

  container: {
    padding: 20,
    paddingBottom: 50,
  },

  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },

  photoContainer: {
    width: 125,
    height: 125,
    borderRadius: 63,
    overflow: 'visible',
    backgroundColor: '#F4DDE5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 63,
  },

  photoPlaceholder: {
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: '#F4DDE5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraButton: {
    position: 'absolute',
    right: -2,
    bottom: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFF5F7',
  },

  changePhotoText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
  },

  textArea: {
    minHeight: 110,
  },

  characterCount: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },

  optionalText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },

  saveButton: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 5,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 5,
  },

  cancelButtonText: {
    color: '#777',
    fontSize: 15,
    fontWeight: '600',
  },
});