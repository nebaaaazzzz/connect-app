import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
import { UserContext } from "./../../App.Navigator";
import React, { useContext } from "react";
import { Divider } from "react-native-paper";
const fetchHouse = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/lessee/house/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data;
};

const HomeDetailScreen = ({ navigation, route }) => {
  const user = useContext(UserContext);
  const clientQuery = useQueryClient();
  const { isLoading, isError, error, data, isFetching, isSuccess } = useQuery(
    ["house", route.params.id],
    fetchHouse
  );
  const applyMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/lessee/apply/${data._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("error occured");
    }
    return response.json();
  });
  if (isLoading || isFetching || applyMutuation.isLoading) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(
      error.message || applyMutuation.error.message,
      ToastAndroid.LONG
    );
  }
  if (applyMutuation.isSuccess) {
    navigation.navigate("lessee/applied/");
    if (data.applied) {
      ToastAndroid.show("successfully removed", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("successfully applied", ToastAndroid.LONG);
    }
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isSuccess) {
    clientQuery.invalidateQueries("appliedhouses");
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {data.placeTitle}
        </Text>
        {data?.deleted ? <Text>Job deleted</Text> : <></>}
        <View>
          <Divider />
          <Image
            source={{
              uri: `${BASEURI}/house/image/${data.houseImages[1]}`,
              headers: {
                Authorization: `Bearer ${BASETOKEN}`,
              },
            }}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              width: "90%",
              aspectRatio: 2,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("lessee/viewimages", {
                images: data.houseImages,
              });
            }}
            style={{
              backgroundColor: "#0244d0",
              alignSelf: "center",
              paddingVertical: 5,
              marginVertical: 5,
              elevation: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>View All Images</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            Fun place {data.placeName}
          </Text>
          {data.region ? (
            <Text>
              Region :{" "}
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>{data.region}</Text>
            </Text>
          ) : (
            <></>
          )}
          <Text></Text>
          <Divider />
          {data?.guestFav?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                guest favourite
              </Text>
              {data?.guestFav?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <Divider />
          {data?.saftyItems?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                amenities
              </Text>
              {data?.saftyItems?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <Divider />
          {data?.amenities?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                amenities
              </Text>
              {data?.amenities?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <Divider />
          {data?.bestDescribe?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Best Describe
              </Text>
              {data?.bestdescribe?.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      key={index + 1}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}

          <Divider />

          <Divider />

          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Property Type :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {data.propertyType}
              </Text>
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Price :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {data.price} birr
              </Text>
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Place Kind :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>{data.placeKind}</Text>
            </Text>
          </View>
          <Divider />

          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Place Description
            </Text>
            <View>
              <Text style={{ fontSize: 16 }}>
                Type :{"  "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {data.placeDescription.title}
                </Text>
              </Text>
              <Text style={{ fontSize: 16 }}>
                Description :{" "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {data.placeDescription.description}
                </Text>
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              Detail Description
            </Text>
            <Text style={{ fontSize: 16 }}>{data.detailDescription}</Text>
          </View>
        </View>
        {data.approved || (
          <View style={{ paddingHorizontal: "5%", marginTop: "5%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>phone Number</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                data.user.phoneNumber
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>data.user.email</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "flex-end",
          height: 50,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        {data.applied ? (
          <TouchableOpacity
            onPress={() => {
              applyMutuation.mutate();
            }}
            style={{
              backgroundColor: data.applied ? "red" : "#0244d0",
              width: 100,
              right: 30,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>remove</Text>
          </TouchableOpacity>
        ) : user?.left > 0 ? (
          <TouchableOpacity
            onPress={() => {
              applyMutuation.mutate();
            }}
            style={{
              backgroundColor: data.applied ? "red" : "#0244d0",
              width: 100,
              right: 30,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Apply</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("lesse/payment");
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              right: 30,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomeDetailScreen;
