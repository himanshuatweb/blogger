
import * as Yup from 'yup';

export const userLoginSchema = Yup.object({
    email: Yup.string().email().max(80).required('email is required'),
    password: Yup.string().trim().max(30).required('password is required'),
});


export const userRegisterSchema = Yup.object({
    fullName: Yup.string().max(80).required('name is required'),
    email: Yup.string().email().max(80).required('email is required'),
    age: Yup.number().required('age is required').moreThan(18),
    password: Yup.string().trim().max(30).required('password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    userImage: Yup.mixed()
        .required('user image is required')
        .test(
            'fileFormat',
            'Invalid file format. Only images are allowed',
            (value: any) => {
                return value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
            }
        ),
});

