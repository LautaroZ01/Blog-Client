import ContactView from "./ContactView";
import HeroSectionView from "./HeroSectionView";
import HomePostListView from "./HomePostListView";

export default function HomeView() {
    return (
        <>
            <HeroSectionView />
            <HomePostListView />
            <ContactView />
        </>
    )
}
