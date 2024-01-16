import { AuthSession } from "@/types";
import { Playlist } from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/auth-options";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imageLoader } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const fetchPlaylist = async (id: string, session: AuthSession) => {
  if(!session?.user?.access_token) throw new Error('No access token');
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.user?.access_token}`
    }
  })
  const playlist: Playlist = await response.json()
  return playlist;
}


export default async function Playlists({
  params
}: {
  params: { id: string }
}) {
  const session = await getServerSession({ ...authOptions, req: { url: '/' } });
  const { id } = params;
  const playlist = session && (await fetchPlaylist(id, session as AuthSession));
  return (
    <div>
      <h1>{playlist?.name}</h1>
      <p>{playlist?.description}</p>
      {playlist  && (
        <Avatar className="w-56 h-56 rounded-sm">
          <AvatarImage
            className="rounded-sm"
            src={playlist?.images[0]?.url}
            alt={playlist?.name}
            width={playlist?.images[0]?.width}
            height={playlist?.images[0]?.height}
          />
          <AvatarFallback>FALL</AvatarFallback>
        </Avatar>
      )}
      
    </div>
  )
}
