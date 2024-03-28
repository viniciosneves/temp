import { Github } from "../ProvidersButtons"

import styles from './providers.module.css'

export const Providers = () => {
    return (<ul className={styles.providers}>
        <li>
            <Github />
        </li>
    </ul>)
}