import React, { useState } from "react";
import Login from "./user/Login";
import Alert from "./components/common/Alert";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div>
      <Alert alert={alert} />
      <Login showAlert={showAlert} />
    </div>
  );
};

export default App;
