import { spawn } from 'node:child_process';
import http from 'node:http';

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log('[Verify] Starting Next.js production server on port 3000...');
  const server = spawn('npx', ['next', 'start', '-p', '3000'], {
    cwd: 'D:\\k12_physics_web_app',
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[Server ERR] ${d}`));

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    try {
      const res = await checkUrl('http://localhost:3000');
      if (res.statusCode === 200) {
        ready = true;
        console.log(`[Verify] Server is responsive on attempt ${i + 1}!`);
        break;
      }
    } catch {
      // not ready yet
    }
  }

  if (!ready) {
    server.kill();
    throw new Error('Server failed to start and accept connections within 30 seconds');
  }

  const endpoints = [
    'http://localhost:3000',
    'http://localhost:3000/student',
    'http://localhost:3000/parents',
    'http://localhost:3000/cms',
    'http://localhost:3000/student/simulations',
    'http://localhost:3000/student/gamification',
  ];

  for (const ep of endpoints) {
    const res = await checkUrl(ep);
    console.log(`[Verify] GET ${ep} -> Status ${res.statusCode} (${res.length} bytes)`);
    if (res.statusCode !== 200) {
      server.kill();
      throw new Error(`Endpoint ${ep} returned non-200 status: ${res.statusCode}`);
    }
  }

  console.log('[Verify] All core endpoints successfully verified on local server!');
  server.kill('SIGTERM');
  process.exit(0);
}

main().catch((err) => {
  console.error('[Verify FATAL]', err.message);
  process.exit(1);
});
