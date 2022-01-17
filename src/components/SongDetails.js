import Message from "./Message"
import SongArtist from "./SongArtist"
import SongLyrics from "./SongLyrics"

const SongDetails = ({search, lyrics, bio}) => {
    if (!lyrics || !bio) return null

    return (
        <>
            {bio.artists ? (
                <SongArtist artist={bio.artists[0]}/>
            ) : (
                <Message msg={`Error no existe el intérprete "<em>${search.artist}</em>"`} bgColor="#dc3545"/>
            )}
            {lyrics.error || lyrics.err || lyrics.name  === "AbortError" ? (
                <Message msg={`Error no existe la canción "<em>${search.song}</em>" de intérprete "<em>${search.artist}</em>"`} bgColor="#dc3545"/>
            ) : (
                <SongLyrics title={search.song} lyrics={lyrics.lyrics}/>
            )}
        </>
    )
}

export default SongDetails
