import Image from "next/image"
import styles from './avatar.module.css'

export const Avatar = ({ name, imageSrc }) => {
    if (!imageSrc) {
        return null
    }
    return (
        <div className={styles.container}>
            <Image
                src={imageSrc}
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
                alt={`Avatar do(a) ${name}`}
            />
        </div>
    )
}