import { getCapabilities } from "@/lib/server/capabilities";

// Figé à la construction : les capacités ne changent qu'avec un nouveau déploiement
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getCapabilities());
}
