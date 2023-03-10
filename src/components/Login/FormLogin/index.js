import './FormLogin.scss';
import { Button, Typography, IconButton, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import logo from '~/assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '~/Utils/constant';
function FormLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/user/login`, { username, password });
            setLoading(false);
            if (res.data.login) {
                setUsername('');
                setPassword('');
                localStorage.setItem('login', 'true');
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('name', res.data.username);
                localStorage.setItem('score', res.data.score);
                navigate('/app');
                window.location.reload();
            } else {
                setError(res.data.msg);
                setPassword('');
            }
        } catch (err) {
            console.log('Login fe failed: ' + err.message);
        }
    };

    return (
        <div className="login__wrapper">
            <div className="wrapper__left">
                <ValidatorForm className="wrapper__left-content" onSubmit={handleSubmit}>
                    <div className="login__wrapper--home">
                        <Link to="/">
                            <IconButton aria-label="delete" size="large" color="secondary">
                                <HomeIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <Typography variant="h4" className="login__header">
                        ????ng nh???p
                    </Typography>
                    {/* Email */}
                    <TextValidator
                        className="login__input"
                        value={username}
                        type="email"
                        fullWidth
                        id="login-user"
                        label="Email"
                        variant="standard"
                        color="secondary"
                        validators={['required', 'isEmail']}
                        errorMessages={['Vui l??ng nh???p email', 'Email kh??ng h???p l???']}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setError('')}
                    />
                    {/* Password */}
                    <TextValidator
                        className="login__input"
                        value={password}
                        type="password"
                        autoComplete="off"
                        fullWidth
                        id="login-password"
                        label="M???t kh???u"
                        variant="standard"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['Vui l??ng nh???p m???t kh???u']}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setError('')}
                    />

                    <span className="validate__error">{error}</span>

                    <div className="formLogin__link">
                        <Link className="formLogin__link-separate" to="/register">
                            ????ng k??
                        </Link>
                        {/* <Link to="">Qu??n m???t kh???u?</Link> */}
                    </div>

                    {/* Submit */}
                    <Button
                        className="login__btn btn-grad"
                        fullWidth
                        type="submit"
                        size="large"
                        color="secondary"
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={() => setError('')}
                    >
                        ????ng nh???p
                    </Button>
                    {loading ? (
                        <Box sx={{ marginTop: '40px' ,display: 'flex' , justifyContent: 'center'}}>
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

export default FormLogin;
