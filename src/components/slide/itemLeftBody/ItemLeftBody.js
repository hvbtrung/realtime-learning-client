import "./itemLeftBody.scss";

const ItemLeftBody = ({ icon: Icon, text }) => {
    return (
        <div className="itemLeftBodyContainer">
            <div className="itemLeftBody">
                <Icon className="icon" />
                <span className="text">{text}</span>
            </div>
        </div>
    );
}

export default ItemLeftBody;
