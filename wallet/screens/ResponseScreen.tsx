// import * as Linking from "expo-linking";
// import * as React from "react";
// import { Alert, Image, View } from "react-native";
// import {
//   Card,
//   Divider,
//   Button,
//   Header,
//   CheckBox,
//   Text,
// } from "react-native-elements";
// import AsyncStorage from "@react-native-community/async-storage";



import * as Linking from "expo-linking";
import * as React from "react";
import { Alert, Image, View } from "react-native";
import {
  Card,
  Divider,
  Button,
  Header,
  CheckBox,
  Text,
} from "react-native-elements";
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
import tailwind from "tailwind-rn";
import axios from "axios";

//redirect追加
//npm install react-router-dom --save
import { Redirect } from 'react-router';

// import axios from "axios";
// import tailwind from "tailwind-rn";

import Container from "../components/atoms/Container";
import Layout from "../components/atoms/Layout";
import Section from "../components/atoms/Section";
import Credential from "../components/molecules/Credential";
import { WalletContext } from "../contexts";
import { initializeResponse } from "../hooks";
import {
  Wallet,
  jwt,
  generateState,
  generateHash,
  generateVerifier,
} from "../modules";
import Linkify from "../components/atoms/Linkify";
import { backgroundColor } from "styled-system";


//書き足した
// import cors from 'cors';
// import express from "express";
// const app = express();
// app.use(cors({ origin: true, credentials: true }));
// Access-Control-Allow-Origin: http://localhost:19006
// Access-Control-Allow-Credentials: true

// JSON送受信のクライアント
import { XMLHttpRequest } from 'xmlhttprequest';
// npm install xmlhttprequest


//homeより
// return (
//   <Layout>
//     <NativeBaseProvider>
//       <Box flex={1} bg="white" safeAreaTop>
//         <Center flex={1}></Center>
//         <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
//           <Pressable
//             cursor="pointer"
//             opacity={selected === 0 ? 1 : 0.5}
//             py="3"
//             flex={1}
//             onPress={() => home()}>
//
//             <NativeBaseProvider />
//
//             <Center>
//               <Icon
//                 mb="1"
//                 as={
//                   <MaterialCommunityIcons
//                     name={selected === 0 ? 'card-account-details' : 'card-account-details-outline'}
//                   />
//                 }
//                 color="white"
//                 size="sm"
//               />
//               <Text >
//                 credentials
//               </Text>
//             </Center>
//           </Pressable>
//
//
//
//
//
//         </HStack>
//       </Box>
//     </NativeBaseProvider>
//
//     <Container>
//       <Credentials />
//     </Container>
//   </Layout>
// );


const qs = require("querystring");

