import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { BASEURI, BASETOKEN } from "../../urls";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, Title, Caption, Text, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Requests permissions for external directory

const fetchUser = async ({ queryKey }) => {
  console.log(`${BASEURI}/lesser/${queryKey[1]}/${queryKey[2]}`);

  const response = await fetch(
    `${BASEURI}/lesser/${queryKey[1]}/${queryKey[2]}`,
    {
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const UserDetailScreen = ({ navigation, route }) => {
  const approveMutation = useMutation(async () => {
    const response = await fetch(
      `${BASEURI}/lesser/approve/${route.params.id}/${route.params.houseId}`,
      {
        headers: {
          Authorization: `Bearer ${BASETOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  });
  const rejectMutation = useMutation(async () => {
    const response = await fetch(
      `${BASEURI}/lesser/reject/${route.params.id}/${route.params.houseId}`,
      {
        headers: {
          Authorization: `Bearer ${BASETOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  });
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["user", route.params.houseId, route.params.id],
    fetchUser
  );
  console.log(data);
  if (!isFocused) {
    queryClient.invalidateQueries([
      "user",
      route.params.id,
      route.params.houseId,
    ]);
  }
  if (
    isLoading ||
    isFetching ||
    rejectMutation.isLoading ||
    approveMutation.isLoading
  ) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  if (rejectMutation.isSuccess || approveMutation.isSuccess) {
    queryClient.invalidateQueries("houseapplicants");
    navigation.navigate("lesser/applicants/");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: `${BASEURI}/profile-pic/${data.profilePic}`,
                // uri: `${BASEURI}/profile-pic/${userContext.profilePic}`,
                headers: {
                  Authorization: `Bearer ${BASETOKEN}`,
                },
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {data.firstName + " " + data.lastName}
              </Title>
              <Caption style={styles.caption}>{data.userName}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Addis Ababa, Ethiopia
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {data.phoneNumber}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {data.email}
            </Text>
          </View>
        </View>
        <Divider style={{ borderWidth: 0.2 }} />
        <View style={{ paddingHorizontal: "10%", marginTop: "2%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18 }}>gender</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)", marginHorizontal: 20 }}>
              {data.gender}
            </Text>
          </View>

          {data.skills || (
            <View style={{ alignItems: "flex-start", marginTop: "2%" }}>
              <Text>Skills</Text>

              {data.skills.map((item, index) => (
                <View
                  key={index + 1}
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "#0244d0",
                    margin: 5,
                    padding: "3%",
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: "3%",
                    }}
                  >
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSkills(
                        skills.filter((i) => {
                          return item != i;
                        })
                      );
                    }}
                  >
                    <Icon name="close" color="red" size={20} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          {data.education || (
            <View>
              <Text>Education</Text>
              {data.education.map((item, index) => {
                return (
                  <View key={index + 1}>
                    <Divider style={{ borderWidth: 0.5 }} />
                    <Text>{item.institution}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text>
                          {item.start.getMonth() +
                            "/" +
                            item.start.getFullYear()}{" "}
                          -
                        </Text>
                        <Text>
                          {item.end.getMonth() + "/" + item.end.getFullYear()}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>
                        {item.major} {"    "}
                      </Text>
                      <Text>{item.degree}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {data.languages || (
            <View>
              <Text>Languages</Text>
              {data.languages.map((item, index) => {
                return (
                  <View
                    key={index + 1}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        paddingRight: "10%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text>{item.language}</Text>
                      <Text>{item.level}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <View style={{ paddingHorizontal: "5%", marginVertical: "5%" }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: "5%",
              }}
            >
              Bio
            </Text>
            <Text style={{ borderWidth: 0.6, borderRadius: 5, padding: 15 }}>
              {data.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* if user is approved */}
      {/* if user is approved */}
      {/* if user is approved */}
      {data.approved && (
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            flexDirection: "row",
            height: 60,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderColor: "rgba(0,0,0,0.3)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              rejectMutation.mutate();
            }}
            style={{
              backgroundColor: "red",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {data.rejected && (
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            flexDirection: "row",
            height: 60,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderColor: "rgba(0,0,0,0.3)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              approveMutation.mutate();
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {data.applied && (
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            flexDirection: "row",
            height: 60,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderColor: "rgba(0,0,0,0.3)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              rejectMutation.mutate();
            }}
            style={{
              backgroundColor: "red",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              approveMutation.mutate();
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
