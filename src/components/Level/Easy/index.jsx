import './Easy.scss';
import ModalIntroImage from '~/assets/images/modalIntro.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { Button, Grid, IconButton, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { baseURL } from '~/Utils/constant';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const styleModalIntro = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow: 20,
    p: 4,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
};

function EasyLevel() {
    const [answer, setAnswer] = useState();
    const [answerCorrect, setAnswerCorrect] = useState();
    const [questionCurr, setQuestionCurr] = useState();
    const [questionArr, setQuestionArr] = useState([]);
    const [voiceCurr, setVoiceCurr] = useState('');
    const [curr, setCurr] = useState(1);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [check, setCheck] = useState(false);
    const [score, setScore] = useState(0);
    const [openScore, setOpenScore] = useState(false);
    const [openModalIntro, setOpenModalIntro] = useState(true);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleClickAgree = async () => {
        const updateScore = Number(score) + Number(localStorage.getItem('score'));
        localStorage.setItem('score', updateScore);

        try {
            axios.post(`${baseURL}/user/updateScore/${localStorage.getItem('id')}`, {
                score: updateScore,
            });
        } catch (e) {
            console.log(e);
        }
        navigate('/app/exam');
        window.location.reload();
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseURL}/exam/question-easy`);
                setQuestionArr(res.data);
                setQuestionCurr(res.data[0]);
                setAnswerCorrect(res.data[0].question_correct);
                setVoiceCurr(res.data[0].voice);
            } catch (e) {
                console.log('fe: ' + e.message);
            }
        };
        getData();
    }, []);

    const handleClickCheck = () => {
        if (answer === answerCorrect) {
            setCorrect(true);
            setScore(score + 10);
            setCheck(false);
        } else {
            setCheck(false);
            setWrong(true);
        }
    };

    const handleClickAgain = () => {
        const updateScore = Number(score) + Number(localStorage.getItem('score'));
        localStorage.setItem('score', updateScore);

        try {
            axios.post(`${baseURL}/user/updateScore/${localStorage.getItem('id')}`, {
                score: updateScore,
            });
        } catch (e) {
            console.log(e);
        }
        navigate('/app/exam/easy');
        window.location.reload();
    };
    console.log(score);

    const handleClickNext = () => {
        console.log(curr);
        setCurr(curr + 1);
        console.log(curr);
        if (curr < questionArr.length) {
            setQuestionCurr(questionArr[curr]);
            setVoiceCurr(questionArr[curr].voice);
            setAnswerCorrect(questionArr[curr].question_correct);
            setCorrect(false);
            setWrong(false);
            setCheck(false);
            setAnswer();
        } else {
            setOpenScore(true);
        }
    };

    const handleClickVolume = (e) => {
        new Audio(voiceCurr).play();
    };

    return (
        <div className="EasyLevel__wrapper">
            <div className="EasyLevel__container">
                <Modal
                    open={openModalIntro}
                    onClose={() => setOpenModalIntro(false)}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={styleModalIntro}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ mt: 2, mb: 2, color: '#000' }} variant="h5">
                                Nh???n v??o bi???u t????ng c??i loa ????? nghe
                            </Typography>
                            <input type="image" src={ModalIntroImage} style={{ width: '300px' }} alt="image" />
                            <Button
                                sx={{ margin: 'auto' }}
                                onClick={() => setOpenModalIntro(false)}
                                variant="contained"
                                color="secondary"
                            >
                                ?????ng ??
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <div className="EasyLevel__nav">
                    {/* /app/exam */}
                    <Link to="" onClick={handleOpen}>
                        <IconButton aria-label="delete" size="large" color="secondary">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    {/* <Link to="/app">
                        <IconButton aria-label="delete" size="large" color="secondary">
                            <HomeIcon />
                        </IconButton>
                    </Link> */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={styleModal}>
                            <Typography
                                id="keep-mounted-modal-title"
                                color={'var(--primary-color)'}
                                variant="h6"
                                component="h2"
                            >
                                B???n th???c s??? mu???n tho??t ?
                            </Typography>
                            <Typography id="keep-mounted-modal-description" color={'#666'} sx={{ mt: 2 }}>
                                N???u tho??t b??i thi, k???t qu??? s??? kh??ng ???????c c??ng nh???n
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="right" pt={2}>
                                <Button className="btn--cancel" variant="contained" onClick={handleClose}>
                                    H???y
                                </Button>
                                <Button color="secondary" variant="contained" onClick={handleClickAgree}>
                                    ?????ng ??
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </div>
                {questionCurr ? (
                    <>
                        <div className="EasyLevel__content">
                            <div className="EasyLevel__question">
                                C??u {curr}:
                                <IconButton
                                    className="EasyLevel__question--icon"
                                    aria-label="volume"
                                    color="secondary"
                                    size="large"
                                    data-sound={questionCurr.voice}
                                    onClick={handleClickVolume}
                                >
                                    <VolumeUpIcon />
                                </IconButton>
                            </div>
                            <div className="EasyLevel__answer">
                                {questionCurr.questions.map((question) => {
                                    return (
                                        <div
                                            key={question.id}
                                            className={'EasyLevel__answer--wrapper'}
                                            onClick={() => {
                                                setAnswer(question.id);
                                                if (!correct && !wrong) {
                                                    setCheck(true);
                                                }
                                            }}
                                        >
                                            <div
                                                className={
                                                    answer === question.id
                                                        ? 'EasyLevel__answer--item EasyLevel__answer--item-active'
                                                        : 'EasyLevel__answer--item'
                                                }
                                            >
                                                <input type="image" src={question.image} alt="image" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="EasyLevel__bottom">
                                {correct && (
                                    <div className="EasyLevel__bottom--correct">
                                        <div className="EasyLevel__bottom--left">
                                            <IconButton
                                                className="EasyLevel__bottom--left-icon"
                                                size="large"
                                                color="success"
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                            <div className="EasyLevel__bottom--title">????p ??n ch??nh x??c</div>
                                        </div>
                                        <Button
                                            className="EasyLevel__bottom--btn"
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleClickNext}
                                        >
                                            Ti???p t???c
                                        </Button>
                                    </div>
                                )}
                                {wrong && (
                                    <div className="EasyLevel__bottom--wrong">
                                        <div className="EasyLevel__bottom--left">
                                            <IconButton
                                                className="EasyLevel__bottom--left-icon"
                                                size="large"
                                                color="error"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <div className="EasyLevel__bottom--title">????p ??n sai</div>
                                        </div>
                                        <Button
                                            className="EasyLevel__bottom--btn"
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleClickNext}
                                        >
                                            Ti???p t???c
                                        </Button>
                                    </div>
                                )}
                                {check && (
                                    <div className="EasyLevel__bottom--check">
                                        <Button
                                            className="EasyLevel__bottom--btn"
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleClickCheck}
                                        >
                                            Ki???m tra
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Modal
                            open={openScore}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={styleModal}>
                                <Typography
                                    id="keep-mounted-modal-title"
                                    color={'var(--primary-color)'}
                                    variant="h6"
                                    component="h2"
                                    sx={{ textAlign: 'center' }}
                                >
                                    ??i???m s??? c???a b???n
                                </Typography>
                                <Typography
                                    id="keep-mounted-modal-description"
                                    color={'#666'}
                                    sx={{ mt: 2, textAlign: 'center' }}
                                >
                                    {score}/100
                                </Typography>
                                <Stack direction="row" spacing={2} justifyContent="center" pt={2}>
                                    <Button
                                        className="btn--cancel"
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleClickAgree}
                                    >
                                        Tr??? v???
                                    </Button>
                                    <Button color="secondary" variant="contained" onClick={handleClickAgain}>
                                        Thi l???i
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </>
                ) : (
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Skeleton variant="rounded" width={'100%'} height={140} />
                        </Grid>
                        <Grid item xs={3}>
                            <Skeleton variant="rounded" width={'100%'} height={140} />
                        </Grid>
                        <Grid item xs={3}>
                            <Skeleton variant="rounded" width={'100%'} height={140} />
                        </Grid>
                        <Grid item xs={3}>
                            <Skeleton variant="rounded" width={'100%'} height={140} />
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
}

export default EasyLevel;
