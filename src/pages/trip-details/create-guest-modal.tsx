import { Calendar, User, X } from "lucide-react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent, useEffect, useState } from "react";
interface tripGuest {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  owner_name: string;
  owner_email: string;
}

interface ParticipantProps {
  closeModalGuest: () => void;
}
export function CreateGuestModal({ closeModalGuest }: ParticipantProps) {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<tripGuest | undefined>();
  //   const [ownerName, setOwnerName] = useState("");
  //   const [ownerEmail, setOwnerEmail] = useState("");
  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  async function createGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.location.reload();
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar Participação</h2>
            <button type="button" onClick={closeModalGuest}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Você foi Convidado(a) para participar de uma viajem para{" "}
            <span className="font-semibold text-zinc-100">
              {trip?.destination}
            </span>{" "}
            , nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {" "}
              {displayedDate}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createGuest} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
              //   onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              className="bg-transparent text-lg placeholder:-zinc-400 outline-none flex-1"
              //   onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Confirmar minha presença
          </Button>
        </form>
      </div>
    </div>
  );
}
