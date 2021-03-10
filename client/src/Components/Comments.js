import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import user from '../Images/large_sel-hamr.jpg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { DataContext } from '../Context/AppContext';
import Axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import { UseWindowSize } from '../Assets/UseWindowSize';

const Comments = (props) => {
  const ctx = React.useContext(DataContext);
  const width = UseWindowSize();
  const [showComment, setShowComment] = React.useState(false);
  const [comments, setComments] = React.useState({
    comment: '',
    myComment: '',
  });
  const sendMessage = () => {
    Axios.post(
      `/comment/`,
      {
        imdbID: props.data.imdbCode,
        commentContent: comments.myComment,
      },
      { withCredentials: true }
    ).then(async (result) => {
      const results = await Axios.get(`/comment/${props.data.imdbCode}`, { withCredentials: true });
      setComments((oldValue) => ({ comment: results.data.body, myComment: '' }));
    });
  };
  // imdbID, commentID
  const deleteComment = (e) => {
    Axios.post(
      `/comment/delete`,
      {
        imdbID: props.data.imdbCode,
        commentID: parseInt(e.currentTarget.dataset.id),
      },
      { withCredentials: true }
    ).then(async () => {
      const results = await Axios.get(`/comment/${props.data.imdbCode}`, { withCredentials: true });
      setComments((oldValue) => ({ comment: results.data.body, myComment: '' }));
    });
  };

  React.useEffect(() => {
    let unmount = false;
    ctx.ref.setShowComment = setShowComment;
    const awaitData = async () => {
      const result = await Axios.get(`/comment/${props.data.imdbCode}`, { withCredentials: true });
      if (!unmount && result.data.body instanceof Array) setComments((oldValue) => ({ ...oldValue, comment: result.data.body }));
    };
    if (!unmount) awaitData();
    return () => {
      unmount = true;
      ctx.ref.setShowComment = null;
    };
  }, [ctx.Lang, props.code]);
  return (
    <Dialog open={showComment} onClose={() => setShowComment(false)} className='CommentDialog'>
      <DialogContent style={{ width: '92%' }}>
        <p>Comments</p>
        <div className='showComment'>
          {comments.comment instanceof Array ? (
            <List dense={true}>
              {comments.comment.map((comment, key) => (
                <div key={key}>
                  <ListItem>
                    <ListItemAvatar>{comment.image ? <Avatar src={comment.image} /> : <Avatar>{comment.userName.substring(0, 2)}</Avatar>}</ListItemAvatar>
                    <ListItemText primary={comment.userName} secondary={comment.commentContent} />
                    <ListItemSecondaryAction>
                      {width > 600 ? <span className='commentDate'>{moment(comment.date).fromNow()}</span> : ''}
                      <IconButton edge='end' aria-label='delete' data-id={comment.commentID} onClick={deleteComment}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', width: '90%' }} />
                </div>
              ))}
            </List>
          ) : (
            <p style={{ fontSize: '17px', textAlign: 'center', color: 'rgba(82, 82, 82, 0.87)' }}>No comment yat</p>
          )}
        </div>
        <TextField
          label='Add comment'
          multiline
          rows={4}
          value={comments.myComment}
          variant='outlined'
          style={{ width: '95%' }}
          onChange={(e) => {
            setComments((oldValue) => ({ ...oldValue, myComment: e.target.value }));
          }}
        />
        <Button
          startIcon={<AddIcon style={{ fontSize: '18px' }} />}
          variant='contained'
          size='small'
          onClick={sendMessage}
          style={{
            backgroundColor: '#222831',
            color: 'white',
            textTransform: 'none',
            marginTop: '15px',
            marginBottom: '10px',
            width: '110px',
            height: '35px',
            fontSize: '15px',
            fontWeight: '600',
            marginLeft: 'auto',
            marginRight: '15px',
            display: 'flex',
          }}>
          send
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Comments;
