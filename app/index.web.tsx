import React from "react";
import { Pressable, View, Text, FlatList, Image, TouchableOpacity, StyleSheet ,Platform} from "react-native";
import { wallpapers } from "../data/wallpaper";
import { Ionicons } from "@expo/vector-icons";
import {Link} from "expo-router" 

import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";


export default function WebHome() {
  return (
    <View style={styles.container}>

       {/* Nav Bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "#fff",
          shadowColor: "#777",
          shadowOpacity: 1,
          shadowOffset: 20,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Wallpaper Studio</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 400,
          }}
        >
          <Link href="/" asChild>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="home-outline" size={20} color="#333" />
              <Text style={{ color: "#333",fontWeight:"600" }}>Home</Text>
            </Pressable>
          </Link>

          <Link href="/BrowseScreen" asChild>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="list-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Browse</Text>
            </Pressable>
          </Link>

          <Link href="/FavouriteScreen" asChild>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="heart-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Favorites</Text>
            </Pressable>
          </Link>

          <Link href="/SettingScreen" asChild>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="settings-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Settings</Text>
            </Pressable>
          </Link>
        </View>
      </View> 


       <View style={{ paddingHorizontal: 10, paddingTop: 30, marginBottom: 20 }}>
  {Platform.OS === "web" ? (
    // ✅ Web: use CSS gradient text
    <Text
      style={{
        fontSize: 28,
        fontWeight: "700",
        background: "linear-gradient(90deg, #efce27, #ff760e, #963809)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        paddingHorizontal:10
      }}
    >
       Discover Beautiful Wallpapers
    </Text>
  ) : (
    // ✅ Mobile: use MaskedView + LinearGradient
    <MaskedView
      maskElement={
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "black",
            paddingHorizontal: 4,
          }}
        >
          Discover Beautiful Wallpapers
        </Text>
      }
    >
      <LinearGradient
        colors={["#efce27", "#ff760e", "#963809"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            opacity: 0,
          }}
        >
            Discover Beautiful Wallpapers
        </Text>
      </LinearGradient>
    </MaskedView>
  )}

  <Text
    style={{
      paddingTop: 12,
      paddingHorizontal: 10,
      fontSize: 18,
      fontWeight: "400",
      color: "#777",
      marginBottom: 12,
      width:"70%"
    }}
  >
    Discover curated collections of stunning wallpapers. Browse by category to find the perfect background for your device.
  </Text>
</View>


      <View style={{
         flexDirection:"row",
         justifyContent:"space-between",
         paddingHorizontal:14,
         marginTop:20
      }}>
         <Text style={{fontWeight:"500",fontSize:18}}>Categories</Text>
         <Text style={{color:"#888"}}>See All</Text>
      </View>

      <FlatList
        data={wallpapers}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
  <TouchableOpacity style={styles.card}>
    {Platform.OS === "web" ? (
      <img
        src={item.url}
        alt={item.title}
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: 12,
        }}
      />
    ) : (
      <Image source={{ uri: item.url }} style={styles.image} />
    )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#222",
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  overlayText: {
  position: "absolute",
  bottom: 20,
  left: 10,
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
