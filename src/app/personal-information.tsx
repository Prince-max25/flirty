import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PersonalInformationScreen() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Missing Information', 'Please enter your name.');
      return;
    }

    Alert.alert(
      'Information Saved',
      'Your personal information has been updated.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#222"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Personal Information
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Intro */}
          <View style={styles.intro}>
            <View style={styles.profileIcon}>
              <Ionicons
                name="person-outline"
                size={30}
                color="#E91E63"
              />
            </View>

            <Text style={styles.introTitle}>
              Your Personal Information
            </Text>

            <Text style={styles.introText}>
              Keep your personal details up to date. Some information may be
              visible on your dating profile.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Full Name */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Full Name
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Date of Birth
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="DD / MM / YYYY"
                  placeholderTextColor="#999"
                  keyboardType="numbers-and-punctuation"
                  maxLength={10}
                />
              </View>

              <Text style={styles.helperText}>
                You must be 18 or older to use Flirty.
              </Text>
            </View>

            {/* Gender */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Gender
              </Text>

              <View style={styles.genderContainer}>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'Male' && styles.genderOptionActive,
                  ]}
                  onPress={() => setGender('Male')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="male-outline"
                    size={20}
                    color={
                      gender === 'Male'
                        ? '#E91E63'
                        : '#777'
                    }
                  />

                  <Text
                    style={[
                      styles.genderText,
                      gender === 'Male' && styles.genderTextActive,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'Female' && styles.genderOptionActive,
                  ]}
                  onPress={() => setGender('Female')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="female-outline"
                    size={20}
                    color={
                      gender === 'Female'
                        ? '#E91E63'
                        : '#777'
                    }
                  />

                  <Text
                    style={[
                      styles.genderText,
                      gender === 'Female' && styles.genderTextActive,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'Other' && styles.genderOptionActive,
                  ]}
                  onPress={() => setGender('Other')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={
                      gender === 'Other'
                        ? '#E91E63'
                        : '#777'
                    }
                  />

                  <Text
                    style={[
                      styles.genderText,
                      gender === 'Other' && styles.genderTextActive,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>

              </View>
            </View>

            {/* Location */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Location
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="e.g. Accra, Ghana"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
              </View>
            </View>

          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.saveButtonText}>
              Save Changes
            </Text>
          </TouchableOpacity>

          {/* Note */}
          <View style={styles.note}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color="#E91E63"
            />

            <Text style={styles.noteText}>
              Your information is used to help personalize your Flirty
              experience.
            </Text>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: '#222222',
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  intro: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 28,
  },

  profileIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  introTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
  },

  introText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 340,
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  field: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 13,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#222222',
  },

  helperText: {
    marginTop: 6,
    fontSize: 11,
    color: '#999999',
  },

  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  genderOption: {
    flex: 1,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 13,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  genderOptionActive: {
    borderColor: '#E91E63',
    backgroundColor: '#FCE4EC',
  },

  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777777',
  },

  genderTextActive: {
    color: '#E91E63',
  },

  saveButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
    paddingHorizontal: 5,
    gap: 8,
  },

  noteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#888888',
  },
});