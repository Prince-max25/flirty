
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const TAP_THRESHOLD = 10;

type Profile = {
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string;
  lookingFor: string;
  image?: string;
};

const profiles: Profile[] = [
  {
    name: 'Ama',
    age: 24,
    location: 'Accra',
    bio: 'I love music, good conversations and exploring new places.',
    interests: 'Music, Travel, Movies, Food',
    lookingFor:
      'Someone genuine, kind and ready for a meaningful connection.',
  },
  {
    name: 'Michael',
    age: 27,
    location: 'Kumasi',
    bio: 'Football fan, entrepreneur and someone who enjoys meeting new people.',
    interests: 'Football, Business, Travel, Fitness',
    lookingFor:
      'A kind and understanding person with a good sense of humor.',
  },
  {
    name: 'Akua',
    age: 25,
    location: 'Tema',
    bio: 'I enjoy cooking, movies and spending time with good company.',
    interests: 'Cooking, Movies, Music, Fashion',
    lookingFor:
      'A genuine relationship with someone who values communication.',
  },
  {
    name: 'Kwame',
    age: 29,
    location: 'Takoradi',
    bio: 'Easygoing, ambitious and always looking for new experiences.',
    interests: 'Business, Fitness, Football, Music',
    lookingFor:
      'Someone ambitious, caring and ready to grow together.',
  },
];

