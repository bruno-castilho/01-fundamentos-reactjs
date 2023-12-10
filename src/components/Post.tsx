import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './Post.module.css'
import { Avatar } from './Avatar.js'
import {Comment} from './Comment.js'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'


export interface PostType {
    id: number;
    author: {
        name: string;
        role: string;
        avatarUrl: string;
    };
    publishedAt: Date;
    content: Array<
                {
                    type: 'paragraph' | 'link';
                    content: string;
                    link?: string;
                }
            >;
}


interface PostProps {
    post: PostType
}


export function Post({post}:PostProps){
    const [comments, setComments] = useState(['Muito bom Devon, parabéns!! 👏👏','Post muito bacana, hein?!'])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormat =  format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{locale: ptBR})

    const publishdeDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })


    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);

    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string){
        const commentsWithOutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        
        setComments(commentsWithOutDeleteOne);
    }



    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormat} dateTime={post.publishedAt.toISOString()}>{publishdeDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if(line.type == 'paragraph'){
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type == 'link'){
                        return <p key={line.content}><a href={line.link}>{line.content}</a></p>;
                    }
                })}
            </div>


            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder="Deixe um comentario"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                })}
            </div>
        </article>
    )
}