import './LearnImg.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import HomeIcon from '@mui/icons-material/Home';
import ModalIntroImage from '~/assets/images/modalIntro.jpg';

import { Button, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import axios from 'axios';
import { baseURL } from '~/Utils/constant';

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
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none',
};

function LearnImg() {
    const { id } = useParams();
    const [imagesArray, setImagesArray] = useState([]);
    const [course, setCourse] = useState('Chủ đề');
    const [openModalIntro, setOpenModalIntro] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseURL}/course/images/${id}`);
                setImagesArray(res.data.imageArray);
                setCourse(res.data.course.name);
                console.log(res.data.course.name);
            } catch (err) {
                console.error('fe: ' + err.message);
            }
        };
        getData();
    }, [id]);

    const handleClick = (e) => {
        new Audio(e.target.dataset.sound).play();
    };

    return (
        <>
            <div className="LearnImg__wrapper">
                <div className="LearnImg__container">
                    <div className="LearnImg__nav">
                        <Link to={`/app/selection/${id}`}>
                            <IconButton aria-label="delete" size="large" color="secondary">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        {/* <Link to="/app">
                            <IconButton aria-label="delete" size="large" color="secondary">
                                <HomeIcon />
                            </IconButton>
                        </Link> */}
                    </div>
                    <Typography
                        className="header"
                        sx={{
                            color: 'var(--primary-color)',
                            textAlign: 'center',
                            fontWeight: '500',
                            marginBottom: '10px',
                        }}
                        variant="h4"
                    >
                        {course}
                    </Typography>
                    <div id="style-2" className="LearnImg__content">
                        {imagesArray.length ? (
                            imagesArray.map((image) => {
                                return (
                                    <div key={image._id} className="LearnImg__item">
                                        <input
                                            type="image"
                                            src={image.link}
                                            data-sound={image.voice}
                                            onClick={handleClick}
                                            alt="image"
                                        />
                                    </div>
                                );
                            })
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
            </div>
            <Modal
                open={openModalIntro}
                onClose={() => setOpenModalIntro(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={styleModalIntro}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ mt: 2, mb: 2, color: '#000' }} variant="h5">
                            Nhấn vào hình ảnh để nghe
                        </Typography>
                        <input type="image" src={ModalIntroImage} style={{ width: '300px' }} alt="image" />
                        <Button
                            sx={{ margin: 'auto' }}
                            onClick={() => setOpenModalIntro(false)}
                            variant="contained"
                            color="secondary"
                        >
                            Đồng ý
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default LearnImg;
