const React = require('react');
const PostStore = require('../stores/PostStore');
const PostActions = require('../actions/PostAction');
const Post = require('../components/Post');
const Form = require('../components/Form');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: PostStore.getState()
        };
        this.onChange = this.onChange.bind(this);
        this.addPost = this.addPost.bind(this);
        this.is_liked = this.is_liked.bind(this);
								this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        PostStore.listen(this.onChange);
        PostActions.fetchPosts();
        // this.refresh = setInterval(PostActions.fetchPosts, 5000);
    }

    componentWillUnmout() {
        PostStore.unlisten(this.onChange);
        clearInterval(this.refresh);
    }

    onChange(store) {
        this.setState({store});
    }

    addPost(formData) {
        PostActions.addPost(this.state.store.posts, formData);
    }

    is_liked(id) {
        return this.state.store.liked.indexOf(id) != -1;
    }

		removePost(id, password) {
				PostActions.removePost(this.state.store.posts, id, password);
		}

    render() {
        return (
            <div className='app'>
								<div className='app-title'><img className='responsive-img' src='/assets/logo.png'/></div>
                <div className='form'>
                    <Form addPost={this.addPost}/>
                </div>
                <div className='list'>
                    {!this.state.store.posts.length && <div className='no-post'>Il n'y a aucun post.<br/>
                        Soyez le premier !</div>
                }
                {
                    this.state.store.posts.map((post, index) => {
                        return <Post {...post} is_liked={this.is_liked(post._id)} remove={this.removePost} key={index}/>;
                    })
                } </div>
                <div className='controls'>
                 <div className='action refresh' onClick={PostActions.fetchPosts} title='Rafraîchir les posts'><i className='fa fa-refresh'/></div>
                 <a href='/infos.html' target='_blank' className='action more' title="Plus d'infos"><i className='fa fa-info-circle'/></a>
                </div>
            </div>
           )
    }
}

module.exports = App;
