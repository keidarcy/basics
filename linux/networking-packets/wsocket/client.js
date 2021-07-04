const wsock = require('websocket-stream');
const through = require('through2');
const stream = wsock('ws://' + location.host);
const html = require('yoyo');
const output = [];

stream.pipe(through(function (buf, enc, next) {
    output.push(buf.toString());
    next();
}));

const root = document.body.appendChild(document.createElement('div'));


function update() {
    html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
        <input type="text" name="msg" />
    </form>
    <pre>${output.join('')}</pre>
    </div>`);


    function onsubmit(e) {
        e.preventDefault();
        this.elements.msg.value
        this.reset();
    }
}
