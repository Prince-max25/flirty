import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const pageContent: Record<
  string,
  {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    intro: string;
    sections: {
      title: string;
      text: string;
    }[];
  }
> = {
  'legal-privacy': {
    title: 'Privacy Policy',
    icon: 'lock-closed-outline',
    intro:
      'Your privacy matters to us. This page explains how Flirty handles information when you use our platform.',
    sections: [
      {
        title: 'Information We Collect',
        text:
          'When you use Flirty, we may collect information you provide when creating an account, building your profile, communicating with other users, or contacting support.',
      },
      {
        title: 'How We Use Information',
        text:
          'Information may be used to provide and improve Flirty, personalize your experience, maintain platform security, and communicate with you about your account.',
      },
      {
        title: 'Your Choices',
        text:
          'You should have control over the information you share on your profile. You can also request changes or deletion of your account through the appropriate account settings or support channels.',
      },
      {
        title: 'Keeping Your Account Safe',
        text:
          'Never share your password or sensitive account information with another person. If you believe your account has been compromised, contact Flirty support.',
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    icon: 'document-text-outline',
    intro:
      'These terms describe the basic rules for using Flirty. By using the platform, you agree to use it responsibly and respectfully.',
    sections: [
      {
        title: 'Eligibility',
        text:
          'Flirty is intended for adults aged 18 and above. You must be at least 18 years old to create or use a Flirty account.',
      },
      {
        title: 'Your Account',
        text:
          'You are responsible for providing accurate information and for keeping your account credentials secure.',
      },
      {
        title: 'Respect Other Users',
        text:
          'Do not harass, threaten, impersonate, scam, or intentionally deceive other users. Do not use Flirty for illegal activities.',
      },
      {
        title: 'Account Actions',
        text:
          'Accounts may be restricted, suspended, or removed when activity violates our rules, community guidelines, or applicable requirements.',
      },
    ],
  },

  community: {
    title: 'Community Guidelines',
    icon: 'people-outline',
    intro:
      'Flirty is built around meeting people, having conversations, and creating genuine connections. Treat other people with respect.',
    sections: [
      {
        title: 'Be Respectful',
        text:
          'Communicate with other users respectfully. Harassment, bullying, threats, hate-based abuse, and intimidation are not welcome.',
      },
      {
        title: 'Be Genuine',
        text:
          'Do not impersonate another person or intentionally misrepresent who you are.',
      },
      {
        title: 'No Scams',
        text:
          'Do not use Flirty to trick people into sending money, sharing financial information, or providing access to accounts.',
      },
      {
        title: 'Keep It Appropriate',
        text:
          'Do not use Flirty to share illegal content or content that violates the safety and privacy of other users.',
      },
      {
        title: 'Report Problems',
        text:
          'If you see behaviour that violates these guidelines, use the available reporting tools so the issue can be reviewed.',
      },
    ],
  },

  safety: {
    title: 'Safety Center',
    icon: 'shield-checkmark-outline',
    intro:
      'Your safety is important to us. Here are some simple ways to protect yourself while meeting and talking to people on Flirty.',
    sections: [
      {
        title: 'Protect Your Personal Information',
        text:
          'Avoid sharing your home address, passwords, banking information, financial details, or other sensitive information with someone you have just met.',
      },
      {
        title: 'Take Your Time',
        text:
          'You do not have to rush into a relationship or meeting. Take time to get to know someone and pay attention to how they communicate with you.',
      },
      {
        title: 'Watch for Scams',
        text:
          'Be careful if someone quickly asks you for money, financial information, gift cards, account access, or other valuable items.',
      },
      {
        title: 'Meet Safely',
        text:
          'If you decide to meet someone in person, choose a public place and consider telling someone you trust where you are going.',
      },
      {
        title: 'Block or Report',
        text:
          'If someone makes you uncomfortable, behaves suspiciously, or violates our community guidelines, you can block or report them.',
      },
      {
        title: 'Trust Your Instincts',
        text:
          'If something does not feel right, you can end the conversation or leave the situation. You never owe another person your time or attention.',
      },
    ],
  },

  contact: {
    title: 'Contact Us',
    icon: 'mail-outline',
    intro:
      'Need help with Flirty? Our support team is here to help with account questions, technical problems, and general enquiries.',
    sections: [
      {
        title: 'Account Support',
        text:
          'Contact support if you are having trouble accessing your account, updating your profile, or using an important feature.',
      },
      {
        title: 'Technical Problems',
        text:
          'When reporting a technical problem, include as much useful information as possible so the issue can be investigated.',
      },
      {
        title: 'Safety Concerns',
        text:
          'If another user makes you feel unsafe or violates our guidelines, report the account and provide relevant information to our support team.',
      },
    ],
  },

  report: {
    title: 'Report a Problem',
    icon: 'flag-outline',
    intro:
      'If something goes wrong or another user violates our rules, you can report the issue to Flirty.',
    sections: [
      {
        title: 'Report a User',
        text:
          'Report users who harass, threaten, impersonate, scam, or otherwise violate the Flirty community guidelines.',
      },
      {
        title: 'Report Technical Issues',
        text:
          'If a feature is not working correctly, provide details about what happened and what you expected to happen.',
      },
      {
        title: 'What Happens Next?',
        text:
          'Reports can be reviewed by the appropriate Flirty team. Providing clear and accurate information helps us understand the issue.',
      },
    ],
  },
};

export default function InformationPage() {
  const { page } = useLocalSearchParams<{ page: string }>();

  const content = pageContent[page || ''];

  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={50}
            color="#E91E63"
          />

          <Text style={styles.errorTitle}>
            Page not found
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
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

            <Text style={styles.logoText}>
              Flirty
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* INTRO */}
        <View style={styles.intro}>
          <View style={styles.iconCircle}>
            <Ionicons
              name={content.icon}
              size={30}
              color="#E91E63"
            />
          </View>

          <Text style={styles.title}>
            {content.title}
          </Text>

          <Text style={styles.subtitle}>
            {content.intro}
          </Text>
        </View>

        {/* CONTENT SECTIONS */}
        <View style={styles.sections}>
          {content.sections.map((section, index) => (
            <BlurView
              key={index}
              intensity={35}
              tint="light"
              style={styles.card}
            >
              <Text style={styles.sectionTitle}>
                {section.title}
              </Text>

              <Text style={styles.sectionText}>
                {section.text}
              </Text>
            </BlurView>
          ))}
        </View>

        {/* FOOTER */}
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
  },

  headerSpacer: {
    width: 42,
  },

  intro: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 40,
  },

  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
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
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: '#666666',
    textAlign: 'center',
    maxWidth: 350,
  },

  sections: {
    paddingHorizontal: 20,
    gap: 15,
  },

  card: {
    padding: 21,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.48)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222222',
  },

  sectionText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
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

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '800',
    color: '#222222',
  },

  button: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 25,
    backgroundColor: '#E91E63',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});