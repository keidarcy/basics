### Posix

```js
process.stdout.write('hello world\n');
console.error('Oops');
console.log('hello world');

node 1.js 1> /dev/null
node 1.js 2> /dev/null
node 1.js 2> /dev/null 1>&2

process.stdin.read()
```


#### stream

```js
const stream1; // readable
const stream2; // writable
const stream3 = stream1.pipe(stream2); // readable

stream
.pipe(stream2)
.pipe(stream5)
.pipe(final)
```

#### sync vs async

```js
const contents = fs.readFileSync(filepath, 'utf-8');
console.log(contents);
const contents = fs.readFileSync(filepath);
process.stdout.write(contents);
```

#### debug node in chrome dev tool

1. go `chrome://inspect`

```bash
node 6.js
node --inspect 7.js
```