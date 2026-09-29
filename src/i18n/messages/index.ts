import type { VerifiedLocale } from "../locales";
import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fr, { type Messages } from "./fr";
import pt from "./pt";
import zh from "./zh";

/** Traductions vérifiées, embarquées dans le site. */
export const VERIFIED_MESSAGES: Record<VerifiedLocale, Messages> = { fr, en, es, pt, ar, de, zh };

export type { Messages };
