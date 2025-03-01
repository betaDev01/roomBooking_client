import { Container, Spinner } from 'react-bootstrap';

import '../../assets/custom-spinner.css';

export const CustomSpinner = () => (
  <Container className={`d-flex justify-content-center align-items-center`}>
    <Spinner className={`custom-spinner`} animation='border' variant='light'/>
  </Container>
);