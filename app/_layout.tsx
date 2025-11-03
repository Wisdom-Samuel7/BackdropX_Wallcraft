import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";

import HomeScreen from "./index";
import BrowseScreen from "./BrowseScreen";
import FavoriteScreen from "./FavouriteScreen";
import Settings from "./SettingScreen";
import WallpaperSetupScreen from "./Wallpapersetup";

const Drawer = createDrawerNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Settings Screen</Text>
    </View>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          drawerStyle: { backgroundColor: "#fff", width: 240 },
          overlayColor: "rgba(0,0,0,0.4)",
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Browse" component={BrowseScreen} />
        <Drawer.Screen name="Favourite" component={FavoriteScreen} />
        <Drawer.Screen name="Setup" component={WallpaperSetupScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}
