import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Spinner.module.css';

const Spinner = () => {
  return (
    <Loader
      className={s.loader}
      type="Oval"
      color="#3f51b5"
      height={100}
      width={100}
    />
  );
};

export default Spinner;
