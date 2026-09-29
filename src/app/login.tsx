
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const emailAddress = email.trim();

    if (!emailAddress) {
      Alert.alert(
        'Missing Information',
        'Please enter your email address.'
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailAddress)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Missing Information',
        'Please enter your password.'
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Invalid Password',
        'Your password must be at least 8 characters long.'
      );
      return;
    }

    Alert.alert(
      'Login Information Accepted',
      'Your information is valid. Login will be connected to your account in the next step.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.heartCircle}>
            <Text style={styles.heart}>♥</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Log in to your Ghana Dating App account.
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>

          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#999999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.visibilityButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.visibilityText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              Alert.alert(
                'Forgot Password',
                'Password reset will be added when we connect the app to the backend.'
              )
            }
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Log In
            </Text>
          </TouchableOpacity>

        </View>

        {/* Create Account */}
        <View style={styles.createArea}>
          <Text style={styles.createText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/create-account')}
          >
            <Text style={styles.createLink}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Age Notice */}
        <Text style={styles.ageNotice}>
          Ghana Dating App is for adults aged 18 and older.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },

  content: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },

  backText: {
    fontSize: 17,
    color: '#E91E63',
    fontWeight: '600',
  },

  header: {
    alignItems: 'center',
    marginBottom: 35,
  },

  heartCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  heart: {
    fontSize: 38,
    color: '#FFFFFF',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
    marginTop: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2CBD3',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#222222',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2CBD3',
    borderRadius: 12,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#222222',
  },

  visibilityButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  visibilityText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },

  forgotText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  createArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },

  createText: {
    fontSize: 14,
    color: '#666666',
  },

  createLink: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  ageNotice: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginTop: 30,
  },
});
