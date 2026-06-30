import { InvitationApp } from "@/components/InvitationApp";

/**
 * The whole experience lives on a single page.
 *
 * The only dynamic input is the `?guest=` parameter, which is read client-side
 * inside a small <Suspense> boundary in the hero (see `components/GuestName`).
 * Scoping it there keeps the rest of the page statically prerendered.
 */
export default function Page() {
  return (
    <main>
      <InvitationApp />
    </main>
  );
}
