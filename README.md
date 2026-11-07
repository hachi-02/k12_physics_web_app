# K-12 Physics Educational Web Application (`k12_physics_web_app`)

Ứng dụng web giáo dục học môn Vật lý (Physics / Khoa học thường thức) từ Lớp 1 đến Lớp 12 phục vụ Phụ huynh và Học sinh theo chương trình GDPT 2018.

## Công nghệ sử dụng
- **Framework**: Next.js 14 App Router, React 18, TypeScript 5
- **Giao diện**: Tailwind CSS (3 phân tầng giao diện Tiểu học, THCS, THPT) & Lucide React
- **Công thức Toán/Vật lý**: KaTeX
- **Cơ sở dữ liệu**: SQLite 3 (WAL mode) với Singleton Connection (`better-sqlite3` / `node:sqlite`)
- **Kiểm thử tự động**: Vitest

## Cài đặt & Khởi chạy

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Khởi tạo Cơ sở dữ liệu & Nạp dữ liệu mẫu 12 khối lớp
```bash
npm run seed
```

### 3. Chạy kiểm thử tự động
```bash
npm test
```

### 4. Khởi chạy máy chủ phát triển
```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:3000`.

### 5. Build kiểm tra sản phẩm
```bash
npm run build
```
