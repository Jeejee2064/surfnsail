import type { CrewMember } from "@/lib/content-types";

export const aboutIntro = {
  eyebrow: "Quiénes Somos",
  heading: "Surfnsail",
  body: [
    "Surfnsail fue fundada por Marius y Mireille en 2021, a partir de un amor compartido por el mar y una década navegándolo profesionalmente. Lo que comenzó con un solo bote se ha convertido en una pequeña flota, pero la promesa sigue siendo la misma: un charter impecable y bien llevado, capitaneado por personas que realmente aman esta costa.",
  ],
};

export const captainBoatNote =
  "Marius capitanea Aventura; Jeremy capitanea Exta Sea.";

export const crew: CrewMember[] = [
  {
    slug: "marius-mireille",
    name: "Marius & Mireille",
    role: "Fundadores, Capitán y Operaciones",
    photo: "/mariusmireille.jpg",
    bio: [
      "Surfnsail fue fundada por Marius y Mireille en 2021.",
      "Marius, el capitán, lleva más de 15 años navegando y trabajando en la industria náutica, principalmente en la costa este de Estados Unidos y el Caribe. Es surfista, pescador submarino y buceador libre experimentado, y se asegurará de que disfrutes cada momento de tu viaje y llegues a tu destino con seguridad.",
      "Mireille, quien ha navegado junto a Marius durante los últimos 5 años en Ciudad del Cabo, Sudáfrica, es abogada de profesión — pero dejó su ejercicio del derecho en Sudáfrica para fundar Surfnsail junto a Marius. Ella gestiona las reservas, los pagos y el aprovisionamiento, y se asegurará de que el bote esté siempre impecable, de que nunca falten snacks y bebidas, y de que se atienda cada una de tus necesidades.",
    ],
  },
  {
    slug: "jeremy",
    name: "Jeremy",
    role: "Capitán, Exta Sea",
    photo: "/jeremy.jpeg",
    bio: [
      `Soy capitán profesional desde 2002, tras obtener mi licencia de la Guardia Costera de 100 toneladas ("100 ton masters"). Soy originario de California, pero viví en las Bahamas y Haití durante 28 años antes de mudarme a Panamá. He trabajado extensamente como capitán profesional y recreativo, habiendo sido dueño y vivido en numerosas embarcaciones, además de haber operado muchos barcos de forma profesional. Mi experiencia es amplia y diversa: desde trabajar como primer oficial en un mega yate de 130 pies, hasta construir mi propio velero en Sudáfrica y navegarlo por Sudáfrica y a través del Atlántico en 2004. Fui dueño de una empresa de charters en las Bahamas de 2021 a 2024, y he tenido muchos huéspedes felices navegando con el "Capitán J". ¡Estoy deseando llevarte a ti, a tu familia y a tus amigos en un charter de navegación inolvidable por las islas de Bocas del Toro!`,
    ],
  },
];
