import { useState, useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export const RichTextEditor = ({ value, onChange, placeholder = "Write your blog post content..." }) => {
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder,
    height: 400,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'middle',
    theme: 'default',
    saveModeInCookie: false,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', 'align', '|',
      'hr', 'link', 'table', '|',
      'undo', 'redo', '|',
      'cut', 'copy', 'paste', 'selectall', '|',
      'source', 'fullsize', 'preview'
    ],
    // Completely disable image functionality
    disablePlugins: ['image', 'file', 'video'],
    removeButtons: ['image', 'file', 'video', 'brush'],
    // Disable drag and drop for images
    uploader: {
      enable: false
    },
    // Disable image paste
    askBeforeDelete: false,
    // Prevent image insertion via paste or drag-drop
    events: {
      paste: function(event) {
        // Get clipboard data
        const clipboardData = event.clipboardData || window.clipboardData;
        if (clipboardData) {
          const items = clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            // Block image paste
            if (items[i].type.indexOf('image') !== -1) {
              event.preventDefault();
              alert('Image pasting is not allowed. Please use text content only.');
              return false;
            }
          }
        }
      },
      drop: function(event) {
        // Block image drop
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.indexOf('image') !== -1) {
            event.preventDefault();
            alert('Image upload is not allowed. Please use text content only.');
            return false;
          }
        }
      }
    },
    showXPathInStatusbar: false,
    showCharsCounter: true,
    showWordsCounter: true,
    allowTabNavigation: true,
  }), [placeholder]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      <JoditEditor
        value={value}
        config={config}
        tabIndex={1}
        onBlur={newContent => onChange(newContent)}
        onChange={newContent => {}}
      />
    </div>
  );
};
