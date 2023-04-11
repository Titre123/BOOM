import React, {useCallback, useContext, useState} from "react";
import '../../styles/dashboard/musicline.css';
import { Container, Col, Row } from "reactstrap";
import { faHeart, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyPlaying } from "../../pages/dashboard";

export default function MusicLine({Num, coverImage, Artiste, Title, duration, object}) {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setisPlaying] = useContext(MyPlaying);
    const handleClick = (event) => {
        setLiked(!liked);
    }

    const handleSetPlaying = (event) => {
        setisPlaying(object);
    };
    const color = liked ? '#c51162' : '#7f8aa0';
    const style = {
        color: [color]
    }
    return(
        <div className="music-line container" onClick={handleSetPlaying}>
            <p>#{Num}</p>
            <Row className="justify-content-center" style={{alignItems: 'center', width: '100%'}}>
                <Col xs={2}><img src={coverImage} alt={Title} className='musikImage'/></Col>
                <Col xs={3}><p>{Title}</p></Col>
                <Col xs={3}><p>{Artiste}</p></Col>
                <Col xs={2}><p>{duration}</p></Col>
                <Col xs={1}><FontAwesomeIcon icon={faHeart} style={style} onClick={handleClick}/></Col>
                <Col xs={1}><FontAwesomeIcon icon={faEllipsisV} /></Col>
            </Row>
        </div>
    )
}