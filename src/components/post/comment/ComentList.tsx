import { Comments, Post } from "@/types/postType"
import CommentItem from "./CommentItem"
import { Author } from "@/types/userType"

type ComentListProps = {
    comments: Comments,
    postId?: Post['_id']
    author?: Author
    isUser?: boolean
}

export default function ComentList({ comments, postId, author, isUser }: ComentListProps) {
    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={postId} author={author} isUser={isUser} />
            ))}
        </>
    )
}
