import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import converter from "./converter.css";
import { Button } from "@material-ui/core";
import Money from "@material-ui/icons/MonetizationOn";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "",
      toCurrency: "",
      amount: "",
      currencies: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then((response) => {
        const currencyAr = [""];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch((err) => {
        console.log("oppps", err);
      });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?rates=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
        )
        .then((response) => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(2) });
        })
        .catch((error) => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
    console.log(this.state.fromCurrency);
    console.log(this.state.toCurrency);
  };
  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  render() {
    return (
      <div className="Converter">
        <h2>
          <span>Currency</span> Converter
        </h2>
        <div className="From">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <TextField
                label="AMOUNT"
                variant="outlined"
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={(event) =>
                  this.setState({ amount: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="formControl" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  From
                </InputLabel>
                <Select
                  native
                  label="FROM"
                  name="from"
                  onChange={(event) => this.selectHandler(event)}
                  value={this.state.fromCurrency}
                >
                  {this.state.currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="formControl" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">TO</InputLabel>
                <Select
                  native
                  label="TO"
                  name="to"
                  onChange={(event) => this.selectHandler(event)}
                  value={this.state.toCurrency}
                >
                  {this.state.currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                className="Button"
                variant="contained"
                color="primary"
                size="large"
                onClick={this.convertHandler}
                startIcon={<Money />}
              >
                Convert
              </Button>
            </Grid>
          </Grid>

          {this.state.result && <h3>{this.state.result}</h3>}
        </div>
      </div>
    );
  }
}
export default Converter;
