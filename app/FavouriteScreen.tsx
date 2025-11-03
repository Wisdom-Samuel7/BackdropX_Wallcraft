import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wallpapers } from "../data/wallpaper";
import { LinearGradient } from "expo-linear-gradient";

import MaskedView from "@react-native-masked-view/masked-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function FavoriteScreen() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

    const navigation = useNavigation();

  const handleOpen = (item) => {
    setSelected(item);
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: height * 0.08, // 👈 moves sheet almost to the top
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
     
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
             {"Saved Wallpapers"}
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
             {"Saved Wallpapers"}
           </Text>
         </LinearGradient>
       </MaskedView>
   
            <Text style={{paddingTop:4,paddingHorizontal:10,fontSize:18,fontWeight:500,color:"#777",marginBottom:16}}>Your saved wallpapers collection</Text>
       </View> 


      {/* Wallpapers Grid */}
           <FlatList
             data={wallpapers}
             keyExtractor={(item) => item.id.toString()}
             numColumns={2}
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
             columnWrapperStyle={{
               justifyContent: "space-between",
               marginBottom: 14,
             }}
             renderItem={({ item }) => (
               <TouchableOpacity
                 style={styles.card}
                 onPress={() => handleOpen(item)}
               >
                 <Image source={{ uri: item.url }} style={styles.image} />
     
                     {/* Love Icon */}
             <View style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
               <TouchableOpacity
                 style={{
                   backgroundColor:"#ffffffff" ,
                   borderRadius: 20,
                   padding: 6,
                 }}
               >
                 <Ionicons
                    style={{
                      color:"#ff9500c1" ,
                 }}
                   size={18} name="heart" />
               </TouchableOpacity>
             </View>
     
     
                 {/* OVERLAY TEXT */}
                 <View style={styles.overlayText}>
                   <Text style={styles.overlayHeader}>{item.title}</Text>
                   {/* <Text style={styles.overlaySub}>{item.description}</Text> */}
                   <TouchableOpacity style={styles.countButton}>
                     <Text style={styles.countText}>{item.count} Wallpapers</Text>
                   </TouchableOpacity>
                 </View>
     
               </TouchableOpacity>
             )}
           />
     

      {/* 🧩 Custom Bottom Sheet */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {selected && (
            <View style={styles.modalContainer}>
              <View style={styles.handle} />
              <Image
                source={{ uri: selected.url }}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <View style={styles.modalContent}>
                <View><Text style={{fontWeight:700,paddingVertical:10,fontSize:30}}>Preview</Text></View>
               
               <View>
                   <Text style={{fontWeight:200,marginBottom:4}}>Name</Text>
                   <Text style={styles.modalTitle}>{selected.title}</Text>
               </View>


               <View style={{marginBottom:10}}>
                 <Text style={{fontWeight:200,marginBottom:4,marginTop:26}}>Tags</Text>
                 <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {selected.description
                    ?.split(",")
                    .map((word, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                        backgroundColor: "#dedadae0",
                        borderRadius: 10,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        }}
                    >
                        <Text style={{ color: "#222", fontSize: 14 }}>
                        {word.trim()}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>

               </View>

            <View style={styles.textContainer}>
            <Text
                style={styles.fullDescription}
                numberOfLines={3} // limit to 3 lines
                ellipsizeMode="tail"
            >
                {selected.fullDesc}
            </Text>

            {/* Fade effect overlay */}
            <LinearGradient
                colors={["#ffffff3e", "#fff9f9c0"]} // fade into white (adjust if your bg changes)
                style={styles.fadeOverlay}
            />
            </View>

            <View style={{flexDirection:"row",gap:12,alignItems:"center",marginBottom:12}}>
                <Ionicons size={24} color={"#766f6fff"} name="share-outline"></Ionicons>
                <Ionicons size={24} color={"#766f6fff"} name="shuffle-outline"></Ionicons>
                <Ionicons size={24} color={"#766f6fff"} name="settings-outline"></Ionicons>
            </View>

              <TouchableOpacity style={styles.setButtonB}>
                    <Text style={styles.btnTextB}> <Ionicons size={16} name="heart-outline"/> Save to Favorites</Text>
                </TouchableOpacity>

              <TouchableOpacity style={styles.setButton}>
                    <Text style={styles.btnText}>Set to Wallpaper</Text>
                </TouchableOpacity>
               

              </View>
            </View>
          )}
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    paddingVertical: 12,
  },
  category: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ddd",
    height: 240,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  overlayText: { position: "absolute", bottom: 20, left: 8 },
  overlayHeader: { color: "#fff", fontSize: 22, fontWeight: "700" },
  overlaySub: { color: "#eee", fontSize: 14, marginBottom: 8 },
  countButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  countText: { color: "#fff", fontSize: 13, fontWeight: "500" },

  // Modal styles
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
    height: height * 0.98, // 👈 almost full-screen height
  },
  modalContainer: {
    flex: 1, 
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalImage: {
    width: "100%",
    height: 280,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  modalDescription: {
    color: "#666",
    fontSize: 16,
    marginBottom: 20,
    paddingTop:6
  },
  setButton: {
    borderRadius: 16,
    // overflow: "hidden",
    backgroundColor: "#ff8c00c1",
    marginBottom:4,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
setButtonB: {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "transparent",
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginTop:0,
  marginBottom:8
},

  gradientBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
     textAlign: "center",
  },
    btnTextB: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
     textAlign: "center",
     paddingVertical:2,
     paddingHorizontal:16
  },
   textContainer: {
    position: "relative",
    height: 70, // enough for ~3 lines of text
    overflow: "scroll",
    marginTop: 10,
    marginBottom:5
  },
  fullDescription: {
    fontSize: 14,
    color: "#807e7eff",
    lineHeight: 22,
  },
  fadeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 38, // adjust thickness of fade
  },
});
