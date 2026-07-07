import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography, Box } from '@mui/material'

function MovementList({ movements }) {
  if (!movements || movements.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        No movement information
      </Typography>
    )
  }

  return (
    <Paper variant="outlined" sx={{ p: 1, bgcolor: 'action.hover' }}>
      <List dense disablePadding>
        {movements.map((movement, index) => (
          <ListItem key={index} divider={index < movements.length - 1}>
            <ListItemText 
              primary={`${index + 1}. ${movement}`}
              primaryTypographyProps={{ variant: 'body1', fontFamily: 'Merchant, serif' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default MovementList