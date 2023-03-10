import React, {useCallback, useReducer} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import InputWithLabel from '../../components/InputWithLabel'
import PasswordInput from '../../components/InputPassword'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import {useDispatch} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {userActions} from '../../store/reducers'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
    password: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
  })

  const onPressLogin = useCallback(() => {
    dispatch(userActions.userLogin({id: inputValue.id, password: inputValue.password}))
  }, [inputValue])

  const onChangeId = useCallback(text => {
    setInputValue({id: text})
  }, [])

  const onChangePassword = useCallback(text => {
    setInputValue({password: text})
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.titleText}>Simple Invoice</Text>
        <InputWithLabel onChangeText={onChangeId} value={inputValue.id} title={'Client ID'} />
        <View style={styles.passwordSection}>
          <PasswordInput onChangeText={onChangePassword} value={inputValue.password} title="Client Secret" />
        </View>
        <TouchableOpacity style={styles.button} onPress={onPressLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
