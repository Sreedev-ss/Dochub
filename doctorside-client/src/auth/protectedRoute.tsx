import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../config/Redux/authslice';

const protectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth)
  const { user } = useSelector((state: any) => state.auth)
  let location = useLocation();
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const handleClose = () => {
    navigate('/doctor/login')
    dispatch(logoutSuccess())
  }

  if(user.data.approved == false){
    return <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Redirecting to login</DialogTitle>
        <DialogContent>
          <p>You cannot login because you are not approved.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  }

  if (!isAuthenticated) {
    return <Navigate to="/doctor/login" state={{ from: location }} replace />
  }

  return children
}

export default protectedRoute
