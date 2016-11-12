const alt = require('../alt');
const PostActions = require('../actions/PostAction');

const postsSort = (a, b) => new Date(b.date) - new Date(a.date);

class PostStore {
    constructor() {
        this.posts = [];
        this.liked = JSON.parse(localStorage.getItem('liked')) || [];
        this.errorMessage = null;
        this.bindListeners({handleUpdatePosts: PostActions.UPDATE_POSTS, handleFetchPosts: PostActions.FETCH_POSTS, handlePostsFailed: PostActions.POSTS_FAILED, handleLikePost: PostActions.LIKE_POST});
    }

    handleUpdatePosts(posts) {
        this.posts = posts.sort(postsSort);
    }
    handleFetchPosts() {
        this.posts = [];
    }
    handleLikePost(id) {
        this.liked.push(id)
        this.posts = this.posts.map((post) => {
            if (post._id == id)
                post.votes.up++;
            return post;
        });
        localStorage.setItem('liked', JSON.stringify(this.liked));
    }
    handlePostsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(PostStore, 'PostStore');
