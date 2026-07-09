import type { CrewMember } from "@/lib/content-types";

export const aboutIntro = {
  eyebrow: "Who We Are",
  heading: "Surfnsail",
  body: [
    "Surfnsail was founded by Marius and Mireille in 2021, born out of a shared love of the ocean and a decade spent sailing it professionally. What started with one boat has grown into a small fleet, but the promise hasn't changed: a well-run, immaculately kept charter, captained by people who genuinely love this coastline.",
  ],
};

export const captainBoatNote =
  "Marius captains Aventura; Jeremy captains Exta Sea.";

export const crew: CrewMember[] = [
  {
    slug: "marius-mireille",
    name: "Marius & Mireille",
    role: "Founders, Captain & Operations",
    photo: "/mariusmireille.jpg",
    bio: [
      "Surfnsail was founded by Marius and Mireille in 2021.",
      "Marius, the captain, has been sailing and working in the yachting industry for over 15 years — mostly on the east coast of America and in the Caribbean. He's an experienced surfer, spear-fisherman and free diver, and will ensure that you enjoy every moment of your trip and reach your destination safely.",
      "Mireille, who has been sailing with Marius for the last 5 years in Cape Town, South Africa, is an attorney by profession — but left her law practice in South Africa to start Surfnsail with Marius. She manages the bookings, payments and provisioning, and will ensure that the boat is always neat and clean, that there are always enough snacks and drinks, and that your every need is catered for.",
    ],
  },
  {
    slug: "jeremy",
    name: "Jeremy",
    role: "Captain, Exta Sea",
    photo: "/jeremy.jpeg",
    bio: [
      `I have been a professional captain since 2002 after receiving my 100 ton masters Coast Guard license. I'm originally from California but have lived in the Bahamas and Haiti for 28 years prior to moving to Panama. I have worked extensively as a professional and recreational captain having owned and lived on numerous boats as well as having operated many vessels in a professional capacity. My experience level is vast and diverse having worked as a 1st officer on a 130ft mega yacht all the way to having my own sailboat built in South Africa and skippering it around South Africa and across the Atlantic in 2004. I owned a charter company in the Bahamas from 2021 to 2024 and have had many happy guests sail with "Captain J". I'm looking forward to taking you, your family and your friends on an unforgettable sailing charter through the Bocas Del Toro islands!`,
    ],
  },
];
