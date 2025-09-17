import { useQuery } from "@tanstack/react-query";
import ContactView from "./ContactView";
import HeroSectionView from "./HeroSectionView";
import HomePostListView from "./HomePostListView";
import { getWriteInfo } from "@/API/WriterAPI";

export default function HomeView() {
    const { data, isLoading } = useQuery({
        queryKey: ['writerInfo'],
        queryFn: getWriteInfo,
    })

    if (isLoading) return 'Cargando...'

    if (data) return (
        <>
            <HeroSectionView writerInfo={data} />
            <HomePostListView />
            <ContactView writerInfo={data} />
        </>
    )
}
