import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import UserListStack from "./UserListView/UserListStack";
import LocationListStack from "./LocationListView/LocationListStack";
import NewLocation from "./NewLocation/NewLocation";
import AuthProfileView from "./AuthProfileView/AuthProfileView";
import ProfileSettingsStack from "./ProfileSettingsStack/ProfileSettingsStack";
import { AppContext } from "../AppContext";

const Tab = createBottomTabNavigator()
// TODO: estilar
// TODO: documentar
export default function Main() {
  const { handleAuth } = useContext(AppContext)
  
    return(
        <Tab.Navigator
            screenOptions={{
              tabBarStyle: { height: 65 },
              tabBarActiveTintColor: 'green',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => handleAuth(null)}
                  style={styles.logoutButton}
                >
                  <MaterialIcons name="logout" size={30} color="black" />
                </TouchableOpacity>
              ),
            }}
        >
            <Tab.Screen 
                name="Locations"
                component={LocationListStack}
                options={{
                  tabBarLabel: 'Locations',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="search-location" size={30} color="black" />
                  )
                }}
            />
            <Tab.Screen
                name="Users"
                component={UserListStack}
                options={{
                  tabBarLabel: 'Users',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="users" size={24} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="New location"
                component={NewLocation}
                options={{
                  tabBarLabel: 'New location',
                  tabBarLabelStyle: {
                    fontSize: 12
                    },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-location" size={30} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={AuthProfileView}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-circle" size={30} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={ProfileSettingsStack}
                options={{
                  tabBarLabel: 'Settings',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="settings" size={24} color="black" />
                  ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      margin: 10,
      padding: 10,
      height: 40,
      borderWidth: 2,
      borderRadius: 10,
      width: 250
    },
    logoutButton: {
      marginRight: 20
    }
  });