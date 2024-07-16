import { Link2, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface saveLinksProps {
  closeLinkModal: () => void;
}
export function CreateLinksModal({ closeLinkModal }: saveLinksProps) {
  const { tripId } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    window.document.location.reload();
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>
        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="url"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cadastrar link</h2>
              <button type="button" onClick={closeLinkModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Todos convidados podem visualizar os links importantes.
            </p>
          </div>
          <form onSubmit={createLink} className="space-y-3" action="">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                name="title"
                placeholder="Título do link"
                className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                type="url"
                name="url"
                placeholder="URL"
                className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>
            <Button type="submit" variant="primary" size="full">
              Salvar link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
