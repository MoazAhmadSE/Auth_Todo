import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {createUserStore} from "../app/store";
import { useEffect, useState } from "react";

export default function UserReduxWrapper({ children }) {
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      const { store, persistor } = createUserStore(username);
      setStoreData({ store, persistor });
    }
  }, []);

  if (!storeData) return null;

  return (
    <Provider store={storeData.store}>
      <PersistGate loading={null} persistor={storeData.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
