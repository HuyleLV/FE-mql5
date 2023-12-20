import { useLocation } from 'react-router-dom';
import { DefaultLayoutAdmin, DefaultLayoutUser } from "./component";
import { useCookies } from 'react-cookie';

const roterAdmin = '/admin'
function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [cookies] = useCookies(['user']);
  console.log('cookies', cookies)

  if(currentPath?.includes(roterAdmin)) return <DefaultLayoutAdmin />
  return <DefaultLayoutUser />
}

export default App;
