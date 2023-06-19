import { fabric } from 'fabric';

const RedifyFilterMaterial = {
    type: 'Redify',

    /**
     * Fragment source for the redify program
     */
    fragmentSource: 'precision highp float;\n' +
        'uniform sampler2D uTexture;\n' +
        'varying vec2 vTexCoord;\n' +
        'void main() {\n' +
        'vec4 color = texture2D(uTexture, vTexCoord);\n' +
        'color.g = 0.0;\n' +
        'color.b = 0.0;\n' +
        'gl_FragColor = color;\n' +
        '}',

    applyTo2d: function (options) {
        var imageData = options.imageData,
            data = imageData.data, i, len = data.length;

        for (i = 0; i < len; i += 4) {
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
    }
}

fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, RedifyFilterMaterial);
fabric.Image.filters.Redify.fromObject = fabric.Image.filters.BaseFilter.fromObject;