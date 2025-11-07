import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wallpapers } from "../data/wallpaper";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { AnimatePresence, motion } from "framer-motion";

const { height } = Dimensions.get("window");

/* ✅ Cross-platform Image Component */
const CrossImage = ({ uri, style }: any) =>
  Platform.OS === "web" ? (
    <img
      src={uri}
      alt="wallpaper"
      style={{ ...style, objectFit: "cover", width: "100%", height: "100%" }}
    />
  ) : (
    <Image source={{ uri }} style={style} resizeMode="cover" />
  );

export default function FavouriteScreen() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleOpen = (item) => {
    setSelected(item);
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: height * 0.05,
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

  const handleViewAll = () => {
    setViewAll(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setViewAll(false));
  };

  return (
    <View style={styles.container}>
      {/* ✅ Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.brandText}>Wallpaper Studio</Text>
        <View style={styles.navLinks}>
          <Link href="/" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="home-outline" size={20} color="#777" />
              <Text style={styles.navText}>Home</Text>
            </Pressable>
          </Link>

          <Link href="/BrowseScreen" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="list-outline" size={20} color="#777" />
              <Text style={styles.navText}>Browse</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.navItem}>
            <Ionicons name="heart-outline" size={20} color="#000" />
            <Text style={[styles.navText, { color: "#000", fontWeight: "600" }]}>
              Favorites
            </Text>
          </Pressable>

          <Link href="/SettingScreen" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="settings-outline" size={20} color="#777" />
              <Text style={styles.navText}>Settings</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* ✅ Header */}
      <View style={styles.header}>
        {Platform.OS === "web" ? (
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              background: "linear-gradient(90deg, #efce27, #ff760e, #963809)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Saved Wallpapers
          </Text>
        ) : (
          <MaskedView
            maskElement={
              <Text style={{ fontSize: 28, fontWeight: "700", color: "black" }}>
                Saved Wallpapers
              </Text>
            }
          >
            <LinearGradient
              colors={["#efce27", "#ff760e", "#963809"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ fontSize: 28, fontWeight: "700", opacity: 0 }}>
                Saved Wallpapers
              </Text>
            </LinearGradient>
          </MaskedView>
        )}

        <Text style={styles.subText}>Your saved wallpaper collections</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Grid of Wallpapers */}
      {!viewAll && (
        <FlatList
          data={wallpapers}
          keyExtractor={(item) => item.id.toString()}
          numColumns={6}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 40 }}
          columnWrapperStyle={{ justifyContent: "flex-start", marginBottom: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleOpen(item)}>
              <CrossImage uri={item.url} style={styles.image} />
              <View style={styles.overlayText}>
                <Text style={styles.overlayHeader}>{item.title}</Text>
                <TouchableOpacity style={styles.countButton}>
                  <Text style={styles.countText}>{item.count} Wallpapers</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.heartIcon}>
                <Ionicons name="heart" size={18} color="#ff9500" />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* ✅ Fullscreen "View All" Overlay */}
      <AnimatePresence>
        {viewAll && (
          <motion.View
            key="viewAll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={styles.viewAllScreen}
          >
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={22} color="#000" />
              <Text style={{ fontWeight: "600", marginLeft: 6 }}>Back</Text>
            </TouchableOpacity>

            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllTitle}>Saved Wallpapers</Text>
              <Text style={styles.viewAllSubtitle}>
                Your saved wallpapers collection
              </Text>
            </View>

            <View style={styles.viewAllBottomImage}>
              <motion.View
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Ionicons name="images-outline" size={150} color="#7775" />
              </motion.View>

              <Text
                style={{
                  marginTop: 12,
                  fontSize: 20,
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                No Saved Wallpapers
              </Text>
              <Text style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>
                Start saving your favorite wallpapers to see them here
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "#ff760e",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Browse Wallpapers
                </Text>
              </TouchableOpacity>
            </View>
          </motion.View>
        )}
      </AnimatePresence>

      {/* ✅ Modal Preview */}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
          {selected && (
            <View style={styles.modalContainer}>
              <View style={styles.handle} />
              <CrossImage uri={selected.url} style={styles.modalImage} />

              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Preview</Text>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.modalTitle}>{selected.title}</Text>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Tags</Text>
                  <View style={styles.tagContainer}>
                    {selected.description?.split(",").map((word, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{word.trim()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 44,
    paddingHorizontal: 40,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 10,
  },
  brandText: { fontWeight: "700", fontSize: 20, color: "#222" },
  navLinks: { flexDirection: "row", gap: 24 },
  navItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  navText: { color: "#777", fontSize: 15, fontWeight: "500" },

  header: { paddingHorizontal: 40, paddingTop: 50, marginBottom: 50 },
  subText: { paddingTop: 1, fontSize: 18, fontWeight: "400", color: "#777" },
  viewAll: { color: "#ff760e", fontWeight: "600", marginTop: 8 },

  card: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ddd",
    height: 240,
  },
  image: { width: "100%", height: "100%" },
  overlayText: { position: "absolute", bottom: 10, left: 10 },
  overlayHeader: { color: "#fff", fontSize: 14, fontWeight: "600" },
  countButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  countText: { color: "#fff", fontSize: 11, fontWeight: "500" },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
  },

  viewAllScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    top: 140,
    left: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllTextContainer: { position: "absolute", top: 160, left: 40 },
  viewAllTitle: { fontSize: 32, fontWeight: "600", color: "#000" ,marginTop:24},
  viewAllSubtitle: { fontSize: 16, color: "#777", marginTop: 6 },
  viewAllBottomImage: {
    position: "absolute",
    bottom: 300,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    height: height * 0.98,
  },
  modalContainer: { flex: 1 },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalImage: { width: "100%", height: 280 },
  modalContent: { padding: 20 },
  modalHeader: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "400", color: "#777", marginBottom: 4 },
  modalTitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagText: { color: "#333", fontSize: 13 },
  textContainer: { position: "relative", marginTop: 16, maxHeight: 90, overflow: "hidden" },
  fullDescription: { fontSize: 14, color: "#666", lineHeight: 22 },
  fadeOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 40 },
  iconRow: { flexDirection: "row", gap: 14, marginVertical: 14 },
  setButton: {
    borderRadius: 14,
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    marginBottom: 6,
  },
  setButtonB: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "transparent",
    paddingVertical: 10,
    marginBottom: 10,
  },
  btnText: { color: "#fff", fontWeight: "700", textAlign: "center", fontSize: 16 },
  btnTextB: { color: "#000", fontWeight: "600", textAlign: "center", fontSize: 14 },
});
