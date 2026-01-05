import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { CustomInput } from '6_Shared/ui/Input/CustomInput';
import { useNavigate } from 'react-router-dom';
import cls from './AuthPage.module.scss';

const AuthPage: FC = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async () => {
        setError('');
        const url = isLogin ? '/auth/login' : '/auth/register';
        const body = isLogin 
            ? { username, password } 
            : { username, email, password };

        try {
            const response = await fetch(`${__API__}${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Auth failed');
            }

            if (isLogin) {
                const data = await response.json();
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user_info', JSON.stringify({
                    id: data.id,
                    username: data.username,
                    email: data.email
                }));
                navigate('/');
                window.location.reload(); // Чтобы обновить сторы
            } else {
                setIsLogin(true);
                alert(t('success_registration'));
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className={classNames(cls.AuthPage, {}, [])}>
            <div className={cls.card}>
                <h1>{isLogin ? t('login_title') : t('register_title')}</h1>
                
                {error && <div className={cls.error}>{error}</div>}

                <CustomInput
                    value={username}
                    onChange={setUsername}
                    placeholder={t('username_placeholder')}
                    className={cls.input}
                />

                {!isLogin && (
                    <CustomInput
                        value={email}
                        onChange={setEmail}
                        placeholder={t('email_placeholder')}
                        type="email"
                        className={cls.input}
                    />
                )}

                <CustomInput
                    value={password}
                    onChange={setPassword}
                    placeholder={t('password_placeholder')}
                    type="password"
                    className={cls.input}
                />

                <Button 
                    theme={ThemeButton.DEFAULT} 
                    onClick={onSubmit}
                    className={cls.submitBtn}
                >
                    {isLogin ? t('login_btn') : t('register_btn')}
                </Button>

                <div className={cls.toggle}>
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? t('go_to_register') : t('go_to_login')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
