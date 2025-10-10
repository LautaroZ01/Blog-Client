import WriterModal from "@/components/profile/writer/WriterModal";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <>
            <Header />
            <>
                <Outlet />
            </>
            <Footer />
            <WriterModal />
        </>
    )
}