export default function Home() {
  const {
    profilePhoto,
    displayName,
    age,
    location,
    bio,
    interests,
    lookingFor,
  } = useLocalSearchParams<{
    profilePhoto?: string;
    displayName?: string;
    age?: string;
    location?: string;
    bio?: string;
    interests?: string;
    lookingFor?: string;
  }>();

  const [showMyProfile, setShowMyProfile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentIndexRef = useRef(0);

  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);

  const position = useRef(new Animated.ValueXY()).current;

  const currentProfile = profiles[currentIndex];

  const moveToNextProfile = () => {
    position.setValue({
      x: 0,
      y: 0,
    });

    setCurrentIndex((previousIndex) => {
      const nextIndex = previousIndex + 1;

      currentIndexRef.current = nextIndex;

      return nextIndex;
    });
  };

  const swipeCard = (direction: 'left' | 'right') => {
    const destinationX =
      direction === 'right'
        ? SCREEN_WIDTH * 1.5
        : -SCREEN_WIDTH * 1.5;

    Animated.timing(position, {
      toValue: {
        x: destinationX,
        y: 0,
      },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      moveToNextProfile();
    });
  };

  const openProfileDetails = () => {
    const selectedProfile = profiles[currentIndexRef.current];

    if (!selectedProfile) {
      return;
    }

    router.push({
      pathname: '/profile-details',
      params: {
        name: selectedProfile.name,
        age: String(selectedProfile.age),
        location: selectedProfile.location,
        bio: selectedProfile.bio,
        interests: selectedProfile.interests,
        lookingFor: selectedProfile.lookingFor,
      },
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gesture) => {
        return (
          Math.abs(gesture.dx) > 5 ||
          Math.abs(gesture.dy) > 5
        );
      },

      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },

      onPanResponderRelease: (_, gesture) => {
        if (
          Math.abs(gesture.dx) < TAP_THRESHOLD &&
          Math.abs(gesture.dy) < TAP_THRESHOLD
        ) {
          const selectedProfile =
            profiles[currentIndexRef.current];

          if (selectedProfile) {
            router.push({
              pathname: '/profile-details',
              params: {
                name: selectedProfile.name,
                age: String(selectedProfile.age),
                location: selectedProfile.location,
                bio: selectedProfile.bio,
                interests: selectedProfile.interests,
                lookingFor: selectedProfile.lookingFor,
              },
            });
          }

          return;
        }

        if (gesture.dx > SWIPE_THRESHOLD) {
          const selectedProfile =
            profiles[currentIndexRef.current];

          if (selectedProfile) {
            setLikedProfiles((previousMatches) => {
              const alreadyLiked = previousMatches.some(
                (profile) =>
                  profile.name === selectedProfile.name
              );

              if (alreadyLiked) {
                return previousMatches;
              }

              return [
                ...previousMatches,
                selectedProfile,
              ];
            });
          }

          swipeCard('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeCard('left');
        } else {
          Animated.spring(position, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const cardStyle = {
    transform: [
      {
        translateX: position.x,
      },
      {
        translateY: position.y,
      },
      {
        rotate,
      },
    ],
  };

  const handlePass = () => {
    swipeCard('left');
  };

  const handleLike = () => {
    const selectedProfile =
      profiles[currentIndexRef.current];

    if (!selectedProfile) {
      return;
    }

    setLikedProfiles((previousMatches) => {
      const alreadyLiked = previousMatches.some(
        (profile) =>
          profile.name === selectedProfile.name
      );

      if (alreadyLiked) {
        return previousMatches;
      }

      return [
        ...previousMatches,
        selectedProfile,
      ];
    });

    swipeCard('right');
  };

  const openMatches = () => {
    router.push({
      pathname: '/matches',
      params: {
        matchedProfiles: JSON.stringify(likedProfiles),
      },
    });
  };

  /*
   * MY PROFILE
   */
  if (showMyProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>
                Ghana Dating
              </Text>

              <Text style={styles.headerSubtitle}>
                Your Profile
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                router.push({
                  pathname: '/edit-profile',
                  params: {
                    profilePhoto: profilePhoto || '',
                    displayName: displayName || '',
                    age: age || '',
                    location: location || '',
                    bio: bio || '',
                    interests: interests || '',
                    lookingFor: lookingFor || '',
                  },
                })
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={21}
                color="#E91E63"
              />

              <Text style={styles.editButtonText}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.myProfileArea}
            contentContainerStyle={
              styles.myProfileScrollContent
            }
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.myProfileCard}>

              <View style={styles.myPhotoContainer}>
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
                      size={70}
                      color="#E91E63"
                    />

                    <Text
                      style={
                        styles.photoPlaceholderText
                      }
                    >
                      No Profile Photo
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.myProfileInfo}>

                <Text style={styles.myName}>
                  {displayName || 'Your Name'}
                  {age ? `, ${age}` : ''}
                </Text>

                {location ? (
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#777"
                    />

                    <Text style={styles.location}>
                      {location}
                    </Text>
                  </View>
                ) : null}

                {bio ? (
                  <View style={styles.infoSection}>
                    <View style={styles.sectionTitleRow}>
                      <Ionicons
                        name="person-circle-outline"
                        size={19}
                        color="#E91E63"
                      />

                      <Text style={styles.infoTitle}>
                        About Me
                      </Text>
                    </View>

                    <Text style={styles.infoText}>
                      {bio}
                    </Text>
                  </View>
                ) : null}

                {interests ? (
                  <View style={styles.infoSection}>
                    <View style={styles.sectionTitleRow}>
                      <Ionicons
                        name="heart-outline"
                        size={19}
                        color="#E91E63"
                      />

                      <Text style={styles.infoTitle}>
                        Interests
                      </Text>
                    </View>

                    <Text style={styles.infoText}>
                      {interests}
                    </Text>
                  </View>
                ) : null}

                {lookingFor ? (
                  <View style={styles.infoSection}>
                    <View style={styles.sectionTitleRow}>
                      <Ionicons
                        name="search-outline"
                        size={19}
                        color="#E91E63"
                      />

                      <Text style={styles.infoTitle}>
                        Looking For
                      </Text>
                    </View>

                    <Text style={styles.infoText}>
                      {lookingFor}
                    </Text>
                  </View>
                ) : null}

              </View>
            </View>

            <View style={styles.welcomeBox}>

              <View style={styles.welcomeIcon}>
                <Ionicons
                  name="sparkles-outline"
                  size={22}
                  color="#E91E63"
                />
              </View>

              <View style={styles.welcomeContent}>
                <Text style={styles.profileWelcome}>
                  Welcome, {displayName || 'there'}!
                </Text>

                <Text style={styles.profileSubtitle}>
                  This is your profile. You can discover
                  other people from here.
                </Text>
              </View>

            </View>

            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => router.push('/account')}
              activeOpacity={0.7}
            >
              <View style={styles.accountButtonLeft}>

                <View style={styles.accountIconContainer}>
                  <Ionicons
                    name="settings-outline"
                    size={21}
                    color="#E91E63"
                  />
                </View>

                <View>
                  <Text style={styles.accountButtonTitle}>
                    Account
                  </Text>

                  <Text style={styles.accountButtonSubtitle}>
                    Manage your account settings
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => router.push('/privacy')}
              activeOpacity={0.7}
            >
              <View style={styles.accountButtonLeft}>

                <View style={styles.accountIconContainer}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={21}
                    color="#E91E63"
                  />
                </View>

                <View>
                  <Text style={styles.accountButtonTitle}>
                    Privacy
                  </Text>

                  <Text style={styles.accountButtonSubtitle}>
                    Control your profile visibility and privacy
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => router.push('/notifications')}
              activeOpacity={0.7}
            >
              <View style={styles.accountButtonLeft}>

                <View style={styles.accountIconContainer}>
                  <Ionicons
                    name="notifications-outline"
                    size={21}
                    color="#E91E63"
                  />
                </View>

                <View>
                  <Text style={styles.accountButtonTitle}>
                    Notifications
                  </Text>

                  <Text style={styles.accountButtonSubtitle}>
                    Manage your notification preferences
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

          </ScrollView>

          <View style={styles.bottomNav}>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowMyProfile(false)}
            >
              <Ionicons
                name="flame-outline"
                size={23}
                color="#777"
              />

              <Text style={styles.navText}>
                Discover
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.push('/messages')}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22}
                color="#777"
              />

              <Text style={styles.navText}>
                Messages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={openMatches}
            >
              <Ionicons
                name="heart-outline"
                size={23}
                color="#777"
              />

              <Text style={styles.navText}>
                Matches
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowMyProfile(true)}
            >
              <Ionicons
                name="person"
                size={22}
                color="#E91E63"
              />

              <Text
                style={[
                  styles.navText,
                  styles.activeNavText,
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * NO MORE DISCOVER PROFILES
   */
  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>

          <View style={styles.emptyIconCircle}>
            <Ionicons
              name="people-outline"
              size={45}
              color="#E91E63"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No More Profiles
          </Text>

          <Text style={styles.emptyText}>
            You've gone through all the available
            profiles.
          </Text>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => {
              currentIndexRef.current = 0;

              setCurrentIndex(0);

              position.setValue({
                x: 0,
                y: 0,
              });
            }}
          >
            <Ionicons
              name="refresh-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.refreshButtonText}>
              Start Again
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  /*
   * DISCOVER
   */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              Discover
            </Text>

            <Text style={styles.headerSubtitle}>
              Find your connection
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => setShowMyProfile(true)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color="#E91E63"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardArea}>

          {/* NEXT CARD */}
          {profiles[currentIndex + 1] && (
            <View
              style={[
                styles.card,
                styles.nextCard,
              ]}
            >
              <View style={styles.photoPlaceholder}>
                <Ionicons
                  name="image-outline"
                  size={55}
                  color="#E91E63"
                />

                <Text style={styles.photoPlaceholderText}>
                  Photo Coming Soon
                </Text>
              </View>
            </View>
          )}

          {/* CURRENT CARD */}
          <Animated.View
            style={[
              styles.card,
              cardStyle,
            ]}
            {...panResponder.panHandlers}
          >

            <View style={styles.photoContainer}>

              {currentProfile.image ? (
                <Image
                  source={{
                    uri: currentProfile.image,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.profileLetter}>
                    {currentProfile.name.charAt(0)}
                  </Text>

                  <Ionicons
                    name="image-outline"
                    size={25}
                    color="#999"
                  />

                  <Text style={styles.photoPlaceholderText}>
                    Photo Coming Soon
                  </Text>
                </View>
              )}

              {/* LIKE */}
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.actionLabel,
                  styles.likeLabel,
                  {
                    opacity: likeOpacity,
                  },
                ]}
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color="#4CAF50"
                />

                <Text style={styles.likeText}>
                  LIKE
                </Text>
              </Animated.View>

              {/* PASS */}
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.actionLabel,
                  styles.passLabel,
                  {
                    opacity: passOpacity,
                  },
                ]}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color="#E91E63"
                />

                <Text style={styles.passText}>
                  PASS
                </Text>
              </Animated.View>

            </View>

            <View style={styles.profileInfo}>

              <Text style={styles.name}>
                {currentProfile.name},{' '}
                {currentProfile.age}
              </Text>

              <View style={styles.detailRow}>
                <Ionicons
                  name="location-outline"
                  size={17}
                  color="#FFFFFF"
                />

                <Text style={styles.location}>
                  {currentProfile.location}
                </Text>
              </View>

              <View style={styles.tapRow}>
                <Ionicons
                  name="chevron-up-outline"
                  size={16}
                  color="#FFFFFF"
                />

                <Text style={styles.tapText}>
                  Tap to view full profile
                </Text>
              </View>

            </View>

          </Animated.View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actions}>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.passButton,
            ]}
            onPress={handlePass}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close"
              size={30}
              color="#E91E63"
            />

            <Text style={styles.buttonLabel}>
              Pass
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.likeButton,
            ]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Ionicons
              name="heart"
              size={29}
              color="#DF1717"
            />

            <Text style={styles.buttonLabel}>
              Like
            </Text>
          </TouchableOpacity>

        </View>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setShowMyProfile(false)}
          >
            <Ionicons
              name="flame"
              size={23}
              color="#E91E63"
            />

            <Text
              style={[
                styles.navText,
                styles.activeNavText,
              ]}
            >
              Discover
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/messages')}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="#777"
            />

            <Text style={styles.navText}>
              Messages
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={openMatches}
          >
            <Ionicons
              name="heart-outline"
              size={23}
              color="#777"
            />

            <Text style={styles.navText}>
              Matches
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setShowMyProfile(true)}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color="#777"
            />

            <Text style={styles.navText}>
              Profile
            </Text>
          </TouchableOpacity>

        </View>

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
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E91E63',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  editButtonText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },

  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  myProfileArea: {
    flex: 1,
  },

  myProfileScrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },

  myProfileCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  myPhotoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F4DDE5',
  },

  myProfileInfo: {
    padding: 20,
  },

  myName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },

  location: {
    fontSize: 15,
    color: '#FFFFFF',
  },

  infoSection: {
    marginTop: 18,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 6,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  profileWelcome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  profileSubtitle: {
    fontSize: 13,
    color: '#777',
    lineHeight: 19,
    marginTop: 3,
  },

  welcomeBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },

  welcomeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  welcomeContent: {
    flex: 1,
  },

  discoverButton: {
    width: '100%',
    backgroundColor: '#E91E63',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  discoverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  accountButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  accountButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  accountIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  accountButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  accountButtonSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4DDE5',
  },

  profileLetter: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 8,
  },

  photoPlaceholderText: {
    fontSize: 15,
    color: '#777',
    marginTop: 5,
  },

  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    position: 'absolute',
    width: '100%',
    height: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  nextCard: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  /*
   * UPDATED:
   * The photo now fills the entire Discover card.
   */
  photoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F4DDE5',
  },

  actionLabel: {
    position: 'absolute',
    top: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  likeLabel: {
    right: 20,
    borderColor: '#4CAF50',
    transform: [
      {
        rotate: '15deg',
      },
    ],
  },

  passLabel: {
    left: 20,
    borderColor: '#E91E63',
    transform: [
      {
        rotate: '-15deg',
      },
    ],
  },

  likeText: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
  },

  passText: {
    color: '#E91E63',
    fontSize: 20,
    fontWeight: 'bold',
  },

  /*
   * UPDATED:
   * The profile information is now a transparent overlay
   * at the bottom of the full-size photo.
   */
  profileInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  tapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 3,
  },

  tapText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 35,
    paddingVertical: 12,
  },

  actionButton: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  passButton: {
    borderWidth: 2,
    borderColor: '#E91E63',
  },

  likeButton: {
    borderWidth: 2,
    borderColor: '#DF1717',
  },

  buttonLabel: {
    position: 'absolute',
    bottom: -14,
    fontSize: 11,
    color: '#666',
  },

  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFFFFF',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },

  navText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  activeNavText: {
    color: '#E91E63',
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },

  refreshButton: {
    marginTop: 25,
    backgroundColor: '#E91E63',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
