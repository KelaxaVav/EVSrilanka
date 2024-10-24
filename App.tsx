import { Provider } from "react-redux";
import AppNavigation from "./src/navigation/app_navigation";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <AppNavigation/>
       </PersistGate>
      </Provider>
  );
}