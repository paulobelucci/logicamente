import AvatarSection from "./AvatarSection/AvatarSection";
import FaseNavigationSection from "./FaseNavigationSection/FaseNavigationSection";
import LogoSection from "./LogoSection/LogoSection";
import { Navbar } from "./styles";

export default function NavBar(){
    return (
        <Navbar>
            <LogoSection/>
            <FaseNavigationSection/>
            <AvatarSection/>
        </Navbar>
    )
}