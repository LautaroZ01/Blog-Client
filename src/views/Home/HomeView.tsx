import { useQuery } from "@tanstack/react-query";
import ContactView from "./ContactView";
import HeroSectionView from "./HeroSectionView";
import HomePostListView from "./HomePostListView";
import { getWriteInfo } from "@/API/WriterAPI";

export default function HomeView() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['writerInfo'],
        queryFn: () => getWriteInfo(),
    })

    if (isLoading) return 'Cargando...'
    if(isError) return 'Ocurrio un error'

    if (data) return (
        <>
            <HeroSectionView writerInfo={data} />
            <HomePostListView />
            <ContactView writerInfo={data} />
        </>
    )
}
