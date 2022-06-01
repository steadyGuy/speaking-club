import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IParticipant } from '../../types';
import { setActiveConversation } from '../../store/action-creators/roomInfoActions';

type ParticipantsListProps = {}

const ParticipantsList: FC<ParticipantsListProps> = () => {
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector((state) => state.roomInfo);

  const handleOpenActiveChatBox = (participant: IParticipant) => {
    if (participant.identity.id !== roomInfo.identity.id) {
      dispatch(setActiveConversation(participant))
    }
  }

  return (
    <List>
      {roomInfo.participants.map((itm, idx) => (
        <ListItem key={idx} disableGutters onClick={() => handleOpenActiveChatBox(itm)}>
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