import Image from "next/image"
import styles from './avatar.module.css'

export const Avatar = ({ name, imageSrc }) => {
    return (
        <div className={styles.container}>
            <Image
                objectFit="cover"
                src={imageSrc}
                width={32}
                height={32}
                alt={`Avatar do(a) ${name}`}
            />
        </div>
    )
}