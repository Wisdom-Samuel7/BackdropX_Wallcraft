import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  // Example random image (replace with your local image if you prefer)
  const randomImage = "https://picsum.photos/400/600?random=3";

  return (
    <View style={styles.container}>
      {/* Nav Bar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Wallpaper Studio</Text>

        <View style={styles.navLinks}>
          <Link href="/" asChild>
            <Pressable style={styles.linkItem}>
              <Ionicons name="home-outline" size={20} color="#333" />
              <Text style={styles.activeText}>Home</Text>
            </Pressable>
          </Link>

          <Link href="/BrowseScreen" asChild>
            <Pressable style={styles.linkItem}>
              <Ionicons name="list-outline" size={20} color="#777" />
              <Text style={styles.inactiveText}>Browse</Text>
            </Pressable>
          </Link>

          <Link href="/FavouriteScreen" asChild>
            <Pressable style={styles.linkItem}>
              <Ionicons name="heart-outline" size={20} color="#777" />
              <Text style={styles.inactiveText}>Favorites</Text>
            </Pressable>
          </Link>

          <Link href="/SettingScreen" asChild>
            <Pressable style={styles.linkItem}>
              <Ionicons name="settings-outline" size={20} color="#777" />
              <Text style={styles.inactiveText}>Settings</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Content in Grid */}
      <View style={styles.gridContainer}>
        {/* Left Section */}
        <View style={styles.leftColumn}>
          {/* Title */}
          <View style={styles.headerSection}>
            <MaskedView
              maskElement={<Text style={styles.maskText}>Settings</Text>}
            >
              <LinearGradient
                colors={["#efce27ff", "#ff760eff", "#f7520590"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.maskText, { opacity: 0 }]}>
                  Settings
                </Text>
              </LinearGradient>
            </MaskedView>

            <Text style={styles.subtitle}>
              Customize your Wallpaper Studio experience
            </Text>
          </View>

          {/* Headline */}
          <View style={styles.headline}>
            <Text style={{ fontWeight: 600, fontSize: 24 }}>
              Wallpaper Setup
            </Text>
            <Text style={styles.subdesc}>
              Configure your wallpaper settings and enable auto-rotation
            </Text>
          </View>

          {/* Blocks */}
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Image Quality</Text>
            <View style={styles.blockRow}>
              <Text style={styles.blockText}>High - Best Quality </Text>
              <Ionicons size={24} name="chevron-down-outline" />
            </View>
          </View>

          <View style={styles.block}>
            <View style={styles.blockRow}>
              <Text style={styles.blockTitle}>Notification</Text>
              <Ionicons size={36} name="toggle-outline" color="orange" />
            </View>

            <View style={[styles.blockRow, { marginTop: 12 }]}>
              <Text style={styles.blockText}>
                Get notified about new wallpapers and update
              </Text>
            </View>
          </View>

          {/* Buttons */}
         <View style={{ marginTop: 80, marginBottom: 40 ,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
               <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
         </View>
        </View>

        {/* Right Side Image */}
        <Image
          source={{ uri: randomImage }}
          style={styles.sideImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#fff",
    shadowColor: "#777",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navTitle: { fontWeight: "600", fontSize: 20 },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 400,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  activeText: { color: "#333", fontWeight: "600" },
  inactiveText: { color: "#777" },

  gridContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
  },
  leftColumn: {
    flex: 1.2,
    paddingHorizontal: 10,
    paddingTop:80
  },
  sideImage: {
    flex: 1,
    borderRadius: 20,
    height: "90%",
    alignSelf: "center",
  },
  headerSection: {
    marginBottom: 20,
  },
  maskText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    paddingTop: 4,
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    marginBottom: 16,
  },
  headline: {
    marginBottom: 20,
    paddingTop: 10,
  },
  subdesc: {
    fontSize: 16,
    marginTop: 8,
    color: "#5e5a5aff",
    fontWeight: "600",
  },
  block: {
    paddingHorizontal: 30,
    paddingVertical: 14,
    marginBottom: 20,
    backgroundColor: "#fffefeff",
    borderRadius: 12,
    shadowColor: "#ddd",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
  },
  blockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: "400",
  },
  blockText: {
    color: "#aba4a4ff",
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
  cancelBtn: {
    borderWidth: 0.5,
    borderColor: "#00000033",
    paddingVertical: 14,
    // marginHorizontal: 30,
    borderRadius: 14,
    // marginTop: 30,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#000000ff",
      width:150
  },
  saveBtn: {
    backgroundColor: "#fb8006d7",
    paddingVertical: 14,
    marginHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
    width:150
  },
  saveText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
   
  },
});
