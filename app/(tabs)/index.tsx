import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Crown, ArrowRight } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.chainLogo}>
                <View style={styles.chainLinkLeft} />
                <View style={styles.heartGlow} />
                <View style={styles.chainLinkRight} />
              </View>
            </View>
            
            <Text style={styles.brandName}>SHIDA</Text>
            <Text style={styles.tagline}>Là où les affaires de cœur deviennent sérieuses.</Text>
            <Text style={styles.welcomeText}>Bienvenue dans votre espace personnel.</Text>
          </View>

          <View style={styles.cardsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.chartTitle}>VUES DE VOTRE DOSSIER</Text>
              
              <View style={styles.statMainRow}>
                <View style={styles.statContent}>
                  <View style={styles.valueWithTrend}>
                    <Text style={styles.statValue}>34</Text>
                    <View style={styles.trendBadge}>
                      <Text style={styles.trendArrow}>↗</Text>
                      <Text style={styles.trendText}>+12%</Text>
                    </View>
                  </View>
                  <Text style={styles.statSubtext}>cette semaine</Text>
                </View>
              </View>
              
              <View style={styles.chartContainer}>
                <View style={styles.chartPlaceholder}>
                  <View style={[styles.bar, { height: 30 }]} />
                  <View style={[styles.bar, { height: 50 }]} />
                  <View style={[styles.bar, { height: 40 }]} />
                  <View style={[styles.bar, { height: 65 }]} />
                  <View style={[styles.bar, { height: 55 }]} />
                  <View style={[styles.bar, { height: 75 }]} />
                  <View style={[styles.bar, { height: 60 }]} />
                </View>
                <View style={styles.chartLabels}>
                  <Text style={styles.dayLabel}>Lun</Text>
                  <Text style={styles.dayLabel}>Mar</Text>
                  <Text style={styles.dayLabel}>Mer</Text>
                  <Text style={styles.dayLabel}>Jeu</Text>
                  <Text style={styles.dayLabel}>Ven</Text>
                  <Text style={styles.dayLabel}>Sam</Text>
                  <Text style={styles.dayLabel}>Dim</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Crown size={32} color={Colors.gold} strokeWidth={2.5} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>VIP Gold</Text>
                <Text style={styles.statLabel}>Abonnement actif</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.exploreButton}
            activeOpacity={0.8}
            onPress={() => router.push("/explore")}
          >
            <View style={styles.exploreContent}>
              <Text style={styles.exploreText}>EXPLORER LE MARCHÉ</Text>
              <ArrowRight size={28} color={Colors.white} strokeWidth={3} />
            </View>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>12</Text>
              <Text style={styles.infoLabel}>Jetons restants</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>3</Text>
              <Text style={styles.infoLabel}>Négociations actives</Text>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: "center" as const,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  chainLogo: {
    width: 80,
    height: 80,
    position: "relative" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  chainLinkLeft: {
    position: "absolute" as const,
    left: 10,
    top: 20,
    width: 35,
    height: 40,
    borderWidth: 5,
    borderColor: Colors.gold,
    borderRadius: 20,
    transform: [{ rotate: "-15deg" }],
  },
  chainLinkRight: {
    position: "absolute" as const,
    right: 10,
    top: 20,
    width: 35,
    height: 40,
    borderWidth: 5,
    borderColor: Colors.gold,
    borderRadius: 20,
    transform: [{ rotate: "15deg" }],
  },
  heartGlow: {
    position: "absolute" as const,
    width: 20,
    height: 20,
    backgroundColor: Colors.neonPink,
    borderRadius: 10,
    top: 30,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
  },
  brandName: {
    fontSize: 48,
    fontWeight: "700" as const,
    color: Colors.neonPink,
    marginBottom: 8,
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: Colors.gold,
    marginBottom: 16,
    textAlign: "center" as const,
    opacity: 0.9,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: Colors.white,
    opacity: 0.7,
    textAlign: "center" as const,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 20,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#333333",
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 0, 127, 0.1)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 16,
  },
  statContent: {
    marginBottom: 20,
  },
  statValue: {
    fontSize: 42,
    fontWeight: "700" as const,
    color: Colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    opacity: 1,
  },
  chartPlaceholder: {
    flexDirection: "row" as const,
    alignItems: "flex-end" as const,
    gap: 8,
    height: 80,
  },
  bar: {
    flex: 1,
    backgroundColor: Colors.neonPink,
    borderRadius: 4,
    opacity: 0.8,
  },
  premiumBadge: {
    alignSelf: "flex-start" as const,
    backgroundColor: Colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.black,
  },
  exploreButton: {
    marginHorizontal: 24,
    backgroundColor: Colors.neonPink,
    borderRadius: 16,
    overflow: "hidden" as const,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  exploreContent: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 24,
    gap: 12,
  },
  exploreText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.white,
    letterSpacing: 2,
  },
  infoSection: {
    flexDirection: "row" as const,
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: "#333333",
  },
  infoValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.white,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#FFFFFF",
    opacity: 1,
    textAlign: "center" as const,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.white,
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  statMainRow: {
    marginBottom: 24,
  },
  valueWithTrend: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    marginBottom: 6,
  },
  trendBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendArrow: {
    fontSize: 16,
    color: "#22C55E",
    fontWeight: "700" as const,
  },
  trendText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#22C55E",
  },
  statSubtext: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#FFFFFF",
    opacity: 1,
  },
  chartContainer: {
    marginTop: 8,
  },
  chartLabels: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: "#888888",
    flex: 1,
    textAlign: "center" as const,
  },
});
