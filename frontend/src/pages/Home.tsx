import { Button } from '@/components/ui/button'
import useLogout from '@/hooks/useLogout';

const Home = () => {
  const {logout } = useLogout();
  return (
    <div>
      Hello
      <Button onClick={logout}> Logout</Button>
    </div>
  )
}

export default Home
