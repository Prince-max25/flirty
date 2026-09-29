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

export default function PasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        'Missing Information',
        'Please fill in all password fields.'
      );
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert(
        'Password Too Short',
        'Your new password must be at least 8 characters long.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Passwords Do Not Match',
        'Please make sure your new password and confirmation match.'
      );
      return;
    }

    Alert.alert(
      'Password Updated',
      'Your password has been changed successfully.',
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
            Password
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Icon */}
          <View style={styles.iconCircle}>
            <Ionicons
              name="lock-closed-outline"
              size={30}
              color="#E91E63"
            />
          </View>

          <Text style={styles.title}>
            Change Your Password
          </Text>

          <Text style={styles.description}>
            Choose a strong password that you do not use on other websites
            or apps.
          </Text>

          {/* Password Card */}
          <View style={styles.card}>

            {/* Current Password */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Current Password
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showCurrent}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setShowCurrent(!showCurrent)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showCurrent
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View style={styles.field}>
              <Text style={styles.label}>
                New Password
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showNew}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setShowNew(!showNew)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showNew
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.helperText}>
                Use at least 8 characters.
              </Text>
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldLast}>
              <Text style={styles.label}>
                Confirm New Password
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#999"
                />

                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setShowConfirm(!showConfirm)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirm
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsCard}>
            <View style={styles.requirementsHeader}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#E91E63"
              />

              <Text style={styles.requirementsTitle}>
                Password Tips
              </Text>
            </View>

            <View style={styles.requirement}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color="#888"
              />

              <Text style={styles.requirementText}>
                At least 8 characters
              </Text>
            </View>

            <View style={styles.requirement}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color="#888"
              />

              <Text style={styles.requirementText}>
                Avoid using easily guessed information
              </Text>
            </View>

            <View style={styles.requirement}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color="#888"
              />

              <Text style={styles.requirementText}>
                Do not reuse your Flirty password elsewhere
              </Text>
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
              Change Password
            </Text>
          </TouchableOpacity>

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

  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
  },

  description: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: '#777777',
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
    marginBottom: 28,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  field: {
    marginBottom: 22,
  },

  fieldLast: {
    marginBottom: 0,
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
    marginRight: 8,
    fontSize: 15,
    color: '#222222',
  },

  helperText: {
    marginTop: 7,
    fontSize: 11,
    color: '#999999',
  },

  requirementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginTop: 16,
  },

  requirementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    gap: 8,
  },

  requirementsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },

  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },

  requirementText: {
    flex: 1,
    fontSize: 12,
    color: '#777777',
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
});