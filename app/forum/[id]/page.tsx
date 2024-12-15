'use client'

import {useState, useEffect} from 'react'
import {useParams, useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {ThumbsUp, MessageSquare, Share2, Edit, ArrowLeft} from 'lucide-react'
import {ShareModal} from '@/components/modal/share-modal'

interface Post {
    id: number
    title: string
    content: string
    author: string
    date: string
    likes: number
    comments: Comment[]
}

interface Comment {
    id: number
    author: string
    content: string
    date: string
}

export default function ForumPost() {
    const router = useRouter()
    const {id} = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [newComment, setNewComment] = useState('')
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)

    useEffect(() => {
        // Simulating API call to fetch action data
        const fetchPost = async () => {
            // In a real app, you would fetch the action data from an API
            const mockPost: Post = {
                id: Number(id),
                title: '绝区零最新更新讨论',
                content: '大家对最新的游戏更新有什么看法？新增的角色平衡性如何？这次更新增加了新的地图和任务系统，感觉游戏内容更加丰富了。不过有些玩家反馈新角色有点过强，你们怎么看？',
                author: '游戏迷小王',
                date: '2023-06-15',
                likes: 42,
                comments: [
                    {id: 1, author: '老玩家', content: '新地图设计得很棒，探索起来很有意思！', date: '2023-06-15'},
                    {id: 2, author: '平衡大师', content: '新角色确实有点强，希望官方能尽快调整。', date: '2023-06-16'},
                ],
            }
            setPost(mockPost)
        }
        fetchPost()
    }, [id])

    const handleLike = () => {
        if (post) {
            setPost({...post, likes: post.likes + 1})
        }
    }

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (post && newComment.trim()) {
            const newCommentObj = {
                id: post.comments.length + 1,
                author: '当前用户',
                content: newComment,
                date: new Date().toISOString().split('T')[0],
            }
            setPost({...post, comments: [...post.comments, newCommentObj]})
            setNewComment('')
        }
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="mb-4"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4"/>
                返回
            </Button>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-muted-foreground mb-4">
                    由 {post.author} 发布于 {post.date}
                </p>
                <p className="mb-6">{post.content}</p>
                <div className="flex items-center space-x-4 mb-6">
                    <Button variant="outline" size="sm" onClick={handleLike}>
                        <ThumbsUp className="mr-2 h-4 w-4"/>
                        {post.likes}
                    </Button>
                    <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4"/>
                        {post.comments.length}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsShareModalOpen(true)}>
                        <Share2 className="mr-2 h-4 w-4"/>
                        分享
                    </Button>
                    {post.author === '当前用户' && (
                        <Button variant="outline" size="sm"
                                onClick={() => router.push(`/forum/post?action=edit&id=${post.id}`)}>
                            <Edit className="mr-2 h-4 w-4"/>
                            编辑
                        </Button>
                    )}
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">评论</h2>
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted p-4 rounded">
                            <p className="font-semibold">{comment.author}</p>
                            <p className="text-sm text-muted-foreground mb-2">{comment.date}</p>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                    <form onSubmit={handleComment} className="space-y-2">
                        <Textarea
                            placeholder="添加评论..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit">发表评论</Button>
                    </form>
                </div>
            </div>
            <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} postId={post.id}/>
        </>
    )
}

