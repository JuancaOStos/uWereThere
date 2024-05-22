import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import LocationListView from "./LocationListView/LocationListView";
import UserListView from "./UserListView/UserListView";
import NewLocation from "./NewLocation/NewLocation";
import UserProfileView from "./UserProfileView/UserProfileView";

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
                name="LocationListView"
                component={LocationListView}
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
                name="UserListView"
                component={UserListView}
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
                name="NewLocation"
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
                name="UserProfileView"
                component={UserProfileView}
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