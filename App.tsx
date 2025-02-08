import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomInput from './shared/CustomInput';
import ErrorModal from './shared/ModalError';
import useStore from './store/store';

function App() {
  const { email, nickname, password, confirmPassword, errors, setField, validateField, validate, setErrorMessage } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert('Ай тигр', 'Вы успешно зарегистрировались!');
    } else {
      setErrorMessage('Ошибка при регистрации');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ErrorModal />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Registration</Text>

        <CustomInput
          label="Email"
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          error={errors.email}
          onChangeText={(text) => {
            setField('email', text);
            validateField('email', text);
          }}
        />

        <CustomInput
          label="Nickname"
          value={nickname}
          placeholder="Enter your nickname"
          error={errors.nickname}
          onChangeText={(text) => {
            setField('nickname', text);
            validateField('nickname', text);
          }}
        />

        <CustomInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          error={errors.password}
          secureTextEntry={!showPassword}
          onToggleSecure={() => setShowPassword(!showPassword)}
          onChangeText={(text) => {
            setField('password', text);
            validateField('password', text);
          }}
        />

        <CustomInput
          label="Confirm Password"
          value={confirmPassword}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          secureTextEntry={!showConfirmPassword}
          onToggleSecure={() => setShowConfirmPassword(!showConfirmPassword)}
          onChangeText={(text) => {
            setField('confirmPassword', text);
            validateField('confirmPassword', text);
          }}
        />
        <Text style={styles.ifYou}>Есть аккаунт? Авторизоваться</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 50,
    gap: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ifYou: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default App;