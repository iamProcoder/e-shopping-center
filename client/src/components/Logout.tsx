import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { logoutUser } from '../redux/user/authSlice';
import { Logout } from '../services/user.service';

const LogoutExit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {logout, loading, error} = Logout();
  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>Error! {error.message}</p>;

  const logoutHandle = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const { data } = await logout({ variables: { data: {refresh_token: refreshToken} } });
      if (data && data.Logout === 'Success') {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logoutUser());
        navigate('/auth');
      }  
    } catch (e: any) {
      console.log('Logout :>> ', e.message);
    }
  }

  return (
    <div>
      <button onClick={() => logoutHandle()}>Logout</button>
    </div>
  )
}

export default LogoutExit