# Design System — Bocas Islands Tours

Next.js 16 (App Router) + Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) + Framer Motion 12. Single-page marketing site (`/`) plus dynamic tour detail pages (`/tours/[slug]`).

---

## 1. Fichiers fondation du design (chemins exacts)

```
app/globals.css                     ← palette (@theme inline), base styles, scrollbar, selection
app/layout.js                       ← next/font config (Cormorant Garamond + Inter), <html> font vars, metadata
postcss.config.mjs                  ← @tailwindcss/postcss plugin (Tailwind v4 entrypoint)
package.json                        ← tailwindcss ^4, framer-motion ^12.40.0, next 16.2.6, react 19.2.4

app/components/Navbar.jsx           ← header / nav anatomy
app/components/Hero.jsx             ← hero anatomy + parallax pattern
app/components/Tours.jsx            ← section wrapper + card anatomy (home grid)
app/components/About.jsx            ← image collage + stats pattern
app/components/Gallery.jsx          ← masonry grid + hover reveal pattern
app/components/Testimonials.jsx     ← testimonial card anatomy
app/components/CTA.jsx              ← full-bleed CTA section anatomy
app/components/Footer.jsx           ← footer anatomy
app/components/Lightbox.jsx         ← modal/lightbox anatomy
app/tours/[slug]/page.js            ← tour detail page (InfoBar, Itinerary, Included, Reviews, BookingCTA)
app/context/LanguageContext.jsx     ← EN/ES language state (no design tokens, but drives all copy variants)
app/data/tours.js                   ← per-tour content incl. tagColor classes reused from Tours.jsx
app/page.js                         ← page composition / section order
```

There is **no `tailwind.config.js`/`.ts`** — Tailwind v4 is configured entirely inline in `app/globals.css` via `@theme inline`. This is the single source of truth for color tokens and font variables.

---

## 2. Palette exacte

