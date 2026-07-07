import React, { useState, useRef, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Container, Box, TextField, InputAdornment, IconButton, Slide, Fade, useTheme, useMediaQuery } from '@mui/material'

const searchInputSx = {
  width: '100%',
  maxWidth: '320px',
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    borderRadius: '9999px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    '&.Mui-focused fieldset': { borderColor: '#fff' }
  },
  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.7)', opacity: 1 },
  '& svg': { color: '#fff' }
}

function Layout({ children, searchTerm, onSearchChange }) {
  const theme = useTheme()
  const isCompact = useMediaQuery(theme.breakpoints.down('md'))
  const isVeryCompact = useMediaQuery('(max-width:480px)')

  const [searchExpanded, setSearchExpanded] = useState(false)
  const [titleHidden, setTitleHidden] = useState(false)
  const [showSearchButton, setShowSearchButton] = useState(true)
  const searchInputRef = useRef(null)
  const animTimerRef = useRef(null)

  const showSearchInput = !!searchTerm || searchExpanded

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setShowSearchButton(false)
    }
  }, [searchTerm])

  const collapseSearch = () => {
    setSearchExpanded(false)
  }

  const handleSlideExited = () => {
    setShowSearchButton(true)
    setTitleHidden(false)
  }

  const handleSearchToggle = () => {
    if (showSearchInput) {
      if (searchTerm) onSearchChange('')
      collapseSearch()
    } else {
      setShowSearchButton(false)
      setTitleHidden(true)
      animTimerRef.current = setTimeout(() => {
        setSearchExpanded(true)
      }, 100)
    }
  }

  const handleSearchBlur = () => {
    if (!searchTerm) {
      collapseSearch()
    }
  }

  const showTitle = !isVeryCompact && (!isCompact || !showSearchInput) && !titleHidden

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" sx={{ top: 0, zIndex: 1100 }}>
        <Toolbar sx={{ overflow: 'hidden' }}>
          <Box sx={{ mr: 2, display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <span className="mdi mdi-music" style={{ color: '#fff', fontSize: '1.5rem' }} />
          </Box>

          <Fade in={showTitle} unmountOnExit>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Merchant, serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Music Index Online
            </Typography>
          </Fade>

          {isCompact ? (
            <>
              {showSearchButton && (
                <>
                  {!showTitle && <Box sx={{ flexGrow: 1 }} />}
                  <IconButton color="inherit" onClick={handleSearchToggle} sx={{ flexShrink: 0 }}>
                    <span className="mdi mdi-magnify" style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </IconButton>
                </>
              )}
              <Slide direction="left" in={showSearchInput} mountOnEnter unmountOnExit onExited={handleSlideExited}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    size="small"
                    inputRef={searchInputRef}
                    onBlur={handleSearchBlur}
                    autoFocus
                    sx={searchInputSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={handleSearchToggle} sx={{ color: '#fff', p: 0.5 }}>
                            <span className="mdi mdi-close" style={{ fontSize: '1.1rem' }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Slide>
              {showSearchInput && (
                <Box sx={{ width: 40, flexShrink: 0 }} />
              )}
            </>
          ) : (
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              sx={{
                width: { xs: '55%', sm: '40%', md: '320px' },
                ...searchInputSx
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="mdi mdi-magnify" style={{ color: '#fff' }} />
                  </InputAdornment>
                )
              }}
            />
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ py: 3 }}>
        {children}
        <Box component="footer" sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            © 2026 BUG STUDIO · For reference only
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Layout