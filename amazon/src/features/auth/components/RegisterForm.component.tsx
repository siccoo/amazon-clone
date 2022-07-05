import { FC, FormEvent } from 'react'
import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/input/use-input';
import { validateNameLength, validatePasswordLength } from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import { NewUser } from '../models/NewUser';

const RegisterFormComponent: FC = () => {

  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler
  } = useInput(validateNameLength);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler
  } = useInput(validatePasswordLength);

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    ) return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) return;

    const newUser: NewUser = {
      name, email, password
    }

    console.log("New User: ", newUser);

    clearForm();

  }

  return (
    <Box sx={{ padding: 2, border: 1, borderColor: "#CCCCCC", width: "350px", marginTop: 2 }}>
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <Typography variant="h4" component="h1">Create account</Typography>
          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor="name">Your name</InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Enter your name" : ""}
            type="name"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor="email">Email</InputLabel>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError ? "Enter a valid email" : ""}
            type="email"
            name="email"
            id="email"
            variant="outlined"
            size="small" />

          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor="password">Password</InputLabel>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? "Enter a valid password" : ""}
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder='Minimum 6 characters' />

          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor="confirmPassword">Re-enter password</InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password
                !== confirmPassword ? "Password must match" : ""
            }
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small" />

          <Button variant='contained' style={{ marginTop: '16px', height: '31px', borderColor: "#a88734 #9c7e31 #846a29", backgroundColor: '#f0c14b', color: '#000000', textTransform: 'none' }} type='submit'>Register</Button>
        </Grid>
      </form>

      <div style={{ marginTop: '30px' }}>
        <small>
          <span>By creating an account, you agree to Amazon's</span>
        </small>
      </div>

      <div>
        <small>
          <a href="#" style={{ textDecoration: 'none' }}>{' '}Conditions of use</a>{' '}
          and {' '}
          <a href="#" style={{ textDecoration: 'none' }}>Privacy policy</a>.
        </small>
      </div>

      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />

      <div style={{ marginTop: '30px' }}>
        <small>
          Already have an account?{" "}
          <Link to="/signin" style={{ textDecoration: "none", color: "#0000ee" }}>Sign-in</Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?
          <a href="#" style={{ textDecoration: 'none' }}>{' '}Create a free business account</a>{' '}
        </small>
      </div>
    </Box>
  )
}

export default RegisterFormComponent;