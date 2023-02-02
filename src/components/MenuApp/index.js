import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './MenuApp.scss';
import { useState } from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import QuizIcon from '@mui/icons-material/Quiz';
import StarsIcon from '@mui/icons-material/Stars';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

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

function MenuApp() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handleClickLogout = () => {
        localStorage.setItem('login', 'false');
        localStorage.setItem('id', '');
        localStorage.setItem('name', '');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <div className="App__wrapper">
                <div className="App__background">
                    <div className="App__list">
                        <div className="App__header">English Kids</div>
                        <div className="App__content">
                            <Link to="/app/learn" className="btn-grad App__Item">
                                <FactCheckIcon className="App__Item--icon" />
                                Chọn chủ đề
                            </Link>
                            <Link to="/app/exam" className="btn-grad App__Item">
                                <QuizIcon className="App__Item--icon" />
                                Bài kiểm tra
                            </Link>
                            <Link to="/app/rank" className="btn-grad App__Item">
                                <StarsIcon className="App__Item--icon" />
                                Xếp hạng
                            </Link>
                            <Link onClick={handleOpen} className="btn-grad App__Item">
                                <StarsIcon className="App__Item--icon" />
                                Đăng xuất
                            </Link>
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
                                        Bạn muốn đăng xuất ?
                                    </Typography>

                                    <Stack direction="row" spacing={2} justifyContent="right" pt={2}>
                                        <Button className="btn--cancel" variant="contained" onClick={handleClose}>
                                            Hủy
                                        </Button>
                                        <Button color="secondary" variant="contained" onClick={handleClickLogout}>
                                            Đồng ý
                                        </Button>
                                    </Stack>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuApp;
