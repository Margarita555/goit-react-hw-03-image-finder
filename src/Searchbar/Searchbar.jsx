import { Component } from 'react';

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
            alert('Enter the query')
            return
        }
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' })
    };
    render(){
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.button}>
                        <span className={s.buttonLabel}>Search</span>
                    </button>

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