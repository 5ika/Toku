const alt = require('../alt');
const PostActions = require('../actions/PostAction');

class PostStore {
    constructor() {
        this.posts = [];
        this.liked = JSON.parse(localStorage.getItem('liked')) || [];
        this.errorMessage = null;
        this.bindListeners({handleUpdatePosts: PostActions.UPDATE_POSTS, handleFetchPosts: PostActions.FETCH_POSTS, handlePostsFailed: PostActions.POSTS_FAILED, handleLikePost: PostActions.LIKE_POST});
    }

    handleUpdatePosts(posts) {
        this.posts = posts;
    }
    handleFetchPosts() {
        this.posts = [];
    }
    handleLikePost(id) {
        this.liked.push(id)
        localStorage.setItem('liked', JSON.stringify(this.liked));
    }
    handlePostsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(PostStore, 'PostStore');