export default ({ navigation }) => {
  const wallet = React.useContext(WalletContext) as Wallet;
  const [selectedVc, setselectedVc] = React.useState<any>();
  const {
    manifestState,
    requestState,
    modeState,
    vcState,
    presentaionManifestState,
    idTokenState,
  } = initializeResponse();

  // alert(`idtokestate: ${idTokenState}`)





//以下追加部分
//result追加(できてる)
  const result = () => {
    navigation.navigate("Result");
  };

//取得したい JSON がある URL を変数へ代入
// const requestURL = 'http://localhost:3001'
//ここまで






  // すべてのstateを読み込む
  const isLoadingComplete = manifestState && requestState && modeState;

  const submit = async () => {
    let attestations;

    if (
      manifestState.input.attestations.idTokens &&
      manifestState.input.attestations.presentations
    ) {
      attestations = {
        idTokens: {
          [manifestState.input.attestations.idTokens[0]
            .configuration]: idTokenState,
        },
        presentations: {
          [manifestState.input.attestations.presentations[0].credentialType]:
            vcState.vc,
        },
      };
      alert("attestations1");
      alert(attestations);
    } else if (
      manifestState.input.attestations.idTokens &&
      !manifestState.input.attestations.presentations
    ) {
      attestations = {
        idTokens: {
          [manifestState.input.attestations.idTokens[0]
            .configuration]: idTokenState,
        },
      };

      if (modeState === "present") {
        alert('Credential is Verified!');
        //アラートが出る部分、ここをリンクするようにすればいい、付け足した部分
        // id(?)の患者の検査結果がjsonでほしいと病院サーバーに送り、レスポンス待ちしたい
        //JSON送受信のクライアント

//ここから書き足し(SQLから持ってくる場合)
        //jsonを読み込んで条件分岐するものを書く
        //取得したい JSON がある URL を変数へ代入
        // const requestURL = 'http://localhost:3001'
        //IDのデータ
        // var myID = {"id": 1};
        //JSをJSONにエンコード
        // var json_text = JSON.stringify(myID);

        //リクエストを定義
        // let request = new XMLHttpRequest();
        //リクエスト作る
        // request.open('POST', requestURL, true);
        // request.setRequestHeader('Content-Type', 'application/json');
        // request.responseType = 'json';
        // //返って来るの待ちonload
        // request.onload = function() {
        //   const res = request.responseText;
        //   const resObject = JSON.parse(res);
        //   console.log(resObject);
          //console.log(json_text);
        // };

        //リクエスト送る
        // request.send();
        //console.log(json_text);
        //入ってはいる
        // request.send(json_text);


//ここまで書き足した




//SQLでないデータを使う場合
const requestURL = 'http://localhost:3001'
//XMLHttpRequest から新しいリクエストオブジェクトをつくる

//IDのデータ
var myID = {"ID": 1};
//JSをJSONにエンコード
var json_text = JSON.stringify(myID);

//リクエストを定義
let request = new XMLHttpRequest();
//リクエスト作る
// request.open('GET', requestURL);
request.open('POST', requestURL, true);
request.setRequestHeader('Content-Type', 'application/json');
request.responseType = 'json';
//返って来るの待ちonload
request.onload = function() {
  const res = request.responseText;
  const resObject = JSON.parse(res);
  console.log(resObject.members[1]);
  //console.log(json_text);
};

//リクエスト送る
// request.send();
//console.log(json_text);
//入ってはいる
request.send(json_text);


//ここまで




      }
      if (modeState === "receive") {
        alert('Credential is Issued!');
        // id(?)の患者の検査結果がjsonでほしいと病院サーバーに送り、レスポンス待ちしたい
      }
      // alert("attestations2");
      // alert(`${attestations}`);
      console.log("manifest", manifestState.input.attestations.idTokens);
      console.log("attestation", attestations);


    } else if (
      !manifestState.input.attestations.idTokens &&
      manifestState.input.attestations.presentations
    ) {
      attestations = {
        presentations: {
          [manifestState.input.attestations.presentations[0].credentialType]:
            selectedVc.vc,
        },
      };
      console.log(attestations);
      alert("attestations3");
      alert(attestations);
    }

    if (modeState === "receive") {
      const payload = {
        aud: manifestState.input.credentialIssuer,
        contract:
          requestState.presentation_definition.input_descriptors[0].issuance[0]
            .manifest,
        attestations,
      };


      const selfIssuedIdToken = wallet.siop(payload);
      console.log(selfIssuedIdToken);
      console.log(manifestState.input.credentialIssuer);
      const vcResponse = await axios.post(
        manifestState.input.credentialIssuer,
        selfIssuedIdToken,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      const original = await AsyncStorage.getItem("@vc");
      let parsed;
      let vc;
      if (original) {
        parsed = JSON.parse(original);
        vc = {
          ...parsed,
          [requestState.presentation_definition.input_descriptors[0].schema
            .uri[0]]: {
            ...parsed[
            requestState.presentation_definition.input_descriptors[0].schema
              .uri[0]
            ],
            [manifestState.input.issuer]: {
              vc: vcResponse.data.vc,
              card: manifestState.display.card,
            },
          },
        };
      } else {
        vc = {
          [requestState.presentation_definition.input_descriptors[0].schema
            .uri[0]]: {
            [manifestState.input.issuer]: {
              vc: vcResponse.data.vc,
              card: manifestState.display.card,
            },
          },
        };
      }
      await AsyncStorage.setItem("@vc", JSON.stringify(vc));
    } else if (modeState === "present") {
      const decoded = jwt.decode(selectedVc.vc);
      const pairwise = new Wallet();
      const exchangePayload = wallet.createExchangePayload(
        selectedVc.vc,
        decoded.vc.exchangeService.id,
        pairwise.did
      );
      const vcResponse = await axios.post(
        decoded.vc.exchangeService.id,
        exchangePayload,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      const attestations = {
        presentations: {
          [requestState.presentation_definition.input_descriptors[0].schema
            .uri[0]]: vcResponse.data.vc,
        },
      };
      const payload = {
        aud: requestState.redirect_uri,
        nonce: requestState.nonce,
        state: requestState.state,
        attestations,
      };

      const selfIssuedIdToken = pairwise.siop(payload);
      await axios.post(
        requestState.redirect_uri,
        qs.stringify({
          id_token: selfIssuedIdToken,
          state: requestState.state,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log("de", decoded);
      console.log("pair", pairwise);
      console.log("pay", payload);
      console.log("attes", attestations);
      console.log("vcres", vcResponse);
      console.log();
       return;
    }

//画面遷移
    window.location.href = window.location.href.split(/[?#]/)[0];
    navigation.navigate("Home");
  };

  const submit2 = async () => {

  }

  const authenticate = async (openIdConfigurationUri, client_id) => {
    console.log(openIdConfigurationUri);
    const openIdConfigurationResponse = await axios.get(openIdConfigurationUri);
    const openIdConfiguration = openIdConfigurationResponse.data;
    // const redirect_uri = "https://browser-wallet.azurewebsites.net/";
    const ranbomState = generateState();
    const codeVerifier = generateVerifier();
    const codeChallenge = generateHash("sha256", codeVerifier);
    await AsyncStorage.setItem("@state", ranbomState);
    await AsyncStorage.setItem("@code_verifier", codeVerifier);
    const redirect_uri = ` http://localhost:19006/`;
    // const authorizationUri = `${openIdConfiguration.authorization_endpoint}&redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=code&scope=openid&state=${ranbomState}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    // const authazuread = `${openIdConfiguration.authorization_endpoint}?client_id=${client_id}&response_type=id_token&redirect_uri=${redirect_uri}&response_mode=form_post&scope=openid&state=12345&nonce=123456`;
    const authfromb2c = `https://publisherb2c.b2clogin.com/publisherb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_B2C_peerReview&client_id=7c639d63-26d7-40aa-8996-768bb8a53c52&nonce=defaultNonce&state=${ranbomState}&redirect_uri=http%3A%2F%2Flocalhost%3A19006&scope=openid&response_type=code+id_token&prompt=login&response_mode=query`;
    console.log(client_id);
    Linking.openURL(authfromb2c);
  };

  const CredentialsToBeIssued = () => {
    return (
      <Section>
        <Credential
          title={manifestState.display.card.title}
          icon={manifestState.display.card.logo.uri}
          issuedBy={manifestState.display.card.issuedBy}
          textColor={manifestState.display.card.textColor}
          backgroundColor={manifestState.display.card.backgroundColor}
        />
      </Section>
    );
  };


  const IdTokensToBeSubmitted = () => {
    const idToken = manifestState.input.attestations.idTokens[0];
    const hostname = Linking.parse(idToken.configuration).hostname as string;
    return (
      <Card>
        <Card.Title>Sign-in Required</Card.Title>
        <Card.Divider />
        <Button
          type="outline"
          disabled={idTokenState !== ""}
          title={hostname}
          onPress={() => {
            authenticate(idToken.configuration, idToken.client_id);
          }}

        />
      </Card>
    );
  };

  const CredentialsToBeSubmitted = () => {
    return (
      <>
        <Card>
          <Card.Title>Credentials Requested From</Card.Title>
          <Card.Divider />
          <Image
            style={tailwind("left-0 top-4 m-2 w-10 h-10 rounded-full")}
            source={{ uri: requestState.registration.logo_uri }}
          ></Image>
          <Text style={tailwind("top-0 right-0 m-2")}>
            {requestState.registration.client_name}
          </Text>
          <Text style={[tailwind("text-sm m-2")]}>
            <Linkify>{`Terms of Service: ${requestState.registration.tos_uri}`}</Linkify>
          </Text>
        </Card>
        <Card>
          <Card.Title>Credentials Required</Card.Title>
          <Card.Divider />
          {Object.keys(vcState).map((key, index) => {
            const { card, vc } = vcState[key];
            const decoded = jwt.decode(vc);
            const subject = decoded.sub;
            if (subject === wallet.did)
              return (
                <Section key={key}>
                  <Credential
                    title={card.title}
                    icon={card.logo.uri}
                    issuedBy={card.issuedBy}
                    textColor={card.textColor}
                    backgroundColor={card.backgroundColor}
                    size="40"
                  />
                  <CheckBox
                    title="Click Here"
                    checked={selectedVc === vcState[key]}
                    onPress={() => setselectedVc(vcState[key])}
                  />
                </Section>
              );
          })}
        </Card>
      </>
    );
  };

  const home = () => {
    window.location.href = window.location.href.split(/[?#]/)[0];
    navigation.navigate("Home");
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    console.log("isLoading");
    return (
      <Layout>

        <Header
          leftComponent={{ icon: "chevron-left", color: "#fff", onPress: home }}
          centerComponent={{
            text:
              modeState === "receive"
                ? "Receive Credentials"
                : "Present Credentials",
            style: { color: "#fff" },
          }}
          backgroundColor="#3949AB"
        />

        <Container>
          {modeState !== "present" && <CredentialsToBeIssued />}
          <Divider />
          {manifestState.input.attestations.idTokens &&
            modeState !== "present" && <IdTokensToBeSubmitted />}
          {vcState && modeState === "present" && <CredentialsToBeSubmitted />}
          <Button
            buttonStyle={{ backgroundColor: '#3949AB' }}
            style={
              tailwind("m-4 mt-8")
            }
            title="Submit"
            // disabled={idTokenState === ""}
            onPress={submit}
          />


          <Button
            buttonStyle={{ backgroundColor: '#3949AB' }}
            style={
              tailwind("m-4 mt-8")
            }
            title="PeopleResult"
            // disabled={idTokenState === ""}
            onPress={result}
          />




        </Container>
      </Layout>
    );
  }
};
