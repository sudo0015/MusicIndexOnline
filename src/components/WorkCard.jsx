import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Collapse } from '@mui/material'
import MovementList from './MovementList'

function WorkCard({ work }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700, fontFamily: 'Merchant, serif' }}>
              {work.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip 
                label={work.composer} 
                size="small" 
                color="primary"
              />
              {work.genre && <Chip label={work.genre} size="small" variant="outlined" />}
            </Box>
          </Box>
          {work.movements && work.movements.length > 0 && (
            <IconButton 
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ flexShrink: 0, ml: 1 }}
            >
              <Box 
                component="span" 
                className={`mdi ${expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'}`}
                sx={{ fontSize: '1.5rem' }}
              />
            </IconButton>
          )}
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <MovementList movements={work.movements} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default WorkCard