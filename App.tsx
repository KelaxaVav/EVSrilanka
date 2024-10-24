import { Provider } from "react-redux";
import AppNavigation from "./src/navigation/app_navigation";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation/>
      </Provider>
  );
}