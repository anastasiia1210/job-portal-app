import './LoginForm.scss'
import {useState} from "react";
import {LoginService} from "../../services/LoginService";
import {useNavigate} from "react-router-dom";
import {SeekerService} from "../../services/SeekerService";
function SeekerLoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCloseForm = () => {
        setEmail('');
        setPassword('');
        props.setTrigger(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await LoginService.loginUser({
                email: email,
                password: password,
                role: 'seeker',
            });
            localStorage.setItem('token', response.token);
            const seeker = await SeekerService.getOneSeekerByEmail(email)
            localStorage.setItem('id', seeker.id);
            props.setToken(response.token);
            console.log(response.token);
            handleCloseForm();
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    return (props.trigger) ? (
            <div className='background-form'>
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
                <button type="submit" className="submit">
                    Увійти
                </button>
                <div className='signup-links-div'>
                    <a href="#" className="signup-link">Зареєструватися</a>
                    <a href="#" className="signup-link">Вхід для роботодавця</a>
                </div>
            </form>
            </div>
            </div>
    ):"";
}

export default SeekerLoginForm;
