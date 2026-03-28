export interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  verified: boolean;
  intention: string;
}

export const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Naomie",
    age: 25,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1200&fit=crop&crop=faces",
    verified: true,
    intention: "💍 Mariage & Sérieux",
  },
  {
    id: "2",
    name: "Zara",
    age: 26,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1200&fit=crop&crop=faces",
    verified: true,
    intention: "🤝 Amitié & Réseau",
  },
  {
    id: "3",
    name: "Maya",
    age: 23,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=1200&fit=crop&crop=faces",
    verified: false,
    intention: "🏗️ Business & Projets",
  },
  {
    id: "4",
    name: "Nadia",
    age: 27,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop&crop=faces",
    verified: true,
    intention: "💍 Mariage & Sérieux",
  },
  {
    id: "5",
    name: "Amara",
    age: 25,
    image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=800&h=1200&fit=crop&crop=faces",
    verified: true,
    intention: "🤝 Amitié & Réseau",
  },
];
