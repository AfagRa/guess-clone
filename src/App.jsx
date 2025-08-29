import { Outlet } from "react-router";

function App() {
  console.log('📱 App component rendered');
  
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App