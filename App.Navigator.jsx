import React, { useEffect, useState } from "react";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import HomeScreen from "./screens/HomeScreen";
import EmployeeScreen from "./screens/Employee/EmployeeScreen";
import JobDetailScreen from "./screens/Employee/JobDetailScreen";
import EmployerScreen from "./screens/Employer/EmployerScreen";
import LesseeScreen from "./screens/Lessee/LesseeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LesserScreen from "./screens/Lesser/LesserScreen";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Text, SafeAreaView } from "react-native";
import { useQuery } from "react-query";
import { BASEURI } from "./urls";
import ErrorScreen from "./screens/Common/ErrorScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ValidateScreen from "./screens/ValidateScreen";
const StackNavigator = createStackNavigator();
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
/*

check  react-native-debugger
check  react-native-debugger
check  react-native-debugger
check  react-native-debugger


*/
export const UserContext = React.createContext();
const AppNavigator = ({ navigation }) => {
  const linking = {
    prefixes: [prefix],
  };
  // handle gateway callbacks

  const scheme = useColorScheme();
  (async () => await import("./urls"))();
  const [tokenG, setTokenG] = useState();
  const { data, isFetching, isError, error, isLoading, isSuccess } = useQuery(
    "user",

    async function () {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setTokenG(token);
        const response = await fetch(`${BASEURI}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await response.json();
      }
    },
    {
      initialData: null,
    }
  );
  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  // navigation.reset({
  //   index: 1,
  //   routes: [{ name: "error", params: { error } }],
  // });
  // return <View></View>;
  if (tokenG && error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity>
          <Text>{error.message}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ martinTop: StatusBar.currentHeight, flex: 1 }}>
      <NavigationContainer
        linking={linking}
        theme={scheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <UserContext.Provider value={data}>
          <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            {data ? (
              <StackNavigator.Group>
                <StackNavigator.Screen name="home" component={HomeScreen} />
                <StackNavigator.Screen
                  name="employee"
                  component={EmployeeScreen}
                />
                <StackNavigator.Screen
                  name="employer"
                  component={EmployerScreen}
                />
                <StackNavigator.Screen name="lessee" component={LesseeScreen} />
                <StackNavigator.Screen name="lesser" component={LesserScreen} />
                <StackNavigator.Screen
                  name="jobdetail"
                  component={JobDetailScreen}
                />

                <StackNavigator.Screen
                  name="confirmation"
                  component={ConfirmationScreen}
                />
              </StackNavigator.Group>
            ) : (
              <StackNavigator.Group>
                <StackNavigator.Screen name="login" component={LoginScreen} />
                <StackNavigator.Screen
                  name="forgotpassword"
                  component={ForgotPasswordScreen}
                />
                <StackNavigator.Screen name="signup" component={SignupScreen} />
                <StackNavigator.Screen
                  name="validate"
                  component={ValidateScreen}
                />
              </StackNavigator.Group>
            )}
            <StackNavigator.Screen name="error" component={ErrorScreen} />
          </StackNavigator.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
