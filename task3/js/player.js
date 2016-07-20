app.Player = function () {

    this.pathToSrt = 'resources/subs/subs.srt';
    this.element = null;
    this.elementVideo = null;
    this.elementAudio = null;
    this.bgCanvas = null;
    this.bgContext = null;
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;

    var requestId;

    // Класс для сцены с субтитрами
    this.subScene = null;

    // Таймер
    this.timer = null;

    // Контролы
    this.controls = null;

    // Аудио
    this.audio = null;

    this.init = function () {

        this.element = document.querySelector('.old-school-player');
        this.elementVideo = this.element.querySelector('.old-school-player__video');
        this.elementVideoOld = this.element.querySelector('.old-school-player__video-old');

        this.bgCanvas = this.element.querySelector('.old-school-player__canvas-back');
        this.bgContext = this.bgContext = this.bgCanvas.getContext('2d');

        this.canvas = this.element.querySelector('.old-school-player__canvas');
        this.context = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        // Класс для сцены с субтитрами
        this.subScene = new app.SubScene(this, this.canvas, this.context);

        // Таймер
        this.timer = new app.Timer(this);

        // Контролы
        this.controls = new app.Controls(this);

        // Аудио
        this.audio = new app.Audio(this);

        this.elementVideo.addEventListener('timeupdate', timeUpdateHandler.bind(this), false);
        this.elementVideo.addEventListener('canplay', paintPlayer.bind(this), false);
        this.elementVideo.addEventListener('ended', endedHandler.bind(this), false);
        this.elementVideo.muted = true;

        function timeUpdateHandler(event) {
            this.subScene.getSub(event.target.currentTime);

            if (this.subScene.isSubscene() && !this.subScene.isPlaying()) {
                this.subScene.startSubscene();
            }
        }

        function endedHandler() {
            this.controls.stop();
        }

        function paintPlayer(event) {
            this.width = this.elementVideo.videoWidth;
            this.height = this.elementVideo.videoHeight;
            //this.width = this.elementVideo.videoWidth / 2;
            //this.height = this.elementVideo.videoHeight / 2;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.bgCanvas.width = this.width;
            this.bgCanvas.height = this.height;
            this.subScene.paintPlayer();
        }

        // Если видео уже есть в кэше
        if (this.elementVideo.readyState > 3) {
            paintPlayer.apply(this);
        }

    };

    this.showBackCanvas = function () {
        this.bgCanvas.classList.remove('old-school-player__canvas_hide');
        this.canvas.classList.add('old-school-player__canvas_hide');
    };

    this.showMainCanvas = function () {
        this.bgCanvas.classList.add('old-school-player__canvas_hide');
        this.canvas.classList.remove('old-school-player__canvas_hide');
    };

    function makeItSepia(pixelData) {
        for (var i = 0; i < pixelData.data.length; i += 4) {
            var r = pixelData.data[i];
            var g = pixelData.data[i + 1];
            var b = pixelData.data[i + 2];
            pixelData.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
            pixelData.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
            pixelData.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
        }
    }

    function prepareWebGL(gl) {
        var program = gl.createProgram();

        var vertexCode =
            'attribute vec2 coordinates;' +
            'attribute vec2 texture_coordinates;' +
            'varying vec2 v_texcoord;' +
            'void main() {' +
            '  gl_Position = vec4(coordinates,0.0, 1.0);' +
            '  v_texcoord = texture_coordinates;' +
            '}';

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexCode);
        gl.compileShader(vertexShader);

        var fragmentCode =
            'precision mediump float;' +
            'varying vec2 v_texcoord;' +
            'uniform sampler2D u_texture;' +
            'void main() {' +
            '   gl_FragColor = texture2D(u_texture, v_texcoord);' +
            '   gl_FragColor.rgb = vec3(dot(gl_FragColor.rgb, vec3(0.21, 0.72, 0.07)));' +
            '}';

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentCode);
        gl.compileShader(fragmentShader);

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        gl.useProgram(program);

        var positionLocation = gl.getAttribLocation(program, 'coordinates');
        var texcoordLocation = gl.getAttribLocation(program, 'texture_coordinates');

        var buffer = gl.createBuffer();
        var vertices = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1
        ];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        buffer = gl.createBuffer();
        var textureCoordinates = [
            0, 1,
            1, 1,
            0, 0,
            0, 0,
            1, 1,
            1, 0
        ];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(texcoordLocation);
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    function postprocessWebGL(canvas, gl, sourceCanvas, delta) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    this.applyTexture = function (context) {
        var oldOperation = context.globalCompositeOperation;
        context.globalCompositeOperation = 'multiply';
        context.drawImage(this.elementVideoOld, 0, 0, this.width, this.height);
        context.globalCompositeOperation = oldOperation;
    };

    function renderScene() {

        if (!this.subScene.isSubscene()) {

            this.bgContext.drawImage(this.elementVideo, 0, 0, this.width, this.height);
            this.applyTexture(this.bgContext);

            // применение ч/б
            postprocessWebGL(this.canvas, this.context, this.bgCanvas);

            // применение сепии в тупую
            //var pixelData = this.bgContext.getImageData(0, 0, this.width, this.height);
            //makeItSepia(pixelData);
            //this.context.putImageData(pixelData, 0, 0);

        } else {
            this.subScene.render();
            this.applyTexture(this.bgContext);
        }


        requestId = requestAnimationFrame(renderScene.bind(this));
    }

    this.startRenderScene = function () {
        prepareWebGL(this.context);

        if (!requestId) {
            renderScene.apply(this);
        }
    };

    this.stopRenderScene = function () {
        if (requestId) {
            cancelAnimationFrame(requestId);
            requestId = null;
        }
    };
};



