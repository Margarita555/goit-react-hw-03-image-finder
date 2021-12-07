import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import searchIcon from '../../images/search.svg'
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
    state = {
        query: '',
    }

    handleQueryChange = e => {
        this.setState({ query: e.currentTarget.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            toast('Type in the keyword')
            return
        }
        this.props.onSubmit(this.state.query);
        // this.setState({ query: '' })
    };
    render(){
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.button}>
                        <img className={s.icon} src={searchIcon} alt="img" />
                    </button>
                    <ToastContainer/>
                    <input className={s.input}   
                        type="text"
                        value={this.state.query}
                        onChange={this.handleQueryChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    
                </form>
            </header>
        )
    }
}