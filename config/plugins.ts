export default ({env}) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('AWS_IMG_URL'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  ckeditor: {
    enabled: true,
    config: {
      editor: {
        toolbar: {
          items: [
            'paragraph',
            'heading2',
            'heading3',
            'heading4',
            'heading5',
            '|',
            'bold',
            'italic',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'underline',
            'fontSize',
            'removeFormat',
            '|',
            'bulletedList',
            'todoList',
            'numberedList',
            '|',
            'alignment',
            'outdent',
            'indent',
            'horizontalLine',
            '|',
            'StrapiMediaLib',
            'insertTable',
            'blockQuote',
            'mediaEmbed',
            'link',
            'highlight',
            '|',
            'htmlEmbed',
            'sourceEditing',
            'code',
            'codeBlock',
            '|',
            'subscript',
            'superscript',
            'strikethrough',
            'specialCharacters',
            '|',
            'heading',
            "fullScreen",
            'undo',
            'redo'
          ]
        },
        fontSize: {
          options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21,
            27,
            35,
          ],
          supportAllValues: false
        },
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            'Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif',
          ],
          supportAllValues: true
        },
        fontColor: {
          columns: 5,
          documentColors: 10,
        },
        fontBackgroundColor: {
          columns: 5,
          documentColors: 10,
        },
        image: {
          resizeUnit: "%",
          resizeOptions: [{
            name: 'resizeImage:original',
            value: null,
            icon: 'original'
          },
            {
              name: 'resizeImage:25',
              value: '25',
              icon: 'small'
            },
            {
              name: 'resizeImage:50',
              value: '50',
              icon: 'medium'
            },
            {
              name: 'resizeImage:75',
              value: '75',
              icon: 'large'
            }],
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            'linkImage',
            'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties',
            'toggleTableCaption'
          ]
        },
        heading: {
          options: [
            {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
            {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
            {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4'},
            {model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5'},
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: 'img',
              attributes: {
                sizes: true,
                loading: true,
              }
            },
          ]
        },
      }
    }
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::article.article',
          draft: {
            url: `${env('STATIC_URL')}/{locale}/blog/preview/{alias}`,
            query: {
              publicationState: 'preview',
            },
            copy: false,
          },
          published: {
            url: `${env('STATIC_URL')}/{locale}/blog/preview/{alias}`,
            copy: false,
          },
        },
      ]
    }
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAILER_SMTP_HOST'),
        port: env('MAILER_SMTP_PORT'),
        auth: {
          user: env('MAILER_AUTH_USER'),
          pass: env('MAILER_AUTH_PASS'),
        },
      },
      settings: {
        defaultFrom: env('MAILER_SENDER'),
        defaultReplyTo: env('MAILER_REPLIER'),
      },
    },
  },
});
