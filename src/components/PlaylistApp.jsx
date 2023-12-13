import React, { useState } from "react";
import { toast } from 'react-toastify';
function PlayListApp() {

    const [playlist, setPlaylist] = useState([
        'Hello',
        'Hi'
    ])

    const [music, setMusic] = useState('')
    const [newMusic, setNewMusic] = useState()

    const [edit, setEdit] = useState(-1)

    const handleAddMusic = (e) => {
        e.preventDefault()
        if (music == '') {
            alert("lỗi")
        } else {
            toast.success("Music Add")
            setPlaylist(
                [...playlist, music]
            )
            setMusic('')
        }
    }

    const handleDeleteMusic = (music) => {
        let confirm = window.confirm(`Bạn muốn xóa bài ${music} ?`)
        if (confirm) {
            let newPlaylist = playlist.filter(e => music != e)
            setPlaylist(newPlaylist)
        }
        toast.error("Delete", {
            theme: "light",
        })
    }
    const onEdit = (index) => {
        setEdit(index)
        setNewMusic(playlist[index])
    }

    const handleCancelMusic = (music) => {
        setEdit(-1)
        setNewMusic(music)
    }

    const handleEditMusic = (idx) => {
        if (newMusic) {
            playlist[idx] = newMusic
        }
        setEdit(-1)
        setPlaylist(playlist)
        toast.info("Edit", {
            theme: "light",
        })
    }

    return (
        <div className="container mt-3">
            <h1 className="display-6 text-warning fw-bolder">
                Playlist Music
                <i className="fa-solid fa-music ms-2" />
            </h1>
            <form className="w-50 " onSubmit={handleAddMusic}>
                <div className="form-group d-flex">
                    <input type="text" className="form-control me-2" name="music" value={music}
                        onInput={(e) => setMusic(e.target.value)} />
                    <button className="btn btn-sm btn-primary">
                        Add to Playlist
                    </button>
                </div>
            </form>
            <div className="w-50 mt-3">
                <ul className="list-group">
                    {
                        playlist.map((song, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                {
                                    edit === index ? <input type="text"
                                        value={newMusic}
                                        onInput={(e) => setNewMusic(e.target.value)} /> : song
                                }
                                <div>
                                    {
                                        edit === index ?
                                            (<>
                                                <i role="button" className="fa-solid fa-download me-2 text-info"
                                                    onClick={() => handleEditMusic(index, song)}
                                                ></i>
                                                <i role="button" className="fa-solid fa-rectangle-xmark text-danger"
                                                    onClick={() => handleCancelMusic(song)}
                                                ></i>
                                            </>) :
                                            (<>
                                                <i role="button"
                                                    className="fa-solid fa-pen-to-square me-2 text-success"
                                                    onClick={() => onEdit(index)}
                                                >
                                                </i>
                                                <i role="button"
                                                    className="fa-solid fa-trash text-danger"
                                                    onClick={() => { handleDeleteMusic(song) }}
                                                >
                                                </i>
                                            </>)
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default PlayListApp;