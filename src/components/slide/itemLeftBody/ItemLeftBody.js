import "./itemLeftBody.scss"
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';

const ItemLeftBody = ({ slide }) => {
    return (
        <div className="itemLeftBodyContainer">
            <div className="itemLeftBody">
                <EqualizerOutlinedIcon className="icon" />
                <span className="text">{slide.question}</span>
            </div>
        </div>
    );
}

export default ItemLeftBody;