Defined in [app/globals.css:3-14](app/globals.css#L3-L14) as Tailwind v4 theme tokens:

```css
@theme inline {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-cormorant);

  --color-ocean: #071624;
  --color-navy: #0b1e30;
  --color-deep: #040e18;
  --color-gold: #f5a523;
  --color-gold-light: #ffbf3d;
  --color-teal: #0cc8be;
  --color-cream: #fff5e8;
}
```

| Token | Hex | Rôle sémantique | Usage observé |
|---|---|---|---|
| `--color-ocean` | `#071624` | Fond principal / body background | `bg-[#071624]`, sections Tours/Gallery/Itinerary/Reviews, nav scrolled state `bg-[#071624]/95` |
| `--color-navy` | `#0b1e30` | Fond secondaire (alternance de sections, cards) | About/Testimonials/InfoBar/Included bg, card bg `bg-[#0b1e30]` dans Tours |
| `--color-deep` | `#040e18` | Fond le plus sombre (footer) | `bg-[#040e18]` footer |
| `--color-gold` (`#F5A523`) | `#f5a523` | Couleur d'accent primaire (CTA, accent serif italique, liens hover, prix) | boutons pleins, `text-[#F5A523]` sur mots-clés, badges "tag" |
| `--color-gold-light` | `#ffbf3d` | Hover state du gold (boutons) | `hover:bg-[#ffbf3d]` |
| `--color-teal` (`#0CC8BE`) | `#0cc8be` | Couleur d'accent secondaire (labels de section, bordures CTA outline, éléments décoratifs) | `text-[#0CC8BE]`, séparateurs `h-px bg-[#0CC8BE]`, bouton outline |
| `--color-cream` | `#fff5e8` | Couleur de texte principal (blanc cassé) | `text-[#fff5e8]` à toutes les opacités (`/18` à `/85`) pour hiérarchie de texte |

Note importante : en pratique le code **n'utilise presque jamais les noms de tokens Tailwind** (`bg-ocean`, `text-gold`...) — il utilise des valeurs hex arbitraires directement dans les classes (`bg-[#071624]`, `text-[#F5A523]`, etc.), et parfois en majuscules (`#F5A523`) parfois en minuscules (`#0cc8be` dans le thème vs `#0CC8BE` dans les classes). Le `@theme inline` sert surtout à exposer les font-vars et sert de documentation de palette plutôt que d'API réellement consommée par des classes `bg-ocean`.

Couleurs additionnelles hors palette officielle mais utilisées :
- `#040e18` en tant que `bg-[#040e18]` (= `--color-deep`, cf. Footer)
- Nuances d'opacité systématiques sur le cream via slash-opacity Tailwind : `/85`, `/75`, `/70`, `/65`, `/60`, `/55`, `/50`, `/45`, `/40`, `/35`, `/30`, `/25`, `/20`, `/18`
- Blanc brut : `border-white/5`, `border-white/8`, `border-white/10`, `border-white/15`, `bg-white/20`, `bg-white/30` pour bordures/voiles neutres indépendants du cream
- `text-[9px]`, tags colorés ad hoc par tour dans `tourData.tagColor` (ex: `"bg-[#0CC8BE] text-[#071624]"`, `"bg-[#F5A523] text-[#071624]"`, `"bg-[#fff5e8] text-[#071624]"`)

### Autres couleurs hors thème (globals.css)
```css
body { background-color: #071624; color: #f5f0e8; }   /* note: #f5f0e8 ≠ #fff5e8 (léger écart, probablement voulu identique à cream) */
::selection { background: #c9a96e; color: #0a1628; }   /* gold sourdine, non repris ailleurs dans les composants */
::-webkit-scrollbar-track { background: #0a1628; }
::-webkit-scrollbar-thumb { background: #c9a96e40; }    /* c9a96e avec alpha hex 40 (~25%) */
```
`#f5f0e8`, `#c9a96e`, `#0a1628` sont des couleurs "orphelines" définies uniquement dans globals.css et non réutilisées ailleurs — à harmoniser si on formalise le système.

---

## 3. Typographie

### 3.1 Config next/font exacte ([app/layout.js:1-16](app/layout.js#L1-L16))

```js
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
```

Appliqué sur `<html className={`${cormorant.variable} ${inter.variable}`}>`. `body` utilise `font-family: var(--font-inter), sans-serif;` comme police par défaut (globals.css:29).

Exposé dans Tailwind via `@theme inline`:
```css
--font-sans: var(--font-inter);
--font-serif: var(--font-cormorant);
```
→ utilisable comme `font-sans` (Inter) et `font-serif` (Cormorant Garamond) dans toutes les classes Tailwind.

### 3.2 Rôles

- **`font-serif` (Cormorant Garamond)** — tous les titres (`h1`, `h2`, `h3`), les gros chiffres de stats, les citations de témoignages, le nom de marque dans le header/footer. Toujours combiné avec `font-semibold` (600) pour les titres, ou en `italic` pour le mot-accent (ex: "Bocas **Tours**" en gold italique, "Adventures" en italique).
- **`font-sans` (Inter)** — tout le reste : nav links, boutons, labels de section (tracking large), paragraphes de corps, badges, footer.

### 3.3 Échelle typographique observée (tailles réelles rencontrées)

| Contexte | Classes | Taille / line-height / tracking |
|---|---|---|
| Hero H1 (2 lignes) | `font-serif text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.02em]` | 56px→136px fluid, LH 0.92, tracking -0.02em |
| Tour detail H1 | `font-serif text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.92] tracking-[-0.02em]` | 48px→128px |
| Section H2 (Tours/Gallery) | `font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-tight` | 40px→88px |
| Section H2 (About) | `font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-tight` | 35px→64px |
| Section H2 (Testimonials) | `font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight` | 32px→64px |
| Section H2 (CTA) | `font-serif text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-tight` | 45px→96px |
| Sous-titre tour detail (italique) | `font-serif italic text-[clamp(1.2rem,3vw,2.2rem)] font-normal` | 19px→35px |
| Card title (Tours grid) | `font-serif text-3xl font-semibold` (30px) | |
| Stat value (About) | `font-serif text-5xl font-semibold` (48px, gold) | |
| Prix (BookingCTA) | `font-serif text-6xl font-semibold` (60px, gold) | |
| Citation testimonial | `font-serif italic text-lg leading-snug` (18px) | |
| Body / paragraphes | `font-sans font-normal text-sm leading-relaxed` (14px) | |
| Sous-titre hero | `font-sans font-normal text-base md:text-lg leading-relaxed` | 16px/18px |
| Nav links (desktop) | `font-sans font-medium text-[11px] tracking-[0.22em] uppercase` | |
| Labels de section (eyebrow) | `font-sans font-semibold text-[10px] tracking-[0.4em] uppercase` | tracking le plus large du système |
| Micro-labels (sub-brand, scroll indicator) | `font-sans font-medium text-[9px] tracking-[0.35em]` / `tracking-[0.4em]` | |
| Boutons | `font-sans font-bold/semibold text-[11px] tracking-[0.2em]/[0.22em] uppercase` | |

**Pattern de tracking uppercase** : le système a une échelle de letter-spacing quasi standardisée pour tout texte `uppercase` en petite taille :
- `tracking-[0.18em]` — logo, switch langue
- `tracking-[0.2em]` — boutons, badges tag
- `tracking-[0.22em]` — nav links, CTA hero
- `tracking-[0.25em]/[0.3em]` — labels secondaires (subtitle card, footer headers)
- `tracking-[0.35em]/[0.4em]` — eyebrow labels de section, micro-taglines

---

## 4. Tokens : spacing, radius, ombres, breakpoints

### Spacing
Pas de scale custom — utilise l'échelle Tailwind par défaut. Valeurs récurrentes :
- Section padding vertical : `py-32` (home sections), `py-24`/`py-20` (tour detail sub-sections), `py-40` (CTA hero-like)
- Container : `max-w-7xl mx-auto px-6` (home sections/nav/footer), `max-w-5xl mx-auto px-6` (tour detail), `max-w-3xl`/`max-w-2xl`/`max-w-xl` pour blocs de texte centrés
- Grilles cards : `gap-5` (Tours, Testimonials), `gap-3` (Gallery), `gap-12`/`gap-16`/`gap-24` (About, Footer)

### Radius
Le système est **presque entièrement anguleux** (pas de `rounded` sur les surfaces principales — boutons, cards, sections sont à angles droits). Le radius n'apparaît que sur des éléments circulaires/décoratifs :
- `rounded-full` — avatars/icônes rondes (hamburger n'en a pas besoin), pastilles Included (`w-6 h-6 rounded-full`), point de timeline itinéraire (`w-3 h-3 rounded-full`), icônes cercle CTA gallery (`w-11 h-11 rounded-full`, `w-12 h-12 rounded-full`), point décoratif About (`w-2 h-2 rounded-full`), dots lightbox pagination (`rounded-full`)
- Aucun `rounded-md`/`rounded-lg`/`rounded-xl` utilisé nulle part dans les composants → c'est un choix esthétique délibéré (style éditorial/luxe à arêtes vives), pas un oubli.

### Ombres
Aucune `box-shadow`/`shadow-*` Tailwind utilisée dans tout le projet. La profondeur est créée uniquement par superposition d'**overlays en dégradé** (`bg-gradient-to-b/t/r` avec couleurs à opacité) et de `backdrop-blur-sm`/`backdrop-blur-md`, jamais par des ombres portées.

### Breakpoints
Utilise les breakpoints Tailwind par défaut (`sm:`640px, `md:`768px, `lg:`1024px) — pas de breakpoints custom déclarés. `md:` est le point de bascule dominant (nav desktop/mobile, grids 1→2 colonnes). `lg:` sert pour About (grid 2 colonnes) et Experience section du tour detail.

---

## 5. Contenu pertinent de globals.css (intégral)

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-cormorant);

  --color-ocean: #071624;
  --color-navy: #0b1e30;
  --color-deep: #040e18;
  --color-gold: #f5a523;
  --color-gold-light: #ffbf3d;
  --color-teal: #0cc8be;
  --color-cream: #fff5e8;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #071624;
  color: #f5f0e8;
  font-family: var(--font-inter), sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #c9a96e;
  color: #0a1628;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0a1628;
}
::-webkit-scrollbar-thumb {
  background: #c9a96e40;
  border-radius: 2px;
}
```

Il n'y a **pas** de fichier `tailwind.config.js`. `postcss.config.mjs` ne fait que charger `@tailwindcss/postcss` — toute la personnalisation Tailwind v4 (CSS-first) vit dans ce `@theme inline` ci-dessus.

---

## 6. Tokens de motion (Framer Motion)

Toutes les animations utilisent `framer-motion` (`motion.div`, `useScroll`, `useTransform`, `AnimatePresence`). Pas de `@keyframes` CSS custom dans globals.css — tout le motion est en JS.

### 6.1 Easings récurrents
- `[0.16, 1, 0.3, 1]` — easing "signature" du site, utilisé sur quasi tous les reveals de titres/nav/hero (headline slide-up, nav entrance, mobile menu, About collage) — un ease-out très prononcé (overshoot doux)
- `[0.25, 0.46, 0.45, 0.94]` — utilisé spécifiquement pour les cards Tours (`cardVariants`)
- `"easeInOut"` — utilisé pour la boucle infinie du scroll indicator

### 6.2 Durées standard
| Durée | Usage |
|---|---|
| `0.2s` | micro-transitions (icône close, hover léger) |
| `0.25s`–`0.3s` | lightbox fade/scale, hamburger lines |
| `0.35s` | mobile menu overlay |
| `0.4s`–`0.5s` | reveals de liste (highlights, itinerary items) |
| `0.6s`–`0.7s` | reveal de cards au scroll |
| `0.8s`–`0.9s` | reveal de headers de section |
| `1s` | reveal des headlines hero (slide-up depuis `y: "100%"`) |
| `2s` (repeat: Infinity) | pulsation du scroll indicator |

### 6.3 Patterns d'animation

**A. Scroll-reveal (le plus utilisé, "whileInView")**
```jsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
```
Variante latérale pour blocs image/texte (About, Experience) : `x: -50`/`x: 50` → `x: 0`.
Variante cards avec stagger custom (Tours) :
```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
// usage: custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
```
Stagger simple par index sans variants (Itinerary, listes) : `transition={{ delay: i * 0.06 to 0.1, duration: 0.5-0.6 }}`.

**B. Parallax scroll (Hero + Tour detail hero)**
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "8%"]); // Hero only
```
Appliqué sur l'image de fond en `scale-110` (marge pour le déplacement parallax) via `style={{ y: imgY }}`, et sur le contenu via `style={{ opacity: contentOpacity, y: contentY }}`.

