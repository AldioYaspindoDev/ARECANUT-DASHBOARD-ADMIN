import Navbar from "../Homepages/Navbar";
import Scanner from "../Scanner/Scanner";
import Components10 from "../Homepages/Footer";

export default function ScannerPublic() {
    return (
        <div>
            <Navbar />
            <div className="my-30">
                <Scanner />
            </div>
            <Components10 />
        </div>
    )
}