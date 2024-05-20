import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LocationListView from "./LocationListView/LocationListView";
import NewLocation from "./NewLocation/NewLocation";
import UserProfileView from "./UserProfileView/UserProfileView";

const Tab = createBottomTabNavigator()

export default function Main() {

    return(
        <Tab.Navigator>
            <Tab.Screen name="LocationListView" component={LocationListView} />
            <Tab.Screen name="NewLocation" component={NewLocation} />
            <Tab.Screen name="UserProfileView" component={UserProfileView} />
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