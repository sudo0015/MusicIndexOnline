import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Collapse } from '@mui/material'
import MovementList from './MovementList'

function WorkCard({ work, onCopyText, clickCopyEnabled, clickCopyRules, buildCopyText }) {
  const [expanded, setExpanded] = useState(false)

  const hasMovements = work.movements && work.movements.length > 0

  const handleToggle = () => {
    if (hasMovements) {
      setExpanded(!expanded)
    }
  }

  const copyToClipboard = async (event, text) => {
    event.stopPropagation()
    if (!text) return
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      if (onCopyText) {
        onCopyText(text)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const buildCopyButtonText = () => {
    const rule = clickCopyRules && clickCopyRules.copyButton
    const movements = work.movements || []
    if (movements.length === 0) return ''
    const lines = movements.map((m) => {
      if (rule === 'cueCode') {
        return `TITLE "${work.title}: ${m}"`
      }
      return `${work.title}: ${m}`
    })
    return lines.join('\n')
  }

  return (
      <Card 
        sx={{ 
          mb: 2, 
          userSelect: 'text',
          cursor: hasMovements ? 'pointer' : 'default',
          transition: 'box-shadow 0.2s ease',
          '&:hover': hasMovements ? {
            boxShadow: 3
          } : {}
        }}
        onClick={handleToggle}
      >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="span"
              onClick={clickCopyEnabled ? (e) => copyToClipboard(e, buildCopyText(clickCopyRules && clickCopyRules.workTitle, { work })) : undefined}
              sx={{
                display: 'inline-block',
                fontWeight: 700,
                fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
                cursor: clickCopyEnabled ? 'pointer' : 'default',
                transition: 'opacity 0.15s ease',
                '&:hover': clickCopyEnabled ? { opacity: 0.7 } : {},
                mb: 1,
              }}
            >
              {work.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip
                label={work.composer}
                size="small"
                color="primary"
                onClick={clickCopyEnabled ? (e) => copyToClipboard(e, buildCopyText(clickCopyRules && clickCopyRules.composerTag, { work })) : undefined}
                sx={{ cursor: clickCopyEnabled ? 'pointer' : 'default' }}
              />
              {work.genre && (
                <Chip
                  label={work.genre}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={clickCopyEnabled ? (e) => copyToClipboard(e, work.genre) : undefined}
                  sx={{ cursor: clickCopyEnabled ? 'pointer' : 'default' }}
                />
              )}
              {work.period && (
                <Chip
                  label={work.period}
                  size="small"
                  variant="outlined"
                  onClick={clickCopyEnabled ? (e) => copyToClipboard(e, work.period) : undefined}
                  sx={{ cursor: clickCopyEnabled ? 'pointer' : 'default' }}
                />
              )}
            </Box>
          </Box>

          {hasMovements && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, ml: 1 }}>
              {expanded && (
                <IconButton
                  size="small"
                  onClick={(e) => copyToClipboard(e, buildCopyButtonText())}
                  sx={{ width: 40, height: 40 }}
                >
                  <Box
                    component="span"
                    className="mdi mdi-content-copy"
                    sx={{ fontSize: '1.1rem' }}
                  />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
                sx={{ width: 40, height: 40 }}
              >
                <Box
                  component="span"
                  className="mdi mdi-chevron-down"
                  sx={{
                    fontSize: '1.5rem',
                    display: 'inline-block',
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <MovementList movements={work.movements} work={work} onCopyText={onCopyText} clickCopyEnabled={clickCopyEnabled} clickCopyRules={clickCopyRules} buildCopyText={buildCopyText} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default WorkCard