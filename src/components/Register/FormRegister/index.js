import './FormRegister.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, IconButton, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import logo from '~/assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '~/Utils/constant';
function FormRegister() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordX2, setPasswordX2] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/user/register`, {
                name,
                username,
                password,
            });
            setLoading(false);
            if (res.data.register) {
                navigate('/login');
            }
            alert(res.data.msg);
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    return (
        <div className="register__wrapper">
            <div className="wrapper__left">
                <ValidatorForm className="wrapper__left-content" onSubmit={handleSubmit}>
                    <div className="login__wrapper--home">
                        <Link to="/">
                            <IconButton aria-label="delete" size="large" color="secondary">
                                <HomeIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="header_wrapper">
                        <Typography variant="h4" className="register__header">
                            ????ng k??
                        </Typography>
                    </div>

                    <TextValidator
                        className="register__input"
                        fullWidth
                        value={name}
                        id="register-name"
                        label="T??n ng?????i d??ng"
                        variant="standard"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['Vui l??ng nh???p t??n ng?????i d??ng']}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextValidator
                        className="register__input"
                        fullWidth
                        value={username}
                        type="email"
                        id="register-user"
                        label="Email"
                        variant="standard"
                        color="secondary"
                        validators={['required', 'isEmail']}
                        errorMessages={['Vui l??ng nh???p email', 'Email kh??ng h???p l???']}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextValidator
                        className="register__input"
                        type="password"
                        value={password}
                        autoComplete="off"
                        fullWidth
                        id="register-password"
                        label="M???t kh???u"
                        variant="standard"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['Vui l??ng nh???p m???t kh???u']}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextValidator
                        className="register__input"
                        type="password"
                        fullWidth
                        value={passwordX2}
                        autoComplete="off"
                        id="register-password-X2"
                        label="Nh???p l???i m???t kh???u"
                        variant="standard"
                        color="secondary"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Nh???p l???i m???t kh???u kh??ng ch??nh x??c', 'Vui l??ng nh???p m???t kh???u']}
                        onChange={(e) => setPasswordX2(e.target.value)}
                    />

                    <Button
                        className="register__btn btn-grad"
                        fullWidth
                        type="submit"
                        size="large"
                        color="secondary"
                        variant="contained"
                        startIcon={<SendIcon />}
                    >
                        ????ng k??
                    </Button>

                    <Link className="register__btn-login " to="/login">
                        B???n ???? c?? t??i kho???n? - ????ng nh???p
                    </Link>
                    {loading ? (
                        <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <></>
                    )}
                </ValidatorForm>
            </div>

            <div className="wrapper__right">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default FormRegister;
