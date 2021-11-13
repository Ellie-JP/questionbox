import * as React from "react";
import { Clipboard } from "react-native";
import { Text, Card, Button, Divider, Header } from "react-native-elements";
import tailwind from "tailwind-rn";
import Container from "../components/atoms/Container";
import Layout from "../components/atoms/Layout";
import AsyncStorage from "@react-native-community/async-storage";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ({ navigation }) => {
  const home = () => {
    navigation.navigate("Home");
  };
  const [selected, setSelected] = React.useState(1);

  const exportKey = async () => {
    let privateKey = await AsyncStorage.getItem("@private_key");
    if (!privateKey) return;
    Clipboard.setString(privateKey);
    alert("Copied");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@private_key");
    navigation.navigate("Signin");
  };

  const scanner = () => {
    navigation.navigate("Scanner");
  };

  const setting = () => {
    navigation.navigate("Setting");
  };

  return (
    <Layout>
      {/* <Header
        leftComponent={{ icon: "chevron-left", color: "#fff", onPress: home }}
        centerComponent={{
          text: "Setting",
          style: { color: "#fff" },
        }}
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
      <Container>
        <Card>
          <Button
            title="Export private key"
            type="clear"
            style={tailwind("mb-4")}
            onPress={exportKey}
          />
          <Divider />
          <Button
            title="Log out"
            type="clear"
            style={tailwind("m-2")}
            onPress={logout}
          />
        </Card>
      </Container>
    </Layout>
  );
};
