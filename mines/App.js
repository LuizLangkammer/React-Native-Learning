import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMineBoard } from './src/mines-service';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMineBoard(rows, columns, this.minesAmount(rows, columns))
    }
  }

  minesAmount = (rows, columns) => {
    return Math.ceil(columns * rows * params.difficultLevel);
  }




  render() {
    return (
      <View style={styles.container}>
        <Text >Iniciando o Mines!</Text>
        <Text >Tamanho da grade:
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
