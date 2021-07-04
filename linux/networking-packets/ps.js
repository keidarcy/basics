const { spawn } = require("child_process");

const input = `
cheese
carrots
process
potatos
potato
`;

const ps = spawn("grep", ["potato"]);
// ps.stdin.write("cheese\n");
// ps.stdin.write("carrots\n");
// ps.stdin.write("carrots potatos\n");
// ps.stdin.write("potatos\n");
ps.stdin.write(input);
ps.stdin.end();
ps.stdout.pipe(process.stdout);
