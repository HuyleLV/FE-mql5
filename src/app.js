import { useLocation } from 'react-router-dom';
import { DefaultLayoutAdmin, DefaultLayoutUser } from "./component";

const roterAdmin = '/admin'
function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  if(currentPath?.includes(roterAdmin)) return <DefaultLayoutAdmin />
  return <DefaultLayoutUser />
}

export default App;
