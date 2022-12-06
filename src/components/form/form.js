import React from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import validator from 'validator'

const newline = <><br /><br /></>;
const fullWidth = {width: '100%'};
const default_errors = {
    name: false,
    email: false,
};
const msg = {
    sendErr: <>there was an error sending the form data, contact us at <a href = "mailto: iraxboda@gmail.com">iraxboda@gmail.com</a></>,
    formErr: <>there are errors in the form, correct them before sending the form data or write an email to us at <a href = "mailto: iraxboda@gmail.com">iraxboda@gmail.com</a></>,
    success: <>thanks for submitting the form, see you at the wedding!</>,
};

const Form = () => {
    const [message, setMessage] = React.useState();
    const [errors, setErrors] = React.useState(default_errors);
    const [loading, setLoading] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState("");

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [people, setPeople] = React.useState(1);

    const changeEmail = (event) => {
        setEmail(event.target.value);
        areThereErrors();
    };

    const changeName = (event) => {
        setName(event.target.value);
        areThereErrors();
    };

    const changePeople = (event) => {
        setPeople(event.target.value);
        areThereErrors();
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setPeople(1);
        setErrors({
            name: false,
            email: false,
        });
    };

    const setError = (idx) => {
        const err = errors;
        err[idx] = true;
        return err;
    };

    const setNoError = (idx) => {
        const err = errors;
        err[idx] = false;
        return err;
    };

    const areThereErrors = () => {
        let flag = false;
        if (!validator.isEmail(email)) {
            setErrors(setError("email"));
            flag = true;
        } else setErrors(setNoError("email"));
        if (name === "") {
            setErrors(setError("name"));
            flag = true;
        } else setErrors(setNoError("name"));
        return flag;
    };

    const makePayload = () => {
        return {
            method: 'post',
            url: 'https://sheet.best/api/sheets/d553abd3-0673-4ef3-8814-a84d3a498b12',
            data: [{
                name: name,
                email: email,
                people: people,
            }],
            headers: {'x-api-key': 'C027I%Ut6!A$bY!8m#6#R76FX4U4#hB6HwN1KOxLCRcqk2r#T2PDe2lHch@kea0l'}
        };
    };

    const handleSubmit = () => {
        if (!areThereErrors()) {
            axios(makePayload())
            .then(response => {
                console.log(response);
                setMessage(msg.success);
                setShowMessage(true);
                setLoading(false);
                clearForm();
            })
            .catch(error => {
                console.log(error);
                setMessage(msg.sendErr);
                setShowMessage(true);
            });
            setMessage("");
            setShowMessage(false);
            setLoading(true);
            return;
        }
        setLoading(false);
        setMessage(msg.formErr);
        setShowMessage(true);
    };

    const submitButton = () => {
        return <LoadingButton variant="outlined" loading={loading} onClick={handleSubmit}>
            {people > 1 ? "We're coming!" : "I'm coming!" }
        </LoadingButton>
    };

    return <div className="join-us-form">
        <TextField 
            id="outlined-email" 
            label="Email (for the photos)"
            variant="outlined" 
            required 
            style={fullWidth} 
            value={email} 
            onChange={changeEmail}
            error={errors.email}
        />
        {newline}
        <TextField 
            id="outlined-basic" 
            label="Your name"
            variant="outlined" 
            required 
            style={fullWidth} 
            value={name} 
            onChange={changeName}
            error={errors.name}
        />
        {newline}
        <FormControl fullWidth>
            <InputLabel id="simple-select-label">Who all?</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                variant="outlined"
                value={people}
                style={{"textAlign": "left"}} 
                label="Who all?"
                onChange={changePeople}
            >
                <MenuItem value={1}>Just me!</MenuItem>
                <MenuItem value={2}>me +1</MenuItem>
            </Select>
        </FormControl>
        {newline}
        {submitButton()}
        {newline}
        {showMessage ? message : ""}
    </div>
}

export default Form;