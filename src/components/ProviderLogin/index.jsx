'use client'
import Image from "next/image"
import { IconButton } from "../IconButton"
import { signIn } from "next-auth/react"
import githubImg from './github.png'

const LogoDictionary = {
    github: githubImg
}

export const ProviderLogin = ({ provider }) => {
    return (<IconButton onClick={() => signIn(provider.id, { callbackUrl: '/posts' })}>
        <Image src={LogoDictionary[provider.id]} alt={provider.name} />
    </IconButton>)
}