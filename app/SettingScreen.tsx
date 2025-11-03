import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,

} from "react-native";

import { wallpapers } from "../data/wallpaper";
import { LinearGradient } from "expo-linear-gradient";

import MaskedView from "@react-native-masked-view/masked-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

  {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wallpaper Studio</Text>

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={30} color="#222" />
        </TouchableOpacity>
      </View>
      
        <View style={{
                paddingHorizontal:10,
                paddingTop:30,
                marginBottom:20
              }}>
          
               <MaskedView
                maskElement={
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "700",
                      color:"#111",
                      paddingHorizontal:4
                    }}
                  >
                    {"Settings"}
                  </Text>
                }
              >
                <LinearGradient
                  colors={["#efce27ff", "#ff760eff", "#f7520590"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "700",
                      opacity: 0, // hide text itself; we only need gradient mask
                    }}
                  >
                    {"Settings"}
                  </Text>
                </LinearGradient>
              </MaskedView>
          
               <Text style={{paddingTop:4,paddingHorizontal:10,fontSize:18,fontWeight:500,color:"#777",marginBottom:16}}>Customize your Wallpaper Studio experience</Text>
        </View> 

   {/* Headline 2 */}
        <View style={{ 
          paddingHorizontal:22,
          paddingTop:10,
          marginBottom:20
        }}>
          <Text style={{fontWeight:600,fontSize:24}}>Wallpaper Setup</Text>
          <Text style={{fontSize:16,marginTop:8,color:"#5e5a5aff",fontWeight:"600"}}>Configure your wallpaper settings and enable auto-rotation</Text>
        </View>

     {/* Block1 */}
        <View style={{
          paddingHorizontal:50,
          paddingVertical:14,
          marginBottom:20,
          backgroundColor:"#fffefeff",
          borderRadius:12
        }}>
          <Text style={{fontSize:20,fontWeight:"400"}}>Image Quality</Text>
          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:12
          }}>
              <Text style={{color:"#aba4a4ff",fontWeight:"500"}}>High - Best Quality </Text>
              <Ionicons size={24} name="chevron-down-outline"></Ionicons>
          </View>
        </View>

        {/* Block2 */}
        <View style={{
          paddingHorizontal:50,
          paddingVertical:14,
          marginBottom:20,
          backgroundColor:"#fffefeff",
          borderRadius:12 
        }}> 

          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
          }}>
               <Text style={{fontSize:20,fontWeight:"400"}}>Notification</Text>
               <Ionicons size={36} name="toggle-outline" color="orange"></Ionicons>
          </View>

          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:12
          }}>
              <Text style={{color:"#aba4a4ff",fontWeight:"500"}}> Get notified about new wallpapers and update </Text>
              
          </View>

        </View>

        <TouchableOpacity style={{
            borderWidth:.5,
            borderColor:"#00000033",
            paddingVertical:14,
            marginHorizontal:30,
            borderRadius:14,
            marginVertical:10,
            marginTop:30
        }}>
           <Text style={{textAlign:"center",fontSize:14,fontWeight:"600",color:"#000000ff"}}>Cancel</Text>
        </TouchableOpacity>


          <TouchableOpacity style={{
              backgroundColor:"#fb8006d7",
              paddingVertical:14,
              marginHorizontal:30,
              borderRadius:12,
          
          }}>
            <Text style={{textAlign:"center",fontSize:14,fontWeight:"600",color:"#fff"}}>Cancel</Text>
          </TouchableOpacity>
      

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: "#fff" },
  header: {
    marginTop: 78,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    paddingVertical: 10,
  },
})