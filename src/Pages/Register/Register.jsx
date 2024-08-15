import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { auth } from "../../Firebase/Firebase.config";
import Swal from "sweetalert2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = () => {
    const { createUser, setUser, updateUserProfile, error, setError } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    console.log(name,photo,email,password)

    const handleRegister = () => {
        setError("");
        if (password.length < 6) {
            setError('password must be 6 characters');
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
            setError('password must be an Uppercase & LowerCase letter');
            return;
        }
        createUser(email, password)
            .then(result => {
                console.log(result);
                // update profile 
                updateUserProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo,

                })
                    .then(() => {
                        setUser((prevUser) => {
                            return { ...prevUser, displayName: name, photoURL: photo, email: email }
                        })
                        console.log("profile updated");
                    })
                    .catch(error => {
                        setError(error.message);
                        console.log(error.message)
                    })
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
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
                            <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput
                            id="name"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="photo" value="Photo URL" />
                        </div>
                        <TextInput
                            id="photo"
                            placeholder="Photo URL"
                            value={photo}
                            onChange={(event) => setPhoto(event.target.value)}
                            required
                        />
                    </div>
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
                        <Button onClick={handleRegister}>Register a new account</Button>
                    </div>
                    {
                            error && <small className="text-red-700">{error}</small>
                        }
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?&nbsp;
                        <a href="/login" className="text-cyan-700 hover:underline dark:text-cyan-500">
                        Now Login
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;