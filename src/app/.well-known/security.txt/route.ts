import { CONTACT_EMAIL, SECURITY_URL, siteUrl } from "@/lib/seo";

// Figé à la construction : la date d'expiration est repoussée à chaque déploiement
export const dynamic = "force-static";

/** security.txt (RFC 9116) : où signaler une faille de sécurité. */
export function GET() {
  const base = siteUrl();
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const lines = [
    `Contact: mailto:${CONTACT_EMAIL}`,
    `Contact: ${SECURITY_URL}`,
    `Expires: ${expires}`,
    "Preferred-Languages: fr, en",
    `Canonical: ${base}/.well-known/security.txt`,
    `Policy: ${base}/securite`,
  ];
  return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
