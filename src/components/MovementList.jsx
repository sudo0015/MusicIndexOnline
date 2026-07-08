import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography, Box } from '@mui/material'

function MovementList({ movements, onCopyText }) {
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
        {movements.map((movement, index) => {
          const handleClick = async (event) => {
            event.stopPropagation()
            try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(movement)
              } else {
                const textarea = document.createElement('textarea')
                textarea.value = movement
                textarea.style.position = 'fixed'
                textarea.style.opacity = '0'
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
              }
              if (onCopyText) onCopyText(movement)
            } catch (err) {
              console.error('Failed to copy:', err)
            }
          }
          return (
            <ListItem key={index} divider={index < movements.length - 1} onClick={handleClick}>
              <ListItemText
                primary={movement}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontFamily: '"EB Garamond", "Times New Roman", Georgia, serif',
                  sx: { cursor: 'pointer', transition: 'opacity 0.15s ease', '&:hover': { opacity: 0.7 } },
                }}
              />
            </ListItem>
          )
        })}
      </List>
    </Paper>
  )
}

export default MovementList