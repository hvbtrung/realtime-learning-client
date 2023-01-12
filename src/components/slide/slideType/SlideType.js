import "./slideType.scss";

const SlideType = ({ icon: Icon, name }) => {
    return (
        <>
            <Icon className="icon" />
            <div className="slideTypeText">{name}</div>
        </>
    );
}

export default SlideType;
