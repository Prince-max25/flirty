import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

const faqs = [
  {
    question: 'What is Flirty?',
    answer:
      'Flirty is a dating app designed to help adults in Ghana meet new people, start conversations, and build meaningful connections.',
  },
  {
    question: 'Who can use Flirty?',
    answer:
      'Flirty is for adults aged 18 and above. You must be at least 18 years old to create and use an account.',
  },
  {
    question: 'How does matching work?',
    answer:
      'You can discover other people on Flirty and show interest in profiles you like. When two people show interest in each other, they can connect and start chatting.',
  },
  {
    question: 'Is Flirty free?',
    answer:
      'Flirty offers free features, with additional premium features available for users who want more options and enhanced experiences.',
  },
  {
    question: 'Can I edit my profile?',
    answer:
      'Yes. You will be able to update your profile information, photos, and other details from your account settings.',
  },
  {
    question: 'Can I block or report someone?',
    answer:
      'Yes. If another user makes you uncomfortable or violates our community guidelines, you can block or report them.',
  },
  {
    question: 'How do I stay safe while dating?',
    answer:
      'Take your time getting to know someone. Avoid sharing sensitive personal information, never send money to someone you have met online, and meet in public places when meeting someone for the first time.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      'You will be able to request account deletion through your account settings. Account deletion removes your Flirty account and associated profile information according to our applicable policies.',
  },
];

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#222222"
            />
          </Pressable>

          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons
                name="heart"
                size={19}
                color="#E91E63"
              />
            </View>

            <Text style={styles.logoText}>Flirty</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* Page intro */}
        <View style={styles.intro}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="help-circle-outline"
              size={30}
              color="#E91E63"
            />
          </View>

          <Text style={styles.title}>Frequently Asked Questions</Text>

          <Text style={styles.subtitle}>
            Everything you need to know about Flirty.
          </Text>
        </View>

        {/* FAQ list */}
        <View style={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Pressable
                key={index}
                onPress={() => toggleFAQ(index)}
                style={styles.faqWrapper}
              >
                <BlurView
                  intensity={35}
                  tint="light"
                  style={styles.faqCard}
                >
                  <View style={styles.questionRow}>
                    <Text style={styles.question}>
                      {faq.question}
                    </Text>

                    <View style={styles.chevronCircle}>
                      <Ionicons
                        name={
                          isOpen
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={18}
                        color="#E91E63"
                      />
                    </View>
                  </View>

                  {isOpen && (
                    <View style={styles.answerContainer}>
                      <View style={styles.answerLine} />

                      <Text style={styles.answer}>
                        {faq.answer}
                      </Text>
                    </View>
                  )}
                </BlurView>
              </Pressable>
            );
          })}
        </View>

        {/* Still need help */}
        <BlurView
          intensity={40}
          tint="light"
          style={styles.helpCard}
        >
          <View style={styles.helpIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={25}
              color="#E91E63"
            />
          </View>

          <Text style={styles.helpTitle}>
            Still have questions?
          </Text>

          <Text style={styles.helpText}>
            We’re here to help. Reach out to our support team
            and we’ll get back to you.
          </Text>

          <Pressable
            style={styles.contactButton}
            onPress={() => {}}
          >
            <Ionicons
              name="mail-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.contactButtonText}>
              Contact Support
            </Text>
          </Pressable>
        </BlurView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Ionicons
              name="heart"
              size={17}
              color="#E91E63"
            />

            <Text style={styles.footerLogoText}>
              Flirty
            </Text>
          </View>

          <Text style={styles.footerText}>
            Meet someone worth talking to.
          </Text>

          <Text style={styles.ageNotice}>
            18+ only
          </Text>

          <Text style={styles.copyright}>
            © 2026 Flirty. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    height: 75,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE1EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: -0.5,
  },

  headerSpacer: {
    width: 42,
  },

  intro: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 35,
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFE1EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: '#666666',
    textAlign: 'center',
    maxWidth: 330,
  },

  faqList: {
    paddingHorizontal: 20,
  },

  faqWrapper: {
    marginBottom: 14,
    borderRadius: 22,
    overflow: 'hidden',
  },

  faqCard: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.48)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },

  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    lineHeight: 22,
  },

  chevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE7EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  answerContainer: {
    flexDirection: 'row',
    marginTop: 17,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(233,30,99,0.10)',
  },

  answerLine: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#E91E63',
    marginRight: 12,
  },

  answer: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },

  helpCard: {
    marginHorizontal: 20,
    marginTop: 35,
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.48)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
  },

  helpIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFE1EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  helpTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
  },

  helpText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#666666',
    textAlign: 'center',
  },

  contactButton: {
    marginTop: 20,
    minHeight: 48,
    paddingHorizontal: 22,
    borderRadius: 24,
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 10,
  },

  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  footerLogoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  footerText: {
    marginTop: 7,
    fontSize: 13,
    color: '#777777',
  },

  ageNotice: {
    marginTop: 18,
    fontSize: 12,
    color: '#888888',
  },

  copyright: {
    marginTop: 6,
    fontSize: 11,
    color: '#999999',
  },
});