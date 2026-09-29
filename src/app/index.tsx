import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { type ReactNode, useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function GlassCard({ children, style }: { children: ReactNode; style?: any }) {
  return (
    <View style={[styles.glassCard, style]}>
      <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.glassTint} />
      <View style={styles.glassBorder} />
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const aboutY = useRef(0);
  const howItWorksY = useRef(0);

  const scrollToAbout = () => {
    scrollViewRef.current?.scrollTo({
      y: Math.max(aboutY.current - 20, 0),
      animated: true,
    });
  };

  const scrollToHowItWorks = () => {
    scrollViewRef.current?.scrollTo({
      y: Math.max(howItWorksY.current - 20, 0),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* BACKGROUND GLOWS */}
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />
        <View style={styles.glowThree} />
        <View style={styles.glowFour} />

        {/* HERO */}
        <ImageBackground
          source={require('../../assets/hero-image.jpg')}
          style={styles.heroSection}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay} />

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <View style={styles.brandContainer}>
              <View style={styles.brandMark}>
                <Ionicons name="heart" size={19} color="#FFFFFF" />
              </View>

              <Text style={styles.brandName}>Flirty</Text>
            </View>

            <TouchableOpacity
              style={styles.topLogin}
              activeOpacity={0.8}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.topLoginText}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>
              GHANA'S MODERN DATING EXPERIENCE
            </Text>

            <Text style={styles.heroTitle}>
              Meet someone{' '}
              <Text style={styles.heroTitlePink}>worth talking to.</Text>
            </Text>

            <Text style={styles.heroText}>
              Connect with real people, discover meaningful conversations
            </Text>

            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => router.push('/create-account')}
              >
                <Ionicons name="heart" size={20} color="#FFFFFF" />

                <Text style={styles.primaryButtonText}>
                  Create an Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.85}
                onPress={() => router.push('/login')}
              >
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={styles.secondaryButtonText}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ageRow}>

              <Text style={styles.ageText}>
                18+ only • Safe dating • Real connections
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ABOUT */}
        <View
          style={[styles.section, styles.firstSection]}
          onLayout={(event) => {
            aboutY.current = event.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.sectionEyebrow}>ABOUT FLIRTY</Text>

          <Text style={styles.sectionTitle}>
            Dating should feel{' '}
            <Text style={styles.pinkText}>natural.</Text>
          </Text>

          <GlassCard style={styles.aboutCard}>
            <View style={styles.aboutIcon}>
              <Ionicons
                name="people-outline"
                size={27}
                color="#E91E63"
              />
            </View>

            <Text style={styles.cardTitle}>
              Made for meaningful connections
            </Text>

            <Text style={styles.cardText}>
              Flirty is a modern dating experience built to help people meet,
              chat, and connect. Browse profiles, discover people you like,
              and start conversations when the feeling is mutual.
            </Text>
          </GlassCard>
        </View>

        {/* HOW IT WORKS */}
        <View
          style={styles.section}
          onLayout={(event) => {
            howItWorksY.current = event.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>

          <Text style={styles.sectionTitle}>
            Simple. Social.{' '}
            <Text style={styles.pinkText}>Flirty.</Text>
          </Text>

          <View style={styles.stepsContainer}>
            <GlassCard style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>01</Text>
              </View>

              <View style={styles.stepIcon}>
                <Ionicons
                  name="person-add-outline"
                  size={25}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.stepTitle}>Create your profile</Text>

              <Text style={styles.stepText}>
                Tell people a little about yourself and show them what makes
                you, you.
              </Text>
            </GlassCard>

            <GlassCard style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>02</Text>
              </View>

              <View style={styles.stepIcon}>
                <Ionicons
                  name="heart-outline"
                  size={25}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.stepTitle}>Discover people</Text>

              <Text style={styles.stepText}>
                Explore profiles and find people who catch your attention.
              </Text>
            </GlassCard>

            <GlassCard style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>03</Text>
              </View>

              <View style={styles.stepIcon}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={25}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.stepTitle}>Start talking</Text>

              <Text style={styles.stepText}>
                When the interest is mutual, start a conversation and see
                where it goes.
              </Text>
            </GlassCard>
          </View>
        </View>

        {/* FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>FEATURES</Text>

          <Text style={styles.sectionTitle}>
            Everything you need to{' '}
            <Text style={styles.pinkText}>connect.</Text>
          </Text>

          <View style={styles.featureGrid}>
            <GlassCard style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name="heart-circle-outline"
                  size={27}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.featureTitle}>Smart Matching</Text>

              <Text style={styles.featureText}>
                Discover people based on your preferences and interests.
              </Text>
            </GlassCard>

            <GlassCard style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={27}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.featureTitle}>Private Chat</Text>

              <Text style={styles.featureText}>
                Connect privately and get to know your matches through
                conversation.
              </Text>
            </GlassCard>

            <GlassCard style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name="location-outline"
                  size={27}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.featureTitle}>Meet Locally</Text>

              <Text style={styles.featureText}>
                Find people around you and discover connections closer to
                home.
              </Text>
            </GlassCard>

            <GlassCard style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name="sparkles-outline"
                  size={27}
                  color="#E91E63"
                />
              </View>

              <Text style={styles.featureTitle}>Premium Features</Text>

              <Text style={styles.featureText}>
                Unlock additional features designed to give you more ways to
                connect.
              </Text>
            </GlassCard>
          </View>
        </View>

        {/* SAFETY */}
        <View style={styles.section}>
          <GlassCard style={styles.safetyCard}>
            <View style={styles.safetyIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color="#E91E63"
              />
            </View>

            <Text style={styles.safetyTitle}>
              Your safety matters.
            </Text>

            <Text style={styles.safetyText}>
              Dating should be exciting, but it should also feel safe. We
              want Flirty to be a place where people can connect with
              confidence.
            </Text>

            <View style={styles.safetyList}>
              <View style={styles.safetyItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color="#E91E63"
                />

                <Text style={styles.safetyItemText}>
                  Report or block profiles that make you uncomfortable.
                </Text>
              </View>

              <View style={styles.safetyItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color="#E91E63"
                />

                <Text style={styles.safetyItemText}>
                  Never share sensitive personal or financial information
                  with someone you just met.
                </Text>
              </View>

              <View style={styles.safetyItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color="#E91E63"
                />

                <Text style={styles.safetyItemText}>
                  Meet new people responsibly and trust your instincts.
                </Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* FINAL CTA */}
        <View style={styles.finalSection}>
          <View style={styles.finalHeart}>
            <Ionicons name="heart" size={34} color="#E91E63" />
          </View>

          <Text style={styles.finalTitle}>
            Ready to meet someone?
          </Text>

          <Text style={styles.finalText}>
            Your next conversation could be the beginning of something
            special.
          </Text>

          <TouchableOpacity
            style={styles.finalButton}
            activeOpacity={0.85}
            onPress={() => router.push('/create-account')}
          >
            <Text style={styles.finalButtonText}>
              Get Started
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Ionicons name="heart" size={22} color="#FFFFFF" />
          </View>

          <Text style={styles.footerBrand}>Flirty</Text>

          <Text style={styles.footerTagline}>
            Real people. Real conversations. Real connections.
          </Text>

          {/* APP BUTTONS */}
          <Text style={styles.footerHeading}>Get the app</Text>

          <View style={styles.storeButtons}>
            <TouchableOpacity
              style={styles.storeButton}
              activeOpacity={0.85}
            >
              <Ionicons name="logo-apple" size={29} color="#FFFFFF" />

              <View>
                <Text style={styles.storeSmallText}>
                  DOWNLOAD ON THE
                </Text>

                <Text style={styles.storeMainText}>
                  App Store
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.storeButton}
              activeOpacity={0.85}
            >
              <Ionicons
                name="logo-google-playstore"
                size={26}
                color="#FFFFFF"
              />

              <View>
                <Text style={styles.storeSmallText}>
                  GET IT ON
                </Text>

                <Text style={styles.storeMainText}>
                  Google Play
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* FOOTER LINKS */}
          <View style={styles.footerLinksContainer}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>
                Explore
              </Text>

              <TouchableOpacity onPress={scrollToAbout}>
                <Text style={styles.footerLink}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={scrollToHowItWorks}>
                <Text style={styles.footerLink}>
                  How It Works
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/faq')}
              >
                <Text style={styles.footerLink}>FAQ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/safety')}
              >
                <Text style={styles.footerLink}>
                  Safety Center
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>
                Legal
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/legal-privacy')}
              >
                <Text style={styles.footerLink}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/terms')}
              >
                <Text style={styles.footerLink}>
                  Terms of Service
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/community')}
              >
                <Text style={styles.footerLink}>
                  Community Guidelines
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>
                Support
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/contact')}
              >
                <Text style={styles.footerLink}>
                  Contact Us
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/report')}
              >
                <Text style={styles.footerLink}>
                  Report a Problem
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.footerDivider} />

          {/* AGE NOTICE */}
          <View style={styles.ageNoticeRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={14}
              color="#999999"
            />

            <Text style={styles.ageNotice}>
              Flirty is for adults 18 and over.
            </Text>
          </View>

          <Text style={styles.copyright}>
            © 2026 Flirty. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },

  scrollContent: {
    paddingBottom: 25,
    position: 'relative',
    overflow: 'hidden',
  },

  glowOne: {
    position: 'absolute',
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: 'rgba(13, 67, 243, 0.07)',
    top: 700,
    right: -150,
  },

  glowTwo: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(26, 14, 250, 0.06)',
    top: 1250,
    left: -160,
  },

  glowThree: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: 'rgba(18, 6, 240, 0.05)',
    top: 1800,
    right: -180,
  },

  glowFour: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(23, 7, 248, 0.05)',
    top: 2350,
    left: -150,
  },

  topBar: {
    height: 95,
    paddingHorizontal: 22,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 5,
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandMark: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandName: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginLeft: 9,
  },

  topLogin: {
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  topLoginText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  heroSection: {
    minHeight: 785,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(33, 13, 24, 0.5)',
  },

  heroContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 65,
    zIndex: 2,
  },

  heroEyebrow: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 13,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 39,
    lineHeight: 44,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -1,
  },

  heroTitlePink: {
    color: '#FF6B9D',
  },

  heroText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: 340,
  },

  heroButtons: {
    width: '100%',
    gap: 17,
    marginTop: 280,
  },

  primaryButton: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    gap: 6,
  },

  ageText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },

  glassCard: {
    overflow: 'hidden',
    borderRadius: 25,
    position: 'relative',
  },

  glassTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(238, 238, 241, 0.3)',
  },

  glassBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    borderRadius: 25,
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 55,
  },

  firstSection: {
    paddingTop: 90,
  },

  sectionEyebrow: {
    color: '#E91E63',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    color: '#222222',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25,
  },

  pinkText: {
    color: '#E91E63',
  },

  aboutCard: {
    padding: 25,
    marginTop: 4,
  },

  aboutIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(233,30,99,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  cardTitle: {
    color: '#222222',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  cardText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 22,
  },

  stepsContainer: {
    gap: 14,
  },

  stepCard: {
    padding: 20,
    minHeight: 150,
  },

  stepNumber: {
    position: 'absolute',
    top: 15,
    right: 17,
  },

  stepNumberText: {
    color: 'rgba(233,30,99,0.18)',
    fontSize: 15,
    fontWeight: '900',
  },

  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(233,30,99,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  stepTitle: {
    color: '#222222',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },

  stepText: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
    paddingRight: 15,
  },

  featureGrid: {
    gap: 13,
  },

  featureCard: {
    padding: 20,
    minHeight: 165,
  },

  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(233,30,99,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  featureTitle: {
    color: '#222222',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 7,
  },

  featureText: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
  },

  safetyCard: {
    padding: 25,
  },

  safetyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(233,30,99,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },

  safetyTitle: {
    color: '#222222',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },

  safetyText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
  },

  safetyList: {
    gap: 14,
  },

  safetyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },

  safetyItemText: {
    flex: 1,
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
  },

  finalSection: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 55,
    position: 'relative',
  },

  finalHeart: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: 'rgba(234, 13, 86, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(234, 13, 86, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  finalTitle: {
    color: '#222222',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },

  finalText: {
    color: '#666666',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    maxWidth: 330,
    marginBottom: 25,
  },

  finalButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  finalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  footer: {
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 30,
  },

  footerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },

  footerBrand: {
    color: '#222222',
    fontSize: 22,
    fontWeight: '900',
  },

  footerTagline: {
    color: '#888888',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 30,
    textAlign: 'center',
  },

  footerHeading: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },

  storeButtons: {
    width: '100%',
    gap: 10,
    marginBottom: 35,
  },

  storeButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 12,
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    gap: 13,
  },

  storeSmallText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  storeMainText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 1,
  },

  footerLinksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },

  footerColumn: {
    flex: 1,
  },

  footerColumnTitle: {
    color: '#222222',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
  },

  footerLink: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 26,
  },

  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginBottom: 18,
  },

  ageNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },

  ageNotice: {
    color: '#999999',
    fontSize: 11,
    textAlign: 'center',
  },

  copyright: {
    color: '#BBBBBB',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 7,
  },
});