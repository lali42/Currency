import logo from "./logo.svg";
import "./App.css";
import Convrter from "./component/converter/converter";
import Lottie from "react-lottie";
import Money from "../src/lotties/13398-money-stack.json";
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Money,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function App() {
  return (
    <div className="App">
      <AppBar position="static" className="h">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
          Currency Converter
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className="container">
        <Grid item>
          <Lottie options={defaultOptions} height={700} width={700} />
        </Grid>
        <Grid item xs={12} sm container>
          <Convrter />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
