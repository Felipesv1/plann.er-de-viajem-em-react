import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { CreateLinksModal } from "./create-links-modal";

interface Links {
  id: string;
  title: string;
  url: string;
}
export function InportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [isLinkInput, setIsLinkInput] = useState(false);

  function openLinkModal() {
    setIsLinkInput(true);
  }
  function closeLinkModal() {
    setIsLinkInput(false);
  }
  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    window.document.location.reload();
  }
  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                target="_blank"
                href={link.url}
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 shrink-0" />
          </div>
        ))}
      </div>
      {isLinkInput && (
        <CreateLinksModal
          setTitle={setTitle}
          setUrl={setUrl}
          closeLinkModal={closeLinkModal}
          createLink={createLink}
        />
      )}
      <Button onClick={openLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
