

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import Item from './src/Item';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      input: ''
    };
    this.addButton = this.addButton.bind(this);
    this.loadList = this.loadList.bind(this);
    this.url = '';
    this.loadList();
  }

  loadList() {
    fetch(this.url)
      .then((r) => r.json())
      .then((json) => {
        let state = this.state;
        state.list = json.todo;
        this.setState(state);
      });
  }
  addButton() {
    let texto = this.state.input;

    let state = this.state;
    state.input = '';
    this.setState(state);

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: texto
      })

    })
      .then((r) => r.json())
      .then((json) => {
        alert('Item inserido como sucesso');
        this.loadList();
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addArea}>

          <Text style={styles.addTxt}>Adicione uma nova tarefa</Text>
          <TextInput style={styles.input} onChangeText={(text) => {
            let state = this.state;
            state.input = text;
            this.setState(state);
          }} value={this.state.input} />
          <Button title="Adicionar" onPress={this.addButton} />


        </View>
        <FlatList
          //This is the array of data we will be using
          data={this.state.list}
          //our anonimous function
          renderItem={({ item }) => <Item data={item}
            //sending the variable that contains the api to the Item.js
            url={this.url} />}
          //sending our function that reloads the page to the Item.js
          loadFunction={this.loadList}
          //our json dont have key,so we use the id of the requisition as a key
          keyExtractor={(item, index) => item.id}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  area: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC'
  },
  addArea: {
    marginBottom: 20,
    backgroundColor: '#DDDDDD'
  },
  addTxt: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    height: 40,
    backgroundColor: '#CCCCCC',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
});
