import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault(); // Prevents form from reloading the page
    if (!userName || !password) {
      setDisplayError("Please enter both a username and password.");
      return;
    }
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <form className="login-form">
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input 
            className='form-control' 
            type='text' 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder='your@email.com' 
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input 
            className='form-control' 
            type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='password' 
          />
        </div>
        <Button type="submit" variant='primary' disabled={!userName || !password}>
          Login
        </Button>
        <Button type="button" variant='secondary' onClick={() => props.onLogin(userName)} disabled={!userName || !password}>
          Create
        </Button>
      </form>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
