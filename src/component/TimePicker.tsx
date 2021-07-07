import React, {useCallback} from 'react'
import {Picker} from '@react-native-picker/picker'

interface Props {
  selectedNumber: number
  onNumberChange: (val: number) => void
}

const timePickerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
  return <Picker.Item key={`${value}`} label={`${value}초`} value={value}/>
})

const TimePicker = ({selectedNumber, onNumberChange}: Props) => {

  const onValueChange = useCallback((val: number) => {
    onNumberChange(val)
  }, [onNumberChange])

  const selectedValue = selectedNumber

  return <Picker style={{width: 200, height: 150}}
    selectedValue={selectedValue}
    onValueChange={onValueChange}>
    {timePickerItems}
  </Picker>
}

export default TimePicker
