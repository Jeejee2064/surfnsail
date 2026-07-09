import type { Activity } from "@/lib/content-types";

export const activities: Activity[] = [
  {
    slug: "surfing",
    title: "Surfing",
    subtitle: "Boat-access breaks, all to yourselves",
    heroImage: "/surfing-sunset-waves.jpg",
    midImage: { src: "/surf.jpeg", alt: "A surfer paddling out to a boat-access break in Bocas del Toro" },
    intro:
      "The Bocas del Toro archipelago has some of the best surf breaks in the world. It consists of 7 islands and more than 200 islets, so there are plenty of surf spots to choose from.",
    sections: [
      {
        heading: "Boat-Only Breaks",
        body: [
          "With us, you can enjoy the unique experience of sailing to various surf breaks and anchoring close by. You can enjoy the waves, paddle to the boat to grab something to eat or drink or take a break, and go surfing again, to your heart's content.",
        ],
      },
      {
        heading: "Best Season",
        body: [
          "The best time to surf in Bocas del Toro is December through to March, but it can get very crowded in the more accessible spots — one more reason to reach the breaks by boat.",
        ],
      },
      {
        heading: "All Levels Welcome",
        body: [
          "Board storage is available onboard for the whole trip, and we're happy to pair a surf-focused itinerary with sailing, snorkeling and island time for the rest of your group.",
        ],
      },
    ],
  },
  {
    slug: "sailing",
    title: "Sailing",
    subtitle: "The core Surfnsail experience",
    heroImage: "/sailing.jpg",
    intro:
      "It is difficult to describe the pure joy and sense of euphoria one experiences as soon as the sails are hoisted, the engines are turned off, and you leave the noise and clutter of land behind.",
    sections: [
      {
        heading: "True Freedom",
        body: ["For us, there is no better way to travel and experience true freedom."],
      },
      {
        heading: "Why the Caribbean",
        body: [
          "With its mild weather, calm seas and crystal clear waters, the Caribbean sea is ideal for cruising, and sailing is the best way to enjoy the spectacular views and wildlife it has to offer.",
        ],
      },
      {
        heading: "Wildlife Along the Way",
        body: [
          "Apart from the beautiful scenery, you can expect to see dolphins, rays and many different species of fish and bird underway. If you're lucky, you'll see the bio-luminescence at night or spot a turtle swimming past.",
        ],
      },
      {
        heading: "Featured Route: Sailing to Escudo",
        body: [
          "Our multi-day sail to Escudo de Veraguas is the furthest and wildest route we offer — a remote, uninhabited island reached only by open-water passage. Available September 15 to November 15, weather dependent.",
        ],
      },
    ],
  },
  {
    slug: "fishing",
    title: "Fishing",
    subtitle: "Trolling, casting and bottom fishing offshore",
    heroImage: "/fishing.jpg",
    midImage: { src: "/fishing-sunset.jpeg", alt: "Fishing off the back of the boat at sunset in Bocas del Toro" },
    intro:
      "Trolling off the back, casting off the dinghy, or bottom fishing offshore — however you like to fish, Bocas del Toro's waters give you the chance to do it.",
    sections: [
      {
        heading: "Onboard Gear",
        body: [
          "Fishing and spearfishing equipment is included on every charter, ready to go whenever the conditions are right.",
        ],
      },
      {
        heading: "Catch & Cook",
        body: [
          "Land something worth keeping and our crew will happily prepare it for your next onboard meal.",
        ],
      },
      {
        heading: "Pair It With Diving",
        body: [
          "Marius is an experienced spear-fisherman and free diver, and can guide spearfishing outings for guests who want to go beyond the rod and reel.",
        ],
      },
    ],
  },
  {
    slug: "diving",
    title: "Diving",
    subtitle: "Snorkel, freedive or scuba the reefs of Bocas",
    heroImage: "/diving.jpg",
    intro:
      "Diving in the peaceful Caribbean sea is like entering a different world. With its beautiful coral, abundant sea life, underwater caves and warm water, it is the perfect place to go diving. Whether you love snorkeling, diving or free diving, we have found the perfect place for you.",
    sections: [
      {
        heading: "Snorkeling & Freediving",
        body: [
          "Snorkeling gear is included on every charter, and our captains know the reefs, walls and calm bays best suited to freediving.",
        ],
      },
      {
        heading: "Scuba",
        body: [
          "Ask us about arranging scuba diving for certified guests — we'll point you toward the sites and operators that pair best with your itinerary.",
        ],
      },
      {
        heading: "Spearfishing",
        body: [
          "For the more adventurous, spearfishing gear is onboard and Marius is on hand to guide the outing.",
        ],
      },
    ],
  },
];
