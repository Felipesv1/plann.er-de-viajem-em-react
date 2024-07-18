import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { InportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { CreateLinksModal } from "./create-links-modal";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isCreateActivityModalOpen, setisCreateActivityModalOpen] =
    useState(false);
  const [isLinkInput, setisLinkInput] = useState(false);
  function openCreateActivityModal() {
    setisCreateActivityModalOpen(true);
  }
  function closeCreateActivityModal() {
    setisCreateActivityModalOpen(false);
  }
  function closeLinkModal(): void {
    setisLinkInput(false);
  }
  function openLinkModal() {
    setisLinkInput(true);
  }
  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.location.reload();
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <InportantLinks openLinkModal={openLinkModal} />
          {isLinkInput && (
            <CreateLinksModal
              closeLinkModal={closeLinkModal}
              setTitle={setTitle}
              setUrl={setUrl}
              createLink={createLink}
            />
          )}
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
