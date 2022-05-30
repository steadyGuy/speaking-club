import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type ParticipantsListProps = {}

const ParticipantsList: FC<ParticipantsListProps> = () => {

  const roomInfo = useAppSelector((state) => state.roomInfo);
  return (
    <List>
      {roomInfo.participants.map((itm, idx) => (
        <ListItem key={idx} disableGutters>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={itm.identity.name}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ParticipantsList