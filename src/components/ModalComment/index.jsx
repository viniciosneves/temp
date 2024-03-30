'use client'

import { useRef } from "react"
import { IconButton } from "../IconButton"
import { Modal } from "../Modal"
import { Chat } from "../icons/Chat"
import { Textarea } from "../Textarea"

import styles from './commentmodal.module.css'
import { SubmitButton } from "../SubmitButton"
import { Subheading } from "../Subheading"
import { useSession } from "next-auth/react"

export const ModalComment = ({ action }) => {
    const modalRef = useRef(null)
    const { data: session } = useSession();

    return (
        <>
            <Modal ref={modalRef}>
                <form action={action} onSubmit={() => modalRef.current.closeModal()}>
                    <Subheading>Deixe seu comentário sobre o post:</Subheading>
                    <Textarea required rows={8} name="text" placeholder="Digite aqui..." />
                    <div className={styles.footer}>
                        <SubmitButton>
                            Comentar
                        </SubmitButton>
                    </div>
                </form>
            </Modal>
            <IconButton
                onClick={() => modalRef.current.openModal()}
                disabled={!session}
            >
                <Chat />
            </IconButton>
        </>
    )
}