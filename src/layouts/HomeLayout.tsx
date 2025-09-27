import WriterModal from "@/components/profile/writer/WriterModal";
import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <>
            <Header />
            <>
                <Outlet />
            </>
            <WriterModal />
        </>
    )
}
