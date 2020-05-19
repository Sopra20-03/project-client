import { toast } from 'react-toastify';

export const infoNotification = (message, duration=8000, position='top-center') => {
    message = `ℹ ${message}`
    toast.info (message, {
        autoClose: duration,
        position: position
    });
}

export const errorNotification = (message, duration=8000, position='top-center') => {
    message = `💀\n ${message}`;
    toast.error(message, {
        autoClose: duration,
        position: position
    })
}

export const successNotification = (message, duration=8000, position='top-center') => {
    message = `🎉 ${message}`;
    toast.success(message, {
        autoClose: duration,
        position: position
    })
}