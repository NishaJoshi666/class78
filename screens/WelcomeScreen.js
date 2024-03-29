import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,ScrollView } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      confirmPassword:"",
      address:"",
      ContactNumber:"",
      docID:"",
      firstName:'',
      lastName:'',
      modalVisible:false,
    }
  }
showModal=()=>{
  <ScrollView>
    <Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
      <View style={styles.container}>
        <TextInput style={styles.loginBox}
        placeholder='FIRST NAME'
        onChangeText={(text)=>{
          firstName:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='LAST NAME'
        onChangeText={(text)=>{
          lastName:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='PHONE NUMBER'
        keyboardType='numeric'
        onChangeText={(text)=>{
          ContactNumber:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='Address'
        multiline={true}
        onChangeText={(text)=>{
          address:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='ENTER YOUR EMAIL ID'
        keyboardType='email-address'
        onChangeText={(text)=>{
          emailId:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='ENTER YOUR PASSWORD'
        keyboardType='password'
        onChangeText={(text)=>{
          password:text
        }}/>
         <TextInput style={styles.loginBox}
        placeholder='CONFIRM PASSWORD'
        keyboardType='password'
        onChangeText={(text)=>{
          confirmPassword:text
        }}/>
      </View>
    </Modal>

  </ScrollView>
}
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password!==confirmPassword){
      return(
        alert('Password not correct')
      )
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
    db.collection('Users').add({
      first_Name:this.state.firstName,
      last_Name:this.state.lastName,
      Contact_Number:this.state.ContactNumber,
      address:this.state.address,
      email_Id:this.state.emailId,
    })
  }
}


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <SantaAnimation/>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            this.setState({
              modalVisible:false
            })
          }}>
            <Text>Cancle</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
