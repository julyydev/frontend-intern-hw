import React, {useCallback} from 'react'
import {Picker} from '@react-native-picker/picker'
import _ from 'lodash'

interface Props {
  selectedNumber: number
  onNumberChange: (val: number) => void
}

const timePickerItems = _.range(1, 11).map((value) => {
  return <Picker.Item key={`${value}`} label={`${value}초`} value={value}/>
})

const TimePicker = ({selectedNumber, onNumberChange}: Props) => {

  const onValueChange = useCallback((val: number) => {
    onNumberChange(val)
  }, [onNumberChange])

  return <Picker
    style={{width: 200, height: 150}}
    selectedValue={selectedNumber}
    onValueChange={onValueChange}
  >
    {timePickerItems}
  </Picker>
}

export default TimePicker
