import React from 'react';
import moment from 'moment';
import Parser from '../parser/parser';
import PostActions from '../actions/PostAction';
require('moment/locale/fr');
moment.locale('fr');

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
    }

    formatDate(date) {
        return moment(date).fromNow(true);
    }
    like() {
        if (!this.props.is_liked)
            PostActions.likePost(this.props._id);
        }
    render() {
        return <div className='post card'>
            {this.props.image && <div className='card-image'>
                <img className='responsive-img' src={this.props.image}/>
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
