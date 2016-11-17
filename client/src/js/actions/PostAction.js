const alt = require('../alt');
const PostSource = require('../sources/PostSource');

class PostActions {
    updatePosts(posts) {
        return posts;
    }
    fetchPosts() {
        return (dispatch) => {
            dispatch();
            PostSource.fetch().then((posts) => this.updatePosts(posts)).catch((errorMessage) => this.postsFailed(errorMessage));
        }
    }
    addPost(posts, formData) {
        return (dispatch) => {
            dispatch();
            PostSource.add(formData).then((returnedPost) => this.updatePosts([
                ...posts,
                returnedPost
            ])).catch(() => this.postsFailed('Impossible d\'ajouter le post'));
        }
    }
    likePost(id) {
        PostSource.like(id).catch(this.postsFailed('Impossible d\'aimer le post'));
        return id;
    }
    removePost(posts, id, password) {
        return (dispatch) => {
            dispatch();
            PostSource.remove(id, password).then((returnedPost) => {
                console.log(returnedPost);
                const newPosts = posts.filter((post) => post._id != id);
                this.updatePosts(newPosts);
            });
        }
    }
    postsFailed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(PostActions);
