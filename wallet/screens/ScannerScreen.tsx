import * as Linking from "expo-linking";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, Header } from "react-native-elements";
import { BarCodeScanner } from "expo-barcode-scanner";
import QrReader from "react-qr-reader";

import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default ({ navigation }) => {

  const [selected, setSelected] = React.useState(1);

  const handleBarCodeScannerScanned = ({ data }) => {
  };

  const handleQrReaderScanned = (data) => {
    if (!data) {
      return;
    }
    const { queryParams } = Linking.parse(data);
    if (!queryParams) {
      return;
    }
    window.location.href = `${window.location.href}?request_uri=${queryParams.request_uri}`;
  };

  const handleQrReaderError = (err) => {

  };

  const home = () => {
    window.location.href = window.location.href.split(/[?#]/)[0];
    navigation.navigate("Home");
  };

  const scanner = () => {
    navigation.navigate("Scanner");
  };

  const setting = () => {
    navigation.navigate("Setting");
  };

  return (
    <>
      {/* <Header
        leftComponent={{ icon: "chevron-left", color: "#fff", onPress: home }}
        centerComponent={{
          text: "Scan QR Code",
          style: { color: "#fff" },
        }}
        rightComponent={{ icon: "menu", color: "#fff" }}
      /> */}

      <NativeBaseProvider>
        <Box flex={0} bg="white" safeAreaTop>
          <Center flex={1}></Center>
          <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
            <Pressable
              cursor="pointer"
              opacity={selected === 0 ? 1 : 0.5}
              py="3"
              flex={1}
              onPress={() => home()}>

              <NativeBaseProvider />

              <Center>
                <Icon
                  mb="1"
                  as={
                    <MaterialCommunityIcons
                      name={selected === 0 ? 'card-account-details' : 'card-account-details-outline'}
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text >
                  credentials
                </Text>
              </Center>
            </Pressable>

            <Pressable
              cursor="pointer"
              opacity={selected === 2 ? 1 : 0.5}
              py="2"
              flex={1}
              onPress={() => scanner()}
            >
              <Center>
                <Icon
                  mb={1}
                  as={
                    <MaterialCommunityIcons
                      name={selected === 3 ? 'camera-plus' : 'camera-plus-outline'}
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text>
                  camera
                </Text>
              </Center>
            </Pressable>
            <Pressable
              cursor="pointer"
              opacity={selected === 3 ? 1 : 0.5}
              py="2"
              flex={1}
              onPress={() => setting()}
            >
              <Center>
                <Icon
                  mb={1}
                  as={
                    <MaterialCommunityIcons
                      name={selected === 3 ? 'account' : 'account-outline'}
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text>
                  setting
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
      </NativeBaseProvider>

      {Platform.OS !== "web" ? (
        <View
          style={{
            flex: 0,
            height: 0,
            // flexDirection: "column",
            // justifyContent: "flex-end",
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScannerScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      ) : (
        <QrReader
          onError={handleQrReaderError}
          onScan={handleQrReaderScanned}
        />
      )}
    </>
  );
};
