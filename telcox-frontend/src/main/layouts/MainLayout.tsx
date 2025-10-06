import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useMiPortalState } from '@/store/useMiPortalState';

export const MainLayout = () => {
  const { clienteToken, clearClienteToken, clienteNombre } = useMiPortalState();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    clearClienteToken();
    navigate('/login');
  };

  return (
    <div className='position-relative'>
      <Navbar style={{ backgroundColor: 'var(--color-primary)' }} variant="dark" expand="lg">
        <div className='container d-flex justify-content-between'>
          <Navbar.Brand href="/" className='text-secondary'>Telcox</Navbar.Brand>

          {clienteToken && (
            <Nav className="d-flex align-items-center">
              <span className='mx-3 text-secondary'>{clienteNombre}</span>
              <span
                onClick={handleCerrarSesion}
                style={{ cursor: 'pointer' }}
              >
                Cerrar Sesion
              </span>
            </Nav>
          )}
        </div>
      </Navbar>

      <Container className="mt-4 min-vh-100">
        <Outlet />
      </Container>

      <div className='background'></div>
      <footer className="text-center mt-5 mb-3">
        &copy; 2025 Telcox. Todos los derechos reservados.
      </footer>
    </div>
  );
};
