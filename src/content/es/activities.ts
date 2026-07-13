import type { Activity } from "@/lib/content-types";

export const activities: Activity[] = [
  {
    slug: "surfing",
    title: "Surf",
    subtitle: "Olas accesibles solo por bote, para ustedes solos",
    heroImage: "/surfing-sunset-waves.jpg",
    midImage: { src: "/surf.jpeg", alt: "Un surfista remando hacia una ola accesible solo por bote en Bocas del Toro" },
    intro:
      "El archipiélago de Bocas del Toro tiene algunas de las mejores olas del mundo. Está formado por 7 islas y más de 200 islotes, así que hay muchísimos spots de surf entre los que elegir.",
    sections: [
      {
        heading: "Olas Solo por Bote",
        body: [
          "Con nosotros puedes disfrutar de la experiencia única de navegar hasta distintos spots de surf y anclar cerca. Puedes surfear, remar hasta el bote para comer o beber algo, descansar, y volver a surfear tanto como quieras.",
        ],
      },
      {
        heading: "Mejor Temporada",
        body: [
          "La mejor época para surfear en Bocas del Toro es de diciembre a marzo, aunque los spots más accesibles pueden llenarse mucho — una razón más para llegar a las olas en bote.",
        ],
      },
      {
        heading: "Para Todos los Niveles",
        body: [
          "Contamos con espacio para guardar tablas a bordo durante todo el viaje, y con gusto combinamos un itinerario enfocado en surf con navegación, snorkel y tiempo en las islas para el resto del grupo.",
        ],
      },
    ],
  },
  {
    slug: "sailing",
    title: "Navegación",
    subtitle: "La experiencia central de Surfnsail",
    heroImage: "/sailing.jpg",
    intro:
      "Es difícil describir la pura alegría y la sensación de euforia que se siente en cuanto se izan las velas, se apagan los motores y dejas atrás el ruido y el bullicio de tierra firme.",
    sections: [
      {
        heading: "Libertad Verdadera",
        body: ["Para nosotros, no hay mejor forma de viajar y experimentar la libertad verdadera."],
      },
      {
        heading: "Por Qué el Caribe",
        body: [
          "Con su clima templado, mares tranquilos y aguas cristalinas, el mar Caribe es ideal para navegar, y la vela es la mejor manera de disfrutar de sus vistas y su fauna espectaculares.",
        ],
      },
      {
        heading: "Fauna en el Camino",
        body: [
          "Además del paisaje, puedes esperar ver delfines, rayas y muchas especies de peces y aves durante la navegación. Si tienes suerte, verás la bioluminiscencia de noche o alguna tortuga nadando cerca.",
        ],
      },
      {
        heading: "Ruta Destacada: Navegando a Escudo",
        body: [
          "Nuestra travesía de varios días a Escudo de Veraguas es la ruta más lejana y salvaje que ofrecemos — una isla remota y deshabitada a la que solo se llega por travesía en mar abierto. Disponible del 15 de septiembre al 15 de noviembre, sujeto al clima.",
        ],
      },
    ],
  },
  {
    slug: "fishing",
    title: "Pesca",
    subtitle: "Curricán, lanzado desde el bote auxiliar y pesca de fondo",
    heroImage: "/fishing.jpg",
    midImage: { src: "/fishing-sunset.jpeg", alt: "Pesca desde la popa del bote al atardecer en Bocas del Toro" },
    gallery: [
      { src: "/fishing.jpeg", alt: "Huésped sosteniendo un jurel pescado con curricán en Bocas del Toro", width: 1536, height: 2048 },
      { src: "/fishing2.jpeg", alt: "Huéspedes sosteniendo un dorado pescado en un charter de Surfnsail", width: 3024, height: 4032 },
    ],
    intro:
      "Curricán desde la popa, lanzado desde el bote auxiliar o pesca de fondo mar afuera — como prefieras pescar, las aguas de Bocas del Toro te dan la oportunidad de hacerlo.",
    sections: [
      {
        heading: "Equipo a Bordo",
        body: [
          "El equipo de pesca y pesca submarina está incluido en cada charter, listo para usarse cuando las condiciones lo permitan.",
        ],
      },
      {
        heading: "Pesca y Cocina",
        body: [
          "Si capturas algo que valga la pena, nuestra tripulación lo preparará con gusto para tu próxima comida a bordo.",
        ],
      },
      {
        heading: "Combínalo con Buceo",
        body: [
          "Marius es un pescador submarino y buceador libre experimentado, y puede guiar salidas de pesca submarina para huéspedes que quieran ir más allá de la caña y el carrete.",
        ],
      },
    ],
  },
  {
    slug: "diving",
    title: "Buceo",
    subtitle: "Snorkel, buceo libre o buceo con tanque en los arrecifes de Bocas",
    heroImage: "/diving.jpg",
    intro:
      "Bucear en el apacible mar Caribe es como entrar a otro mundo. Con sus hermosos corales, abundante vida marina, cuevas submarinas y aguas cálidas, es el lugar perfecto para bucear. Ya sea que te guste el snorkel, el buceo o el buceo libre, hemos encontrado el lugar perfecto para ti.",
    sections: [
      {
        heading: "Snorkel y Buceo Libre",
        body: [
          "El equipo de snorkel está incluido en cada charter, y nuestros capitanes conocen los arrecifes, paredes y bahías tranquilas más adecuadas para el buceo libre.",
        ],
      },
      {
        heading: "Buceo con Tanque",
        body: [
          "Pregúntanos por organizar buceo con tanque para huéspedes certificados — te orientaremos hacia los sitios y operadores que mejor combinen con tu itinerario.",
        ],
      },
      {
        heading: "Pesca Submarina",
        body: [
          "Para los más aventureros, el equipo de pesca submarina está a bordo y Marius está disponible para guiar la salida.",
        ],
      },
    ],
  },
];
