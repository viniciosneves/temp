'use client'

import Image from "next/image"
import emptyAvatar from './empty-avatar.png'
import { Button } from "../Button"
import { useRef, useState } from "react";
import { Spinner } from "../Spinner";

export const ProfileAvatar = ({ user }) => {
    const inputFileRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(user.image ?? emptyAvatar);
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    async function uploadFile(event) {
        event.preventDefault()
        setLoading(true)
        const file = inputFileRef.current.files[0]

        await fetch(
            '/api/avatar',
            {
                method: 'POST',
                body: file,
            },
        )

        setLoading(false)

    }

    return (
        <form onSubmit={uploadFile}>
            <label>
                <Image
                    src={imageSrc}
                    width={254}
                    height={254}
                    style={{ objectFit: "contain" }}
                    alt={`Avatar da(o) ${user.name}`}
                />
                <input
                    type="file"
                    ref={inputFileRef}
                    required
                    onChange={handleFileChange}
                />
            </label>
            <Button disabled={loading}>
                Upload { loading && <Spinner /> }
            </Button>
        </form>
    )
}