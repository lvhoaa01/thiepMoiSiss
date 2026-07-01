import { InvitationApp } from "@/components/InvitationApp";
import { loadGalleryImages, loadPlan } from "@/lib/serverData";

/**
 * Single-page invitation.
 *
 * The invitation plan (graPlan.csv) and gallery images are read at build time
 * on the server and passed to the client app. The `?guest=` parameter is read
 * client-side inside a small <Suspense> boundary in the hero, which keeps the
 * rest of the page statically prerendered.
 */
export default function Page() {
  const plan = loadPlan();
  const galleryImages = loadGalleryImages();

  return (
    <main>
      <InvitationApp plan={plan} galleryImages={galleryImages} />
    </main>
  );
}
