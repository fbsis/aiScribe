import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: {
    p: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  } as SxProps<Theme>,

  notesList: {
    flex: 1,
    overflow: 'auto',
  } as SxProps<Theme>,

  loadingContainer: {
    p: 2,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps<Theme>,

  noteCard: {
    mb: 2,
    position: 'relative',
  } as SxProps<Theme>,

  noteCardContent: {
    p: 2,
  } as SxProps<Theme>,

  noteCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  } as SxProps<Theme>,

  noteCardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
  } as SxProps<Theme>,

  noteCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
    borderRadius: 1,
  } as SxProps<Theme>,
}; 