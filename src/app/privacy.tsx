import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PrivacyScreen() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

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
            Privacy
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* Profile Privacy */}
          <Text style={styles.sectionTitle}>
            Profile Privacy
          </Text>

          <View style={styles.card}>

            {/* Profile Visibility */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="eye-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Profile Visibility
                </Text>

                <Text style={styles.optionSubtitle}>
                  Allow other people to discover your profile
                </Text>
              </View>

              <Switch
                value={profileVisible}
                onValueChange={setProfileVisible}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  profileVisible
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

            <View style={styles.divider} />

            {/* Show Age */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Show My Age
                </Text>

                <Text style={styles.optionSubtitle}>
                  Show your age on your dating profile
                </Text>
              </View>

              <Switch
                value={showAge}
                onValueChange={setShowAge}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  showAge
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

            <View style={styles.divider} />

            {/* Show Location */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Show My Location
                </Text>

                <Text style={styles.optionSubtitle}>
                  Show your location on your profile
                </Text>
              </View>

              <Switch
                value={showLocation}
                onValueChange={setShowLocation}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  showLocation
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

          </View>

          {/* Messaging Privacy */}
          <Text style={styles.sectionTitle}>
            Messaging Privacy
          </Text>

          <View style={styles.card}>

            {/* Read Receipts */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="checkmark-done-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Read Receipts
                </Text>

                <Text style={styles.optionSubtitle}>
                  Let people know when you have read their messages
                </Text>
              </View>

              <Switch
                value={readReceipts}
                onValueChange={setReadReceipts}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  readReceipts
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

          </View>

          {/* Safety */}
          <Text style={styles.sectionTitle}>
            Safety
          </Text>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ban-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Blocked Users
                </Text>

                <Text style={styles.optionSubtitle}>
                  Manage people you have blocked
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

          </View>

          {/* Privacy Note */}
          <View style={styles.infoBox}>

            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#E91E63"
            />

            <Text style={styles.infoText}>
              You can change these privacy settings at any
              time.
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

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#777',
    lineHeight: 19,
    marginLeft: 10,
  },
});