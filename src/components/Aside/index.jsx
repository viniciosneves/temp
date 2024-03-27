import { options } from '@/app/api/auth/[...nextauth]/options'

import Image from 'next/image'
import styles from './aside.module.css'

import logo from './logo.png'
import Link from 'next/link'
import AsideLink from '../AsideLink'

import { Feed } from '../icons/Feed'
import { Account } from '../icons/Account'
import { Info } from '../icons/Info'
import { Login } from '../icons/Login'
import { Button } from '../Button'
import { Logout } from '../icons/Logout'

import { getServerSession } from 'next-auth'

export const Aside = async () => {

    const session = await getServerSession(options)

    return (<aside className={styles.aside}>
        <ul>
            <li>
                <Link href="/">
                    <Image src={logo} alt="Logo da Code Connect" />
                </Link>
            </li>
            <li>
                <Button href="/publish" outline>
                    Publicar
                </Button>
            </li>
            <li>
                <AsideLink href="/">
                    <Feed />
                    Feed
                </AsideLink>
            </li>
            {session && <li>
                <AsideLink href="/profile">
                    <Account />
                    Perfil
                </AsideLink>
            </li>}
            <li>
                <AsideLink href="/about">
                    <Info />
                    Sobre nós
                </AsideLink>
            </li>
            <li>
                {!session && <AsideLink href="/api/auth/signin">
                    <Login />
                    Login
                </AsideLink>
                }
                {session && <AsideLink href="/api/auth/signout?callbackUrl=/">
                    <Logout />
                    Logout
                </AsideLink>
                }

            </li>
        </ul>
    </aside>)
}