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
    addPost(posts, post) {
        return (dispatch) => {
            dispatch();
            PostSource.add(post).then((returnedPost) => this.updatePosts([...posts, returnedPost])).catch(() => this.postsFailed('Impossible d\'ajouter le post'));
        }
    }
    likePost(id) {
        PostSource.like(id).catch(this.postsFailed('Imposible d\'aimer le post'));
        return id;
    }
    removePost(posts, post) {
        // TODO : Envoyer à l'API et retirer `post` de `posts`
        return post;
    }
    postsFailed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(PostActions);
