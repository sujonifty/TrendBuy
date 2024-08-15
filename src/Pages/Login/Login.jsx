import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
    const { login, error, setError, googleSignIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = () => {
        setError("");
        login(email, password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state ? location.state : '/')
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                if (error.message) {
                    setError('Email or password is wrong')
                }

            })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(location?.state ? location.state : '/')
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successfully by Google',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                console.log(error)
                setError(error.message);
            })
    }
    return (
        <div className="flex justify-center items-center">
            <Card className="max-w-sm">
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            id="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <div className="relative">
                            <TextInput id="password" type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required />
                            <div
                                className="absolute right-3 top-1/3"
                                onClick={() => { setShowPassword(!showPassword) }}>
                                {
                                    showPassword ? <IoMdEyeOff /> : <IoMdEye />

                                }
                            </div>
                        </div>

                    </div>
                    
                    <div className="w-full">
                        <Button onClick={handleLogin}>Log in to your account</Button>
                    </div>
                    {
                        error && <small className="text-red-700">{error}</small>
                    }
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?&nbsp;
                        <a href="/register" className="text-cyan-700 hover:underline dark:text-cyan-500">
                            Create account
                        </a>
                    </div>
                   <hr />
                   <div className="form-control my-6">
                        <Button onClick={handleGoogleLogin}>Login By Google</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;