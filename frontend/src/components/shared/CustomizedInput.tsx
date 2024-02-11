import {FC} from 'react';
import {TextField} from "@mui/material";

interface IProps {
name: string;
type: string;
label: string;
}

const CustomizedInput: FC<IProps> = (props: IProps) => {

    return <TextField
        margin={"normal"}
        InputLabelProps={{style: {color: "white"}}}
        name={props.name} type={props.type} label={props.label}
    InputProps={{
        style: {width: "400px", borderRadius: 10, fontSize:20, color: "white"}}}
    />

};

export {CustomizedInput};
