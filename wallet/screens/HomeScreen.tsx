import * as React from "react";
import { View } from "react-native";
import { Header, Divider, Text } from "react-native-elements";
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
import tailwind from "tailwind-rn";

import Container from "../components/atoms/Container";
import Layout from "../components/atoms/Layout";
import Section from "../components/atoms/Section";
import Credential from "../components/molecules/Credential";
import { initializeHome } from "../hooks";

import { jwt, Wallet } from "../modules";
import { WalletContext } from "../contexts";

export default ({ navigation }) => {
  const { vcState } = initializeHome();
  const wallet = React.useContext(WalletContext) as Wallet;
  const [selected, setSelected] = React.useState(1);
  const Credentials = () => {
    if (!vcState) {
      return null;
    } else {
      const Cards = Object.keys(vcState).map(
        (credentialType, credentialIndex) => {
          const issuer = vcState[credentialType];
          return Object.keys(issuer).map((iss, index) => {
            const { card, vc } = issuer[iss];
            const decoded = jwt.decode(vc);
            const subject = decoded.sub;
            if (subject === wallet.did)
              return (
                <View key={iss}>
                  {(credentialIndex > 0 || index > 0) && (
                    <Divider style={tailwind("mx-2 my-4")} />
                  )}
                  <Credential
                    title={card.title}
                    icon={card.logo.uri}
                    issuedBy={card.issuedBy}
                    textColor={card.textColor}
                    backgroundColor={card.backgroundColor}
                  />
                  <Text
                    onPress={() => detail(credentialType, iss)}
                    style={[tailwind("text-center text-xs text-blue-600 mt-4")]}
                  >
                    View detail
                  </Text>
                </View>
              );
          });
        }
      );
      return <Section>{Cards}</Section>;
    }
  };

  const detail = (credentialType, iss) => {
    navigation.navigate("Credential", {
      credentialType,
      iss,
    });
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
    <Layout>
      <NativeBaseProvider>
        <Box flex={1} bg="white" safeAreaTop>
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

      {/* <Header
        centerComponent={{
          text: "Credentials",
          style: { color: "#fff" },
          onPress: home,
        }}
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: setting,
        }}
        rightComponent={{
          icon: "camera",
          color: "#fff",
          onPress: scanner,
        }}
      /> */}
      <Container>
        <Credentials />
      </Container>
    </Layout>
  );
};
