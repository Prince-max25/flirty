import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [newMatches, setNewMatches] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [likes, setLikes] = useState(true);
  const [profileViews, setProfileViews] = useState(true);
  const [appUpdates, setAppUpdates] = useState(true);

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
            Notifications
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* Dating Notifications */}
          <Text style={styles.sectionTitle}>
            Dating Notifications
          </Text>

          <View style={styles.card}>

            {/* New Matches */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  New Matches
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get notified when you match with someone
                </Text>
              </View>

              <Switch
                value={newMatches}
                onValueChange={setNewMatches}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  newMatches
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

            <View style={styles.divider} />

            {/* New Messages */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  New Messages
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get notified when someone sends you a message
                </Text>
              </View>

              <Switch
                value={newMessages}
                onValueChange={setNewMessages}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  newMessages
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

            <View style={styles.divider} />

            {/* Likes */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="heart-circle-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  Likes
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get notified when someone likes your profile
                </Text>
              </View>

              <Switch
                value={likes}
                onValueChange={setLikes}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  likes
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

            <View style={styles.divider} />

            {/* Profile Views */}
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
                  Profile Views
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get notified when someone views your profile
                </Text>
              </View>

              <Switch
                value={profileViews}
                onValueChange={setProfileViews}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  profileViews
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

          </View>

          {/* App Notifications */}
          <Text style={styles.sectionTitle}>
            App Notifications
          </Text>

          <View style={styles.card}>

            {/* App Updates */}
            <View style={styles.option}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>
                  App Updates
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get important updates and announcements
                </Text>
              </View>

              <Switch
                value={appUpdates}
                onValueChange={setAppUpdates}
                trackColor={{
                  false: '#DDD',
                  true: '#F8BBD0',
                }}
                thumbColor={
                  appUpdates
                    ? '#E91E63'
                    : '#F4F4F4'
                }
              />
            </View>

          </View>

          {/* Information */}
          <View style={styles.infoBox}>

            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#E91E63"
            />

            <Text style={styles.infoText}>
              You can change your notification preferences
              whenever you want.
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