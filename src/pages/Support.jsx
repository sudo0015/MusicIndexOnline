import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  useTheme,
} from '@mui/material'
import Layout from '../components/Layout'

function Support() {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Layout>
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
            fontWeight: 700,
            mb: 4,
            color: theme.palette.primary.main,
          }}
        >
          Thank you for your support
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: '520px',
            mb: 2,
            color: 'text.secondary',
            lineHeight: 1.8,
          }}
        >
          Your donation means a great deal to this project.
          Every contribution fuels the continued expansion of the database
          and extends access to these valuable resources for a broader community.
        </Typography>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            borderRadius: '9999px',
            px: 4,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Layout>
  )
}

export default Support