import { Comments, Post } from "@/types/postType"
import CommentItem from "./CommentItem"

type ComentListProps = {
    comments: Comments,
    postId: Post['_id']
}

export default function ComentList({ comments, postId }: ComentListProps) {
    return (
        <div>
            {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={postId} />
            ))}
        </div>
    )
}
