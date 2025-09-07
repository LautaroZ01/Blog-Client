import { Comment, Post } from "@/types/postType";
import Modal from "@/components/ui/Modal";
import ComentList from "@/components/post/comment/ComentList";

type CommentListModalProps = {
    comments: Comment[]
    postId: Post['_id']
}

export default function CommentListModal({ comments, postId }: CommentListModalProps) {
    return ((
        <Modal title="Comentarios">
            <div className="max-h-[600px] overflow-y-auto min-w-[800px] mt-4">
                {comments.length > 0 ? <ComentList comments={comments} postId={postId} /> :
                    <h3 className="text-center mt-4">Aun no hay comentarios</h3>
                }
            </div>
        </Modal>
    ))
}
