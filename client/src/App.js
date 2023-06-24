import FileManagerList from './components/FileManagerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap'

function App() {
  return (
    <Container style={{marginTop:'5vw'}}>
      <FileManagerList></FileManagerList>
    </Container>

  );
}

export default App;
