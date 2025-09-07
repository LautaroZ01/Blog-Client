import { Post, Replies } from "@/types/postType"
import ReplyItem from "./ReplyItem"


type RepliesListProps = {
    replies: Replies[],
    postId: Post['_id']
}
export default function RepliesList({ replies, postId }: RepliesListProps) {

    return (
        <>
            {replies.map(reply => (
                <ReplyItem key={reply._id} reply={reply} postId={postId} />
            ))}
        </>
    )
}
