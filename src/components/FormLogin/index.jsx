'use client'

import styles from './form-login.module.css'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { ArrowFoward } from '@/components/icons/ArrowFoward'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function FormLogin() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginAttempt = async (event) => {

        event.preventDefault()

        const payload = {
            redirect: false,
            email,
            password,
        }

        const result = await signIn('credentials', payload);

        if (result.error) {
            console.log(result.error);
        } else {
            router.push('/posts')
            router.refresh();
            console.log(result);
        }
    }

    return (
        <form className={styles.form} onSubmit={loginAttempt}>
            <div>
                <Label>
                    E-mail
                </Label>
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    required
                    onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div>
                <Label>
                    Senha
                </Label>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <div className={styles.action}>
                <Button type="submit">
                    Login <ArrowFoward />
                </Button>
            </div>
        </form>
    )
}
