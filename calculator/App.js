import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operator: null,
  values: [0, 0],
  currentPosition: 0
}

export default function App() {

  const [displayValue, setDisplayValue] = useState(initialState.displayValue);
  const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay);
  const [operator, setOperator] = useState(initialState.operator);
  const [values, setValues] = useState(initialState.values);
  const [currentPosition, setCurrentPosition] = useState(initialState.currentPosition);
  
  const addDigit = (digit) => {
    if( digit === '.' && displayValue.includes('.')){
      return;
    }

    const currentValue = (displayValue==='0' || clearDisplay) ? '' :  displayValue;
    const newDisplayValue = currentValue + digit;

    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if(digit !== '.'){
      const newValue = parseFloat(newDisplayValue);
      const arrayValues = [...values]
      arrayValues[currentPosition] = newValue;
      setValues(arrayValues);
    }

  }

  const clearMemory = () => {
    setDisplayValue(initialState.displayValue);
    setClearDisplay(initialState.clearDisplay);
    setOperator(initialState.operator);
    setValues(initialState.values);
    setCurrentPosition(initialState.currentPosition);
  }

  const setOperation = (operation) => {
      if(currentPosition === 0){
          setOperator(operation);
          setCurrentPosition(1);
          setClearDisplay(true);
      }else{
          const equals = operator === '=';
          const arrayValues = [...values];
          console.log(arrayValues);
          console.log(operator);
          try{
            arrayValues[0] = eval(`${arrayValues[0]} ${operator} ${arrayValues[1]}`);
          }catch(e){
            arrayValues[0] = values[1];
          }
          arrayValues[1] = 0;
          console.log(arrayValues);
          console.log(operator)
          setDisplayValue(arrayValues[0]);
          setValues(arrayValues);
          setOperator(operation);
          setCurrentPosition(1);
          setClearDisplay(true);
      }
  }
  
  return (
    <View style={styles.container}>
      <Display value={displayValue}/>
      <View style={styles.buttons}>
          <Button label='AC' triple onClick={clearMemory}/>
          <Button label='/' operation onClick={setOperation}/>
          <Button label='7' onClick={addDigit}/>
          <Button label='8' onClick={addDigit}/>
          <Button label='9' onClick={addDigit}/>
          <Button label='*' operation onClick={setOperation}/>
          <Button label='4' onClick={addDigit}/>
          <Button label='5' onClick={addDigit}/>
          <Button label='6' onClick={addDigit}/>
          <Button label='-' operation onClick={setOperation}/>
          <Button label='1' onClick={addDigit}/>
          <Button label='2' onClick={addDigit}/>
          <Button label='3' onClick={addDigit}/>
          <Button label='+' operation onClick={setOperation}/>
          <Button label='0' double onClick={addDigit}/>
          <Button label='.' onClick={addDigit}/>
          <Button label='=' operation onClick={setOperation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
