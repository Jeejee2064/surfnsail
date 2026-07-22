import type { Locale } from "@/i18n/routing";
import * as enHome from "@/content/en/home";
import * as esHome from "@/content/es/home";
import * as enAbout from "@/content/en/about";
import * as esAbout from "@/content/es/about";
import * as enCrew from "@/content/en/crew";
import * as esCrew from "@/content/es/crew";
import * as enFleet from "@/content/en/fleet";
import * as esFleet from "@/content/es/fleet";
import * as enPackages from "@/content/en/packages";
import * as esPackages from "@/content/es/packages";
import * as enActivities from "@/content/en/activities";
import * as esActivities from "@/content/es/activities";
import * as enReviews from "@/content/en/reviews";
import * as esReviews from "@/content/es/reviews";
import * as enFaq from "@/content/en/faq";
import * as esFaq from "@/content/es/faq";

export function getHomeContent(locale: Locale) {
  return locale === "es" ? esHome : enHome;
}

export function getAboutContent(locale: Locale) {
  return locale === "es" ? esAbout : enAbout;
}

export function getCrewContent(locale: Locale) {
  return locale === "es" ? esCrew : enCrew;
}

export function getFleetContent(locale: Locale) {
  return locale === "es" ? esFleet : enFleet;
}

export function getPackagesContent(locale: Locale) {
  return locale === "es" ? esPackages : enPackages;
}

export function getActivitiesContent(locale: Locale) {
  return locale === "es" ? esActivities : enActivities;
}

export function getReviewsContent(locale: Locale) {
  return locale === "es" ? esReviews : enReviews;
}

export function getFaqContent(locale: Locale) {
  return locale === "es" ? esFaq : enFaq;
}
