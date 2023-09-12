import React, {useCallback, useReducer, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import InputWithLabel from '../../components/InputWithLabel'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import {useDispatch} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {userActions} from '../../store/reducers'
import Images from '../../themes/images'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import InputWithDocumentPicker from '../../components/InputWithDocumentPicker'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    firstName: '',
    secondName: '',
    phone: '',
    date: '',
    location: '',
    invitation: {},
    annoucement: {},
    documentFunction: {},
    supportDocument: {},
  })

  const onPressSubmit = useCallback(() => {
    dispatch(userActions.userLogin({data: inputValue}))
  }, [dispatch, inputValue])

  const onChangeFirstName = useCallback(text => {
    setInputValue({firstName: text})
  }, [])

  const onChangeSecondName = useCallback(text => {
    setInputValue({secondName: text})
  }, [])

  const onChangePhone = useCallback(text => {
    setInputValue({phone: text})
  }, [])

  const onChangeDate = useCallback(text => {
    setInputValue({date: text})
  }, [])

  const onChangeLocation = useCallback(text => {
    setInputValue({location: text})
  }, [])

  const onChangeInviation = useCallback(res => {
    setInputValue({invitation: res})
  }, [])
  const onChangeAnnoucement = useCallback(res => {
    setInputValue({annoucement: res})
  }, [])
  const onChangeDocumentFunction = useCallback(res => {
    setInputValue({documentFunction: res})
  }, [])
  const onChangeSupportDocument = useCallback(res => {
    setInputValue({supportDocument: res})
  }, [])

  const onHandleNext = useCallback(() => {
    setStep(prev => prev + 1)
  }, [])

  const onHandlePrevious = useCallback(() => {
    setStep(prev => prev - 1)
  }, [])

  const renderTitle = useCallback(() => {
    switch (step) {
      case 1:
        return <Text style={styles.titleText}>Start your {'\n'} journey with us.</Text>
      case 2:
        return <Text style={styles.titleText}>Where will it {'\n'} happen?</Text>
      case 3:
        return <Text style={styles.titleText}>Anything else?</Text>
      default:
        return <></>
    }
  }, [step])

  const renderContent = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.getStartedText}>Get started</Text>
            <Text style={styles.detailText}>Provide some details of yourself</Text>
            <InputWithLabel
              testID="client-id-input" // use for detox test
              onChangeText={onChangeFirstName}
              value={inputValue.firstName}
              title={'Full Name First Partner'}
            />
            <InputWithLabel
              testID="client-id-input" // use for detox test
              onChangeText={onChangeSecondName}
              value={inputValue.secondName}
              title={'Full Name Second Partner'}
            />
            <InputWithLabel
              testID="client-id-input" // use for detox test
              onChangeText={onChangePhone}
              value={inputValue.phone}
              title={'Phone number'}
            />
          </>
        )
      case 2:
        return (
          <>
            <Text style={styles.getStartedText}>Where</Text>
            <Text style={styles.detailText}>Provide some details of the location of the event</Text>
            <InputWithLabel
              testID="client-id-input" // use for detox test
              onChangeText={onChangeDate}
              value={inputValue.date}
              title={'Date of the event'}
            />
            <InputWithLabel
              testID="client-id-input" // use for detox test
              onChangeText={onChangeLocation}
              value={inputValue.location}
              title={'Location of the event'}
            />
            <View style={{flexDirection: 'row'}}>
              <InputWithDocumentPicker onHandleDocument={onChangeInviation} title={'Invitation'} />
              <InputWithDocumentPicker
                onHandleDocument={onChangeAnnoucement}
                style={{marginLeft: 10}}
                title={'Annoucement'}
              />
            </View>
          </>
        )
      case 3:
        return (
          <>
            <Text style={styles.getStartedText}>Supporting documents</Text>
            <Text style={styles.detailText}>Provide some details of yourself</Text>
            <View style={styles.documentSection}>
              <InputWithDocumentPicker
                onHandleDocument={onChangeDocumentFunction}
                title={'Document of function'}
              />
              <InputWithDocumentPicker
                onHandleDocument={onChangeSupportDocument}
                title={'Supporting documents'}
              />
            </View>
          </>
        )
      default:
        return <></>
    }
  }, [
    inputValue.date,
    inputValue.firstName,
    inputValue.location,
    inputValue.phone,
    inputValue.secondName,
    onChangeAnnoucement,
    onChangeDate,
    onChangeDocumentFunction,
    onChangeFirstName,
    onChangeInviation,
    onChangeLocation,
    onChangePhone,
    onChangeSecondName,
    onChangeSupportDocument,
    step,
  ])

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.imagesView}>
        <Image source={Images.loveWeddingRings} style={styles.image} />
      </View>

      <View style={styles.shadowView}>
        <KeyboardAwareScrollView style={styles.keyboardView} contentContainerStyle={styles.content}>
          <View style={styles}>
            <Text style={styles.stepText}>{step}/3</Text>
            <View style={styles.headerSection}>
              {renderTitle()}
              {step > 1 && (
                <TouchableOpacity activeOpacity={0.7} onPress={onHandlePrevious}>
                  <AntDesignIcon size={30} color={colors.primary} name={'back'} />
                </TouchableOpacity>
              )}
            </View>
            {renderContent()}
          </View>
          <TouchableOpacity
            testID="login-button" // use for detox test
            style={styles.button}
            onPress={step === 3 ? onPressSubmit : onHandleNext}>
            <Text style={styles.buttonTxt}>{step === 3 ? 'Submit' : 'Next'}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 20,
  },
  keyboardView: {
    width: '100%',
  },
  titleText: {
    fontSize: responsiveHeight(30),
    fontWeight: '600',
    marginBottom: responsiveHeight(20),
    color: colors.primary,
    textAlign: 'left',
  },
  passwordSection: {
    marginTop: responsiveHeight(10),
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    marginTop: responsiveHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonTxt: {
    color: colors.white,
    fontSize: responsiveHeight(16),
    padding: 15,
    fontWeight: '700',
  },
  stepText: {
    color: colors.primary,
    fontSize: responsiveHeight(16),
    fontWeight: '700',
    marginBottom: responsiveHeight(10),
  },
  getStartedText: {
    color: colors.black,
    fontSize: responsiveHeight(16),
    fontWeight: '700',
    marginBottom: responsiveHeight(10),
    marginTop: responsiveHeight(35),
  },
  detailText: {
    color: colors.lightGray,
    fontSize: responsiveHeight(16),
    marginBottom: responsiveHeight(40),
  },
  shadowView: {
    padding: 20,
    flexGrow: 1,

    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imagesView: {
    width: '100%',
    height: responsiveHeight(100),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: responsiveHeight(15),
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentSection: {
    height: responsiveHeight(200),
  },
})
