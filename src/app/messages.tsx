import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

const conversations = [
  {
    id: '1',
    name: 'Ama',
    message: '',
    time: '',
    unread: false,
  },
  {
    id: '2',
    name: 'Akua',
    message: '',
    time: '',
    unread: false,
  },
  {
    id: '3',
    name: 'Michael',
    message: '',
    time: '',
    unread: false,
  },
  {
    id: '4',
    name: 'Abena',
    message: '',
    time: '',
    unread: false,
  },
];

export default function Messages() {
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

          <Text style={styles.headerTitle}>Messages</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Messages */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        >
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.messageItem}
              onPress={() =>
                router.push({
                  pathname: '/chat',
                  params: {
                    name: conversation.name,
                  },
                })
              }
            >
              {/* Profile Photo */}
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>
                  {conversation.name.charAt(0)}
                </Text>
              </View>

              {/* Message Information */}
              <View style={styles.messageContent}>
                <View style={styles.nameRow}>
                  <Text
                    style={[
                      styles.name,
                      conversation.unread && styles.unreadName,
                    ]}
                  >
                    {conversation.name}
                  </Text>

                  <Text style={styles.time}>
                    {conversation.time}
                  </Text>
                </View>

                <View style={styles.messageRow}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.lastMessage,
                      conversation.unread && styles.unreadMessage,
                    ]}
                  >
                    {conversation.message}
                  </Text>

                  {conversation.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
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

  messagesList: {
    paddingVertical: 10,
  },

  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  profilePlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  profilePlaceholderText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#E91E63',
  },

  messageContent: {
    flex: 1,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
  },

  unreadName: {
    fontWeight: 'bold',
    color: '#222222',
  },

  time: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 10,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#777777',
  },

  unreadMessage: {
    color: '#444444',
    fontWeight: '600',
  },

  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E91E63',
    marginLeft: 10,
  },
});