'use client'

import Image from "next/image"
import emptyAvatar from './empty-avatar.png'
import { Button } from "../Button"
import { useRef, useState } from "react";

export const ProfileAvatar = ({ user }) => {
    const inputFileRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(emptyAvatar);

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

    return (
        <form>
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
            <Button>
                Upload
            </Button>
        </form>
    )
}