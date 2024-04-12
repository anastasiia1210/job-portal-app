import './LoginForm.scss'
import {useState} from "react";
import {LoginService} from "../../services/LoginService";
import {Link, useNavigate} from "react-router-dom";
import {SeekerService} from "../../services/SeekerService";
import {toast, Toaster} from "react-hot-toast";
import {EmployerService} from "../../services/EmployerService";
function SeekerLoginForm(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('seeker');

    const handleCloseForm = () => {
        setEmail('');
        setPassword('');
        props.setTrigger(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(role)
            if (role == ""){
                toast.error('Error fetching companies:');
                return
            }
            const response = await LoginService.loginUser({
                email: email,
                password: password,
                role: role,
            });
            localStorage.setItem('token', response.token);
            if(role == "seeker") {
                const user = await SeekerService.getOneSeekerByEmail(email)
                localStorage.setItem('id', user.id);
            }
            if(role == "employer") {
                const user = await new EmployerService().getOneEmployerByEmail(email)
                localStorage.setItem('id', user.id);
            }
            localStorage.setItem('role', role);
            if(role == "admin"){
                navigate('/admin');
            }else{
                navigate('/job-offers');
            }
            props.setToken(response.token);
            console.log(response.token);
            handleCloseForm();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (props.trigger) ? (
            <div className='background-form'>
                <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='login-form-div'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="cross" onClick={handleCloseForm}>&times;</p>
                <p className="form-title">Вхід в акаунт</p>
                <div className="input-container">
                    <input type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Роль:</label>
                    <select className="form-control" id="role" onChange={(event) => setRole(event.target.value)}
                            value={role}>
                        <option key="seeker" value="seeker">Шукач</option>
                        <option key="employer" value="employer">Роботодавець</option>
                        <option key="admin" value="admin">Адмін</option>
                    </select>
                </div>

                <button type="submit" className="submit">
                    Увійти
                </button>
                <div className='signup-links-div'>
                    <Link className="signup-link"  onClick={(e) => {e.preventDefault(); handleCloseForm(); props.setIsSignUpFormVisible(true);}}>Зареєструватися</Link>
                </div>
            </form>
            </div>
            </div>
    ):"";
}

export default SeekerLoginForm;
