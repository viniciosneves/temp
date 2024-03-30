import { getProviders } from "next-auth/react";
import styles from './providers.module.css'
import { ProviderLogin } from "../ProviderLogin";

export const Providers = async () => {

    const providers = await getProviders();

    return (<ul className={styles.providers}>
        {Object.values(providers).map((provider) => {

            if (provider.id === 'credentials') {
                return null
            }

            return <li key={provider.name}>
                <ProviderLogin provider={provider} />
            </li>
        })}
    </ul>)
}