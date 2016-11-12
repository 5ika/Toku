import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            char_count: 0
        };
        this.onKeyUp = this.onKeyUp.bind(this);
        this.addPost = this.addPost.bind(this);
    }
    onKeyUp() {
        this.setState({char_count: $('.content textarea').val().length});
    }
    showSecondary() {
        $('.secondary').slideDown();
    }
    addPost() {
        if ($('.content .input-text').val()) {
            const post = {
                auteur: $('.author .input-text').val(),
                content: $('.content .input-text').val()
            }
            $('.content .input-text').val('');
            this.props.addPost(post);
        }
    }

    render() {
        return <div className='new'>
            <div className='content'>
                <textarea
                    className='input-text'
                    placeholder='Hey, tout le monde !'
                    maxLength='140'
                    onKeyUp={this.onKeyUp}
                    onFocus={this.showSecondary}/>
            </div>
            <div className='secondary'>
                <div className='actions'>
                    <label htmlFor='upload-image'><i className='fa fa-camera'/></label>
                    <input type='file' id='upload-image' className='input-file'/>
                    <div className='char-count'>{this.state.char_count}</div>
                </div>

                <div className='author'>
                    <input type='text' className='input-text' placeholder='Anonyme' maxLength='20'/>
                </div>
                <div className='submit'>
                    <button className='btn-flat' onClick={this.addPost}>Poster</button>
                </div>
            </div>
        </div>;
    }

}

module.exports = Form;
