import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
const PropertyTypeScreen = () => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          What Kind of place Will You Host ?
        </Text>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Apartment</Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
              backgroundColor: "red",
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>House</Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
              backgroundColor: "red",
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>
            Secondary unit
          </Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
              backgroundColor: "red",
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Unique space</Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/7ad56bb1-ed9f-4dcb-a14c-2523da331b44.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>
            Bed and breakfast
          </Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/d52fb4e7-39a4-46df-9bf9-67e56d35eeca.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>
            Boutique hotel
          </Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/a2c9ad21-b159-4fd2-b417-d810fb23c6a9.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Apartment</Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
            }}
          ></Image>
        </Pressable>
        <Pressable
          style={{
            borderWidth: 1,
            width: "100%",
            marginVertical: 10,
            borderColor: "rgba(0,0,0,0.4)",
            elevation: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Apartment</Text>
          <Image
            source={{
              uri: "https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240",
            }}
            style={{
              width: 50,
              borderRadius: 5,
              height: 50,
            }}
          ></Image>
        </Pressable>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "flex-end",
          height: 60,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Pressable
          style={{
            backgroundColor: bgColor ? "#0099ff" : "rgba(0,0,0,0.2)",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PropertyTypeScreen;