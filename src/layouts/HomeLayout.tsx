import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <>
            <Header />

            <section className="">
                <Outlet />
            </section>
        </>
    )
}
