// material-ui
import { Box , CardMedia} from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //
import './style.css'
import avatar from 'assets/images/licoexpress/background_licoexpress.jpg';
const AuthBackground = () => {


  return (
    <Box sx={{ position: 'absolute', filter: 'blur(6px)', zIndex: -1, bottom: 0 }}>
       <CardMedia 
         component="img" 
         image={avatar} 
         sx={{ 
          height: '100vh',
          width: '100vw',
          display: 'block',
        }} 
        className="media"
         />
         
    </Box>
  );
};

export default AuthBackground;
