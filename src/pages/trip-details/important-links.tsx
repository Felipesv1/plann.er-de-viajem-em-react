import { Link2, Plus, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
// import { useParams } from "react-router-dom";
// import { api } from "../../lib/axios";
import { useState } from "react";

// interface ImportantLinksProps {
//   title: string;
//   url: string;
// }
export function InportantLinks() {
  // const { tripId } = useParams();
  // await api.post(`/trips/${tripId}/links`, {
  //   title,
  //   url,
  // });
  const [isLinkInput, setIsLinkInput] = useState(false);

  function OpenLinkModal() {
    setIsLinkInput(true);
  }
  function CloseLinkModal() {
    setIsLinkInput(false);
  }
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="text-zinc-400 shrink-0" />
        </div>
      </div>
      {isLinkInput && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar link</h2>
                <button type="button" onClick={CloseLinkModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Todos convidados podem visualizar os links importantes.
              </p>
            </div>
            <form
              onSubmit={(ev) => ev.preventDefault()}
              className="space-y-3"
              action=""
            >
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="text-zinc-400 size-5" />
                <input
                  name="name"
                  placeholder="Título do link"
                  className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
                  // onChange={(event) => setOwnerName(event.target.value)}
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link2 className="text-zinc-400 size-5" />
                <input
                  type="url"
                  name="email"
                  placeholder="URL"
                  className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
                  // onChange={(event) => setOwnerEmail(event.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="full">
                Salvar link
              </Button>
            </form>
          </div>
        </div>
      )}
      <Button onClick={OpenLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
