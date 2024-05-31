import React, { useEffect, useRef, useState } from "react";
import { Soundwave } from "react-bootstrap-icons";

import ExtraControls from "./src/components/ExtraControls";
import PlayerControls from "./src/components/PlayerControls";
import Progress from "./src/components/Progress";
import SongDetails from "./src/components/SongDetails";
import Volume from "./src/components/Volume";


const songs = [
    {
        id: 0,
        title: "Machinery of War",
        artist: "Evgeny Bardyuzha",
        image: "https://res.cloudinary.com/tropicolx/image/upload/v1675352152/music_app/machinery-of-war_fqu8z6.jpg",
        src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218409/music_app/Evgeny_Bardyuzha_-_Machinery_of_War_fyaroh.mp3",
    },
    {
        id: 1,
        title: "Nova",
        artist: "2050",
        image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351835/music_app/song-2_ljg2wd.jpg",
        src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218406/music_app/2050_-_Nova_jp2ila.mp3",
    },
    {
        id: 2,
        title: "Medusa",
        artist: "Kryptos",
        image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351585/music_app/song-3_ppgsaf.jpg",
        src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218402/music_app/Kryptos_-_Medusa_yyj3nc.mp3",
    },
    {
        id: 3,
        title: "Artificial Intelligence",
        artist: "Lance Conrad",
        image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351701/music_app/song-4_yaqewe.jpg",
        src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218398/music_app/Lance_Conrad_-_Artificial_Intelligence_ioozhh.mp3",
    },
];

function App() {

    const audioRef = useRef();
    const [playlist, setPlaylist] = useState(songs);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [songFinished, setSongFinished] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const setTimeUpdate = () => {
        const audio = audioRef.current;
        const currentTime = audio.currentTime;
        const progress = currentTime
            ? Number(((currentTime * 100) / audio.duration).toFixed(1))
            : 0;
        setTimeElapsed(currentTime);
        !dragging && setProgress(progress);
    };

    const setLoadedData = async () => {
        const audio = audioRef.current;
        setTimeElapsed(audio.currentTime);
        setSongLength(audio.duration);
    };

    useEffect(() => {
        if (songFinished) {
            if (!repeat) next();
            setSongFinished(false);
        }
    }, [songFinished]);

    return (
        <div className="app">
            <audio
                src={playlist[currentSongIndex].src}
                ref={audioRef}
                onTimeUpdate={setTimeUpdate}
                onLoadedData={setLoadedData}
                onEnded={() => setSongFinished(true)}
                loop={repeat}
                crossOrigin="anonymous"
            ></audio>
        </div>
    );
}

export default App;
