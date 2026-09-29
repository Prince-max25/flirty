
import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';

type Reaction = '❤️' | '😂' | '😍' | '😮' | '😢' | '👍';

type ChatMessage = {
  id: string;
  text?: string;
  photoUri?: string;
  photoWidth?: number;
  photoHeight?: number;
  type: 'received' | 'sent';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  reaction?: Reaction;
  replyTo?: {
    text?: string;
    photoUri?: string;
  };
};

export default function Chat() {
  const { name } = useLocalSearchParams<{
    name?: string;
  }>();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [replyingTo, setReplyingTo] =
    useState<ChatMessage | null>(null);

  const [editingMessageId, setEditingMessageId] =
    useState<string | null>(null);

  const [isTyping, setIsTyping] = useState(false);

  const [reactionMessageId, setReactionMessageId] =
    useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const isOnline = true;

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  const markMessageAsRead = (messageId: string) => {
    setTimeout(() => {
      setMessages((previousMessages) =>
        previousMessages.map((chatMessage) => {
          if (chatMessage.id !== messageId) {
            return chatMessage;
          }

          return {
            ...chatMessage,
            status: 'read',
          };
        })
      );
    }, 1500);
  };

  const handleMessageChange = (text: string) => {
    setMessage(text);

    if (text.trim().length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    // EDIT EXISTING MESSAGE
    if (editingMessageId) {
      setMessages((previousMessages) =>
        previousMessages.map((chatMessage) => {
          if (chatMessage.id !== editingMessageId) {
            return chatMessage;
          }

          return {
            ...chatMessage,
            text: trimmedMessage,
            time: getCurrentTime(),
          };
        })
      );

      setMessage('');
      setEditingMessageId(null);
      setIsTyping(false);

      return;
    }

    // SEND NEW MESSAGE
    const messageId = Date.now().toString();

    const newMessage: ChatMessage = {
      id: messageId,
      text: trimmedMessage,
      type: 'sent',
      status: 'delivered',
      time: getCurrentTime(),

      replyTo: replyingTo
        ? {
            text: replyingTo.text,
            photoUri: replyingTo.photoUri,
          }
        : undefined,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage('');
    setReplyingTo(null);
    setIsTyping(false);

    scrollToBottom();

    markMessageAsRead(messageId);
  };

  const sendPhoto = async () => {
    if (editingMessageId) {
      Alert.alert(
        'Finish Editing',
        'Please finish editing your message before sending a photo.'
      );
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos so you can send photos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const selectedPhotos = result.assets;

    Alert.alert(
      'Send Photos',
      `Do you want to send ${selectedPhotos.length} ${
        selectedPhotos.length === 1 ? 'photo' : 'photos'
      }?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => {
            const currentTime = getCurrentTime();

            const newMessages: ChatMessage[] =
              selectedPhotos.map((photo, index) => ({
                id: `${Date.now()}-${index}`,
                photoUri: photo.uri,
                photoWidth: photo.width,
                photoHeight: photo.height,
                type: 'sent',
                status: 'delivered',
                time: currentTime,

                replyTo: replyingTo
                  ? {
                      text: replyingTo.text,
                      photoUri: replyingTo.photoUri,
                    }
                  : undefined,
              }));

            setMessages((previousMessages) => [
              ...previousMessages,
              ...newMessages,
            ]);

            setReplyingTo(null);

            scrollToBottom();

            newMessages.forEach((photoMessage) => {
              markMessageAsRead(photoMessage.id);
            });
          },
        },
      ]
    );
  };

  const getPhotoSize = (
    width: number,
    height: number
  ) => {
    const maxWidth = 250;
    const maxHeight = 300;

    const ratio = width / height;

    let displayWidth = width;
    let displayHeight = height;

    if (displayWidth > maxWidth) {
      displayWidth = maxWidth;
      displayHeight = displayWidth / ratio;
    }

    if (displayHeight > maxHeight) {
      displayHeight = maxHeight;
      displayWidth = displayHeight * ratio;
    }

    return {
      width: displayWidth,
      height: displayHeight,
    };
  };

  const deleteMessage = (messageId: string) => {
    Alert.alert(
      'Delete Message',
      'Do you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMessages((previousMessages) =>
              previousMessages.filter(
                (chatMessage) => chatMessage.id !== messageId
              )
            );
          },
        },
      ]
    );
  };

  const replyToMessage = (chatMessage: ChatMessage) => {
    setEditingMessageId(null);
    setMessage('');
    setReplyingTo(chatMessage);
    setIsTyping(true);
  };

  const editMessage = (chatMessage: ChatMessage) => {
    if (!chatMessage.text) {
      return;
    }

    setReplyingTo(null);
    setEditingMessageId(chatMessage.id);
    setMessage(chatMessage.text);
    setIsTyping(true);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setMessage('');
    setIsTyping(false);
  };

  // ADD OR REMOVE REACTION
  const addReaction = (
    messageId: string,
    reaction: Reaction
  ) => {
    setMessages((previousMessages) =>
      previousMessages.map((chatMessage) => {
        if (chatMessage.id !== messageId) {
          return chatMessage;
        }

        // Tapping the same reaction removes it.
        if (chatMessage.reaction === reaction) {
          return {
            ...chatMessage,
            reaction: undefined,
          };
        }

        return {
          ...chatMessage,
          reaction,
        };
      })
    );

    setReactionMessageId(null);
  };

  // LONG PRESS OPENS THE REACTION BAR
  const handleLongPress = (chatMessage: ChatMessage) => {
    if (chatMessage.type !== 'sent') {
      return;
    }

    setReactionMessageId(chatMessage.id);
  };

  // OPTIONS FROM THE THREE-DOT BUTTON
  const showMessageOptions = (chatMessage: ChatMessage) => {
    const options: {
      text: string;
      onPress: () => void;
      style?: 'default' | 'destructive' | 'cancel';
    }[] = [
      {
        text: 'Reply',
        onPress: () => {
          setReactionMessageId(null);
          replyToMessage(chatMessage);
        },
      },
    ];

    // Edit only works for text messages.
    if (chatMessage.text) {
      options.push({
        text: 'Edit',
        onPress: () => {
          setReactionMessageId(null);
          editMessage(chatMessage);
        },
      });
    }

    options.push({
      text: 'Delete',
      style: 'destructive',
      onPress: () => {
        setReactionMessageId(null);
        deleteMessage(chatMessage.id);
      },
    });

    options.push({
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {
        setReactionMessageId(null);
      },
    });

    Alert.alert(
      'Message Options',
      undefined,
      options
    );
  };

  const getReplyPreviewText = (
    chatMessage: ChatMessage
  ) => {
    if (chatMessage.photoUri) {
      return 'Photo';
    }

    return chatMessage.text || 'Message';
  };

  const getStatusSymbol = (
    status?: 'sent' | 'delivered' | 'read'
  ) => {
    if (status === 'read') {
      return '✓✓';
    }

    if (status === 'delivered') {
      return '✓✓';
    }

    return '✓';
  };

  const getStatusColor = (
    status?: 'sent' | 'delivered' | 'read'
  ) => {
    if (status === 'read') {
      return '#2196F3';
    }

    return '#777777';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerProfile}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>
                {(name || 'User').charAt(0)}
              </Text>
            </View>

            <View>
              <Text style={styles.headerName}>
                {name || 'User'}
              </Text>

              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: isOnline
                        ? '#4CAF50'
                        : '#999999',
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.statusText,
                    {
                      color: isOnline
                        ? '#4CAF50'
                        : '#777777',
                    },
                  ]}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* MESSAGES */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesArea}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatTitle}>
                Start a conversation
              </Text>

              <Text style={styles.emptyChatText}>
                Send a message to {name || 'this person'}.
              </Text>
            </View>
          ) : (
            messages.map((chatMessage) => (
              <View
                key={chatMessage.id}
                style={
                  chatMessage.type === 'sent'
                    ? styles.sentContainer
                    : styles.receivedContainer
                }
              >
                {/* WHATSAPP-STYLE REACTION BAR */}
                {reactionMessageId === chatMessage.id && (
                  <View
                    style={
                      chatMessage.type === 'sent'
                        ? styles.sentReactionPicker
                        : styles.receivedReactionPicker
                    }
                  >
                    {(
                      [
                        '❤️',
                        '😂',
                        '😍',
                        '😮',
                        '😢',
                        '👍',
                      ] as Reaction[]
                    ).map((reaction) => (
                      <TouchableOpacity
                        key={reaction}
                        style={styles.reactionOption}
                        onPress={() =>
                          addReaction(
                            chatMessage.id,
                            reaction
                          )
                        }
                      >
                        <Text
                          style={styles.reactionOptionText}
                        >
                          {reaction}
                        </Text>
                      </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                      style={styles.moreReactionButton}
                      onPress={() => {
                        showMessageOptions(chatMessage);
                      }}
                    >
                      <Text style={styles.moreReactionText}>
                        ⋯
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* REPLY PREVIEW */}
                {chatMessage.replyTo && (
                  <View
                    style={
                      chatMessage.type === 'sent'
                        ? styles.sentReplyPreview
                        : styles.receivedReplyPreview
                    }
                  >
                    <Text
                      style={
                        chatMessage.type === 'sent'
                          ? styles.sentReplyLabel
                          : styles.receivedReplyLabel
                      }
                    >
                      Replying to
                    </Text>

                    {chatMessage.replyTo.photoUri ? (
                      <View style={styles.replyPhotoRow}>
                        <Image
                          source={{
                            uri: chatMessage.replyTo.photoUri,
                          }}
                          style={styles.replyPhoto}
                        />

                        <Text
                          style={
                            chatMessage.type === 'sent'
                              ? styles.sentReplyText
                              : styles.receivedReplyText
                          }
                        >
                          Photo
                        </Text>
                      </View>
                    ) : (
                      <Text
                        numberOfLines={2}
                        style={
                          chatMessage.type === 'sent'
                            ? styles.sentReplyText
                            : styles.receivedReplyText
                        }
                      >
                        {chatMessage.replyTo.text}
                      </Text>
                    )}
                  </View>
                )}

                {/* PHOTO MESSAGE */}
                {chatMessage.photoUri ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      setSelectedImage(chatMessage.photoUri!)
                    }
                    onLongPress={() =>
                      handleLongPress(chatMessage)
                    }
                    delayLongPress={500}
                    style={[
                      styles.photoWrapper,
                      getPhotoSize(
                        chatMessage.photoWidth || 250,
                        chatMessage.photoHeight || 300
                      ),
                    ]}
                  >
                    <Image
                      source={{
                        uri: chatMessage.photoUri,
                      }}
                      style={styles.messagePhoto}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  /* TEXT MESSAGE */
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onLongPress={() =>
                      handleLongPress(chatMessage)
                    }
                    delayLongPress={500}
                  >
                    <View
                      style={
                        chatMessage.type === 'sent'
                          ? styles.sentMessage
                          : styles.receivedMessage
                      }
                    >
                      <Text
                        style={
                          chatMessage.type === 'sent'
                            ? styles.sentText
                            : styles.receivedText
                        }
                      >
                        {chatMessage.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {/* REACTION */}
                {chatMessage.reaction && (
                  <TouchableOpacity
                    style={
                      chatMessage.type === 'sent'
                        ? styles.sentReaction
                        : styles.receivedReaction
                    }
                    onPress={() =>
                      addReaction(
                        chatMessage.id,
                        chatMessage.reaction!
                      )
                    }
                  >
                    <Text style={styles.reactionText}>
                      {chatMessage.reaction}
                    </Text>
                  </TouchableOpacity>
                )}

                {/* TIME + STATUS */}
                <View
                  style={
                    chatMessage.type === 'sent'
                      ? styles.sentMeta
                      : styles.receivedMeta
                  }
                >
                  <Text
                    style={
                      chatMessage.type === 'sent'
                        ? styles.sentTime
                        : styles.receivedTime
                    }
                  >
                    {chatMessage.time}
                  </Text>

                  {chatMessage.type === 'sent' && (
                    <Text
                      style={[
                        styles.sentTick,
                        {
                          color: getStatusColor(
                            chatMessage.status
                          ),
                        },
                      ]}
                    >
                      {getStatusSymbol(chatMessage.status)}
                    </Text>
                  )}
                </View>
              </View>
            ))
          )}

          {/* TYPING INDICATOR */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>
                  {name || 'User'} is typing...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* REPLY BAR */}
        {replyingTo && !editingMessageId && (
          <View style={styles.replyBar}>
            <View style={styles.replyBarContent}>
              <Text style={styles.replyBarTitle}>
                Replying to {name || 'User'}
              </Text>

              <Text
                numberOfLines={1}
                style={styles.replyBarText}
              >
                {getReplyPreviewText(replyingTo)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cancelReplyButton}
              onPress={() => {
                setReplyingTo(null);
                setIsTyping(message.trim().length > 0);
              }}
            >
              <Text style={styles.cancelReplyText}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EDITING BAR */}
        {editingMessageId && (
          <View style={styles.editingBar}>
            <View style={styles.editingBarContent}>
              <Text style={styles.editingBarTitle}>
                Editing message
              </Text>

              <Text
                numberOfLines={1}
                style={styles.editingBarText}
              >
                {message}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cancelReplyButton}
              onPress={cancelEditing}
            >
              <Text style={styles.cancelReplyText}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* INPUT */}
        <View style={styles.inputArea}>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={sendPhoto}
          >
            <Text style={styles.photoButtonText}>＋</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={
              editingMessageId
                ? 'Edit message...'
                : 'Type a message...'
            }
            placeholderTextColor="#999"
            value={message}
            onChangeText={handleMessageChange}
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Text style={styles.sendButtonText}>
              {editingMessageId ? 'Save' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* IMAGE VIEWER */}
        <Modal
          visible={selectedImage !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.imageViewer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeButtonText}>
                ×
              </Text>
            </TouchableOpacity>

            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  backButton: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 30,
    color: '#333333',
  },

  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  headerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  headerAvatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  headerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222222',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },

  statusText: {
    fontSize: 12,
  },

  headerSpacer: {
    width: 45,
  },

  messagesArea: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },

  emptyChat: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  emptyChatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },

  emptyChatText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },

  receivedContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: '78%',
    marginBottom: 12,
  },

  sentContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    maxWidth: '78%',
    marginBottom: 12,
  },

  sentReactionPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginBottom: 7,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  receivedReactionPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginBottom: 7,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  reactionOption: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reactionOptionText: {
    fontSize: 24,
  },

  moreReactionButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
    marginLeft: 3,
  },

  moreReactionText: {
    fontSize: 25,
    color: '#777777',
  },

  receivedMessage: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
  },

  sentMessage: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 18,
    borderBottomRightRadius: 5,
  },

  receivedText: {
    color: '#333333',
    fontSize: 15,
  },

  sentText: {
    color: '#FFFFFF',
    fontSize: 15,
  },

  sentReplyPreview: {
    backgroundColor: '#C2185B',
    borderLeftWidth: 3,
    borderLeftColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },

  receivedReplyPreview: {
    backgroundColor: '#F3F3F3',
    borderLeftWidth: 3,
    borderLeftColor: '#E91E63',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },

  sentReplyLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  receivedReplyLabel: {
    color: '#E91E63',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  sentReplyText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  receivedReplyText: {
    color: '#666666',
    fontSize: 12,
  },

  replyPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  replyPhoto: {
    width: 35,
    height: 35,
    borderRadius: 6,
    marginRight: 7,
  },

  photoWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
  },

  messagePhoto: {
    width: '100%',
    height: '100%',
  },

  sentReaction: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginRight: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  receivedReaction: {
    alignSelf: 'flex-start',
    marginTop: -5,
    marginLeft: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  reactionText: {
    fontSize: 17,
  },

  receivedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 3,
  },

  sentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    marginRight: 3,
  },

  receivedTime: {
    fontSize: 10,
    color: '#999999',
  },

  sentTime: {
    fontSize: 10,
    color: '#999999',
  },

  sentTick: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  typingContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  typingBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
  },

  typingText: {
    color: '#888888',
    fontSize: 13,
    fontStyle: 'italic',
  },

  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  replyBarContent: {
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#E91E63',
    paddingLeft: 9,
  },

  replyBarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 2,
  },

  replyBarText: {
    fontSize: 13,
    color: '#666666',
  },

  editingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  editingBarContent: {
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#E91E63',
    paddingLeft: 9,
  },

  editingBarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 2,
  },

  editingBarText: {
    fontSize: 13,
    color: '#666666',
  },

  cancelReplyButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelReplyText: {
    fontSize: 25,
    color: '#777777',
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  photoButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  photoButtonText: {
    fontSize: 28,
    color: '#E91E63',
    lineHeight: 30,
  },

  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 110,
    backgroundColor: '#F5F5F5',
    borderRadius: 23,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: '#333333',
    marginRight: 8,
  },

  sendButton: {
    height: 45,
    paddingHorizontal: 17,
    borderRadius: 23,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  imageViewer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullScreenImage: {
    width: '100%',
    height: '85%',
  },

  closeButton: {
    position: 'absolute',
    top: 45,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 38,
  },
});
