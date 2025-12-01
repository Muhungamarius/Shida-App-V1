import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shield, X, Ghost } from "lucide-react-native";
import Colors from "@/constants/colors";
import { MOCK_PROFILES } from "@/constants/profiles";

type IntentionType = "friendship" | "building" | "marriage";

export default function ProfileScreen() {
  const [selectedIntention, setSelectedIntention] = useState<IntentionType>("building");
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [ghostModeEnabled, setGhostModeEnabled] = useState<boolean>(false);
  
  const currentProfile = MOCK_PROFILES[0];

  const intentionOptions: { value: IntentionType; label: string }[] = [
    { value: "friendship", label: "Amitié" },
    { value: "building", label: "Construction" },
    { value: "marriage", label: "Mariage" },
  ];

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image 
              source={{ uri: currentProfile.image }} 
              style={styles.avatar} 
              contentFit="cover" 
            />
            <View style={styles.nameRow}>
              <Text style={styles.name}>
                {currentProfile.name}, {currentProfile.age}
              </Text>
              {currentProfile.verified && (
                <View style={styles.verifiedBadge}>
                  <Shield size={16} color={Colors.black} fill={Colors.gold} />
                </View>
              )}
            </View>
          </View>

          <View style={styles.dossierSection}>
            <Text style={styles.dossierTitle}>MON DOSSIER</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>✝️</Text>
                <Text style={styles.infoLabel}>Chrétienne</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoLabel}>Gombe</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>💼</Text>
                <Text style={styles.infoLabel}>Entrepreneur</Text>
              </View>
            </View>
          </View>

          <View style={styles.intentionSection}>
            <View style={styles.intentionButtons}>
              {intentionOptions.map((option) => {
                const isSelected = selectedIntention === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.intentionButton,
                      isSelected && styles.intentionButtonActive,
                    ]}
                    onPress={() => setSelectedIntention(option.value)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.intentionText,
                      isSelected && styles.intentionTextActive,
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.8}
            onPress={() => setShowMatchModal(true)}
          >
            <Text style={styles.actionButtonText}>OUVRIR LES NÉGOCIATIONS</Text>
          </TouchableOpacity>

          <View style={styles.ghostModeSection}>
            <View style={styles.ghostModeHeader}>
              <View style={styles.ghostModeIconContainer}>
                <Ghost size={24} color={Colors.neonPink} />
              </View>
              <View style={styles.ghostModeTextContainer}>
                <Text style={styles.ghostModeTitle}>Mode Fantôme 👻</Text>
                <Text style={styles.ghostModeSubtitle}>Voir sans être vu</Text>
              </View>
            </View>
            <Switch
              value={ghostModeEnabled}
              onValueChange={setGhostModeEnabled}
              trackColor={{ false: Colors.darkGray, true: Colors.neonPink }}
              thumbColor={ghostModeEnabled ? Colors.white : Colors.mediumGray}
              ios_backgroundColor={Colors.darkGray}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={showMatchModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMatchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowMatchModal(false)}
            >
              <X size={24} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>AFFAIRE CONCLUE !</Text>

            <View style={styles.matchVisual}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces" }} 
                style={styles.matchAvatar} 
                contentFit="cover"
              />
              <View style={styles.connectionLine} />
              <Image 
                source={{ uri: currentProfile.image }} 
                style={styles.matchAvatar} 
                contentFit="cover"
              />
            </View>

            <Text style={styles.modalMessage}>Vous avez les mêmes objectifs.</Text>

            <TouchableOpacity 
              style={styles.modalButton}
              activeOpacity={0.8}
              onPress={() => setShowMatchModal(false)}
            >
              <Text style={styles.modalButtonText}>Payer 1 Jeton pour saluer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalSecondaryButton}
              activeOpacity={0.7}
              onPress={() => setShowMatchModal(false)}
            >
              <Text style={styles.modalSecondaryText}>Retour à l&apos;accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center" as const,
    paddingVertical: 40,
    gap: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.gold,
  },
  nameRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  verifiedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.gold,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  dossierSection: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  dossierTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
    letterSpacing: 2,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
    gap: 16,
  },
  infoItem: {
    alignItems: "center" as const,
    gap: 8,
  },
  infoIcon: {
    fontSize: 32,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: Colors.white,
  },
  intentionSection: {
    marginHorizontal: 24,
    marginTop: 40,
  },
  intentionButtons: {
    flexDirection: "row" as const,
    gap: 12,
  },
  intentionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: Colors.darkGray,
    borderRadius: 25,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  intentionButtonActive: {
    backgroundColor: Colors.neonPink,
  },
  intentionText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.mediumGray,
  },
  intentionTextActive: {
    color: Colors.white,
  },
  actionButton: {
    marginHorizontal: 24,
    marginTop: 40,
    backgroundColor: Colors.neonPink,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: "center" as const,
  },
  closeButton: {
    position: "absolute" as const,
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.gold,
    marginBottom: 32,
    textAlign: "center" as const,
    letterSpacing: 2,
  },
  matchVisual: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 20,
    marginBottom: 32,
  },
  matchAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.gold,
  },
  connectionLine: {
    width: 40,
    height: 3,
    backgroundColor: Colors.gold,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: Colors.white,
    textAlign: "center" as const,
    marginBottom: 32,
  },
  modalButton: {
    width: "100%",
    backgroundColor: Colors.neonPink,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 16,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  modalSecondaryButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  modalSecondaryText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.mediumGray,
  },
  ghostModeSection: {
    marginHorizontal: 24,
    marginTop: 32,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    borderWidth: 1,
    borderColor: "#333333",
  },
  ghostModeHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 16,
    flex: 1,
  },
  ghostModeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 0, 127, 0.1)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  ghostModeTextContainer: {
    flex: 1,
    gap: 4,
  },
  ghostModeTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  ghostModeSubtitle: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: Colors.mediumGray,
  },
});
