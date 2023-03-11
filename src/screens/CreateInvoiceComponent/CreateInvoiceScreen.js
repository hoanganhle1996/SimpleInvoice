import React, {useCallback, useReducer, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, TouchableOpacity, View, Platform} from 'react-native'
import InputWithLabel from '../../components/InputWithLabel'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {createInvoice} from '../../services/api/api'
import dayjs from 'dayjs'
import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {appActions} from '../../store/reducers'
import {STATUS_SUCCESS} from '../../constants'

const CreateInvoiceScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    reference: '',
    amount: '',
    date: dayjs().unix(),
    description: '',
  })
  const [date, setDate] = useState(new Date())
  const [isShow, setIsShow] = useState(false)

  // handle change date field
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setInputValue({date: event.timeStamp})
    if (Platform.OS !== 'ios') {
      setIsShow(false)
    }
  }

  // Handle create item
  const onPressCreate = useCallback(async () => {
    const body = {
      reference: inputValue.reference,
      date: dayjs(date).format('YYYY-MM-DD'),
      amount: inputValue.amount,
      description: inputValue.description,
    }
    const res = await createInvoice(body)
    if (res?.status === STATUS_SUCCESS) {
      dispatch(appActions.setIsFromCreateScreen(true))
      navigation.goBack()
      setTimeout(() => {
        alert('Create Successfully')
      }, 500)
    }
  }, [inputValue])

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.keyboardView}>
        <Text style={styles.titleText}>Create Invoice</Text>
        <InputWithLabel
          onChangeText={text => {
            setInputValue({reference: text})
          }}
          value={inputValue.id}
          title={'Reference'}
        />
        <InputWithLabel
          onChangeText={text => {
            setInputValue({amount: text})
          }}
          value={inputValue.id}
          title={'Amount'}
        />
        <View style={styles.dueDateSection}>
          <Text style={styles.title}>Due Date</Text>
          <View style={styles.dateSection}>
            {Platform.OS !== 'ios' ? (
              <TouchableOpacity
                onPress={() => {
                  setIsShow(!isShow)
                }}>
                <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
                {isShow && <RNDateTimePicker mode={'date'} value={date} onChange={onChange} />}
              </TouchableOpacity>
            ) : (
              <RNDateTimePicker mode={'date'} value={date} onChange={onChange} />
            )}
          </View>
        </View>
        <InputWithLabel
          onChangeText={text => {
            setInputValue({description: text})
          }}
          value={inputValue.id}
          title={'Description'}
        />
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
