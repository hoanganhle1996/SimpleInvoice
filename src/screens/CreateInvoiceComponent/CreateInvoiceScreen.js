import React, {useCallback, useReducer, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import InputWithLabel from '../../components/InputWithLabel'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const CreateInvoiceScreen = () => {
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    reference: '',
    amount: '',
    date: '',
    description: '',
  })
  const [date, setDate] = useState(new Date(1598051730000))

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setInputValue({date: currentDate.toLocaleString()})
  }

  const onPressCreate = useCallback(() => {}, [])

  const onChangeId = useCallback(text => {
    setInputValue({id: text})
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.keyboardView}>
        <Text style={styles.titleText}>Create Invoice</Text>
        <InputWithLabel onChangeText={onChangeId} value={inputValue.id} title={'Reference'} />
        <InputWithLabel onChangeText={onChangeId} value={inputValue.id} title={'Amount'} />
        <View style={styles.dueDateSection}>
          <Text style={styles.title}>Due Date</Text>
          <View style={styles.dateSection}>
            <RNDateTimePicker testID="dateTimePicker" value={date} onChange={onChange} />
          </View>
        </View>
        <InputWithLabel onChangeText={onChangeId} value={inputValue.id} title={'Description'} />
        <TouchableOpacity style={styles.button} onPress={onPressCreate}>
          <Text>Create</Text>
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
  keyboardView: {
    width: '100%',
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
  dateSection: {
    width: '100%',
    borderWidth: 1,
    height: responsiveHeight(40),
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveHeight(16),
    fontWeight: '500',
  },
  dueDateSection: {
    width: '100%',
    marginTop: 10,
  },
})

export default CreateInvoiceScreen
