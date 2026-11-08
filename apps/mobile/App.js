import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { httpsCallable } from "firebase/functions";
import { StatusBar } from "expo-status-bar";
import { functions } from "./firebase";

export default function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Hello! I’m Netra AI. Your creative journey starts here.");
  const [busy, setBusy] = useState(false);

  async function send() {
    const value = message.trim();
    if (!value || busy) return;
    if (!functions) { setReply("Firebase is not configured. Copy .env.example to .env and add your Firebase app values."); return; }
    setBusy(true); setReply("");
    try {
      const chat = httpsCallable(functions, "chat");
      const result = await chat({ message: value });
      setReply(result.data.reply || "No reply returned.");
      setMessage("");
    } catch (error) { setReply(`Chat error: ${error.message}`); }
    finally { setBusy(false); }
  }

  return <SafeAreaView style={styles.safe}><StatusBar style="light" /><ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.logo}>◈ NETRA <Text style={styles.blue}>AI</Text></Text>
    <Text style={styles.tag}>ONE PLATFORM. MANY POSSIBILITIES.</Text>
    <Text style={styles.title}>Your ideas,{"\n"}<Text style={styles.blue}>amplified by AI.</Text></Text>
    <Text style={styles.sub}>Chat, create, share and discover. Welcome to the beginning of Netra AI.</Text>
    {["✦  AI Chat","◈  Creator Studio","▣  Image & Video","◇  Marketplace"].map(item => <View key={item} style={styles.tile}><Text style={styles.tileText}>{item}</Text></View>)}
    <View style={styles.chat}><Text style={styles.chatTitle}>NETRA ASSISTANT</Text><Text style={styles.reply}>{busy ? "Netra is thinking…" : reply}</Text>
      <TextInput value={message} onChangeText={setMessage} placeholder="Write your message…" placeholderTextColor="#8292aa" style={styles.input} />
      <Pressable onPress={send} disabled={busy} style={styles.button}>{busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send message ↗</Text>}</Pressable>
      <Text style={styles.note}>AI chat needs Firebase setup and a server-side API secret.</Text>
    </View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:"#080d1a"},container:{padding:24,paddingTop:45},logo:{fontSize:23,fontWeight:"800",letterSpacing:2,color:"#fff"},blue:{color:"#65b5ff"},tag:{color:"#65b5ff",fontSize:10,letterSpacing:2,marginTop:55,fontWeight:"700"},title:{fontSize:39,fontWeight:"800",color:"#fff",marginTop:18,lineHeight:47},sub:{color:"#a8b7ce",fontSize:15,lineHeight:24,marginTop:14,marginBottom:26},tile:{backgroundColor:"#101a2c",borderColor:"#263957",borderWidth:1,borderRadius:13,padding:18,marginBottom:10},tileText:{color:"#eaf2ff",fontWeight:"700",fontSize:16},chat:{backgroundColor:"#101a2c",borderColor:"#263957",borderWidth:1,borderRadius:16,padding:17,marginTop:22},chatTitle:{color:"#65b5ff",fontWeight:"800",letterSpacing:1.5,fontSize:11},reply:{color:"#d5e2f5",backgroundColor:"#0a1221",borderRadius:10,padding:14,minHeight:80,marginTop:15,lineHeight:22},input:{backgroundColor:"#0a1221",borderColor:"#304461",borderWidth:1,borderRadius:10,padding:14,color:"#fff",marginTop:12},button:{backgroundColor:"#2684ff",padding:15,borderRadius:10,alignItems:"center",marginTop:10},buttonText:{color:"#fff",fontWeight:"800"},note:{color:"#8292aa",fontSize:11,marginTop:10}
});
