import styles from './comment.module.css'
import { Avatar } from "../Avatar"

export const Comment = ({ comment }) => {
    return (<div className={styles.comment}>
        <Avatar imageSrc={comment.author.image} name={comment.author.name}/>
        <strong>@{comment.author.name}</strong>
        <p>{comment.text}</p>
    </div>)
}