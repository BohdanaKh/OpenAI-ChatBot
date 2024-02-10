import {FC} from 'react';
import {Link} from "react-router-dom";

interface IProps {
to: string;
bg: string;
text: string;
textColor: string;
onClick?: () => Promise<void>;
}

const NavigationLink: FC<IProps> = (props:IProps) => {

    return (
     <Link className={"navlink"} to={props.to} style={{ background: props.bg, color: props.textColor}}>{props.text}</Link>
    );
};

export {NavigationLink};

