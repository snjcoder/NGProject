import React, { useContext } from 'react'
import { Box, Container, Typography, Avatar,ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { AuthContext  } from '../../auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import Location from '../Region/Location';
import ChatIcon from "@mui/icons-material/Chat";
import Messenger from '../chat/messenger/Messenger';

const RightBar = () => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate= useNavigate()
  const handleModal = () => {
    navigate('/location')
  }

  return (
    <Box sx={{flex: "2", height: "calc(100vh-50px)" }}>
     <Container>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography>
          {user.displayName}
        </Typography>
        <Typography>
        email: {user.email}
        </Typography>
       <Location />
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <Messenger/>
       {/* <ListItemButton>
              <ListItemIcon>
                <ChatIcon/>
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton> */}
            
     </Container>
       
    </Box>
  )
}

export default RightBar;