**C. Text reveal "clip/slide"** (headlines hero et tour detail)
```jsx
<div className="overflow-hidden">              {/* masque */}
  <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }}
    transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}>
    {headline}
  </motion.h1>
</div>
```

**D. Entrée de page (Navbar)**
```jsx
initial={{ y: -100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
```

**E. Hover interactions**
- Cards : `group-hover:scale-105` sur l'image (`duration-700 ease-out`), bordure qui apparaît `border-2 border-[#F5A523]/0 group-hover:border-[#F5A523]/30 transition-all duration-500`
- Boutons : `hover:bg-[#ffbf3d]` (gold plein) ou `hover:bg-[#0CC8BE] hover:text-[#071624]` (outline teal → fill) avec `transition-colors duration-300`
- Liens texte : `hover:text-[#F5A523] transition-colors duration-300`
- Micro-detail : tracking qui s'élargit au hover sur "Learn More" (`group-hover:tracking-[0.35em]`)
- Gallery : zoom image `scale(1.07)` géré en `style` inline + `transition-transform duration-700`, overlay d'assombrissement qui s'inverse (`opacity: hovered ? 0 : 0.18`), icône expand qui fade in (`opacity-0 group-hover:opacity-100`)

**F. Loop infini (Hero scroll indicator)**
```jsx
animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

**G. AnimatePresence** — utilisé pour : menu mobile (Navbar), overlay de titre au hover (Gallery), Lightbox (montage/démontage).

---

## 7. Anatomie des composants clés

### 7.1 Header / Navbar ([app/components/Navbar.jsx](app/components/Navbar.jsx))

Structure :
```
<motion.nav fixed top-0 inset-x-0 z-50>       ← state "scrolled" (scrollY>80) ou menuOpen bascule le style
  <div max-w-7xl mx-auto px-6 flex justify-between>
    <a Logo>                                   ← nom en font-serif + sous-titre micro en font-sans
    <div Desktop nav hidden md:flex gap-9>     ← liens uppercase 11px tracking-[0.22em]
    <div Right>
      <LangSwitcher EN | ES>                   ← actif = gold, inactif = cream/30
      <a Book CTA hidden md:block>              ← bouton plein gold
      <button Hamburger md:hidden>              ← 3 lignes motion (rotate/scale pour X)
  <AnimatePresence Mobile menu overlay fixed inset-0>  ← liens géants font-serif text-4xl, stagger 0.07s
