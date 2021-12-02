import { Component } from "react/cjs/react.production.min";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import s from './Loader.module.css';

export default class Loading extends Component {
 
  render() {
    return (
        <Loader className={s.loader}
            type="Oval"
            color="#3f51b5"
            height={100}
            width={100}
        />
    );
  }
}