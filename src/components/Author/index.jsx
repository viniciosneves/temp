import { Avatar } from "../Avatar"
import styles from './author.module.css'

export const Author = ({name, imageSrc}) => {
    return (<ul className={styles.author}>
        <li>
            <Avatar name={name} imageSrc={imageSrc}/>
        </li>
        <li>
            @{name}
        </li>
    </ul>)
}