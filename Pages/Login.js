import React from 'react'
import { useState } from 'react';
import { View , Text , Button , StyleSheet , Image , TextInput ,TouchableWithoutFeedback ,Pressable} from 'react-native'
import { auth , db } from '../Firebase';
import login from '../Images/login.png'
import { collection, getDocs , query ,where} from "firebase/firestore"; 


export default function Login({navigation}) {
    const [number, setNumber] = useState(null);
    const usersRef = collection(db, "users");
    
    const handleLogin = async () => {
        if(number)
        {
            const q = query(usersRef, where("_id", "==", number));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.docs.length === 0) {
                alert("Chưa đăng ký")
            }else{
                const user = querySnapshot.docs[0].data();
                navigation.navigate('Home',user);
            }
        }else alert('Vui lòng nhập số điện thoại');
    }
  return (
    <View style={styles.login} >
        <View style={styles.header}>
            <Image resizeMode='center' style={styles.image} source={login}  />
        </View>
        <View style={styles.form}>
             <View style={styles.inputEmail}>
                <TextInput style={styles.input} placeholder='Số điện thoại' onChangeText={(value)=>setNumber(value)}   />
             </View>
             {/* <View style={styles.inputPass}>
                <Text>Password</Text>
                <TextInput style={styles.input} placeholder='chat-app123'   />
             </View> */}
        </View>
        <View style={styles.buttonGroup}>
             <View style={styles.buttonAccess}>
                    <Pressable  style={styles.LogIn} onPress={handleLogin}>
                            <Text style={{color : 'white'}}>Đăng nhập</Text>
                    </Pressable>
                    <Pressable  style={styles.logOut} onPress={()=>navigation.navigate('Register')}>
                            <Text style={{color :'blue'}} >Đăng ký</Text>
                    </Pressable>
             </View>
             {/* <Pressable style={styles.googleLogin} onPress={()=>handleLoginFacebook()}>
                    <Text style={{color : 'white'}}>Đăng nhập với Google</Text>
             </Pressable>
             <Pressable style={styles.facebookLogin}>
                    <Text style={{color : 'white'}}>Đăng nhập với facebook</Text>
             </Pressable> */}
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    login : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#f1f1f1'
    },
    header : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : 30
    },
    image : {
        height : 300,
        width : 300,
        borderRadius : 300
    },
    form : {
        width : '75%',
        display : 'flex',
        alignItems : 'center',
    },
    inputEmail : {
        width : '100%',
    },
    inputPass : {
        width : '100%',
        marginTop : 15
    },
    input : {
        width : '100%',
        marginTop : 10,
        borderWidth : 1,
        padding : 10,
        borderColor : 'white',
        backgroundColor : 'white',
        borderRadius : 5
    },
    buttonGroup : {
        width : '75%',
        display : 'flex',
        paddingTop : 15,
        flexDirection : 'column',
        alignItems : 'center'
    },
    buttonAccess : {
        width : '100%',
        marginTop : 30,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    },
    LogIn : {
        width : '100%',
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 15,
        borderRadius : 7,
        marginTop : 10,
        backgroundColor : 'blue'
    },
    logOut : {
        width : '100%',
        borderWidth : 1,
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 15,
        marginTop : 10,
        borderRadius : 7,
        borderColor : 'blue'
    },  
    googleLogin : {
        width : '100%',
        padding : 20,
        marginTop : 10 ,
        borderRadius : 7 ,
        display : 'flex',
        backgroundColor : 'red',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    facebookLogin : {
        width : '100%',
        padding : 20,
        margin : 10 ,
        borderRadius : 7 ,
        display : 'flex',
        backgroundColor : 'blue',
        flexDirection : 'row',
        justifyContent : 'center'
    }
})