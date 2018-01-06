import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export const insertImageToolbarName = 'insertImage';

export default class InsertImage extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add(insertImageToolbarName, locale => {
      const view = new ButtonView(locale);

      // toolbar config
      view.set({
        label: 'Insert image',
        icon: imageIcon,
        tooltip: true
      });

      view.on('execute', () => {
        const imageUrl = prompt('Image URL');

        editor.document.enqueueChanges(() => {
          const imageElement = new ModelElement('image', {
            src: imageUrl
          });

          editor.data.insertContent(imageElement, editor.document.selection);
        });
      });

      return view;
    });
  }
}