```
Style "scrolled": `bg-[#071624]/95 backdrop-blur-md border-b border-white/8 py-4` vs transparent `py-6` en haut.

### 7.2 Hero ([app/components/Hero.jsx](app/components/Hero.jsx))

Structure : `section h-screen` → image parallax (`scale-110` + `useTransform` y) → double overlay gradient (`to-b` + `to-r`, tous en `#071624` à opacités variables) → contenu centré (badge localisation avec traits `h-px w-10 bg-[#0CC8BE]`, 2x H1 en clip-reveal, sous-titre, 2 CTA, indicateur de scroll animé en boucle).
Pattern CTA hero : bouton plein (`bg-[#F5A523] text-[#071624]`) + bouton outline (`border-2 border-[#0CC8BE] text-[#0CC8BE]` → hover fill teal).

### 7.3 Boutons (pattern transversal, pas de composant `<Button>` dédié — classes dupliquées à chaque usage)

**Bouton plein (primary)** :
```
px-10 py-4 bg-[#F5A523] text-[#071624] text-[11px] tracking-[0.2em]/[0.22em] uppercase font-sans font-bold hover:bg-[#ffbf3d] transition-colors duration-300
```
**Bouton outline (secondary)** :
```
px-10 py-4 border-2 border-[#0CC8BE] text-[#0CC8BE] text-[11px] tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#0CC8BE] hover:text-[#071624] transition-all duration-300
```
**Bouton nav (compact)** : `px-6 py-2.5` au lieu de `px-10 py-4`, sinon identique au plein.
Tous les boutons sont à angles droits (aucun `rounded-*`), toujours en majuscules avec tracking large, jamais d'ombre.

### 7.4 Cards

**Tour card (home grid)** — [app/components/Tours.jsx:169-224](app/components/Tours.jsx#L169-L224) :
```
<Link><motion.div className="group relative overflow-hidden bg-[#0b1e30] cursor-pointer">
  <div h-72 image + tag badge absolute top-4 left-4>
  <div p-7>
    <h3 title (serif, group-hover:gold) + subtitle (teal, tracking-[0.3em])>
    <span duration (cream/35)>
    <p description>
    <div arrow-link "Learn More" + svg flèche animée>
  <div hover border overlay (border-2 border-gold/0 → /30)>
```
Aucun radius, aucune ombre — profondeur uniquement via zoom d'image au hover et apparition de bordure.

**Testimonial card** — [app/components/Testimonials.jsx:127-150](app/components/Testimonials.jsx#L127-L150) :
```
bg-[#071624] p-8 border border-white/5 flex flex-col group hover:border-[#F5A523]/20
  <Stars /> (5 polygones SVG gold)
  <blockquote font-serif italic text-lg text-cream/85>
  <footer border-t border-white/8> name + country | tag pill (bg-teal/10 border-teal/20)
```

### 7.5 Section wrapper (pattern commun à toutes les sections)

```
<section id="..." className="py-32 px-6 bg-[#071624|#0b1e30]">   ← alternance ocean/navy entre sections
  <div className="max-w-7xl mx-auto">
    [optional separator: <div className="h-px bg-gradient-to-r from-transparent via-[#F5A523|0CC8BE]/25 to-transparent mb-20" />]
    <motion.div header: eyebrow (traits + label teal/gold tracking-[0.4em]) + H2 (serif, mot-clé italique accent) + sub (cream/55) />
    [content grid]
```
Alternance de fond systématique : Hero(image) → Tours(`#071624`) → About(`#0b1e30`) → Gallery(`#071624`) → Testimonials(`#0b1e30`) → CTA(image+overlay) → Footer(`#040e18`).

### 7.6 Footer ([app/components/Footer.jsx](app/components/Footer.jsx))

```
<footer bg-[#040e18] border-t border-white/5>
  <div max-w-7xl grid md:grid-cols-3 gap-12 py-16>
    <col Brand: logo + tagline (cream/40)>
    <col Experiences: heading (cream/55, tracking-[0.3em]) + liste liens (cream/40 → hover gold)>
    <col Contact: heading + liste + icônes sociales SVG inline (cream/30 → hover gold)>
  <div border-t border-white/5>
    <div flex justify-between py-5> copyright (cream/18) + localisation
```

### 7.7 Lightbox (modal réutilisable) ([app/components/Lightbox.jsx](app/components/Lightbox.jsx))

```
<AnimatePresence><motion.div fixed inset-0 z-[200] bg-black/95 onClick=close>
  <button Close top-5 right-5>
  <div Counter "n / total" top-5 center>
  <button Prev left-4/8>
  <motion.div Image max-w-5xl max-h-[85vh] object-contain>
  <button Next right-4/8>
  <div Thumbnail dots bottom-5: actif = w-4 h-1.5 bg-gold pill, inactif = w-1.5 h-1.5 bg-white/30>
```
Navigation clavier (Escape/ArrowLeft/ArrowRight), body scroll lock pendant l'ouverture — même pattern répété dans Gallery.jsx et tours/[slug]/page.js.

---

## 8. Résumé des règles de style implicites (pour rester cohérent)

1. **Jamais de `rounded-*`** sur boutons/cards/sections — uniquement sur éléments circulaires (icônes, dots, pastilles).
2. **Jamais de `box-shadow`** — la profondeur vient des gradients d'overlay et `backdrop-blur`.
3. **Toute majuscule (`uppercase`) implique un tracking large** (`0.18em` à `0.4em`), jamais de uppercase sans letter-spacing.
4. **Titres = `font-serif font-semibold`**, mot-clé d'accent en `italic text-[#F5A523]` ou `text-[#0CC8BE]` selon le contraste voulu.
5. **Corps de texte = `font-sans`**, quasi toujours `text-[#fff5e8]` avec une opacité (jamais de gris neutre séparé — toute la hiérarchie de texte passe par l'opacité du cream).
6. **Alternance de fond** entre sections : `#071624` (ocean) ↔ `#0b1e30` (navy), footer toujours `#040e18` (deep).
7. **CTA toujours par paire** : un bouton plein gold + un bouton outline teal.
8. **Reveal au scroll systématique** (`whileInView` + `viewport={{ once: true }}`) sur quasiment tout bloc de contenu, jamais d'apparition brute sans transition.
