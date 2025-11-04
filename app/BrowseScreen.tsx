import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wallpapers } from "../data/wallpaper";
import { useNavigation } from "@react-navigation/native";

import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";


export default function BrowseScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       
        <Text style={styles.title}>Wallpaper Studio</Text>

       <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={30} color="#222" />
        </TouchableOpacity>

      </View>

      {/* Main hero Text */}

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
          {"Browse Categories"}
        </Text>
      }
    >
      <LinearGradient
        colors={["#efce27ff", "#ff760eff", "#963809ff"]}
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
          {"Discover Beautiful Wallpapers"}
        </Text>
      </LinearGradient>
    </MaskedView>

         <Text style={{paddingTop:1,paddingHorizontal:10,fontSize:18,fontWeight:400,color:"#777",marginBottom:12}}>Discover curated collections of stunning wallpapers</Text>
    </View> 

  

      {/* Wallpaper List (1 column) */}
  <FlatList
    data={wallpapers}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    numColumns={1}
    contentContainerStyle={{ paddingBottom: 100 }}
    renderItem={({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.url }} style={styles.image} />

      {/* Overlay content */}
      <View style={styles.overlayText}>
        <Text style={styles.overlayHeader}>{item.title}</Text>
        <Text style={styles.overlaySub}>{item.description}</Text>

        <TouchableOpacity style={styles.countButton}>
          <Text style={styles.countText}>{item.count} Wallpapers</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
 />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 12,
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
    paddingVertical:12,
    paddingHorizontal:4
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginVertical: 18,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: 42,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    paddingHorizontal:20,
    
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius:20
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  cardTitle: {
    fontWeight: "600",
    color: "#333",
    fontSize: 16,
  },
  cartegory:{
    marginTop:20,
    paddingHorizontal:20,
    paddingVertical:8,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },

  overlayText: {
  position: "absolute",
  bottom: 60,
  left: 32,
},
overlayHeader: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "700",
  marginBottom: 2,
},
overlaySub: {
  color: "#eee",
  fontSize: 14,
  marginBottom: 8,
},
countButton: {
  borderColor: "#fff",
  borderWidth: 1,
  borderRadius: 20,
  paddingVertical: 6,
  paddingHorizontal: 14,
  alignSelf: "flex-start",
},
countText: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "500",
},

});
