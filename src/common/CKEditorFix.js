import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';





class App extends Component {

    componentDidMount = () => {
        
        // ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) )
        
    }
    
    render() {
        return (
            <div className="App">
                <CKEditor

                    editor={ClassicEditor}
                    data={this.props.data ? this.props.data : null }
                    config={
                        {
                            removePlugins: [ 'ImageUpload' ],
                        }}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => this.props.onChange(event, editor)}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                />
            </div>
        );
    }
}

export default App;