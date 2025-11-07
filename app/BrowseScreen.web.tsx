import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { wallpapers } from "../data/wallpaper";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { motion, AnimatePresence } from "framer-motion";

/* 🔹 Cross-platform image component */
const CrossImage = ({ uri, style }: any) =>
  Platform.OS === "web" ? (
    <img src={uri} alt="wallpaper" style={{ ...style, objectFit: "cover" }} />
  ) : (
    <Image source={{ uri }} style={style} resizeMode="cover" />
  );

export default function BrowseWeb() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Wallpaper Studio</Text>
        <View style={styles.navLinks}>
          <Link href="/" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="home-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Home</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.navItem}>
            <Ionicons name="list-outline" size={20} color="#333" />
            <Text style={{ color: "#333", fontWeight: "600" }}>Browse</Text>
          </Pressable>

          <Link href="/FavouriteScreen" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="heart-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Favorites</Text>
            </Pressable>
          </Link>

          <Link href="/SettingScreen" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="settings-outline" size={20} color="#777" />
              <Text style={{ color: "#777" }}>Settings</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Header */}
      <View style={{ paddingHorizontal: 10, paddingTop: 30, marginBottom: 20 }}>
        {Platform.OS === "web" ? (
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              background: "linear-gradient(90deg, #efce27, #ff760e, #963809)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              paddingHorizontal: 10,
            }}
          >
            Browse Categories
          </Text>
        ) : (
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
                Browse Categories
              </Text>
            }
          >
            <LinearGradient
              colors={["#efce27", "#ff760e", "#963809"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ fontSize: 28, fontWeight: "700", opacity: 0 }}>
                Browse Categories
              </Text>
            </LinearGradient>
          </MaskedView>
        )}

        <Text
          style={{
            paddingTop: 1,
            paddingHorizontal: 10,
            fontSize: 18,
            fontWeight: "400",
            color: "#777",
          }}
        >
          Explore our curated collections of stunning wallpapers
        </Text>
      </View>

      {/* Wallpapers Grid — now scrollable */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {wallpapers.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => setSelected(item)}
            >
              <CrossImage uri={item.url} style={styles.image} />
              <View style={styles.overlayAlways}>
                <Text style={styles.overlayHeader}>{item.title}</Text>
                <Text style={styles.overlaySub}>{item.description}</Text>
                <View style={styles.countButton}>
                  <Text style={styles.countText}>{item.count} Wallpapers</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Fullscreen View */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            style={styles.fullScreenOverlay}
          >
            <TouchableOpacity
              onPress={() => setSelected(null)}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color="#333" />
              <Text style={styles.backText}>Back to Categories</Text>
            </TouchableOpacity>

            <div style={styles.gridLayout}>
              {/* Left Grid Section */}
              <div style={styles.leftGrid}>
                <h2 style={{ fontSize: 22, marginBottom: 10, color: "#444" }}>
                  {selected.title}
                </h2>
                <div style={styles.imageGrid}>
                  {wallpapers.slice(0, 9).map((wp) => (
                    <div
                      key={wp.id}
                      style={styles.imageCard}
                      onClick={() => setSelected(wp)}
                    >
                      <img
                        src={wp.url}
                        alt={wp.title}
                        style={{
                          width: "100%",
                          height: "260px",
                          borderRadius: 10,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                      <div style={styles.overlayAlwaysWeb}>
                        <h3 style={{ color: "#fff", margin: 0 }}>{wp.title}</h3>
                        <p style={{ color: "#eee", fontSize: 12 }}>
                          {wp.description}
                        </p>
                        <div
                          style={{
                            border: "1px solid #fff",
                            borderRadius: 20,
                            padding: "3px 10px",
                            display: "inline-block",
                            color: "#fff",
                            fontSize: 11,
                            width: "fit-content",
                          }}
                        >
                          {wp.count} Wallpapers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Grid Section */}
              <div style={styles.rightGrid}>
                <div style={styles.rightContent}>
                  <View>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 28,
                        marginBottom: 30,
                      }}
                    >
                      Preview
                    </Text>

                    <Text style={{ fontSize: 20, color: "#222" }}>
                      {selected.title}
                    </Text>

                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                      <Text>Tags</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 4,
                          marginTop: 10,
                          flexWrap: "wrap",
                        }}
                      >
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
                              <Text style={{ color: "#222", fontSize: 10 }}>
                                {word.trim()}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </View>

                      <View style={{ marginTop: 36, position: "relative" }}>
                        <Text
                          style={{ paddingVertical: 12, fontWeight: "600" }}
                        >
                          Description
                        </Text>
                        <View style={{ maxHeight: 120, overflow: "hidden" }}>
                          <Text
                            style={{
                              fontWeight: "400",
                              color: "#666",
                              lineHeight: 22,
                            }}
                          >
                            {selected.fullDesc}
                          </Text>
                          <LinearGradient
                            colors={[
                              "transparent",
                              "rgba(248,248,248,0.5)",
                              "rgba(248,248,248,1)",
                            ]}
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 80,
                            }}
                            pointerEvents="none"
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <Ionicons
                        style={styles.iconBtn}
                        size={24}
                        color={"#766f6fff"}
                        name="share-outline"
                      />
                      <Ionicons
                        style={styles.iconBtn}
                        size={24}
                        color={"#766f6fff"}
                        name="shuffle-outline"
                      />
                      <Ionicons
                        style={styles.iconBtn}
                        size={24}
                        color={"#766f6fff"}
                        name="settings-outline"
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 40,
                        justifyContent: "space-between",
                        gap: 20,
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity style={styles.setButtonB}>
                        <Text style={styles.btnTextB}>
                          <Ionicons size={16} name="heart-outline" /> Save to
                          Favorites
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.setButton}>
                        <Text style={styles.btnText}>Set to Wallpaper</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <img
                    src={selected.url}
                    alt={selected.title}
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: 16,
                      objectFit: "cover",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: "#f8f8f8" },
  scrollContainer: { paddingBottom: 100 },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "#fff",
    shadowColor: "#777",
    shadowOpacity: 1,
  },
  navLinks: { flexDirection: "row", justifyContent: "space-between", width: 400 },
  navItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
    position: "relative",
  },
  image: { width: "100%", height: 200 },
  overlayAlways: { position: "absolute", bottom: 15, left: 10 },
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
  fullScreenOverlay: {
    position: "fixed",
    top: 80,
    left: 0,
    width: "100%",
    height: "calc(100vh - 80px)",
    backgroundColor: "#fff",
    zIndex: 1000,
    overflowY: "auto",
    padding: 30,
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 30,
    marginTop: 40,
  },
  leftGrid: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  rightGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
  rightContent: {
    width: "90%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  backButton: {
    position: "absolute",
    left: 40,
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  backText: { color: "#333", fontSize: 16, fontWeight: "500" },
  iconBtn: {
    backgroundColor: "#dedada90",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  setButton: {
    borderRadius: 16,
    backgroundColor: "#ff8c00c1",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  setButtonB: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
