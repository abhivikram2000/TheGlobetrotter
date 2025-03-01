'use client';

import { useState, useEffect } from 'react';
import type { User } from '../lib/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Snackbar
} from '@mui/material';
import {
  Close,
  WhatsApp,
  Share,
  EmojiEvents,
  Check,
  ContentCopy
} from '@mui/icons-material';

interface SharePopupProps {
  user: User;
  onClose: () => void;
}

export default function SharePopup({ user, onClose }: SharePopupProps) {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const shareUrl = `${window.location.origin}?invite=${encodeURIComponent(user.username)}`;
  
  useEffect(() => {
    // Check if the Web Share API is available
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);
  
  const handleShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({
          title: 'Globetrotter Challenge',
          text: `Join me in the Globetrotter Challenge! I've scored ${user.score.correct} correct answers. Can you beat my score?`,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      // Modern approach using Clipboard API
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setSnackbarOpen(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setSnackbarOpen(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          console.error('Fallback: Could not copy text');
        }
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Join me in the Globetrotter Challenge! I've scored ${user.score.correct} correct answers. Can you beat my score? ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="span">
            Challenge Friends
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'white' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <EmojiEvents fontSize="large" />
              <Box>
                <Typography variant="h6">Your Score</Typography>
                <Typography variant="body1">
                  {user.score.correct} correct answers
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Challenge your friends to beat your score in this exciting geography quiz!
            </Typography>
          </CardContent>
        </Card>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<WhatsApp />}
            onClick={handleWhatsAppShare}
          >
            Share on WhatsApp
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={copied ? <Check /> : <ContentCopy />}
            onClick={copyToClipboard}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          {canNativeShare && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Share />}
              onClick={handleShare}
            >
              Share
            </Button>
          )}
        </Box>
      </DialogContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Dialog>
  );
} 