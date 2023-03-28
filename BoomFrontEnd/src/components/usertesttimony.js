import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, Typography } from '@material-ui/core';
import '../styles/components/userTestimony.css';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2), 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    padding: '16px',
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
}));

const UserTestimony = ({ userImage, username, testimony }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card}`}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} src={userImage}>
            {username.charAt(0)}
          </Avatar>
        }
        title={<Typography className={classes.title} variant="h6">{username}</Typography>}
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary">{testimony}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserTestimony;