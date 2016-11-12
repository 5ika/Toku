const React = require('react');
const PostStore = require('../stores/PostStore');
const PostActions = require('../actions/PostAction');
const Post = require('../components/Post');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: PostStore.getState()
        };
        this.onChange = this.onChange.bind(this);
        this.is_liked = this.is_liked.bind(this);

    }

    componentDidMount() {
        PostStore.listen(this.onChange);
        PostActions.fetchPosts();
    }

    componentWillUnmout() {
        PostStore.unlisten(this.onChange);
    }

    onChange(store) {
        this.setState({store});
    }

    is_liked(id) {
        return this.state.store.liked.indexOf(id) != -1;
    }

    render() {
        return (
            <div className='app'>
                <div className='list'>
                    {this.state.store.posts.map((post, index) => {
                        return <Post {...post} is_liked={this.is_liked(post._id)} key={index}/>;
                    })
}
                </div>
            </div>
        )
    }
}

module.exports = App;
