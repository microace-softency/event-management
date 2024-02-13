import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { useAuth } from '../context/AuthContext';
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { MdVerified } from "react-icons/md";

export default function PhoneAuth() {
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [confirmObj, setConfirmObj] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [isAuthorisedNumber, setIsAuthorisedNumber] = useState('')
    const { signInWithPhone, user, logout } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        clearErrors,
        formState: { errors },
    } = useForm({ mode: 'onSubmit' });

    useEffect(() => {
        updateUser()
    }, [user])

    useEffect(() => {
        updateUser()
    }, [])
    
    const updateUser = () => {
        if (user && user.phoneNumber) {
            console.log(user.phoneNumber);
            setIsAuthorisedNumber(user.phoneNumber || '');
        } else {
            setIsAuthorisedNumber('');
        }
    }

    const onSubmit = async ({ phone }) => {
        setLoading(true);
        try {
            const response = await signInWithPhone(countryCode + phone);
            setConfirmObj(response);
            setShowOTP(true);
        } catch (err) {
            console.log(err);
            window.location.reload(false);
            setError('phone', {
                type: "api",
                message: "Oops! something went wrong",
            });
        }
        setLoading(false);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await confirmObj.confirm(otp)
        } catch (err) {
            setOtpError({
                type: "api",
                message: "Invalid OTP entered",
            });
        }
        setLoading(false);
        setShowOTP(false);
    };

    const resendOtp = () => {
        return onSubmit({ phone: getValues('phone') });
    };
    
    const closeOtp = () => {
        setShowOTP(false);
        clearErrors();
    };

    const handleClear = () => {
        logout();
        console.log("123");
    };
    
    return (
        <div className="mt-8">
            <div id="recaptcha-container" className="hidden overflow-hidden"></div>
            {!isAuthorisedNumber ? <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>{countryCode}</InputGroup.Text>
                        <FormControl
                            {...register('phone', {
                                required: true,
                                maxLength: 10,
                                pattern: /^[0-9]{10}$/,
                            })}
                            type="tel"
                            name="phone"
                        />
                    </InputGroup>
                    {errors.phone && <Form.Text className="text-danger">{errors?.phone?.message || 'Enter valid phone number'}</Form.Text>}
                </Form.Group>
                <Button type="submit" className="w-100" variant="primary" disabled={loading}>
                    Verify
                </Button>
            </Form> : 
            <div>
                <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text disabled>{countryCode}</InputGroup.Text>
                        <FormControl
                            disabled
                            value={isAuthorisedNumber.replace(/^(\+91)/, '')}
                        />
                    </InputGroup>
                    {errors.phone && <Form.Text className="text-danger">{errors?.phone?.message || 'Enter valid phone number'}</Form.Text>}
                </Form.Group>
                <Button disabled className="w-100 my-2" variant="success" >
                    <span className='flex items-center justify-center gap-2'>
                        Authorised <MdVerified />
                    </span>
                </Button>
                <Button onClick={handleClear} className="w-100" variant="primary" >
                    Use Another Number
                </Button>
            </div>}
            <Modal show={showOTP} onHide={closeOtp}>
                <Modal.Header closeButton>
                    <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="mb-4">
                            <i className="bi bi-arrow-right-circle" style={{ fontSize: '4rem', color: 'primary' }}></i>
                        </div>
                        <h4 className="mb-1">OTP Verification</h4>
                        <p>Enter the OTP sent to {countryCode} {getValues('phone')}</p>
                    </div>
                    <div className="mt-2 text-center py-2">
                        <div className='flex justify-center'>
                            {otpError && <p className="text-danger">{otpError?.message}</p>} <br/>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={false}
                                containerStyle={{ margin: '0 auto' }}
                                inputStyle={{ border: '1px solid gray', marginRight: '5px', width: '24px', borderRadius: '4px' }}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <div className='my-4 flex gap-2 justify-center'>
                            <Button type="button" onClick={resendOtp} variant="outline-secondary" className="mt-2" >
                                Resend OTP
                            </Button>
                            <Button type="button" onClick={verifyOtp} fullWidth loading={loading} variant="primary" className="mt-2" disabled={otp.length < 6}>
                                Verify OTP
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
