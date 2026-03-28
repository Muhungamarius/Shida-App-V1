import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

type Conversation = {
  id: string;
  name: string;
  image: string;
  message: string;
  isNew: boolean;
  isAdmin: boolean;
  status: "active" | "waiting" | "admin";
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Naomie, 25",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop",
    message: "J'ai bien reçu votre offre...",
    isNew: true,
    isAdmin: false,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah, 28",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
    message: "En attente de réponse",
    isNew: false,
    isAdmin: false,
    status: "waiting",
  },
  {
    id: "3",
    name: "Équipe Shida",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
    message: "Bienvenue sur Shida !",
    isNew: false,
    isAdmin: true,
    status: "admin",
  },
];

export default function BusinessScreen() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.title}>NÉGOCIATIONS</Text>
          <Text style={styles.subtitle}>3 Affaires en cours</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.card}
              activeOpacity={0.8}
            >
              <Image source={{ uri: conversation.image }} style={styles.avatar} />

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{conversation.name}</Text>
                  {conversation.isNew && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>1</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.cardMessage,
                    conversation.status === "active" && styles.cardMessageActive,
                    conversation.status === "waiting" && styles.cardMessageWaiting,
                    conversation.status === "admin" && styles.cardMessageAdmin,
                  ]}
                >
                  {conversation.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: Colors.white,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row" as const,
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center" as const,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
    marginRight: 8,
  },
  badge: {
    backgroundColor: Colors.neonPink,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  cardMessage: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  cardMessageActive: {
    color: Colors.white,
    fontWeight: "600" as const,
  },
  cardMessageWaiting: {
    color: "#888888",
  },
  cardMessageAdmin: {
    color: Colors.gold,
  },
});
