import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import Loader from './Loader';
import SongDetails from './SongDetails';
import SongForm from './SongForm';

const SongSearch = () => {
    const [search, setSearch] = useState(null)
    const [lyrics, setLyrics] = useState(null)
    const [bio, setBio] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(search === null) return

        const fetchData = async () => {
            const {artist, song} = search //Destructuración de search en sus dos propiedades

            let artistUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`
            //console.log(artistUrl, songUrl)

            setLoading(true)

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artistUrl), 
                helpHttp().get(songUrl)
            ])

            //console.log(artistRes, songRes)

            setBio(artistRes)
            setLyrics(songRes)
            setLoading(false)
        }

        fetchData()
    }, [search])

    const handleSearch = (data) => {
        //console.log(data)
        setSearch(data)
    }

    return (
        <div>
            <h2>SongSearch</h2>
            <article className='grid-1-3'>
                <SongForm handleSearch={handleSearch}/>
                {loading && <Loader/>}
                {search && !loading && <SongDetails search={search} lyrics={lyrics} bio={bio}/>}
            </article>
        </div>
    )
}

export default SongSearch
