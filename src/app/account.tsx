import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AccountScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            router.replace('/');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            // Account deletion will be connected to the backend later.
            Alert.alert(
              'Account Deletion',
              'Your account deletion request will be processed here.'
            );
          },
        },
      ],
      { cancelable: true }
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
            Account
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* Account Information */}
          <Text style={styles.sectionTitle}>
            Account Information
          </Text>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.7}
              onPress={() => router.push('/personal-information')}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="person-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Personal Information
                </Text>

                <Text style={styles.optionSubtitle}>
                  Manage your name, age and profile information
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

          </View>

          {/* Account Management */}
          <Text style={styles.sectionTitle}>
            Account Management
          </Text>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.7}
              onPress={() => router.push('/email')}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Email Address
                </Text>

                <Text style={styles.optionSubtitle}>
                  Manage the email connected to your account
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.7}
              onPress={() => router.push('/password')}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Password
                </Text>

                <Text style={styles.optionSubtitle}>
                  Change your account password
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

          </View>

          {/* Danger Zone */}
          <Text style={styles.sectionTitle}>
            Danger Zone
          </Text>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <View style={styles.dangerIconContainer}>
                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="#D32F2F"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.deleteTitle}>
                  Delete Account
                </Text>

                <Text style={styles.optionSubtitle}>
                  Permanently delete your account and data
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#D32F2F"
            />

            <Text style={styles.logoutText}>
              Log Out
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
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#777',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 24,
    overflow: 'hidden',
  },

  option: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  dangerIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  optionTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },

  deleteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D32F2F',
    marginBottom: 4,
  },

  optionSubtitle: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 72,
  },

  logoutButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F3C2C2',
    backgroundColor: '#FFF5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D32F2F',
    marginLeft: 8,
  },
});