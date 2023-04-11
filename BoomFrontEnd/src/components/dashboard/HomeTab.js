import ToggleButton from "./toggle";
import MusicCard from "./musiccard";
import MusicLine from "./musicline";
import Searchbar from './searchbar';
import { PageLoader } from "../page-loader";

export const HomeTab = ({musicArray}) => {

    let element;
    // console.log(musicArray);
    if (musicArray) {
        element = musicArray.map((ele, ind) => {
        return (
            <MusicLine key={ind} Num={ind + 1} coverImage={ele.songThumbnail.url} Title={ele.songTitle} Artiste={ele.songArtiste} duration={ele.duration} object={ele}/>
        )})
    }
    else {
        element = <PageLoader />
    }

    return(
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='container'>
                <Searchbar />
                <ToggleButton />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '2.5em'}} className='container'>
                {element}
            </div>
        </div>
    )
}