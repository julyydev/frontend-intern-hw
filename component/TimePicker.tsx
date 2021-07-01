import React from 'react'
import {Picker} from '@react-native-picker/picker';
import styled from '@emotion/native';

interface Props {
  selectedValue: string
  onValueChange: (val: string) => void
}

const timePickerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
  return <Picker.Item key={`${value}`} label={`${value}초`} value={`${value}`}/>
})

const TimePicker = ({selectedValue, onValueChange}: Props) => {
  return <StyledPicker
    selectedValue={selectedValue}
    onValueChange={onValueChange}>
    {timePickerItems}
  </StyledPicker>
}

export default TimePicker

const StyledPicker = styled.Picker({
  width: 200,
  height: 150
})
