import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import LocationListView from "./LocationListView/LocationListView";
import UserListView from "./UserListView/UserListView";
import UserListStack from "./UserListView/UserListStack";
import LocationListStack from "./LocationListView/LocationListStack";
import NewLocation from "./NewLocation/NewLocation";
import AuthProfileView from "./AuthProfileView/AuthProfileView";
import ProfileSettingsView from "./ProfileSettingsView/ProfileSettingsView";

const Tab = createBottomTabNavigator()

export default function Main() {

    return(
        <Tab.Navigator
            screenOptions={{
              tabBarStyle: { height: 65 },
              tabBarActiveTintColor: 'green'
            }}
        >
            <Tab.Screen 
                name="Publicaciones"
                component={LocationListStack}
                options={{
                  tabBarLabel: 'Ubicaciones',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="search-location" size={30} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="Usuarios"
                component={UserListStack}
                options={{
                  tabBarLabel: 'Usuarios',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="users" size={24} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="Nueva localización"
                component={NewLocation}
                options={{
                  tabBarLabel: 'Nueva Ubicación',
                  tabBarLabelStyle: {
                    fontSize: 12
                  },
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-location" size={30} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="Perfil de usuario"
                component={AuthProfileView}
                options={{
                  tabBarLabel: 'Mi Perfil',
                  tabBarLabelStyle: {
                    fontSize: 15
                  },
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-circle" size={30} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name="Configuraciones"
                component={ProfileSettingsView}
                options={{
                  tabBarLabel: 'Configuraciones',
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
    }
  });