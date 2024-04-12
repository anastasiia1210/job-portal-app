import './LoginForm.scss'
import {useState} from "react";
import {LoginService} from "../../services/LoginService";
import {Link, useNavigate} from "react-router-dom";
function SeekerLoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleCloseForm = () => {
        setEmail('');
        setPassword('');
        props.setTrigger(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await LoginService.signUpUser({
                email: email,
                password: password,
                role: role,
            });
            localStorage.setItem('email', response.email);
            localStorage.setItem('password', response.password);
            localStorage.setItem('role', response.role);
            console.log(response);
            handleCloseForm();
            if(role === "employer"){
                navigate('/employer/add');
            } else{navigate('/seeker/add');}
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (props.trigger) ? (
        <div className='background-form'>
            <div className='login-form-div'>
                <form className="form" onSubmit={handleSubmit}>
                    <p className="cross" onClick={handleCloseForm}>&times;</p>
                    <p className="form-title">Зареєструватися</p>
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
                        </select>
                    </div>
                    <button type="submit" className="submit">
                        Продовжити
                    </button>
                </form>
            </div>
        </div>
    ):"";
}

export default SeekerLoginForm;
