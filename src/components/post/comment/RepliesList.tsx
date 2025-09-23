import { Post, Replies } from "@/types/postType"
import ReplyItem from "./ReplyItem"
import { Author } from "@/types/userType"


type RepliesListProps = {
    replies: Replies[]
    postId?: Post['_id']
    isUser?: boolean
    authorId?: Author['_id']
}
export default function RepliesList({ replies, postId, isUser, authorId }: RepliesListProps) {

    return (
        <>
            {replies.map(reply => (
                <ReplyItem key={reply._id} reply={reply} postId={postId} isUser={isUser} authorId={authorId} />
            ))}
        </>
    )
}
