import React, {useCallback, useReducer} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, View, Pressable} from 'react-native'
import InputWithLabel from '../../components/InputWithLabel'
import PasswordInput from '../../components/InputPassword'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'

export const LoginScreen = () => {
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    id: '',
    password: '',
  })
  const onPressLogin = useCallback(() => {}, [])

  const onChangeId = useCallback(text => {
    setInputValue({id: text})
  }, [])

  const onChangePassword = useCallback(text => {
    setInputValue({password: text})
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.titleText}>Simple Invoice</Text>
      <InputWithLabel onChangeText={onChangeId} value={inputValue.id} title={'Client ID'} />
      <View style={styles.passwordSection}>
        <PasswordInput onChangeText={onChangePassword} value={inputValue.password} title="123123" />
      </View>
      <Pressable style={styles.button} onPress={onPressLogin}>
        <Text>Login</Text>
      </Pressable>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(10),
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveHeight(25),
    fontWeight: '600',
    marginVertical: responsiveHeight(20),
  },
  passwordSection: {
    marginTop: responsiveHeight(10),
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: responsiveHeight(40),
    marginTop: responsiveHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})
