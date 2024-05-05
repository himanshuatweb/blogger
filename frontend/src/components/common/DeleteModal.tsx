import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CircularProgress, useTheme } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

type ModalProps = {
    open: boolean,
    title: String,
    description?: String,
    handleClose: () => void,
    handleDelete: () => void,
    isDeleting?: boolean,
}

const DeleteModal: React.FC<ModalProps> = (props) => {
    const { open, title, description, handleClose, handleDelete, isDeleting } = props;
    const theme = useTheme();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Delete-Modal"
                aria-describedby="delete-modal"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {description}
                    </Typography>

                    <Box sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 4,
                    }}>
                        <Button
                            color="info"
                            variant="contained"
                            sx={{
                                padding: '6px 30px',
                                '&:hover': {
                                    backgroundColor: theme.palette.warning.light,
                                    color: '#fff',
                                },
                            }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            sx={{
                                padding: '6px 30px',
                                '&:hover': {
                                    backgroundColor: theme.palette.error.dark,
                                    color: '#fff',
                                },
                            }}
                            startIcon={isDeleting && <CircularProgress size={20} />}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            Delete
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

export default DeleteModal
