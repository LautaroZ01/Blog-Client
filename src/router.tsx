import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import LoginView from './views/auth/LoginView'
import HomeLayout from './layouts/HomeLayout'
import HomeView from './views/Home/HomeView'
import ChatLayout from './layouts/ChatLayout'
import ChatView from './views/chat/NewChatView'
import ConversationView from './views/chat/ConversationView'
import { ToastContainer } from 'react-toastify'
import ProfileLayout from './layouts/ProfileLayout'
import ProfileView from './views/user/ProfileView'
import ChangePasswordView from './views/user/ChangePasswordView'
import SocialContactView from './views/user/SocialContactView'
import DashBoardLayout from './layouts/DashBoardLayout'
import IndexView from './views/dashboard/IndexView'
import { postOptions, userOptions } from './utils/dashboardUtil'
import CreatePostView from './views/dashboard/post/CreatePostView'
import EditPostView from './views/dashboard/post/EditPostView'
import PostBySlogView from './views/post/PostBySlogView'
import PostListView from './views/post/PostListView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path='/' element={<HomeView />} />
                    <Route path='/post' element={<PostListView />} />
                    <Route path='/post/:slug' element={<PostBySlogView />} />

                    <Route path='/user' element={<ProfileLayout />}>
                        <Route path='profile' element={<ProfileView />} index />
                        <Route path='password' element={<ChangePasswordView />} />
                        <Route path='social-dashboard' element={<SocialContactView />} />
                    </Route>
                </Route>

                <Route path='/auth' element={<AuthLayout />}>
                    <Route path='login' element={<LoginView />} index />
                    <Route path='register' element={<RegisterView />} />
                    <Route path='confirm-account' element={<ConfirmAccountView />} />
                    <Route path='request-code' element={<RequestNewCodeView />} />
                    <Route path='forgot-password' element={<ForgotPasswordView />} />
                    <Route path='new-password' element={<NewPasswordView />} />
                </Route>
                <Route path='/chat' element={<ChatLayout />}>
                    <Route path='new-chat' element={<ChatView />} index />
                    <Route path='conversation/:conversationId?' element={<ConversationView />} />
                </Route>

                <Route path='/dashboard' element={<DashBoardLayout />}>
                    <Route path='' element={<IndexView />} index />
                    {postOptions.map((option, index) => (
                        <Route key={index} path={option.path} element={<option.component />} />
                    ))}
                    {userOptions.map((option, index) => (
                        <Route key={index} path={option.path} element={<option.component />} />
                    ))}
                    <Route path='post/create' element={<CreatePostView />} />
                    <Route path='post/edit/:postId' element={<EditPostView />} />
                </Route>
            </Routes>
            <ToastContainer position="top-center" />
        </BrowserRouter>
    )
}
