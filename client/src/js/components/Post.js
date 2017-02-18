import React from 'react';
import moment from 'moment';
import Parser from '../parser/parser';
import PostActions from '../actions/PostAction';
const server = require('../../../package.json').config.api;
require('moment/locale/fr');
moment.locale('fr');

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
								this.delete = this.delete.bind(this);
    }
				componentDidMount() {
					this.hammer = new Hammer(this.refs.post);
					this.hammer.on('press', this.like);
					this.hammer.on('swipeleft', this.delete);
				}

    formatDate(date) {
        return moment(date).fromNow(true);
    }
    like() {
        if (!this.props.is_liked) {
            PostActions.likePost(this.props._id);
        }
    }
    delete() {
					const preset = localStorage.getItem('remove_password') || '';
					const password = prompt('Merci d\'entrer le mot de passe pour supprimer', preset);
					if(preset != password) localStorage.setItem('remove_password', password);
					this.props.remove(this.props._id, password);
		}
    render() {
        return <div className='post card' ref='post'>
            {this.props.image && <div className='card-image'>
                <img className='responsive-img' src={server + this.props.image}/>
            </div>
}
            <div className='card-content'>
                <div className='like' data-selected={this.props.is_liked} onClick={this.like}>
                    <i className='fa fa-heart-o'/>
                    <div className='rank'>{this.props.votes.up}</div>
                </div>
                <div className='infos'>
                    <div className='author'>{this.props.auteur}</div>
                    <div className='date'>{this.formatDate(this.props.date)}</div>
                    <div
                        className='content'
                        dangerouslySetInnerHTML={{
                        __html: Parser(this.props.content)
                    }}/>
                </div>
            </div>
        </div>;
    }

}

module.exports = Post;
