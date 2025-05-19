import { useFirestoreNetworkManager } from "./hooks/useFirestoreNetworkManager";
import AppRouters from "./router/AppRoutes";

function App() {
  useFirestoreNetworkManager();
  return (
    <>
      <div className="tw-bg-myDark tw-max-h-screen tw-overflow-hidden">
        <AppRouters />
      </div>
    </>
  );
}

export default App;
