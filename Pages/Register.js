import React from 'react'
import {useState} from 'react'
import {View , Text , Pressable , StyleSheet , Image ,TextInput } from 'react-native'
import login from '../Images/login.png'
import { collection, getDocs , query ,where ,addDoc, setDoc ,doc} from "firebase/firestore"
import { db } from '../Firebase'


export default function Register({navigation}) {
    const [user, setUser] = useState({
            _id : '',
            name : ''
    })
    const usersRef = collection(db, "users");

    const checkExistID = async () => {
        const q = query(usersRef , where('_id','==',user._id));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0) return true;
        else return false;
    }
    const register = async () => {
        if(user._id && user.name){
            const result = await checkExistID();
            if(result) alert('Số điện thoại đã có người đăng ký');
            else {
                 const newUser = doc(usersRef);
                 await setDoc(newUser , user);
                 navigation.navigate('Home',user)
            }
        }else{
            alert('Vui lòng nhập đầy đủ thông tin');
        }
    }
  return (
    <View style={styles.login} >
        <View style={styles.header}>
            <Image resizeMode='center' style={styles.image} source={login}  />
        </View>
        <View style={styles.form}>
             <View style={styles.inputEmail}>
                <TextInput style={styles.input} placeholder='Số điện thoại' onChangeText={(value) => setUser({...user, _id : value})}   />
             </View>
             <View style={styles.inputEmail}>
                <TextInput style={styles.input} placeholder='Tên' onChangeText={(value) => setUser({...user,name : value})}  />
             </View>
             
        </View>
        <View style={styles.buttonGroup}>
             <View style={styles.buttonAccess}>
                    <Pressable  style={styles.register} onPress={register} >
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
    register : {
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
})
