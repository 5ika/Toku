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
        const length = $('.content textarea').val().length;
        this.setState({char_count: length});
        length > 0
            ? $('.content textarea').addClass('not-empty')
            : $('.content textarea').removeClass('not-empty');
    }
    showSecondary() {
        $('.secondary').slideDown();
    }
    updateFileIcon() {
        if ($('.actions .input-file').val()) {
            $('.actions .icon-file').addClass('selected');
        }
    }
    addPost(e) {
        e.preventDefault();
								console.log('FORM');
        if ($('.content .input-text').val()) {
            const data = new FormData($('#new-form')[0]);
            this.props.addPost(data);
            // Clear the form
            $('.input-file, .input-text').val('');
            $('.actions .icon-file').removeClass('selected');
												$('.secondary').slideUp();
												$('.content textarea').removeClass('not-empty');
            // Notify
            toast('C\'est envoyé !');
        }
    }

    render() {
        return <div className='new'>
            <form encType='multipart/form-data' id='new-form'>
                <div className='content'>
                    <textarea
                        className='input-text'
                        name='content'
                        placeholder='Écrire un message...'
                        maxLength='140'
                        onKeyUp={this.onKeyUp}
                        onFocus={this.showSecondary}/>
                </div>
                <div className='secondary'>
                    <div className='actions'>
                        <label htmlFor='upload-image'><i className='icon-file fa fa-camera'/></label>
                        <input
                            type='file'
                            id='upload-image'
                            className='input-file'
                            name='image'
                            onChange={this.updateFileIcon}/>
                        <div className='char-count'>{this.state.char_count}</div>
                    </div>

                    <div className='author'>
                        <input type='text' className='input-text' placeholder='Anonyme' maxLength='20' name='auteur'/>
                    </div>
                    <div className='submit'>
                        <button className='btn' onClick={this.addPost}>Poster</button>
                    </div>
                </div>
            </form>
        </div>;
    }

}

module.exports = Form;
