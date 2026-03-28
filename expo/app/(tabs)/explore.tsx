import { Image } from "expo-image";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder, Modal, TouchableOpacity } from "react-native";
import { Shield, X, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";
import { MOCK_PROFILES } from "@/constants/profiles";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [matchedProfile, setMatchedProfile] = useState(MOCK_PROFILES[0]);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    const likedProfile = MOCK_PROFILES[currentIndex];
    setMatchedProfile(likedProfile);
    
    Animated.timing(position, {
      toValue: { x: width + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((prev) => prev + 1);
      position.setValue({ x: 0, y: 0 });
      setShowMatchModal(true);
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((prev) => prev + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.logo}>SHIDA</Text>
        </View>

        <View style={styles.cardZone}>
          {currentIndex >= MOCK_PROFILES.length ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Plus de profils disponibles</Text>
            </View>
          ) : (
            MOCK_PROFILES.map((profile, index) => {
              if (index < currentIndex) return null;
              if (index > currentIndex + 1) return null;

              const isCurrentCard = index === currentIndex;
              const animatedStyle = isCurrentCard
                ? {
                    transform: [
                      { translateX: position.x },
                      { translateY: position.y },
                      { rotate },
                    ],
                  }
                : {};

              return (
                <Animated.View
                  key={profile.id}
                  style={[
                    styles.card,
                    animatedStyle,
                    { zIndex: MOCK_PROFILES.length - index },
                  ]}
                  {...(isCurrentCard ? panResponder.panHandlers : {})}
                >
                  <Image source={{ uri: profile.image }} style={styles.cardImage} contentFit="cover" />
                  <View style={styles.cardGradient}>
                    <View style={styles.cardInfo}>
                      <View style={styles.intentionBadge}>
                        <Text style={styles.intentionText}>{profile.intention}</Text>
                      </View>
                      <View style={styles.nameRow}>
                        <Text style={styles.name}>
                          {profile.name}, {profile.age}
                        </Text>
                        {profile.verified && (
                          <View style={styles.verifiedBadge}>
                            <Shield size={16} color={Colors.black} fill={Colors.gold} />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })
          )}
        </View>
      </View>

      <View style={styles.bottomSection}>
        {currentIndex < MOCK_PROFILES.length && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => swipeLeft()}
              activeOpacity={0.7}
            >
              <X size={40} color={Colors.white} strokeWidth={3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => swipeRight()}
              activeOpacity={0.7}
            >
              <Heart size={44} color={Colors.white} strokeWidth={2.5} fill={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>

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
                source={{ uri: matchedProfile.image }} 
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
  mainContainer: {
    flex: 1,
    flexDirection: "column" as const,
    backgroundColor: Colors.black,
    paddingTop: 60,
  },
  topSection: {
    flex: 0.75,
    backgroundColor: Colors.black,
  },
  bottomSection: {
    flex: 0.25,
    backgroundColor: Colors.black,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center" as const,
  },
  logo: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.neonPink,
    letterSpacing: 4,
  },
  cardZone: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  card: {
    position: "absolute" as const,
    width: width * 0.9,
    height: "90%",
    borderRadius: 20,
    overflow: "hidden" as const,
    backgroundColor: Colors.darkGray,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 60,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    justifyContent: "flex-end" as const,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  cardInfo: {
    padding: 24,
    gap: 12,
  },
  intentionBadge: {
    alignSelf: "flex-start" as const,
    backgroundColor: Colors.neonPink,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  intentionText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  nameRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  name: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  verifiedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gold,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  emptyState: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.mediumGray,
  },
  actionButtons: {
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
    alignItems: "center" as const,
    width: "100%",
    paddingHorizontal: 60,
  },
  rejectButton: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: Colors.darkGray,
    borderWidth: 4,
    borderColor: Colors.mediumGray,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  likeButton: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: Colors.neonPink,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: Colors.neonPink,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 15,
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
});
