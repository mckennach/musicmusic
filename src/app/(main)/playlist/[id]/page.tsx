import { AuthSession } from "@/types";
import { Playlist } from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/auth-options";
import { Hero, HeroImage, HeroTextContainer, HeroHeading, HeroDescription } from "@/components/hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  if(!playlist) return null;
  return (
    <section role="presentation" className="mt-[-64px] bg-gradient-to-br from-orange-600 from-20% to-background to-85%">
      <Hero className="pb-5 px-5 flex items-end">
        <HeroTextContainer className="flex gap-4 items-end">
            <HeroImage 
              src={playlist && playlist?.images && playlist?.images[0].url ? playlist?.images[0].url : undefined}
              alt={`${playlist?.name} cover`}
              fallback="FALL"
              className="w-56 h-56 rounded-sm shadow-md"
            />
            <HeroTextContainer className="flex flex-col items-end gap-2">
              <div className="space-y-2">
                <HeroHeading className="text-4xl font-bold">{playlist?.name}</HeroHeading>
                <HeroDescription className="text-sm" html={playlist?.description} />
                <HeroTextContainer className="text-sm flex gap-2 items-center">
                  <Avatar className="h-6 w-6 ">
                    <AvatarImage src={undefined} alt={`${playlist?.owner?.display_name} avatar`} className="rounded-sm" />
                    <AvatarFallback className="rounded-sm">{playlist?.owner?.display_name[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-2xs font-semibold">Created by {playlist?.owner?.display_name}</span>
                </HeroTextContainer>
              </div>
            </HeroTextContainer>
        </HeroTextContainer>  
      </Hero>
    </section>
  )
}
