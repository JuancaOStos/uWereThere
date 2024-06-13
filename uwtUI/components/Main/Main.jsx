import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation()
  const { handleAuth, translateToast } = useContext(AppContext)
  
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
                name={t('nav_bar.locations')}
                component={LocationListStack}
                options={{
                  tabBarLabel: t('nav_bar.locations'),
                  tabBarLabelStyle: {
                    fontSize: 13
                  },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="search-location" size={30} color="black" />
                  )
                }}
            />
            <Tab.Screen
                name={t('nav_bar.users')}
                component={UserListStack}
                options={{
                  tabBarLabel: t('nav_bar.users'),
                  tabBarLabelStyle: {
                    fontSize: 13
                  },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="users" size={24} color="black" />
                  ),
                }}
            />
            <Tab.Screen
                name={t('nav_bar.new_location')}
                component={NewLocation}
                options={{
                  tabBarLabel: t('nav_bar.new_location'),
                  tabBarLabelStyle: {
                    fontSize: 10
                    },
                  unmountOnBlur: true,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-location" size={50} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name={t('nav_bar.profile')}
                component={AuthProfileView}
                options={{
                  tabBarLabel: t('nav_bar.profile'),
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
                name={t('nav_bar.settings')}
                component={ProfileSettingsStack}
                options={{
                  tabBarLabel: t('nav_bar.settings'),
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